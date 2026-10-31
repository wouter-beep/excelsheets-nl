import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { TeamGrid, getTeam } from "@/components/content/TeamGrid";
import { FormulaToResult } from "@/components/home/FormulaToResult";

export const metadata: Metadata = {
  title: "Over ons: Excel-specialisten met financieel inzicht | ExcelSheets.nl",
  description: "ExcelSheets.nl bouwt Excel-oplossingen op maat voor bedrijven. Wie we zijn, waar we voor staan en waarom we Excel zo'n krachtig hulpmiddel vinden.",
  alternates: { canonical: "/over-ons" },
};
export const revalidate = 300;

const values = [
  { t: "Eerst begrijpen, dan bouwen", d: "We stellen liever een vraag te veel dan dat we een model bouwen dat net niet past. Jouw proces is het uitgangspunt, niet onze favoriete formule." },
  { t: "Eerlijk advies", d: "Soms is een kleine aanpassing genoeg. Soms is Excel niet het juiste gereedschap. Dat zeggen we dan ook, ook als het ons een opdracht kost." },
  { t: "Herleidbaar en overdraagbaar", d: "Je krijgt een model dat je collega's kunnen volgen en onderhouden. Geen zwarte doos, geen afhankelijkheid van één persoon." },
  { t: "Zorgvuldig met jouw gegevens", d: "Financiële en operationele informatie is vertrouwelijk. We gaan er net zo zorgvuldig mee om als jij." },
];

export default async function Page() {
  const team = await getTeam();
  return (
    <>
      <PageHero crumbs={[{ href: "/over-ons", label: "Over ons" }]} eyebrow="Over ons" cell="A1" title={<>Wij maken Excel slimmer. <span className="font-serif font-normal italic text-excel">En jouw bedrijf sterker.</span></>}
        lead="ExcelSheets.nl ontwikkelt Excel-oplossingen op maat voor bedrijven: van financiële dashboards en begrotingen tot planningen, kostprijsmodellen en automatisering. Geen cursussen, geen standaardtemplates. Gewoon een model dat werkt zoals jouw bedrijf werkt." />
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Waarom Excel" title="Het meest gebruikte zakelijke rekeninstrument verdient vakmanschap" />
            <div className="prose-es mt-6">
              <p>In bijna elk bedrijf draait er wel iets belangrijks op Excel: de begroting, de liquiditeitsplanning, de calculatie of de maandrapportage. Excel is flexibel, iedereen heeft het en financiële mensen kunnen er zelf in rekenen. Dat is precies waarom het zo vaak misgaat: bestanden groeien organisch, worden gekopieerd en aangepast, tot niemand meer precies weet hoe een uitkomst tot stand komt.</p>
              <p>Wij geloven dat Excel, goed toegepast, een volwaardig bedrijfsinstrument is. Met een heldere structuur, moderne functies, Power Query en ingebouwde controles bouw je modellen die net zo betrouwbaar zijn als dure software, en die je zelf kunt blijven aanpassen.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Waar we voor staan" title="Vier uitgangspunten" />
            <ul className="mt-6 space-y-3">{values.map((v, i) => <li key={v.t} className="rounded-2xl border border-ink/10 bg-paper p-5"><span className="cellref">B{i + 2}</span><p className="mt-1 font-display text-lg font-bold">{v.t}</p><p className="mt-1 text-[15px] text-ink-500">{v.d}</p></li>)}</ul>
          </Reveal>
        </div>
      </Section>
      <Section tone="paper">
        <SectionHeading eyebrow="Wie je spreekt" title="Persoonlijk contact, van intake tot oplevering" lead="Je hebt te maken met mensen die zowel de financiële kant als de techniek begrijpen. Je spreekt geen accountmanager die je vraag doorgeeft, maar degene die je model ontwerpt en bouwt." />
        <div className="mt-10">
          {team.length > 0 ? <TeamGrid team={team} /> : (
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <FormulaToResult />
              <div className="prose-es"><p>Een goed model draait om drie dingen: invoer die je begrijpt, berekeningen die je kunt volgen en een uitkomst waar je op durft te sturen. Zo werken we ook samen: je weet wie er aan je model werkt, wat er gebeurt en waarom.</p><p>Benieuwd wie dat voor jouw vraagstuk zou zijn? <Link href="/contact">Neem contact op</Link> of start de <Link href="/verzoekwijzer">Verzoekwijzer</Link>.</p></div>
            </div>
          )}
        </div>
      </Section>
      <section className="container py-20"><CtaBand title="Kennismaken?" text="Vertel waar je tegenaan loopt. We denken graag met je mee, ook als je nog niet precies weet wat je nodig hebt." secondary={{ href: "/werkwijze", label: "Onze werkwijze" }} /></section>
    </>
  );
}
