import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { STATUS_LABELS } from "@/lib/server/requests";
import { AdminTitle, Badge, Pager, STATUS_STYLE, Table } from "@/components/admin/ui";
import { formatDateShort } from "@/lib/format";

export const metadata = { title: "Contacten" };
const PER = 30;

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; p?: string }> }) {
  await requireUser("requests.read");
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.p) || 1);
  const q = sp.q?.trim();
  const where: Prisma.ContactWhereInput = q ? { OR: [{ name: { contains: q } }, { company: { contains: q } }, { email: { contains: q } }, { phone: { contains: q } }] } : {};
  const [total, rows] = await Promise.all([
    db.contact.count({ where }),
    db.contact.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER, take: PER, include: { requests: { select: { number: true, status: true }, orderBy: { createdAt: "desc" } } } }),
  ]);
  return (
    <>
      <AdminTitle title="Contacten" sub={`${total} contactpersonen. Contacten worden samen met hun aanvragen opgeschoond volgens het bewaarbeleid.`} />
      <form role="search" className="mb-6 flex gap-2"><label htmlFor="q" className="sr-only">Zoeken</label><input id="q" name="q" defaultValue={q} placeholder="Zoek op naam, bedrijf, e-mail of telefoon" className="input max-w-md" /><button className="btn-dark">Zoeken</button></form>
      <Table head={["Naam", "Bedrijf", "E-mail", "Telefoon", "Sinds", "Aanvragen"]}>
        {rows.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-3 font-medium">{c.name}</td>
            <td className="px-4 py-3">{c.company}</td>
            <td className="px-4 py-3"><a className="text-excel underline" href={`mailto:${c.email}`}>{c.email}</a></td>
            <td className="whitespace-nowrap px-4 py-3">{c.phone ?? "–"}</td>
            <td className="whitespace-nowrap px-4 py-3">{formatDateShort(c.createdAt)}</td>
            <td className="px-4 py-3"><div className="flex flex-wrap gap-1.5">{c.requests.map((r) => <Link key={r.number} href={`/admin/aanvragen/${r.number}`}><Badge className={STATUS_STYLE[r.status]}>{r.number} · {STATUS_LABELS[r.status]}</Badge></Link>)}</div></td>
          </tr>
        ))}
      </Table>
      <Pager page={page} pages={Math.ceil(total / PER)} href={(p) => `?${new URLSearchParams({ ...(q ? { q } : {}), p: String(p) })}`} />
    </>
  );
}
