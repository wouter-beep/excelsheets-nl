import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { AdminTitle } from "@/components/admin/ui";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { deleteArticle } from "../actions";

export const metadata = { title: "Artikel bewerken" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireUser("content.write");
  const { id } = await params;
  const isNew = id === "nieuw";
  const [a, topics, maxNr] = await Promise.all([
    isNew ? null : db.article.findUnique({ where: { id }, include: { topics: { select: { id: true } } } }),
    db.articleTopic.findMany({ orderBy: { name: "asc" } }),
    db.article.aggregate({ _max: { number: true } }),
  ]);
  if (!isNew && !a) notFound();
  const v = a ? {
    ...a, publishedAt: a.publishedAt?.toISOString().slice(0, 10) ?? "", topics: a.topics.map((t) => t.id), factNote: a.factNote ?? "",
    sources: (a.sources as { title: string; url?: string }[]).map((s) => (s.url ? `${s.title} | ${s.url}` : s.title)).join("\n"), serviceLinks: (a.serviceLinks as string[]).join(", "),
  } : null;
  return (
    <>
      <Link href="/admin/artikelen" className="inline-flex items-center gap-1 text-[14px] text-ink-500 hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />Alle artikelen</Link>
      <div className="mt-4"><AdminTitle title={isNew ? "Nieuw artikel" : a!.title} actions={a && <Link href={a.status === "PUBLISHED" ? `/excel-door-de-jaren/${a.subjectYear}/${a.slug}` : `/admin/artikelen/${a.id}/voorbeeld`} target="_blank" className="btn-ghost"><ExternalLink className="h-4 w-4" aria-hidden />Bekijk</Link>} /></div>
      <ArticleForm id={a?.id ?? null} v={v} topics={topics} nextNumber={(maxNr._max.number ?? 0) + 1} />
      {a && <form action={deleteArticle.bind(null, a.id)} className="mt-10 border-t border-ink/10 pt-6"><button className="text-[14px] text-coral underline">Artikel definitief verwijderen</button></form>}
    </>
  );
}
