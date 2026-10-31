import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MousePointerClick } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/content/Faq";
import { ModelCard } from "@/components/content/ModelCard";
import ModelView from "@/components/models/ModelView";
import { getDemoModels, getService, getServices } from "@/lib/content";
import { services as staticServices } from "@/content/services";
import { siteConfig } from "@/config/site";

const TOPIC: Record<string, string> = {
  "excel-op-maat-laten-maken": "doel=nieuw", "excel-bestand-verbeteren": "doel=verbeteren", "financiele-modellen": "onderwerp=finance",
  "begroting-en-budgettering": "onderwerp=begroting", "dashboards-en-managementrapportages": "onderwerp=rapportage", "jaarrekening-en-consolidatiemodellen": "onderwerp=jaarrekening",
  "planning-en-operationele-tools": "onderwerp=planning", "vba-power-query-automatisering": "onderwerp=automatisering", "excel-controleren-en-herstellen": "doel=verbeteren",
  "doorontwikkeling-en-onderhoud": "doel=anders",
};

export function generateStaticParams() { return staticServices.map((s) => ({ slug: s.slug })); }
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = await getService((await params).slug);
  if (!s) return {};
  return { title: s.seoTitle, description: s.metaDescription, alternates: { canonical: `/diensten/${s.slug}` }, openGraph: { title: s.seoTitle, description: s.metaDescription, url: `/diensten/${s.slug}`, type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const s = await getService((await params).slug);
  if (!s) notFound();
  const [all, models] = await Promise.all([getServices(), getDemoModels()]);
  const related = models.filter((m) => s.relatedModels.includes(m.slug));
  const visualModel = models.find((m) => m.slug === s.visual);
  const cta = `/verzoekwijzer?${TOPIC[s.slug] ?? ""}`;
  const ld = { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.metaDescription, areaServed: "NL", inLanguage: "nl-NL", provider: { "@type": "Organization", name: siteConfig.brand, url: siteConfig.url }, url: `${siteConfig.url}/diensten/${s.slug}` };

  return (
    <>
      <PageHero crumbs={[{ href: "/oplossingen", label: "Oplossingen" }, { href: `/diensten/${s.slug}`, label: s.navTitle }]} eyebrow={s.title} cell="B2" title={s.h1} lead={s.lead}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={cta} className="btn-primary">Bespreek jouw situatie<ArrowRight className="h-4 w-4" aria-hidden /></Link>
          {visualModel && <a href="#voorbeeld" className="btn-ghost">Bekijk een werkend voorbeeld</a>}
        </div>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Het probleem</p>
            <h2 className="h-section text-3xl md:text-4xl">{s.problemTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{s.problem}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">Wat je van ons krijgt</p>
            <ul className="space-y-3">
              {s.deliverables.map((d) => (
                <li key={d.title} className="flex gap-4 rounded-2xl border border-ink/10 bg-paper p-5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-mint text-forest"><Check className="h-4 w-4" aria-hidden /></span>
                  <span><span className="block font-display font-bold">{d.title}</span><span className="mt-1 block text-[15px] text-ink-500">{d.text}</span></span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {visualModel && (
        <Section tone="dark" grid id="voorbeeld">
          <SectionHeading tone="dark" eyebrow="Probeer het zelf" cell="C7" title={<>Een werkend voorbeeld: {visualModel.title.toLowerCase()}</>} lead={<>{visualModel.summary} <span className="text-mint/60">Voorbeeldbedrijf {visualModel.company} is fictief.</span></>} />
          <p className="mt-6 flex items-center gap-2 text-[14px] text-mint/70"><MousePointerClick className="h-4 w-4" aria-hidden />{visualModel.interactions.slice(0, 3).join(" · ")}</p>
          <div className="mt-8 text-ink"><ModelView slug={visualModel.slug} height={560} /></div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/verzoekwijzer?model=${visualModel.slug}`} className="btn-primary">Ik wil ook zo&apos;n model<ArrowRight className="h-4 w-4" aria-hidden /></Link>
            <Link href={`/voorbeelden/${visualModel.slug}`} className="btn-ghost-light">Meer over dit voorbeeld</Link>
          </div>
        </Section>
      )}

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow mb-4">Uit de praktijk</p>
            <h2 className="h-section text-3xl md:text-4xl">{s.example.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{s.example.text}</p>
            <p className="mt-4 text-[13px] text-ink-400">Dit is een uitgewerkt voorbeeldscenario, geen beschrijving van een bestaande klant.</p>
          </Reveal>
          <Reveal delay={0.1} className="card p-6">
            <p className="font-mono text-[12px] uppercase tracking-wider text-excel">In het model</p>
            <ul className="mt-4 space-y-3">
              {s.example.bullets.map((b, i) => (
                <li key={b} className="flex gap-3 text-[15px]"><span className="cellref shrink-0">A{i + 2}</span><span>{b}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Wat het oplevert" title="Voordelen voor jouw organisatie" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05} className="rounded-2xl border border-ink/10 bg-paper p-6">
              <span className="font-mono text-[12px] text-excel">{String.fromCharCode(66 + i)}1</span>
              <h3 className="mt-3 font-display text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-[15px] text-ink-500">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="mint">
        <SectionHeading eyebrow="Werkwijze" title="Zo pakken we het aan" lead="Kort cyclisch: je ziet tussentijds wat er gebouwd wordt en kunt bijsturen." />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {s.approach.map((a, i) => (
            <li key={a.title} className="relative rounded-2xl bg-white p-6 shadow-card">
              <span className="font-display text-4xl font-extrabold text-emerald/30">{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-[15px] text-ink-500">{a.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Veelgestelde vragen" title={`Vragen over ${s.navTitle.toLowerCase()}`} lead={<>Staat je vraag er niet bij? <Link className="text-excel underline" href="/contact">Neem contact op</Link>.</>} />
          <Faq items={s.faq} />
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Gerelateerde voorbeelden" title="Bekijk vergelijkbare modellen" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.slice(0, 3).map((m) => <ModelCard key={m.slug} m={m} />)}</div>
        </Section>
      )}

      <section className="container pb-20">
        <CtaBand title="Benieuwd wat dit voor jouw bedrijf kan betekenen?" text="Beschrijf je situatie in de Verzoekwijzer. Je krijgt direct een samenvatting en wij nemen contact met je op." cta="Bespreek jouw situatie" href={cta} secondary={{ href: "/oplossingen", label: "Alle oplossingen" }} />
        <nav aria-label="Andere diensten" className="mt-12">
          <p className="font-mono text-[12px] uppercase tracking-wider text-ink-400">Andere diensten</p>
          <ul className="mt-3 flex flex-wrap gap-2">{all.filter((x) => x.slug !== s.slug).map((x) => <li key={x.slug}><Link href={`/diensten/${x.slug}`} className="chip hover:border-emerald">{x.navTitle}</Link></li>)}</ul>
        </nav>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
