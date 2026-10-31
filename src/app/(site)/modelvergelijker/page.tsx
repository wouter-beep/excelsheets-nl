import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ModelComparer } from "@/components/tools/ModelComparer";

export const metadata: Metadata = {
  title: "Modelvergelijker: handmatig of geautomatiseerd? | ExcelSheets.nl",
  description: "Vergelijk handmatige en geautomatiseerde rapportages, een statische begroting met een rolling forecast en losse bestanden met één gestructureerd model.",
  alternates: { canonical: "/modelvergelijker" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ href: "/modelvergelijker", label: "Modelvergelijker" }]} eyebrow="Modelvergelijker" cell="=VERGELIJK()" title="Zie het verschil tussen werken en laten werken" lead="Drie veelvoorkomende keuzes naast elkaar. Kies een vergelijking, klik op een kant en zie waar de winst zit, en waar de afwegingen liggen." />
      <Section tone="paper" className="pt-0 md:pt-0"><ModelComparer /></Section>
    </>
  );
}
