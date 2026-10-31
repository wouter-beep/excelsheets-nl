import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { audit, hashPassword, requireUser } from "@/lib/server/auth";
import { AdminTitle, Badge, Field, Table } from "@/components/admin/ui";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Gebruikers" };
const ROLES: Record<Role, string> = { OWNER: "Eigenaar (alles)", ADMIN: "Beheerder (alles behalve gebruikers)", EDITOR: "Redacteur (inhoud)", SALES: "Sales (aanvragen en contacten)" };
const pw = z.string().min(12, "Wachtwoord: minimaal 12 tekens").max(200);

async function createUser(fd: FormData) {
  "use server";
  const me = await requireUser("users.manage");
  const p = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().toLowerCase().email(), role: z.enum(["OWNER", "ADMIN", "EDITOR", "SALES"]), password: pw }).safeParse(Object.fromEntries(fd));
  if (!p.success) redirect(`/admin/gebruikers?fout=${encodeURIComponent(p.error.issues[0].message)}`);
  try { await db.adminUser.create({ data: { name: p.data.name, email: p.data.email, role: p.data.role, passwordHash: await hashPassword(p.data.password) } }); }
  catch { redirect(`/admin/gebruikers?fout=${encodeURIComponent("Dit e-mailadres bestaat al.")}`); }
  await audit(me.id, "gebruiker.nieuw", p.data.email); revalidatePath("/admin/gebruikers");
}
async function updateUser(id: string, fd: FormData) {
  "use server";
  const me = await requireUser("users.manage");
  const role = String(fd.get("role")) as Role;
  const active = fd.get("active") === "on";
  const newPw = String(fd.get("password") ?? "");
  if (id === me.id && (!active || role !== "OWNER")) redirect(`/admin/gebruikers?fout=${encodeURIComponent("Je kunt je eigen eigenaarsrechten niet intrekken.")}`);
  if (newPw && !pw.safeParse(newPw).success) redirect(`/admin/gebruikers?fout=${encodeURIComponent("Wachtwoord: minimaal 12 tekens")}`);
  // Elke wijziging van rol, status of wachtwoord trekt bestaande sessies in.
  await db.adminUser.update({ where: { id }, data: { role: role in ROLES ? role : undefined, active, sessionVersion: { increment: 1 }, ...(newPw ? { passwordHash: await hashPassword(newPw) } : {}) } });
  await audit(me.id, "gebruiker.wijzig", id); revalidatePath("/admin/gebruikers");
}

export default async function Page({ searchParams }: { searchParams: Promise<{ fout?: string }> }) {
  const me = await requireUser("users.manage");
  const [users, log, sp] = await Promise.all([db.adminUser.findMany({ orderBy: { createdAt: "asc" } }), db.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 30 }), searchParams]);
  const nameOf = (id: string | null) => users.find((u) => u.id === id)?.name ?? "–";
  return (
    <>
      <AdminTitle title="Gebruikers" sub="Rollen bepalen wat iemand mag. Wijzig je rol, status of wachtwoord, dan wordt die gebruiker overal uitgelogd." />
      {sp.fout && <p role="alert" className="mb-6 rounded-xl bg-coral-100 px-4 py-3 text-[14px] text-coral">{sp.fout}</p>}
      <div className="space-y-3">
        {users.map((u) => (
          <form key={u.id} action={updateUser.bind(null, u.id)} className="card flex flex-col gap-3 p-4 lg:flex-row lg:items-end">
            <div className="min-w-[220px] flex-1"><p className="font-semibold">{u.name}{u.id === me.id && " (jij)"}</p><p className="text-[13px] text-ink-500">{u.email} · laatst ingelogd {u.lastLoginAt ? formatDateTime(u.lastLoginAt) : "nooit"}</p></div>
            <div><label className="label" htmlFor={`r-${u.id}`}>Rol</label><select id={`r-${u.id}`} name="role" defaultValue={u.role} className="input py-2">{Object.entries(ROLES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
            <div><label className="label" htmlFor={`p-${u.id}`}>Nieuw wachtwoord</label><input id={`p-${u.id}`} name="password" type="password" autoComplete="new-password" className="input py-2" placeholder="leeg = ongewijzigd" /></div>
            <label className="flex items-center gap-2 pb-2.5 text-[14px]"><input type="checkbox" name="active" defaultChecked={u.active} className="h-4 w-4 accent-[#147D52]" />Actief</label>
            <button className="btn-dark py-2">Opslaan</button>
          </form>
        ))}
      </div>
      <form action={createUser} className="card mt-8 grid gap-4 p-6 md:grid-cols-2">
        <h2 className="font-display text-lg font-bold md:col-span-2">Gebruiker toevoegen</h2>
        <Field label="Naam" name="name" required /><Field label="E-mailadres" name="email" type="email" required />
        <div><label htmlFor="role" className="label">Rol</label><select id="role" name="role" defaultValue="SALES" className="input">{Object.entries(ROLES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
        <Field label="Tijdelijk wachtwoord" name="password" type="password" hint="min. 12 tekens" required />
        <div className="md:col-span-2"><button className="btn-primary">Toevoegen</button></div>
      </form>
      <h2 className="mb-3 mt-12 font-display text-xl font-bold">Logboek</h2>
      <Table head={["Tijd", "Gebruiker", "Actie", "Object"]}>
        {log.map((l) => <tr key={l.id}><td className="whitespace-nowrap px-4 py-2">{formatDateTime(l.createdAt)}</td><td className="px-4 py-2">{nameOf(l.actorId)}</td><td className="px-4 py-2"><Badge className="bg-paper-200">{l.action}</Badge></td><td className="px-4 py-2 font-mono text-[12px]">{l.target ?? ""}</td></tr>)}
      </Table>
    </>
  );
}
