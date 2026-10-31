import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, Lightbulb } from "lucide-react";
import { Markdown, headings, readingMinutes } from "@/lib/markdown";
import { ArticleVisual } from "./ArticleVisual";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/ui/CtaBand";
import { SERVICE_LINK_LABEL, TOPICS } from "@/content/articles/types";
import type { ArticleView } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function ArticleBody({ a, related }: { a: ArticleView; related: ArticleView[] }) {
  const toc = headings(a.body);
  const topics = TOPICS.filter((t) => a.topics.includes(t.slug));
  return (
    <article>
      <header className="relative overflow-hidden bg-forest pb-14 pt-8 text-white md:pt-12">
        <div className="pointer-events-none absolute inset-0 bg-grid-light mask-radial" aria-hidden />
        <div className="container relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <Breadcrumbs tone="dark" items={[{ href: "/excel-door-de-jaren", label: "Excel door de jaren" }, { href: `/excel-door-de-jaren/${a.subjectYear}`, label: String(a.subjectYear) }, { href: `/excel-door-de-jaren/${a.subjectYear}/${a.slug}`, label: a.title }]} />
            <p className="eyebrow-light">Onderwerpjaar {a.subjectYear}{topics[0] && <> · {topics[0].name}</>}</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">{a.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-mint/80">{a.summary}</p>
            <p className="mt-6 text-[13px] text-mint/60">{a.publishedAt ? <>Terugblik, gepubliceerd op {formatDate(a.publishedAt)}</> : <>Terugblik op {a.subjectYear}</>} · {readingMinutes(a.body + a.practice)} min lezen</p>
          </div>
          <ArticleVisual kind={a.visual} year={a.subjectYear} className="h-auto w-full rounded-2xl shadow-lift" />
        </div>
      </header>
      <div className="container grid gap-12 py-14 lg:grid-cols-[220px_minmax(0,1fr)_260px]">
        <nav aria-label="In dit artikel" className="hidden lg:block">
          {toc.length > 0 && <div className="sticky top-28"><p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">In dit artikel</p><ul className="mt-3 space-y-2 border-l border-ink/10 text-[14px]">{toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent pl-3 text-ink-500 hover:border-emerald hover:text-ink">{h.text}</a></li>)}</ul></div>}
        </nav>
        <div className="min-w-0">
          <p className="mb-8 rounded-xl border border-ink/10 bg-paper-200 px-4 py-3 text-[13.5px] text-ink-500">Dit artikel kijkt terug op ontwikkelingen in {a.subjectYear}. Het onderwerpjaar staat los van de publicatiedatum. Beschikbaarheid van functies verschilt per Excel-versie, abonnement en platform.</p>
          <div className="prose-es"><Markdown source={a.body} /></div>
          <section className="mt-12 rounded-2xl border border-emerald/40 bg-mint-50 p-6 md:p-8">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold"><Lightbulb className="h-5 w-5 text-excel" aria-hidden />Wat betekent dit voor jouw bedrijf?</h2>
            <div className="prose-es mt-3 [&_p]:my-2"><Markdown source={a.practice} /></div>
          </section>
          {a.sources.length > 0 && (
            <section className="mt-10">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold"><BookOpen className="h-5 w-5 text-excel" aria-hidden />Bronnen</h2>
              <ul className="mt-3 space-y-1.5 text-[14px]">{a.sources.map((s) => <li key={s.title}>{s.url ? <a href={s.url} rel="noopener nofollow" target="_blank" className="inline-flex items-center gap-1 text-excel underline">{s.title}<ExternalLink className="h-3.5 w-3.5" aria-hidden /></a> : s.title}</li>)}</ul>
            </section>
          )}
        </div>
        <aside className="space-y-6">
          {a.serviceLinks.length > 0 && (
            <div className="card p-5"><p className="font-mono text-[11px] uppercase tracking-wider text-excel">Hierbij helpen we</p><ul className="mt-3 space-y-2">{a.serviceLinks.map((s) => <li key={s}><Link href={`/diensten/${s}`} className="group flex items-start gap-2 text-[14.5px] font-medium hover:text-excel"><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-excel transition group-hover:translate-x-0.5" aria-hidden />{SERVICE_LINK_LABEL[s] ?? s}</Link></li>)}</ul></div>
          )}
          {topics.length > 0 && <div><p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Thema&apos;s</p><div className="mt-2 flex flex-wrap gap-2">{topics.map((t) => <Link key={t.slug} href={`/excel-door-de-jaren/thema/${t.slug}`} className="chip hover:border-emerald">{t.name}</Link>)}</div></div>}
        </aside>
      </div>
      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-white py-14">
          <div className="container"><h2 className="font-display text-2xl font-bold">Lees ook</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((r) => <RelatedCard key={r.slug} a={r} />)}</div></div>
        </section>
      )}
      <div className="container py-16"><CtaBand title="Wil je dit toepassen in je eigen bestanden?" text="We helpen je moderne Excel-mogelijkheden in te zetten waar ze echt iets opleveren." cta="Bespreek je vraagstuk" /></div>
    </article>
  );
}

function RelatedCard({ a }: { a: ArticleView }) {
  return <Link href={`/excel-door-de-jaren/${a.subjectYear}/${a.slug}`} className="card group block p-5 transition hover:shadow-lift"><p className="font-mono text-[11px] text-excel">{a.subjectYear}</p><p className="mt-1 font-display font-bold group-hover:text-excel">{a.title}</p></Link>;
}
