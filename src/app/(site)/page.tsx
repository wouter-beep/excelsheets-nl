import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, UserRound, Wrench, Check } from "lucide-react";
import HeroWorkbookLoader from "@/components/home/HeroWorkbookLoader";
import { ProblemCards } from "@/components/home/ProblemCards";
import { Gallery } from "@/components/home/Gallery";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Process } from "@/components/home/Process";
import { FormulaToResult } from "@/components/home/FormulaToResult";
import { ModelThumb } from "@/components/home/ModelThumb";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/Logo";
import { SolutionGrid } from "@/components/content/SolutionGrid";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { getCompany } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Excel op maat laten maken | ExcelSheets.nl",
  description: "Excel laten maken, verbeteren of automatiseren? Wij bouwen financiële dashboards, begrotingen, forecasts, liquiditeitsprognoses en planningen op maat. Bespreek jouw Excel-vraagstuk.",
  alternates: { canonical: "/" },
};
export const revalidate = 300;

async function getTeam() {
  try { return await db.teamMember.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }); } catch { return []; }
}

export default async function HomePage() {
  const [team, company] = await Promise.all([getTeam(), getCompany()]);
  const ld = {
    "@context": "https://schema.org", "@type": "ProfessionalService", name: company.legalName ?? siteConfig.brand, url: siteConfig.url,
    description: siteConfig.description, areaServed: "NL", knowsLanguage: "nl",
    ...(company.email ? { email: company.email } : {}), ...(company.phone ? { telephone: company.phone } : {}),
    serviceType: ["Excel maatwerk", "Financiële modellen", "Excel-dashboards", "Excel-automatisering"],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {/* A — Hero */}
      <section className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-grid animate-grid-drift mask-radial" aria-hidden />
        <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-mint/60 blur-3xl" aria-hidden />
        <span className="cellref pointer-events-none absolute bottom-10 left-[4%] hidden lg:block" aria-hidden>B12</span>
        <span className="cellref pointer-events-none absolute right-[8%] top-16 hidden lg:block" aria-hidden>=SUM(F2:F24)</span>
        <div className="container relative grid items-center gap-12 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div>
            <p className="eyebrow mb-6"><span className="rounded border border-excel/30 px-1.5 py-0.5 text-[10px]">A1</span>Excel-maatwerk voor bedrijven</p>
            <h1 className="h-display text-[2.7rem] sm:text-6xl xl:text-[4.4rem]">
              Excel op maat.<br />
              <span className="font-serif font-normal italic tracking-[-0.01em] text-excel">Precies zoals jouw bedrijf werkt.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Van slimme begrotingen en financiële dashboards tot complete planningsmodellen en geautomatiseerde spreadsheets. Wij bouwen, verbeteren en automatiseren Excel-oplossingen die écht werken.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/verzoekwijzer" className="btn-primary text-base">Bespreek jouw Excel-vraagstuk <ArrowRight className="h-4 w-4" aria-hidden /></Link>
              <Link href="#voorbeelden" className="btn-ghost text-base">Ontdek onze voorbeelden</Link>
            </div>
            <ul className="mt-8 grid gap-3 text-[14px] text-ink-500 sm:grid-cols-3">
              <li className="flex items-start gap-2"><Wrench className="mt-0.5 h-4 w-4 shrink-0 text-excel" aria-hidden />Maatwerk, geen standaardtemplates</li>
              <li className="flex items-start gap-2"><UserRound className="mt-0.5 h-4 w-4 shrink-0 text-excel" aria-hidden />Persoonlijk contact met wie bouwt</li>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-excel" aria-hidden />Je bestanden vertrouwelijk verwerkt</li>
            </ul>
          </div>
          <div className="min-w-0"><HeroWorkbookLoader /></div>
        </div>
      </section>

      {/* B — Herken je dit? */}
      <Section tone="white">
        <SectionHeading eyebrow="Herken je dit?" cell="B1" title={<>Excel kan zoveel meer. <span className="text-ink-400">Als het goed is opgezet.</span></>} lead="De meeste Excel-problemen ontstaan niet door Excel, maar doordat een bestand meegroeit zonder plan. Dat is op te lossen." />
        <ProblemCards />
      </Section>

      {/* C — Wat wij bouwen */}
      <Section tone="paper" grid>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Wat wij voor je kunnen bouwen" cell="C1" title="Slimme modellen. Betere beslissingen." lead="Twaalf oplossingen die we vaak maken. Staat jouw vraag er niet tussen? Juist dan horen we het graag." />
          <Link href="/oplossingen" className="btn-ghost shrink-0">Alle oplossingen</Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SolutionGrid />
        </div>
      </Section>

      {/* D — Zie wat Excel kan */}
      <Section tone="dark" id="voorbeelden" grid className="overflow-hidden">
        <SectionHeading tone="dark" eyebrow="Zie wat Excel kan" cell="D1" title={<>Geen screenshots. <span className="font-serif font-normal italic text-emerald">Werkende modellen.</span></>}
          lead="Navigeer door werkbladen, kies een periode, wijzig scenario's en bekijk de formules. Alle voorbeelden gebruiken fictieve bedrijven en gegevens, en zijn te downloaden als echt Excel-bestand." />
        <Gallery />
      </Section>

      {/* E — Verbeteren */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Wij verbeteren ook bestaande Excel-bestanden" cell="E1" title="Van rommelige sheet naar betrouwbaar model." />
            <div className="mt-8 grid grid-cols-2 gap-6 text-[14.5px]">
              <div>
                <p className="mb-3 font-semibold text-coral">Voor</p>
                <ul className="space-y-2 text-ink-500">{["Ongelijke kolommen", "Onlogische formules", "Handmatige invoervelden", "Onduidelijke kleuren", "Geen controles", "Slecht leesbare tabellen"].map((x) => <li key={x} className="flex gap-2"><span className="text-coral">×</span>{x}</li>)}</ul>
              </div>
              <div>
                <p className="mb-3 font-semibold text-excel">Na</p>
                <ul className="space-y-2 text-ink-700">{["Professioneel dashboard", "Logische navigatie", "Gestandaardiseerde input", "Slimme formules", "Automatische controles", "Mooie grafieken"].map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-excel" aria-hidden />{x}</li>)}</ul>
              </div>
            </div>
            <Link href="/verzoekwijzer?doel=verbeteren" className="btn-dark mt-8">Laat jouw Excel-bestand verbeteren <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
          <Reveal><BeforeAfter /></Reveal>
        </div>
      </Section>

      {/* F — Hoe werken wij */}
      <Section tone="dark" className="bg-forest-900">
        <SectionHeading tone="dark" eyebrow="Hoe werken wij?" cell="F1" title="Vier stappen. Geen dikke specificaties." lead="Je hoeft niet precies te weten hoe je het wilt hebben. Daar zijn wij voor." />
        <Process />
      </Section>

      {/* G — Persoonlijk en deskundig */}
      <Section tone="paper" grid>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Persoonlijk en deskundig" cell="G1" title="Achter elk model zit iemand die snapt wat je bedoelt." />
            <blockquote className="mt-8 border-l-4 border-emerald pl-6 font-serif text-2xl italic leading-snug text-ink md:text-[1.75rem]">
              &ldquo;Wij vinden Excel fantastisch. Niet omdat we zo graag met spreadsheets werken, maar omdat je er ongelooflijk veel mee kunt bereiken. Een goed model geeft inzicht, voorkomt fouten en maakt ingewikkelde processen eenvoudig. Daar worden wij enthousiast van.&rdquo;
            </blockquote>
            <p className="mt-6 max-w-xl text-ink-500">We denken niet alleen vanuit cellen en formules, maar vanuit je bedrijfsproces en het resultaat dat je nodig hebt. Financiële kennis, technische vaardigheid en gevoel voor vormgeving komen samen in één model.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/over-ons" className="btn-ghost">Over ons</Link>
              <Link href="/kwaliteit" className="btn-ghost">Hoe wij kwaliteit borgen</Link>
            </div>
          </div>
          <div>
            {team.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {team.map((m) => (
                  <figure key={m.id} className="card overflow-hidden">
                    {m.photoUrl ? <img src={m.photoUrl} alt={`Portret van ${m.name}`} className="aspect-[4/5] w-full object-cover" loading="lazy" /> : <div className="grid aspect-[4/5] place-items-center bg-mint-50"><LogoMark className="h-16 w-16" /></div>}
                    <figcaption className="p-5"><p className="font-display text-lg font-bold">{m.name}</p><p className="text-sm text-excel">{m.role}</p><p className="mt-2 text-sm text-ink-500">{m.bio}</p></figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="relative">
                <FormulaToResult />
                <p className="mt-4 text-sm text-ink-400">Zo werkt een goed model: invoer, één heldere formule, een uitkomst die je kunt volgen. Probeer het zelf.</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Extra tools */}
      <Section tone="white" className="!py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { href: "/health-check", t: "Excel Health Check", d: "Hoe gezond is jouw Excel-bestand? Zes vragen, direct praktische aandachtspunten.", c: "=CHECK()" },
            { href: "/modelvergelijker", t: "Modelvergelijker", d: "Handmatig versus automatisch, statisch versus rolling: zie het verschil.", c: "=VERGELIJK()" },
            { href: "/excel-door-de-jaren", t: "Excel door de jaren", d: "Van Power Query tot Copilot: wat de ontwikkelingen betekenen voor bedrijven.", c: "2017→2026" },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="card group p-6 transition hover:-translate-y-1 hover:shadow-lift">
              <span className="cellref">{x.c}</span>
              <h3 className="mt-2 font-display text-xl font-bold group-hover:text-excel">{x.t}</h3>
              <p className="mt-2 text-[15px] text-ink-500">{x.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-excel">Bekijken <ArrowRight className="h-4 w-4" aria-hidden /></span>
            </Link>
          ))}
        </div>
      </Section>

      {/* H — Afsluiter */}
      <section className="relative overflow-hidden bg-forest py-24 text-white md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-grid-light" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/20 blur-3xl" aria-hidden />
        <div className="container relative text-center">
          <p className="eyebrow-light mb-6 justify-center"><span className="rounded border border-emerald/40 px-1.5 py-0.5 text-[10px]">H1</span>Laatste cel</p>
          <h2 className="h-display mx-auto max-w-4xl text-4xl text-white md:text-6xl">Dat Excel-bestand waar je al zo lang tegenaan loopt? <span className="font-serif font-normal italic text-emerald">Wij helpen je verder.</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-mint/75">Of je nu een heel nieuw model wilt, een bestaande spreadsheet wilt verbeteren of gewoon wilt weten wat er mogelijk is: leg het ons voor.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/verzoekwijzer" className="btn-primary px-8 py-4 text-lg">Vertel ons wat je nodig hebt <ArrowRight className="h-5 w-5" aria-hidden /></Link>
            <Link href="/contact" className="btn-ghost-light px-6 py-4">Liever eerst contact?</Link>
          </div>
          <p className="mt-6 text-sm text-mint/50">Vrijblijvend · zonder account · in ongeveer twee minuten</p>
        </div>
      </section>
    </>
  );
}
