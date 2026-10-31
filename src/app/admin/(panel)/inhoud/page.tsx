import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { audit, requireUser } from "@/lib/server/auth";
import { AdminTitle, Field } from "@/components/admin/ui";

export const metadata = { title: "Team, FAQ & cases" };
const g = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const httpsOrNull = (s: string) => (/^https:\/\/[^\s]+$/.test(s) || /^\/[\w\-./]+$/.test(s) ? s : null);

async function saveTeam(id: string | null, fd: FormData) {
  "use server";
  const user = await requireUser("content.write");
  if (fd.get("delete") === "1" && id) { await db.teamMember.delete({ where: { id } }); }
  else {
    const data = { name: g(fd, "name"), role: g(fd, "role"), bio: g(fd, "bio"), photoUrl: httpsOrNull(g(fd, "photoUrl")), linkedin: httpsOrNull(g(fd, "linkedin")), sortOrder: Number(g(fd, "sortOrder")) || 0, published: fd.get("published") === "on" };
    if (!data.name) return;
    if (id) await db.teamMember.update({ where: { id }, data }); else await db.teamMember.create({ data });
  }
  await audit(user.id, "team.wijzig"); revalidatePath("/", "layout");
}
async function saveFaq(id: string | null, fd: FormData) {
  "use server";
  const user = await requireUser("content.write");
  if (fd.get("delete") === "1" && id) { await db.faqItem.delete({ where: { id } }); }
  else {
    const data = { question: g(fd, "question"), answer: g(fd, "answer"), category: g(fd, "category") || "algemeen", sortOrder: Number(g(fd, "sortOrder")) || 0, published: fd.get("published") === "on" };
    if (!data.question || !data.answer) return;
    if (id) await db.faqItem.update({ where: { id }, data }); else await db.faqItem.create({ data });
  }
  await audit(user.id, "faq.wijzig"); revalidatePath("/veelgestelde-vragen");
}
async function saveCase(id: string | null, fd: FormData) {
  "use server";
  const user = await requireUser("content.write");
  if (fd.get("delete") === "1" && id) { await db.caseStudy.delete({ where: { id } }); }
  else {
    const data = { title: g(fd, "title"), slug: g(fd, "slug").toLowerCase().replace(/[^a-z0-9-]/g, "-"), client: g(fd, "client"), sector: g(fd, "sector"), problem: g(fd, "problem"), solution: g(fd, "solution"),
      benefits: g(fd, "benefits").split("\n").map((x) => x.trim()).filter(Boolean), modelSlug: g(fd, "modelSlug") || null, isDemo: fd.get("isDemo") === "on", published: fd.get("published") === "on", sortOrder: Number(g(fd, "sortOrder")) || 0 };
    if (!data.title || !data.slug) return;
    if (id) await db.caseStudy.update({ where: { id }, data }); else await db.caseStudy.create({ data });
  }
  await audit(user.id, "case.wijzig"); revalidatePath("/cases", "layout");
}

function Pub({ on }: { on: boolean }) { return <label className="flex items-center gap-2 text-[14px] font-semibold"><input type="checkbox" name="published" defaultChecked={on} className="h-4 w-4 accent-[#147D52]" />Online</label>; }
function Buttons({ existing }: { existing: boolean }) {
  return <div className="flex items-center gap-4"><button className="btn-primary px-4 py-2 text-[14px]">{existing ? "Opslaan" : "Toevoegen"}</button>{existing && <button name="delete" value="1" className="text-[13px] text-coral underline">Verwijderen</button>}</div>;
}

export default async function Page() {
  await requireUser("content.write");
  const [team, faq, cases] = await Promise.all([db.teamMember.findMany({ orderBy: { sortOrder: "asc" } }), db.faqItem.findMany({ orderBy: { sortOrder: "asc" } }), db.caseStudy.findMany({ orderBy: { sortOrder: "asc" } })]);
  return (
    <>
      <AdminTitle title="Team, FAQ & cases" />
      <section className="mb-12">
        <h2 className="font-display text-xl font-bold">Team</h2>
        <p className="mt-1 max-w-3xl text-[14px] text-ink-500">Voeg hier de echte mensen achter ExcelSheets.nl toe. Zodra er minstens één persoon online staat, verschijnt de teamsectie op de homepage en de pagina Over ons. Gebruik alleen echte namen en foto&apos;s met toestemming.</p>
        <div className="mt-4 space-y-3">
          {[...team, null].map((t) => (
            <details key={t?.id ?? "nieuw"} className="card" open={!t && team.length === 0}>
              <summary className="cursor-pointer px-5 py-4 font-semibold">{t ? `${t.name} · ${t.role}${t.published ? "" : " (verborgen)"}` : "+ Teamlid toevoegen"}</summary>
              <form action={saveTeam.bind(null, t?.id ?? null)} className="grid gap-4 border-t border-ink/10 p-5 md:grid-cols-2">
                <Field label="Naam" name="name" defaultValue={t?.name} required /><Field label="Rol" name="role" defaultValue={t?.role} hint="bijv. Financieel modelleur" />
                <div className="md:col-span-2"><Field label="Korte introductie" name="bio" rows={3} defaultValue={t?.bio} hint="achtergrond, passie voor Excel" /></div>
                <Field label="Foto-URL" name="photoUrl" defaultValue={t?.photoUrl} hint="https://… of /team/naam.jpg" /><Field label="LinkedIn" name="linkedin" defaultValue={t?.linkedin} />
                <Field label="Volgorde" name="sortOrder" type="number" defaultValue={t?.sortOrder ?? 0} /><div className="self-end pb-3"><Pub on={t?.published ?? false} /></div>
                <div className="md:col-span-2"><Buttons existing={!!t} /></div>
              </form>
            </details>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="font-display text-xl font-bold">Veelgestelde vragen</h2>
        <div className="mt-4 space-y-3">
          {[...faq, null].map((f) => (
            <details key={f?.id ?? "nieuw"} className="card">
              <summary className="cursor-pointer px-5 py-4 font-semibold">{f ? `${f.question}${f.published ? "" : " (verborgen)"}` : "+ Vraag toevoegen"}</summary>
              <form action={saveFaq.bind(null, f?.id ?? null)} className="grid gap-4 border-t border-ink/10 p-5 md:grid-cols-2">
                <div className="md:col-span-2"><Field label="Vraag" name="question" defaultValue={f?.question} required /></div>
                <div className="md:col-span-2"><Field label="Antwoord" name="answer" rows={5} defaultValue={f?.answer} required /></div>
                <Field label="Categorie" name="category" defaultValue={f?.category ?? "algemeen"} /><Field label="Volgorde" name="sortOrder" type="number" defaultValue={f?.sortOrder ?? 0} />
                <Pub on={f?.published ?? true} /><div className="md:col-span-2"><Buttons existing={!!f} /></div>
              </form>
            </details>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display text-xl font-bold">Cases</h2>
        <p className="mt-1 max-w-3xl text-[14px] text-ink-500">Demonstratiecases zijn op de site duidelijk gemarkeerd als fictief. Voeg echte referenties alleen toe met schriftelijke toestemming van de klant en zet dan &ldquo;Demonstratiecase&rdquo; uit.</p>
        <div className="mt-4 space-y-3">
          {[...cases, null].map((c) => (
            <details key={c?.id ?? "nieuw"} className="card">
              <summary className="cursor-pointer px-5 py-4 font-semibold">{c ? `${c.title}${c.isDemo ? " · demo" : " · echte referentie"}${c.published ? "" : " (verborgen)"}` : "+ Case toevoegen"}</summary>
              <form action={saveCase.bind(null, c?.id ?? null)} className="grid gap-4 border-t border-ink/10 p-5 md:grid-cols-2">
                <Field label="Titel" name="title" defaultValue={c?.title} required /><Field label="URL (slug)" name="slug" defaultValue={c?.slug} required />
                <Field label="Klant" name="client" defaultValue={c?.client} /><Field label="Sector" name="sector" defaultValue={c?.sector} />
                <div className="md:col-span-2"><Field label="Probleem" name="problem" rows={3} defaultValue={c?.problem} /></div>
                <div className="md:col-span-2"><Field label="Oplossing" name="solution" rows={4} defaultValue={c?.solution} /></div>
                <Field label="Voordelen" name="benefits" rows={4} defaultValue={(c?.benefits as string[] | undefined)?.join("\n")} hint="één per regel" />
                <div className="space-y-4"><Field label="Gekoppeld voorbeeldmodel" name="modelSlug" defaultValue={c?.modelSlug} /><Field label="Volgorde" name="sortOrder" type="number" defaultValue={c?.sortOrder ?? 0} /></div>
                <label className="flex items-center gap-2 text-[14px] font-semibold"><input type="checkbox" name="isDemo" defaultChecked={c?.isDemo ?? true} className="h-4 w-4 accent-[#147D52]" />Demonstratiecase (fictief)</label>
                <Pub on={c?.published ?? true} /><div className="md:col-span-2"><Buttons existing={!!c} /></div>
              </form>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
