import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, MousePointerClick, Check, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { ModelCard } from "@/components/content/ModelCard";
import ModelView from "@/components/models/ModelView";
import { getDemoModel, getDemoModels, getService } from "@/lib/content";
import { demoModels } from "@/content/models";

export function generateStaticParams() { return demoModels.map((m) => ({ slug: m.slug })); }
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = await getDemoModel((await params).slug);
  if (!m) return {};
  const title = `${m.title} in Excel: interactief voorbeeld`;
  return { title, description: `${m.summary} Probeer het model online of download het als Excel-bestand.`, alternates: { canonical: `/voorbeelden/${m.slug}` }, openGraph: { title, description: m.summary, url: `/voorbeelden/${m.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const m = await getDemoModel((await params).slug);
  if (!m) notFound();
  const [all, service] = await Promise.all([getDemoModels(), getService(m.serviceSlug)]);
  const others = all.filter((x) => x.slug !== m.slug && (x.serviceSlug === m.serviceSlug || x.sector === m.sector)).concat(all.filter((x) => x.slug !== m.slug)).filter((x, i, arr) => arr.findIndex((y) => y.slug === x.slug) === i).slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden bg-forest pb-16 pt-8 text-white md:pt-12">
        <div className="pointer-events-none absolute inset-0 bg-grid-light mask-radial" aria-hidden />
        <div className="container relative">
          <Breadcrumbs tone="dark" items={[{ href: "/voorbeelden", label: "Voorbeelden" }, { href: `/voorbeelden/${m.slug}`, label: m.title }]} />
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow-light">{m.sector} · {m.company} (fictief)</p>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{m.title}</h1>
              <p className="mt-5 max-w-3xl text-lg text-mint/80">{m.summary}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/verzoekwijzer?model=${m.slug}`} className="btn-primary">Ik wil ook zo&apos;n model<ArrowRight className="h-4 w-4" aria-hidden /></Link>
              <a href={`/api/voorbeelden/${m.slug}/xlsx`} className="btn-ghost-light" download><Download className="h-4 w-4" aria-hidden />Download .xlsx</a>
            </div>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-mint/70"><MousePointerClick className="h-4 w-4" aria-hidden />{m.interactions.join(" · ")}</p>
          <div className="mt-6 text-ink"><ModelView slug={m.slug} height={640} /></div>
        </div>
      </section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="Over dit model" title="Wat je hier ziet" />
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{m.description}</p>
            <p className="mt-6 flex gap-3 rounded-xl bg-mint-50 p-4 text-[15px]"><Users className="mt-0.5 h-5 w-5 shrink-0 text-excel" aria-hidden /><span><strong>Voor wie:</strong> {m.audience}</span></p>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <p className="font-mono text-[12px] uppercase tracking-wider text-excel">Technieken</p>
              <ul className="mt-4 space-y-2.5">{m.highlights.map((h) => <li key={h} className="flex gap-2.5 text-[15px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-excel" aria-hidden />{h}</li>)}</ul>
            </div>
            <div className="card p-6">
              <p className="font-mono text-[12px] uppercase tracking-wider text-excel">Tabbladen</p>
              <ul className="mt-4 flex flex-wrap gap-2">{m.tabs.map((t) => <li key={t} className="rounded-md border border-ink/10 bg-paper px-2.5 py-1 font-mono text-[12px]">{t}</li>)}</ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-[13px] text-ink-400">{m.company} is een fictief bedrijf en alle cijfers zijn verzonnen. Het model is een demonstratie en geen financieel, fiscaal of juridisch advies. Het gedownloade bestand bevat werkende formules die je zelf kunt volgen.</p>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Meer voorbeelden" title="Bekijk ook" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{others.map((x) => <ModelCard key={x.slug} m={x} />)}</div>
      </Section>
      <section className="container pb-20">
        <CtaBand title="Zo'n model, maar dan met jouw cijfers?" text="We bouwen het rond jouw administratie, afdelingen en manier van werken." cta="Ik wil ook zo'n model" href={`/verzoekwijzer?model=${m.slug}`} secondary={service ? { href: `/diensten/${service.slug}`, label: service.navTitle } : undefined} />
      </section>
    </>
  );
}
