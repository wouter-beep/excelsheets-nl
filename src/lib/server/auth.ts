/**
 * Beheer-authenticatie: wachtwoord (bcrypt) + ondertekende sessiecookie (JWT, HS256 via jose).
 * - AUTH_SECRET is verplicht (minimaal 32 tekens) en staat nooit in de code.
 * - Cookie: HttpOnly, SameSite=Lax, Secure in productie, 8 uur geldig.
 * - sessionVersion maakt het mogelijk alle sessies van een gebruiker in te trekken
 *   (bij wachtwoordwijziging of deactiveren).
 */
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signSession, verifySession, SESSION_COOKIE, SESSION_HOURS } from "./session-token";
import type { Role } from "@prisma/client";

export const PERMISSIONS = {
  "requests.read": ["OWNER", "ADMIN", "SALES"],
  "requests.write": ["OWNER", "ADMIN", "SALES"],
  "requests.export": ["OWNER", "ADMIN"],
  "content.write": ["OWNER", "ADMIN", "EDITOR"],
  "settings.write": ["OWNER", "ADMIN"],
  "users.manage": ["OWNER"],
} as const satisfies Record<string, Role[]>;
export type Permission = keyof typeof PERMISSIONS;
export const can = (role: Role, p: Permission) => (PERMISSIONS[p] as readonly Role[]).includes(role);

export const hashPassword = (pw: string) => bcrypt.hash(pw, 12);
export const verifyPassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);

export async function createSession(user: { id: string; role: Role; sessionVersion: number }) {
  const token = await signSession({ sub: user.id, role: user.role, v: user.sessionVersion });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_HOURS * 3600,
  });
}
export async function destroySession() { (await cookies()).delete(SESSION_COOKIE); }

/** Huidige beheerder (controleert ook in de database of het account nog actief is). */
export async function currentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySession(token);
  if (!payload) return null;
  const user = await db.adminUser.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, name: true, role: true, active: true, sessionVersion: true } });
  if (!user || !user.active || user.sessionVersion !== payload.v) return null;
  return user;
}
export type AdminSession = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

/** Gebruik in serverpagina's en -acties van het beheer. */
export async function requireUser(p?: Permission) {
  const user = await currentUser();
  if (!user) redirect("/admin/login");
  if (p && !can(user.role, p)) redirect("/admin?geen-toegang=1");
  return user;
}

export async function audit(actorId: string | null, action: string, target?: string) {
  try { await db.auditLog.create({ data: { actorId, action, target } }); } catch {}
}
