import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { ArticleBody } from "@/components/content/ArticleBody";
import type { ArticleView } from "@/lib/content";
import type { ArticleContent } from "@/content/articles";

export const metadata = { title: "Voorbeeld artikel", robots: { index: false, follow: false } };

/** Voorbeeldweergave voor beheerders, ook voor artikelen die nog niet zijn gepubliceerd. */
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireUser("content.write");
  const { id } = await params;
  const r = await db.article.findUnique({ where: { id }, include: { topics: { select: { slug: true } } } });
  if (!r) notFound();
  const a: ArticleView = {
    id: r.id, number: r.number, slug: r.slug, title: r.title, subjectYear: r.subjectYear, summary: r.summary, body: r.body, practice: r.practice,
    sources: r.sources as ArticleContent["sources"], serviceLinks: r.serviceLinks as string[], topics: r.topics.map((t) => t.slug),
    visual: r.visual as ArticleContent["visual"], seoTitle: r.seoTitle ?? undefined, metaDescription: r.metaDescription ?? undefined,
    factNote: r.factNote ?? undefined, status: r.status, publishedAt: r.publishedAt,
  };
  return (
    <>
      <Link href={`/admin/artikelen/${r.id}`} className="inline-flex items-center gap-1 text-[14px] text-ink-500 hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />Terug naar bewerken</Link>
      <div role="status" className="mt-4 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-[14px] text-amber-900">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <div><p className="font-semibold">Voorbeeld. Status: {r.status}{r.status !== "PUBLISHED" ? " (niet zichtbaar voor bezoekers)" : ""}</p>{r.factNote && <p className="mt-1">Redactienotitie: {r.factNote}</p>}</div>
      </div>
      <div className="-mx-4 mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-paper md:-mx-0"><ArticleBody a={a} related={[]} /></div>
    </>
  );
}
