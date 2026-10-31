import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { SolutionGrid } from "@/components/content/SolutionGrid";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Excel-oplossingen voor bedrijven: dashboards, begrotingen, planningen",
  description: "Overzicht van wat ExcelSheets.nl voor je bouwt: financiële dashboards, begrotingen, forecasts, liquiditeitsprognoses, planningen, kostprijsmodellen en automatisering.",
  alternates: { canonical: "/oplossingen" },
};
export const revalidate = 300;

export default async function Page() {
  const services = await getServices();
  return (
    <>
      <PageHero crumbs={[{ href: "/oplossingen", label: "Oplossingen" }]} eyebrow="Oplossingen" cell="A1" title="Wat we voor je kunnen bouwen" lead="Van een managementdashboard tot een kostprijsmodel: elk model wordt gebouwd rond jouw werkwijze. Hieronder zie je de vraagstukken waar we het vaakst mee helpen, met werkende voorbeelden." />
      <Section tone="white" className="pt-4 md:pt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><SolutionGrid /></div>
      </Section>
      <Section tone="paper">
        <SectionHeading eyebrow="Diensten" title="Zo kunnen we je helpen" lead="Elke dienst heeft een eigen pagina met aanpak, voorbeelden en veelgestelde vragen." />
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Link href={`/diensten/${s.slug}`} className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-emerald hover:shadow-card">
                <span className="cellref mt-1 w-8 shrink-0">B{i + 2}</span>
                <span className="flex-1"><span className="block font-display text-lg font-bold">{s.title}</span><span className="mt-1 block text-[14.5px] text-ink-500">{s.metaDescription}</span></span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-excel transition group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <section className="container pb-20"><CtaBand title="Staat jouw vraagstuk er niet tussen?" text="De meeste opdrachten zijn een combinatie. Vertel wat je nodig hebt; wij denken mee over de beste aanpak, ook als dat niet Excel is." /></section>
    </>
  );
}
