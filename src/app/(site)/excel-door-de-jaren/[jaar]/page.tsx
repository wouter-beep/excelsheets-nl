import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ArticleVisual } from "@/components/content/ArticleVisual";
import { getArticles } from "@/lib/content";
import { timeline } from "@/content/timeline";

export function generateStaticParams() { return timeline.map((t) => ({ jaar: String(t.year) })); }
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ jaar: string }> }): Promise<Metadata> {
  const { jaar } = await params;
  const t = timeline.find((x) => String(x.year) === jaar);
  if (!t) return {};
  return { title: `Excel in ${t.year}: ${t.theme.toLowerCase()} | Excel door de jaren`, description: `${t.innovation}. ${t.highlights.join(". ")}. Een terugblik op Excel in ${t.year} en wat het betekent voor bedrijven.`.slice(0, 160), alternates: { canonical: `/excel-door-de-jaren/${t.year}` } };
}

export default async function Page({ params }: { params: Promise<{ jaar: string }> }) {
  const { jaar } = await params;
  const t = timeline.find((x) => String(x.year) === jaar);
  if (!t) notFound();
  const all = (await getArticles({ includeUnpublished: true })).filter((a) => a.subjectYear === t.year);
  const list = all.filter((a) => a.status === "PUBLISHED");
  const pending = all.filter((a) => a.status === "REVIEW");
  const prev = timeline.find((x) => x.year === t.year - 1), next = timeline.find((x) => x.year === t.year + 1);
  return (
    <>
      <PageHero crumbs={[{ href: "/excel-door-de-jaren", label: "Excel door de jaren" }, { href: `/excel-door-de-jaren/${t.year}`, label: String(t.year) }]} eyebrow={`Excel in ${t.year}`} title={t.theme} lead={t.innovationText} />
      <Section tone="white" className="pt-0 md:pt-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            {list.length > 0 && (<>
              <h2 className="font-display text-2xl font-bold">{list.length} {list.length === 1 ? "artikel" : "artikelen"} over {t.year}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
            </>)}
            {pending.length > 0 && (
              <div className={list.length > 0 ? "mt-12" : ""}>
                <h2 className="font-display text-2xl font-bold">In redactie</h2>
                <p className="mt-2 max-w-2xl text-[15px] text-ink-500">Deze artikelen gaan over recente ontwikkelingen. We publiceren ze pas als we status, platform en licentie hebben gecontroleerd bij Microsoft, zodat je niet op verouderde of te vroege informatie stuurt.</p>
                <ul className="mt-5 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-paper">
                  {pending.map((a) => <li key={a.slug} className="flex items-start gap-3 px-5 py-3.5 text-[15px]"><span className="mt-0.5 font-mono text-[12px] text-ink-400">#{a.number}</span><span className="font-medium text-ink-700">{a.title}</span></li>)}
                </ul>
              </div>
            )}
            {all.length === 0 && <p className="text-ink-500">De artikelen over dit jaar worden nog geschreven.</p>}
          </div>
          <aside className="card overflow-hidden lg:sticky lg:top-28">
            <ArticleVisual kind={t.visual} year={t.year} className="h-auto w-full" />
            <div className="p-5"><p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-excel"><Sparkles className="h-4 w-4" aria-hidden />Opvallende innovatie</p><p className="mt-2 font-display text-lg font-bold">{t.innovation}</p><ul className="mt-3 space-y-1.5 text-[14px] text-ink-500">{t.highlights.map((h) => <li key={h}>· {h}</li>)}</ul></div>
          </aside>
        </div>
        <nav aria-label="Andere jaren" className="mt-14 flex justify-between border-t border-ink/10 pt-6 text-[15px] font-semibold">
          {prev ? <Link href={`/excel-door-de-jaren/${prev.year}`} className="inline-flex items-center gap-1 text-excel"><ArrowLeft className="h-4 w-4" aria-hidden />{prev.year}</Link> : <span />}
          <Link href="/excel-door-de-jaren/tijdlijn" className="text-ink-500 hover:text-ink">Tijdlijn</Link>
          {next ? <Link href={`/excel-door-de-jaren/${next.year}`} className="inline-flex items-center gap-1 text-excel">{next.year}<ArrowRight className="h-4 w-4" aria-hidden /></Link> : <span />}
        </nav>
      </Section>
    </>
  );
}
