import Link from "next/link";
import type { Prisma, PublishStatus } from "@prisma/client";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { AdminTitle, Badge, Table } from "@/components/admin/ui";
import { formatDateShort } from "@/lib/format";

export const metadata = { title: "Artikelen" };
const PUBLISH_LABEL = { PUBLISHED: "Gepubliceerd", REVIEW: "Ter controle", DRAFT: "Concept" } as const;
const STYLE = { PUBLISHED: "bg-emerald/15 text-forest", REVIEW: "bg-amber/20 text-ink-700", DRAFT: "bg-ink/10 text-ink-500" };

export default async function Page({ searchParams }: { searchParams: Promise<{ jaar?: string; status?: string; q?: string }> }) {
  await requireUser("content.write");
  const sp = await searchParams;
  const where: Prisma.ArticleWhereInput = {};
  if (sp.jaar) where.subjectYear = Number(sp.jaar);
  if (sp.status && sp.status in PUBLISH_LABEL) where.status = sp.status as PublishStatus;
  if (sp.q) where.OR = [{ title: { contains: sp.q } }, { summary: { contains: sp.q } }];
  const rows = await db.article.findMany({ where, orderBy: [{ subjectYear: "asc" }, { number: "asc" }], select: { id: true, number: true, title: true, slug: true, subjectYear: true, status: true, publishedAt: true, factNote: true, body: true } });
  return (
    <>
      <AdminTitle title="Excel door de jaren" sub={`${rows.length} artikelen. Het onderwerpjaar staat los van de echte publicatiedatum.`} actions={<Link href="/admin/artikelen/nieuw" className="btn-dark"><Plus className="h-4 w-4" aria-hidden />Nieuw artikel</Link>} />
      <form className="mb-6 flex flex-wrap gap-2" role="search">
        <input name="q" defaultValue={sp.q} placeholder="Zoek in titel of samenvatting" className="input max-w-xs" aria-label="Zoeken" />
        <select name="jaar" defaultValue={sp.jaar ?? ""} className="input w-36" aria-label="Onderwerpjaar"><option value="">Alle jaren</option>{Array.from({ length: 10 }, (_, i) => 2017 + i).map((y) => <option key={y}>{y}</option>)}</select>
        <select name="status" defaultValue={sp.status ?? ""} className="input w-44" aria-label="Status"><option value="">Elke status</option>{Object.entries(PUBLISH_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
        <button className="btn-dark">Filter</button>
      </form>
      <Table head={["#", "Jaar", "Titel", "Woorden", "Status", "Gepubliceerd", "Let op"]}>
        {rows.map((a) => (
          <tr key={a.id} className="hover:bg-mint-50/50">
            <td className="px-4 py-3 tabular text-ink-400">{a.number}</td>
            <td className="px-4 py-3 tabular">{a.subjectYear}</td>
            <td className="px-4 py-3"><Link href={`/admin/artikelen/${a.id}`} className="font-medium text-excel underline">{a.title}</Link></td>
            <td className="px-4 py-3 tabular">{a.body.split(/\s+/).filter(Boolean).length}</td>
            <td className="px-4 py-3"><Badge className={STYLE[a.status]}>{PUBLISH_LABEL[a.status]}</Badge></td>
            <td className="whitespace-nowrap px-4 py-3">{a.publishedAt ? formatDateShort(a.publishedAt) : "–"}</td>
            <td className="max-w-xs truncate px-4 py-3 text-[12px] text-amber-600" title={a.factNote ?? ""}>{a.factNote ?? ""}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
