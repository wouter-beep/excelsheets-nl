import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { AdminTitle, Badge, Empty, Table } from "@/components/admin/ui";
import { formatDateShort } from "@/lib/format";

export const metadata = { title: "Diensten" };

export default async function Page() {
  await requireUser("content.write");
  const rows = await db.service.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <AdminTitle title="Diensten" sub="De tien dienstpagina's. Wijzigingen zijn binnen enkele minuten zichtbaar op de site." />
      {rows.length === 0 ? <Empty>Nog geen diensten in de database. Voer <code>npm run db:seed</code> uit; tot die tijd toont de site de standaardteksten.</Empty> : (
        <Table head={["Volgorde", "Dienst", "URL", "Status", "Gewijzigd"]}>
          {rows.map((s) => (
            <tr key={s.id}><td className="px-4 py-3 tabular">{s.sortOrder}</td><td className="px-4 py-3"><Link className="font-medium text-excel underline" href={`/admin/diensten/${s.slug}`}>{s.title}</Link></td><td className="px-4 py-3 font-mono text-[12px]">/diensten/{s.slug}</td><td className="px-4 py-3"><Badge className={s.published ? "bg-emerald/15 text-forest" : "bg-ink/10"}>{s.published ? "Online" : "Verborgen"}</Badge></td><td className="px-4 py-3">{formatDateShort(s.updatedAt)}</td></tr>
          ))}
        </Table>
      )}
    </>
  );
}
