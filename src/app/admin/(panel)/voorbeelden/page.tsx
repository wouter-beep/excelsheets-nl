import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { audit, requireUser } from "@/lib/server/auth";
import { AdminTitle, Empty, Field } from "@/components/admin/ui";

export const metadata = { title: "Voorbeelden" };

async function save(id: string, fd: FormData) {
  "use server";
  const user = await requireUser("content.write");
  const g = (k: string) => String(fd.get(k) ?? "").trim();
  const m = await db.demoModel.update({ where: { id }, data: {
    title: g("title"), sector: g("sector"), summary: g("summary"), description: g("description"), audience: g("audience"),
    highlights: g("highlights").split("\n").map((x) => x.trim()).filter(Boolean), published: fd.get("published") === "on", sortOrder: Number(g("sortOrder")) || 0,
  } });
  await audit(user.id, "voorbeeld.wijzig", m.slug);
  revalidatePath("/voorbeelden", "layout");
}

export default async function Page() {
  await requireUser("content.write");
  const rows = await db.demoModel.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <AdminTitle title="Voorbeeldmodellen" sub="Teksten bij de twaalf interactieve modellen. De rekenlogica en fictieve cijfers staan in de code (src/models) zodat formules en download altijd kloppen." />
      {rows.length === 0 && <Empty>Nog geen voorbeelden in de database. Voer <code>npm run db:seed</code> uit.</Empty>}
      <div className="space-y-3">
        {rows.map((m) => (
          <details key={m.id} className="card group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4"><span><span className="font-display font-bold">{m.title}</span> <span className="text-[13px] text-ink-400">· {m.company} (fictief)</span></span><span className="text-[13px] text-ink-400">{m.published ? "online" : "verborgen"}</span></summary>
            <form action={save.bind(null, m.id)} className="grid gap-4 border-t border-ink/10 p-5 md:grid-cols-2">
              <Field label="Titel" name="title" defaultValue={m.title} /><Field label="Sector" name="sector" defaultValue={m.sector} />
              <div className="md:col-span-2"><Field label="Korte omschrijving" name="summary" rows={2} defaultValue={m.summary} /></div>
              <div className="md:col-span-2"><Field label="Uitleg" name="description" rows={4} defaultValue={m.description} /></div>
              <Field label="Voor wie" name="audience" rows={2} defaultValue={m.audience} />
              <Field label="Technieken" name="highlights" rows={4} defaultValue={(m.highlights as string[]).join("\n")} hint="één per regel" />
              <Field label="Volgorde" name="sortOrder" type="number" defaultValue={m.sortOrder} />
              <label className="flex items-center gap-2 self-end pb-3 text-[14px] font-semibold"><input type="checkbox" name="published" defaultChecked={m.published} className="h-4 w-4 accent-[#147D52]" />Online</label>
              <div className="md:col-span-2"><button className="btn-primary">Opslaan</button></div>
            </form>
          </details>
        ))}
      </div>
    </>
  );
}
