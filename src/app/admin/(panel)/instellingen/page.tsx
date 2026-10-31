import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { audit, requireUser } from "@/lib/server/auth";
import { getCompany, getNotifications, getRetention, saveSetting } from "@/lib/settings";
import { emailMode } from "@/lib/server/email";
import { AdminTitle, Field, Saved } from "@/components/admin/ui";

export const metadata = { title: "Instellingen" };
const g = (fd: FormData, k: string) => { const v = String(fd.get(k) ?? "").trim(); return v || null; };

async function saveCompany(fd: FormData) {
  "use server";
  const user = await requireUser("settings.write");
  await saveSetting("company", { legalName: g(fd, "legalName"), kvk: g(fd, "kvk"), vat: g(fd, "vat"), email: g(fd, "email"), phone: g(fd, "phone"), address: g(fd, "address"), openingHours: g(fd, "openingHours"), linkedin: g(fd, "linkedin"), responseTime: g(fd, "responseTime") ?? "We reageren doorgaans binnen één werkdag." });
  await audit(user.id, "instellingen.bedrijf"); revalidatePath("/", "layout"); redirect("/admin/instellingen?ok=1");
}
async function saveRetention(fd: FormData) {
  "use server";
  const user = await requireUser("settings.write");
  const n = (k: string, min: number, max: number) => Math.min(max, Math.max(min, Number(fd.get(k)) || min));
  await saveSetting("retention", { attachmentDays: n("attachmentDays", 7, 730), requestDays: n("requestDays", 30, 1825), orphanUploadHours: n("orphanUploadHours", 1, 168) });
  await audit(user.id, "instellingen.bewaartermijn"); redirect("/admin/instellingen?ok=1");
}
async function saveNotify(fd: FormData) {
  "use server";
  const user = await requireUser("settings.write");
  const list = String(fd.get("adminRecipients") ?? "").split(/[\s,;]+/).map((x) => x.trim().toLowerCase()).filter((x) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x));
  await saveSetting("notifications", { adminRecipients: list.slice(0, 10), fromName: g(fd, "fromName") ?? "ExcelSheets.nl" });
  await audit(user.id, "instellingen.meldingen"); redirect("/admin/instellingen?ok=1");
}

export default async function Page({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  await requireUser("settings.write");
  const [c, r, n, sp] = await Promise.all([getCompany(), getRetention(), getNotifications(), searchParams]);
  return (
    <>
      <AdminTitle title="Instellingen" sub="Bedrijfsgegevens verschijnen pas op de site zodra ze zijn ingevuld. Vul hier nooit gegevens in die (nog) niet kloppen." />
      <Saved show={!!sp.ok} />
      <div className="grid gap-6 xl:grid-cols-2">
        <form action={saveCompany} className="card space-y-4 p-6 xl:row-span-2">
          <h2 className="font-display text-lg font-bold">Bedrijfsgegevens</h2>
          <Field label="Statutaire / handelsnaam" name="legalName" defaultValue={c.legalName} />
          <div className="grid gap-4 sm:grid-cols-2"><Field label="KvK-nummer" name="kvk" defaultValue={c.kvk} /><Field label="Btw-nummer" name="vat" defaultValue={c.vat} /></div>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="E-mailadres" name="email" type="email" defaultValue={c.email} /><Field label="Telefoon" name="phone" defaultValue={c.phone} /></div>
          <Field label="Adres" name="address" rows={2} defaultValue={c.address} />
          <Field label="Bereikbaarheid" name="openingHours" defaultValue={c.openingHours} hint="bijv. ma–vr 9.00–17.30" />
          <Field label="LinkedIn-pagina" name="linkedin" defaultValue={c.linkedin} />
          <Field label="Reactietijd (tekst)" name="responseTime" defaultValue={c.responseTime} />
          <button className="btn-primary">Opslaan</button>
        </form>
        <form action={saveNotify} className="card space-y-4 p-6">
          <h2 className="font-display text-lg font-bold">Meldingen</h2>
          <p className="text-[14px] text-ink-500">E-mail: {emailMode() === "smtp" ? "SMTP actief" : "demomodus (geen SMTP_HOST ingesteld)"}.</p>
          <Field label="Ontvangers nieuwe aanvragen" name="adminRecipients" rows={2} defaultValue={n.adminRecipients.join(", ")} hint="komma-gescheiden" />
          <Field label="Afzendernaam" name="fromName" defaultValue={n.fromName} />
          <button className="btn-primary">Opslaan</button>
        </form>
        <form action={saveRetention} className="card space-y-4 p-6">
          <h2 className="font-display text-lg font-bold">Bewaartermijnen</h2>
          <p className="text-[14px] text-ink-500">Gelden voor aanvragen die niet tot een opdracht leiden. Gewonnen en afgeronde aanvragen worden niet automatisch verwijderd. Opschonen gebeurt met <code>npm run retention</code> (dagelijks inplannen).</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Bijlagen (dagen)" name="attachmentDays" type="number" defaultValue={r.attachmentDays} />
            <Field label="Aanvragen (dagen)" name="requestDays" type="number" defaultValue={r.requestDays} />
            <Field label="Losse uploads (uren)" name="orphanUploadHours" type="number" defaultValue={r.orphanUploadHours} />
          </div>
          <button className="btn-primary">Opslaan</button>
        </form>
      </div>
    </>
  );
}
