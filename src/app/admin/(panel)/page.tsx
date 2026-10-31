import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { STATUS_LABELS } from "@/lib/server/requests";
import { AdminTitle, Badge, STATUS_STYLE, Table } from "@/components/admin/ui";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Overzicht" };

export default async function Page({ searchParams }: { searchParams: Promise<{ "geen-toegang"?: string }> }) {
  const user = await requireUser();
  const sp = await searchParams;
  const since = new Date(Date.now() - 30 * 864e5);
  const [byStatus, last30, recent, articles] = await Promise.all([
    db.request.groupBy({ by: ["status"], _count: true }),
    db.request.count({ where: { createdAt: { gte: since } } }),
    db.request.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { contact: { select: { name: true, company: true } } } }),
    db.article.groupBy({ by: ["status"], _count: true }),
  ]);
  const count = (s: string) => byStatus.find((x) => x.status === s)?._count ?? 0;
  const won = count("GEWONNEN"), lost = count("AFGEWEZEN");
  return (
    <>
      {sp["geen-toegang"] && <p className="mb-6 rounded-xl bg-amber/15 px-4 py-3 text-[14px]">Je hebt geen rechten voor die pagina.</p>}
      <AdminTitle title={`Welkom, ${user.name.split(" ")[0]}`} sub="Een kort overzicht van aanvragen en inhoud." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Nieuwe aanvragen", count("NIEUW"), "/admin/aanvragen?status=NIEUW"],
          ["In behandeling", count("IN_BEHANDELING") + count("INFO_NODIG") + count("OFFERTE"), "/admin/aanvragen"],
          ["Aanvragen (30 dagen)", last30, "/admin/aanvragen"],
          ["Gewonnen / beslist", won + lost ? `${won} / ${won + lost}` : "–", "/admin/aanvragen?status=GEWONNEN"],
        ].map(([l, v, h]) => (
          <Link key={l as string} href={h as string} className="card p-5 transition hover:shadow-lift">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">{l}</p>
            <p className="mt-2 font-display text-3xl font-bold tabular">{v}</p>
          </Link>
        ))}
      </div>
      <h2 className="mb-3 mt-10 font-display text-xl font-bold">Laatste aanvragen</h2>
      <Table head={["Nummer", "Datum", "Contact", "Type", "Complexiteit", "Status"]}>
        {recent.map((r) => (
          <tr key={r.id} className="hover:bg-mint-50/50">
            <td className="px-4 py-3 font-mono"><Link className="text-excel underline" href={`/admin/aanvragen/${r.number}`}>{r.number}</Link></td>
            <td className="whitespace-nowrap px-4 py-3">{formatDate(r.createdAt)}</td>
            <td className="px-4 py-3">{r.contact.name}<span className="block text-[12px] text-ink-400">{r.contact.company}</span></td>
            <td className="px-4 py-3">{r.typeLabel}</td>
            <td className="px-4 py-3">{r.complexity}</td>
            <td className="px-4 py-3"><Badge className={STATUS_STYLE[r.status]}>{STATUS_LABELS[r.status]}</Badge></td>
          </tr>
        ))}
        {recent.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-ink-400">Nog geen aanvragen.</td></tr>}
      </Table>
      <h2 className="mb-3 mt-10 font-display text-xl font-bold">Artikelen</h2>
      <p className="text-ink-500">{["PUBLISHED", "REVIEW", "DRAFT"].map((s) => `${articles.find((a) => a.status === s)?._count ?? 0} ${s === "PUBLISHED" ? "gepubliceerd" : s === "REVIEW" ? "ter controle" : "concept"}`).join(" · ")} · <Link href="/admin/artikelen" className="text-excel underline">Naar artikelen</Link></p>
    </>
  );
}
