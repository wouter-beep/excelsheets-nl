import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/content/ArticleCard";
import { getArticles } from "@/lib/content";
import { TOPICS } from "@/content/articles/types";
import { timeline } from "@/content/timeline";

export const metadata: Metadata = {
  title: "Excel door de jaren: tien jaar Excel-ontwikkeling voor bedrijven",
  description: "Van vertrouwde spreadsheets tot slimme automatisering en AI. Ontdek hoe Excel zich van 2017 tot 2026 heeft ontwikkeld, en wat dat voor bedrijven betekent.",
  alternates: { canonical: "/excel-door-de-jaren" },
};
export const revalidate = 300;

export default async function Page() {
  const articles = await getArticles();
  const years = timeline.map((t) => t.year);
  return (
    <>
      <section className="relative overflow-hidden bg-forest pb-16 pt-8 text-white md:pt-12">
        <div className="pointer-events-none absolute inset-0 bg-grid-light mask-radial" aria-hidden />
        <div className="container relative">
          <Breadcrumbs tone="dark" items={[{ href: "/excel-door-de-jaren", label: "Excel door de jaren" }]} />
          <p className="eyebrow-light">Kennisarchief · 2017–2026</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold leading-[1.03] tracking-tight md:text-6xl">Excel door de jaren</h1>
          <p className="mt-5 max-w-3xl text-lg text-mint/80 md:text-xl">Van vertrouwde spreadsheets tot slimme automatisering en AI. Ontdek hoe Excel zich heeft ontwikkeld, en wat dat voor bedrijven betekent.</p>
          <p className="mt-4 max-w-3xl text-[14px] text-mint/55">Dit archief is een terugblik: de artikelen zijn recent geschreven over ontwikkelingen in het genoemde jaar. Geen cursussen, maar analyses van wat er veranderde en waarom dat ertoe doet.</p>
          <nav aria-label="Jaren" className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2">
            {years.map((y) => <a key={y} href={`#jaar-${y}`} className="shrink-0 rounded-full border border-white/20 px-4 py-2 font-mono text-[14px] text-mint hover:border-emerald hover:text-white">{y}</a>)}
            <Link href="/excel-door-de-jaren/tijdlijn" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald px-4 py-2 text-[14px] font-semibold text-forest-900">Bekijk de tijdlijn<ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </nav>
        </div>
      </section>
      <Section tone="white" className="!py-10">
        <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Thema&apos;s</p>
        <div className="mt-3 flex flex-wrap gap-2">{TOPICS.map((t) => <Link key={t.slug} href={`/excel-door-de-jaren/thema/${t.slug}`} className="chip px-3.5 py-1.5 text-[13px] hover:border-emerald">{t.name}</Link>)}</div>
      </Section>
      {timeline.map((t) => {
        const list = articles.filter((a) => a.subjectYear === t.year);
        if (list.length === 0) return null;
        return (
          <section key={t.year} id={`jaar-${t.year}`} className="scroll-mt-24 border-t border-ink/10 bg-paper py-14">
            <div className="container">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div><p className="font-mono text-5xl font-bold text-emerald/50">{t.year}</p><h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">{t.theme}</h2></div>
                <Link href={`/excel-door-de-jaren/${t.year}`} className="inline-flex items-center gap-1 text-[14px] font-semibold text-excel">Alle artikelen uit {t.year}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{list.slice(0, 4).map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
              {list.length > 4 && <ul className="mt-5 grid gap-x-8 gap-y-2 text-[14.5px] md:grid-cols-2">{list.slice(4).map((a) => <li key={a.slug}><Link href={`/excel-door-de-jaren/${a.subjectYear}/${a.slug}`} className="text-ink-700 underline decoration-ink/20 underline-offset-4 hover:text-excel hover:decoration-emerald">{a.title}</Link></li>)}</ul>}
            </div>
          </section>
        );
      })}
    </>
  );
}
