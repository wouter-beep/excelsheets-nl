/**
 * Eenvoudige rate limiter (sliding window, in geheugen) op basis van een gehasht IP-adres.
 * Er wordt geen IP-adres opgeslagen of gelogd. Draai je meerdere servers? Vervang dit dan
 * door een gedeelde opslag (bijvoorbeeld Redis) — de interface blijft gelijk.
 */
import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";

const buckets = new Map<string, number[]>();

export async function clientKey(scope: string) {
  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "local").trim();
  return createHash("sha256").update(`${scope}:${ip}:${process.env.AUTH_SECRET ?? ""}`).digest("base64url").slice(0, 22);
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) { buckets.set(key, hits); return { ok: false, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) }; }
  hits.push(now); buckets.set(key, hits);
  if (buckets.size > 5000) for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  return { ok: true, retryAfter: 0 };
}

export async function limit(scope: string, max: number, windowMs: number) {
  return rateLimit(await clientKey(scope), max, windowMs);
}
