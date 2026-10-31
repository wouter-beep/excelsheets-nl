import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import ModelView from "@/components/models/ModelView";
import { getCases } from "@/lib/content";
import { demoCases } from "@/content/cases";

export function generateStaticParams() { return demoCases.map((c) => ({ slug: c.slug })); }
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = (await getCases()).find((x) => x.slug === slug);
  if (!k) return {};
  return { title: `${k.title}${k.isDemo ? " (demonstratiecase)" : ""} | ExcelSheets.nl`, description: k.problem.slice(0, 158), alternates: { canonical: `/cases/${k.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = (await getCases()).find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <>
      <PageHero crumbs={[{ href: "/cases", label: "Cases" }, { href: `/cases/${c.slug}`, label: c.title }]} eyebrow={`${c.sector}${c.isDemo ? " · demonstratiecase" : ""}`} cell="E2" title={c.title}
        lead={c.isDemo ? <>{c.client} is een fictief bedrijf. Deze case laat zien hoe we een vraagstuk als dit aanpakken; het is geen beschrijving van een bestaande klant.</> : c.client} />
      <Section tone="white" className="pt-4">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="prose-es lg:col-span-2"><h2 className="!mt-0">Het vraagstuk</h2><p>{c.problem}</p><h2>De oplossing</h2><p>{c.solution}</p></div>
          <aside className="card self-start p-6"><p className="font-mono text-[12px] uppercase tracking-wider text-excel">Wat het oplevert</p><ul className="mt-4 space-y-3">{c.benefits.map((b) => <li key={b} className="flex gap-2.5 text-[15px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-excel" aria-hidden />{b}</li>)}</ul>{c.isDemo && <p className="mt-5 text-[12px] text-ink-400">Verwachte voordelen bij een model als dit; geen gemeten resultaten.</p>}</aside>
        </div>
      </Section>
      {c.modelSlug && (
        <Section tone="dark" grid>
          <h2 className="font-display text-3xl font-bold text-white">Het model, interactief</h2>
          <p className="mt-2 text-mint/70">Probeer het zelf: wissel van tabblad en verander de invoer.</p>
          <div className="mt-8 text-ink"><ModelView slug={c.modelSlug} height={560} /></div>
          <Link href={`/voorbeelden/${c.modelSlug}`} className="btn-ghost-light mt-8">Meer over dit model<ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </Section>
      )}
      <section className="container py-20"><CtaBand title="Iets vergelijkbaars nodig?" cta="Ik wil ook zo'n model" href={c.modelSlug ? `/verzoekwijzer?model=${c.modelSlug}` : "/verzoekwijzer"} /></section>
    </>
  );
}
