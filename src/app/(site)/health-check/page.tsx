import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { HealthCheck } from "@/components/tools/HealthCheck";

export const metadata: Metadata = {
  title: "Excel Health Check: hoe gezond is jouw spreadsheet? | ExcelSheets.nl",
  description: "Zes vragen over gebruikers, handmatig werk, fouten, snelheid, documentatie en opbouw. Direct een score en praktische aandachtspunten voor je Excel-bestand.",
  alternates: { canonical: "/health-check" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ href: "/health-check", label: "Excel Health Check" }]} eyebrow="Excel Health Check" cell="=CHECK()" title="Hoe gezond is jouw Excel-bestand?" lead="Beantwoord zes korte vragen over het bestand waar je het meest op vertrouwt. Je ziet direct een score en concrete aandachtspunten. Duurt een minuut, er wordt niets opgeslagen." />
      <Section tone="paper" className="pt-0 md:pt-0"><HealthCheck /></Section>
    </>
  );
}
