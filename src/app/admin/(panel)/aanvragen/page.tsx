import Link from "next/link";
import { Download, Paperclip } from "lucide-react";
import { db } from "@/lib/db";
import { can, requireUser } from "@/lib/server/auth";
import { STATUS_LABELS, requestWhere } from "@/lib/server/requests";
import { AdminTitle, Badge, Pager, STATUS_STYLE, Table } from "@/components/admin/ui";
import { formatDateShort } from "@/lib/format";
import { GOALS, labelOf } from "@/lib/intake";

export const metadata = { title: "Aanvragen" };
const PER = 25;


export default async function Page({ searchParams }: { searchParams: Promise<{ status?: string; q?: string; complexiteit?: string; p?: string }> }) {
  const user = await requireUser("requests.read");
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.p) || 1);
  const where = requestWhere(sp);
  const [total, rows, counts] = await Promise.all([
    db.request.count({ where }),
    db.request.findMany({ where, orderBy: [{ createdAt: "desc" }], skip: (page - 1) * PER, take: PER, include: { contact: { select: { name: true, company: true } }, _count: { select: { attachments: true } } } }),
    db.request.groupBy({ by: ["status"], _count: true }),
  ]);
  const qs = (o: Record<string, string | undefined>) => "?" + new URLSearchParams(Object.entries({ ...sp, ...o }).filter(([, v]) => v) as [string, string][]).toString();
  return (
    <>
      <AdminTitle title="Aanvragen" sub={`${total} resultaten`} actions={can(user.role, "requests.export") && <a href={`/api/admin/export${qs({ p: undefined })}`} className="btn-ghost"><Download className="h-4 w-4" aria-hidden />Exporteer CSV</a>} />
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href={qs({ status: undefined, p: undefined })} className={`chip ${!sp.status ? "border-forest bg-forest text-white" : ""}`}>Alle</Link>
        {Object.entries(STATUS_LABELS).map(([k, l]) => (
          <Link key={k} href={qs({ status: k, p: undefined })} className={`chip ${sp.status === k ? "border-forest bg-forest text-white" : ""}`}>{l} <span className="opacity-60">{counts.find((c) => c.status === k)?._count ?? 0}</span></Link>
        ))}
      </div>
      <form className="mb-6 flex flex-col gap-2 sm:flex-row" role="search">
        {sp.status && <input type="hidden" name="status" value={sp.status} />}
        <label htmlFor="q" className="sr-only">Zoeken</label>
        <input id="q" name="q" defaultValue={sp.q} placeholder="Zoek op nummer, naam, bedrijf, e-mail of tekst" className="input sm:max-w-md" />
        <select name="complexiteit" defaultValue={sp.complexiteit ?? ""} className="input sm:w-48" aria-label="Complexiteit">
          <option value="">Elke complexiteit</option><option>Laag</option><option>Gemiddeld</option><option>Hoog</option>
        </select>
        <button className="btn-dark">Zoeken</button>
      </form>
      <Table head={["Nummer", "Datum", "Contact", "Doel", "Type", "Compl.", "Prio", "Status"]}>
        {rows.map((r) => (
          <tr key={r.id} className="hover:bg-mint-50/50">
            <td className="whitespace-nowrap px-4 py-3 font-mono"><Link className="text-excel underline" href={`/admin/aanvragen/${r.number}`}>{r.number}</Link>{r._count.attachments > 0 && <Paperclip className="ml-1 inline h-3.5 w-3.5 text-ink-400" aria-label="Met bijlagen" />}</td>
            <td className="whitespace-nowrap px-4 py-3">{formatDateShort(r.createdAt)}</td>
            <td className="px-4 py-3">{r.contact.name}<span className="block text-[12px] text-ink-400">{r.contact.company}</span></td>
            <td className="px-4 py-3">{labelOf(GOALS, r.goal)}</td>
            <td className="px-4 py-3">{r.typeLabel}</td>
            <td className="px-4 py-3">{r.complexity}</td>
            <td className="px-4 py-3 tabular">{"●".repeat(r.priority) || "–"}</td>
            <td className="px-4 py-3"><Badge className={STATUS_STYLE[r.status]}>{STATUS_LABELS[r.status]}</Badge></td>
          </tr>
        ))}
        {rows.length === 0 && <tr><td colSpan={8} className="px-4 py-10 text-center text-ink-400">Geen aanvragen gevonden.</td></tr>}
      </Table>
      <Pager page={page} pages={Math.ceil(total / PER)} href={(p) => qs({ p: String(p) })} />
    </>
  );
}
