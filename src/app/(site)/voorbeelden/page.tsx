import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { ModelCard } from "@/components/content/ModelCard";
import { getDemoModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Voorbeelden van Excel-modellen: interactief en te downloaden",
  description: "Twaalf werkende Excel-voorbeelden: managementdashboard, begroting met rolling forecast, liquiditeitsprognose, jaarrekening, planning, kostprijs en meer. Fictieve bedrijven, echte formules.",
  alternates: { canonical: "/voorbeelden" },
};
export const revalidate = 300;

export default async function Page() {
  const models = await getDemoModels();
  const ld = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: models.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.title, url: `/voorbeelden/${m.slug}` })) };
  return (
    <>
      <PageHero crumbs={[{ href: "/voorbeelden", label: "Voorbeelden" }]} eyebrow="Voorbeeldmodellen" cell="D1" title="Werkende modellen. Probeer ze zelf." lead="Elk voorbeeld is een volledig interactief werkboek: wissel van tabblad, verander invoer en bekijk de formules. Je kunt ze ook downloaden als echt Excel-bestand. De bedrijven en cijfers zijn fictief; de technieken zijn precies wat we voor klanten bouwen." />
      <Section tone="white" className="pt-4 md:pt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{models.map((m) => <ModelCard key={m.slug} m={m} />)}</div>
        <p className="mt-8 text-[13px] text-ink-400">Alle voorbeeldbedrijven zijn verzonnen. Overeenkomsten met bestaande organisaties berusten op toeval. De modellen zijn bedoeld als demonstratie en niet als financieel, fiscaal of juridisch advies.</p>
      </Section>
      <section className="container pb-20"><CtaBand title="Iets vergelijkbaars nodig, maar dan voor jouw bedrijf?" text="We bouwen nooit een template na: elk model begint bij jouw gegevens en werkwijze." cta="Ik wil ook zo'n model" /></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
