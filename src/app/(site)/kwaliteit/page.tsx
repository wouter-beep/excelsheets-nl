import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Kwaliteit van onze Excel-modellen | ExcelSheets.nl",
  description: "Juiste formules, herleidbare brondata, controletellingen, foutafhandeling, documentatie en onderhoudbaarheid: zo borgt ExcelSheets.nl de kwaliteit van elk model.",
  alternates: { canonical: "/kwaliteit" },
};

const items = [
  { t: "Juiste formules", d: "Elke berekening staat één keer en wordt verwezen, niet gekopieerd met kleine variaties. We gebruiken moderne functies zoals XLOOKUP, FILTER en LET waar ze de leesbaarheid verbeteren, en testen uitkomsten tegen handmatige controleberekeningen.", f: "=LET(omzet; SUM(T_Omzet[Bedrag]); omzet - kosten)" },
  { t: "Herleidbare brondata", d: "Brongegevens staan apart van berekeningen en worden niet overschreven. Bij elke uitkomst kun je terugvinden uit welke export of invoer hij komt. Power Query-stappen zijn benoemd zodat je ziet wat er met de data gebeurt.", f: "Bron → Opschonen → Mappen → Model" },
  { t: "Controletellingen", d: "Debet is credit, de balans sluit, het totaal per afdeling is gelijk aan het totaal van de onderneming. Zulke checks bouwen we standaard in, met een duidelijk signaal op het dashboard als er iets niet klopt.", f: "=ABS(totaal_debet - totaal_credit) < 0,01" },
  { t: "Foutafhandeling", d: "Een ontbrekende waarde levert geen #N/B op in het dashboard, maar een begrijpelijke melding. We vangen fouten bewust af, zonder ze te verstoppen: een IFERROR die alles op nul zet, is vaak gevaarlijker dan de fout zelf.", f: "=IFNA(XLOOKUP(…); \"Code ontbreekt in mapping\")" },
  { t: "Documentatie", d: "Elk model krijgt een uitlegblad: wat doet elk tabblad, welke cellen zijn invoer, hoe ververs je de gegevens en wat betekenen de controles. Complexe formules krijgen een korte toelichting.", f: "Tabblad 'Lees mij'" },
  { t: "Gebruikersgemak", d: "Invoercellen hebben een vaste kleur, keuzelijsten voorkomen tikfouten en de navigatie is logisch. Gebruikers hoeven niet te weten hoe het model werkt om het goed te gebruiken.", f: "Datavalidatie + vaste stijlen" },
  { t: "Onderhoudbaarheid", d: "Een nieuw jaar, een extra afdeling of een nieuwe grootboekrekening moet geen nieuw bestand vragen. We werken met tabellen, benoemde bereiken en een structuur die meegroeit.", f: "Tabellen in plaats van vaste bereiken" },
  { t: "Versiebeheer", d: "We houden bij wat er per versie is veranderd en leveren een wijzigingslog mee. Voor modellen die vaak worden aangepast, adviseren we over opslag in SharePoint of OneDrive met versiegeschiedenis.", f: "v1.3 · 2026-10 · nieuwe kostenplaats" },
  { t: "Toegankelijkheid", d: "Voldoende contrast, duidelijke tabbladnamen, alternatieve tekst bij grafieken en geen informatie die alleen via kleur wordt overgebracht. Zo is het model bruikbaar voor meer mensen.", f: "Toegankelijkheidscontrole in Excel" },
  { t: "Performance", d: "Volatiele functies, onnodig grote bereiken en duizenden losse SUMIFS kunnen een bestand traag maken. We kiezen rekenmethoden die ook met een jaar extra data snel blijven.", f: "Geen hele-kolomverwijzingen in zware formules" },
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ href: "/kwaliteit", label: "Kwaliteit" }]} eyebrow="Kwaliteit van onze modellen" cell="K1" title="Een model waar je op durft te sturen" lead="Een spreadsheet is snel gemaakt. Een betrouwbaar model niet. Dit zijn de tien punten waar we bij elk model op letten, van een kleine verbetering tot een volledig financieel model." />
      <Section tone="white" className="pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((x, i) => (
            <Reveal key={x.t} delay={(i % 2) * 0.05} className="card flex flex-col p-6">
              <div className="flex items-center justify-between"><span className="cellref">C{i + 2}</span><span className="grid h-7 w-7 place-items-center rounded-md bg-mint font-mono text-[12px] font-bold text-forest">{i + 1}</span></div>
              <h2 className="mt-3 font-display text-xl font-bold">{x.t}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">{x.d}</p>
              <p className="mt-4 truncate rounded-lg bg-paper px-3 py-2 font-mono text-[12px] text-excel" title={x.f}>{x.f}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="mint">
        <SectionHeading eyebrow="Zie het zelf" title="Alle voorbeeldmodellen hebben een controleblad" lead={<>In de <Link className="text-excel underline" href="/voorbeelden">voorbeelden</Link> zie je rechtsonder in elk werkboek de status van de controles. Download een model en volg zelf de formules.</>} />
      </Section>
      <section className="container py-20"><CtaBand title="Twijfel je aan een bestaand model?" text="We controleren het en vertellen je eerlijk wat er goed gaat en wat beter kan." cta="Laat je model controleren" href="/verzoekwijzer?doel=verbeteren" /></section>
    </>
  );
}
