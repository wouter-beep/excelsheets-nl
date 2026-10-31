import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadPolicy } from "@/config/site";
import { limit } from "@/lib/server/rate-limit";
import { checkFile, randomToken, safeName, scanBuffer, scanRequired, sha256, storeFile } from "@/lib/server/storage";
import { getRetention } from "@/lib/settings";

export const runtime = "nodejs";

/** Upload van één bestand. Geeft een eenmalige token terug die bij het versturen aan de aanvraag wordt gekoppeld. */
export async function POST(req: Request) {
  const rl = await limit("upload", 20, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "Te veel uploads. Probeer het later opnieuw." }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });
  const len = Number(req.headers.get("content-length") || 0);
  if (len > uploadPolicy.maxFileBytes + 64 * 1024) return NextResponse.json({ error: "Het bestand is te groot." }, { status: 413 });

  let file: File | null = null;
  try { const fd = await req.formData(); const f = fd.get("file"); file = f instanceof File ? f : null; } catch {}
  if (!file) return NextResponse.json({ error: "Geen bestand ontvangen." }, { status: 400 });
  const buf = Buffer.from(await file.arrayBuffer());
  const check = checkFile(file.name, buf);
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: 415 });

  const scan = await scanBuffer(buf);
  if (scan.status === "INFECTED") return NextResponse.json({ error: "Dit bestand is geweigerd door de virusscanner." }, { status: 422 });
  if (scanRequired() && scan.status !== "CLEAN") {
    console.error(`[upload] virusscan vereist maar niet gelukt: ${scan.detail}`);
    return NextResponse.json({ error: "Het bestand kon nu niet worden gecontroleerd. Probeer het later opnieuw of stuur het later na." }, { status: 503 });
  }

  const retention = await getRetention();
  const storedName = await storeFile(buf, check.ext);
  const token = randomToken(24);
  await db.attachment.create({ data: {
    uploadToken: token, originalName: safeName(file.name), storedName, size: buf.length, mime: check.mime, sha256: sha256(buf),
    scanStatus: scan.status, scanDetail: scan.detail, deleteAfter: new Date(Date.now() + retention.orphanUploadHours * 3600e3),
  } });
  return NextResponse.json({ token });
}
