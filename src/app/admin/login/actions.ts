"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { audit, createSession, verifyPassword } from "@/lib/server/auth";
import { limit } from "@/lib/server/rate-limit";

const schema = z.object({ email: z.string().trim().toLowerCase().email().max(200), password: z.string().min(1).max(200) });
// Hash van een willekeurig wachtwoord: zo kost een onbekend e-mailadres even veel tijd als een fout wachtwoord.
const DUMMY = "$2a$12$6N2rjbWTH1gcsCLQE6SpqO2j8cjUnDmcKyo5x12lPFoyltPeeaAYC";

export async function login(_: { error?: string } | undefined, fd: FormData) {
  const rl = await limit("login", 8, 15 * 60 * 1000);
  if (!rl.ok) return { error: `Te veel pogingen. Probeer het over ${Math.ceil(rl.retryAfter / 60)} minuten opnieuw.` };
  const parsed = schema.safeParse({ email: fd.get("email"), password: fd.get("password") });
  if (!parsed.success) return { error: "Vul een geldig e-mailadres en wachtwoord in." };
  const user = await db.adminUser.findUnique({ where: { email: parsed.data.email } });
  const ok = await verifyPassword(parsed.data.password, user?.passwordHash ?? DUMMY);
  if (!user || !ok || !user.active) { await audit(user?.id ?? null, "login.mislukt"); return { error: "Onjuiste combinatie van e-mailadres en wachtwoord." }; }
  await db.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await createSession(user);
  await audit(user.id, "login");
  redirect("/admin");
}
