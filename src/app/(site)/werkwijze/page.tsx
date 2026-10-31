import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Process } from "@/components/home/Process";

export const metadata: Metadata = {
  title: "Werkwijze: zo bouwen we jouw Excel-oplossing | ExcelSheets.nl",
  description: "Luisteren, analyseren, ontwerpen, bouwen, testen en opleveren. Lees hoe ExcelSheets.nl een Excel-model op maat ontwikkelt en wat je per stap kunt verwachten.",
  alternates: { canonical: "/werkwijze" },
};

const phases = [
  { t: "Luisteren", d: "In een kennismakingsgesprek vertel je wat je wilt bereiken, hoe het nu gaat en waar het knelt. We vragen naar het besluit dat je met het model wilt nemen, niet alleen naar de tabellen die je wilt zien.", out: "Helder beeld van doel en context" },
  { t: "Analyseren", d: "We bekijken je huidige bestanden en exports (geanonimiseerd mag), brengen gegevensstromen in kaart en checken welke Excel-versie en systemen er zijn. Zo voorkomen we verrassingen tijdens de bouw.", out: "Voorstel met aanpak, planning en prijs" },
  { t: "Ontwerpen", d: "Voordat er één formule staat, schetsen we de opbouw: invoer, berekeningen, uitkomsten, controles. Je ziet een eerste versie van het dashboard of de rapportage, zodat je vroeg kunt bijsturen.", out: "Modelarchitectuur en eerste schets" },
  { t: "Bouwen", d: "We bouwen in korte stappen en laten tussentijds resultaten zien. Moderne functies waar dat helpt, Power Query voor de gegevensstroom, VBA of Office Scripts alleen als het echt waarde toevoegt.", out: "Werkende versie om te testen" },
  { t: "Testen", d: "We testen met echte of realistische gegevens, controleren aansluitingen en randgevallen en vergelijken uitkomsten met je huidige cijfers. Daarna test jij: werkt het zoals je het in de praktijk gebruikt?", out: "Getest model met controlebladen" },
  { t: "Opleveren", d: "Je krijgt het model met een uitlegblad en, als je dat wilt, een korte overdrachtssessie voor de gebruikers. Na de oplevering blijven we bereikbaar voor vragen en aanpassingen.", out: "Gedocumenteerd model + overdracht" },
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ href: "/werkwijze", label: "Werkwijze" }]} eyebrow="Werkwijze" cell="F1" title="Eerst begrijpen. Dan pas bouwen." lead="Een goed model begint niet in Excel, maar bij de vraag welke beslissing je ermee wilt nemen. Zo pakken we elke opdracht aan, groot of klein." />
      <Section tone="white" className="pt-4">
        <ol className="relative space-y-4 md:space-y-0">
          {phases.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.04}>
              <li className="grid gap-4 border-ink/10 py-6 md:grid-cols-[120px_1fr_260px] md:border-t md:py-8">
                <span className="font-display text-5xl font-extrabold text-emerald/40">{String(i + 1).padStart(2, "0")}</span>
                <div><h2 className="font-display text-2xl font-bold">{p.t}</h2><p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink-500">{p.d}</p></div>
                <p className="self-start rounded-xl bg-mint-50 px-4 py-3 text-[14px]"><span className="block font-mono text-[11px] uppercase tracking-wider text-excel">Resultaat</span>{p.out}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
      <Section tone="dark" grid>
        <SectionHeading tone="dark" eyebrow="In vier stappen" title="Van vraag naar werkend model" lead="De korte versie, zoals je die ook op de homepage ziet." />
        <div className="mt-10"><Process /></div>
      </Section>
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["Wat we van je nodig hebben", "Een omschrijving van je vraag, voorbeelden van je huidige bestanden of exports en iemand die tijdens de bouw vragen kan beantwoorden. Geanonimiseerde gegevens zijn prima."],
            ["Wat je van ons mag verwachten", "Een duidelijk voorstel vooraf, tussentijdse resultaten, eerlijke communicatie als iets meer of minder werk blijkt en een model dat je zelf kunt blijven gebruiken."],
            ["Na de oplevering", "Vragen en kleine aanpassingen kunnen altijd. Voor modellen die regelmatig moeten meegroeien, maken we afspraken over onderhoud en doorontwikkeling."],
          ].map(([t, d]) => <div key={t}><h2 className="font-display text-xl font-bold">{t}</h2><p className="mt-2 text-ink-500">{d}</p></div>)}
        </div>
      </Section>
      <section className="container py-20"><CtaBand title="Klaar voor de eerste stap?" text="De Verzoekwijzer helpt je je vraag in een paar minuten te beschrijven." /></section>
    </>
  );
}
