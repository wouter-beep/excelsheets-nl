import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { ModelThumb } from "@/components/home/ModelThumb";
import { getCases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cases: zo lossen Excel-modellen echte vraagstukken op | ExcelSheets.nl",
  description: "Uitgewerkte cases met probleem, oplossing en voordelen. De huidige cases zijn demonstraties met fictieve bedrijven, duidelijk als zodanig gemarkeerd.",
  alternates: { canonical: "/cases" },
};
export const revalidate = 300;
const THUMB: Record<string, string> = { managementdashboard: "dashboard", liquiditeitsprognose: "cash", kostprijsberekening: "costprice", consolidatie: "consolidation" };

export default async function Page() {
  const cases = await getCases();
  const allDemo = cases.every((c) => c.isDemo);
  return (
    <>
      <PageHero crumbs={[{ href: "/cases", label: "Cases" }]} eyebrow="Cases" cell="E1" title="Van vraagstuk naar werkend model" lead="Hoe ziet zo'n traject eruit? In deze cases zie je per vraagstuk het probleem, de oplossing en wat het oplevert, met een interactief voorbeeldmodel erbij." />
      <Section tone="white" className="pt-4">
        {allDemo && <p className="mb-8 rounded-xl border border-amber/40 bg-amber-100 px-5 py-4 text-[14px] text-ink-700"><strong>Let op:</strong> dit zijn demonstratiecases. De bedrijven zijn fictief en de cases laten zien hoe wij een vraagstuk aanpakken; het zijn geen beschrijvingen van bestaande klanten of behaalde resultaten.</p>}
        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`} className="card group grid overflow-hidden transition hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[200px_1fr]">
              <div className="border-b border-ink/10 bg-paper p-4 sm:border-b-0 sm:border-r"><ModelThumb kind={THUMB[c.modelSlug] ?? "dashboard"} /></div>
              <div className="flex flex-col p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-excel">{c.sector}{c.isDemo && " · demonstratie"}</p>
                <h2 className="mt-2 font-display text-xl font-bold leading-snug">{c.title}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-[14.5px] text-ink-500">{c.problem}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-excel">Lees de case<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden /></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <section className="container pb-20"><CtaBand title="Herken je jouw situatie?" text="Vertel ons waar je tegenaan loopt. Elk traject begint met een vrijblijvend gesprek." /></section>
    </>
  );
}
