/** Edge-compatibel (ook bruikbaar in middleware): ondertekenen en controleren van de sessietoken. */
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "es_admin";
export const SESSION_HOURS = 8;

function key() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET ontbreekt of is korter dan 32 tekens. Zet deze in .env (zie .env.example).");
  return new TextEncoder().encode(s);
}

export type SessionPayload = { sub: string; role: string; v: number };

export async function signSession(p: SessionPayload) {
  return new SignJWT({ role: p.role, v: p.v }).setProtectedHeader({ alg: "HS256" }).setSubject(p.sub)
    .setIssuedAt().setExpirationTime(`${SESSION_HOURS}h`).setIssuer("excelsheets.nl").setAudience("admin").sign(key());
}
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key(), { issuer: "excelsheets.nl", audience: "admin", algorithms: ["HS256"] });
    return { sub: String(payload.sub), role: String(payload.role), v: Number(payload.v) };
  } catch { return null; }
}
