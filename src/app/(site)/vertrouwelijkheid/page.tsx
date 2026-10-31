import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, Lock, Eye, Archive, Trash2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { getRetention } from "@/lib/settings";
import { uploadPolicy } from "@/config/site";

export const metadata: Metadata = {
  title: "Vertrouwelijkheid: zo gaan we om met jouw bestanden | ExcelSheets.nl",
  description: "Hoe ExcelSheets.nl bestanden ontvangt, beveiligt, inziet, bewaart en verwijdert. Transparant en volgens de AVG.",
  alternates: { canonical: "/vertrouwelijkheid" },
};
export const revalidate = 300;

export default async function Page() {
  const r = await getRetention();
  const steps = [
    { icon: Inbox, t: "Ontvangen", d: `Je uploadt bestanden via een versleutelde verbinding (HTTPS) in de Verzoekwijzer. We accepteren alleen spreadsheetformaten (${uploadPolicy.extensions.join(", ")}) tot ${Math.round(uploadPolicy.maxFileBytes / 1048576)} MB. De server controleert of de inhoud echt bij het bestandstype past, en in productie wordt elk bestand op malware gescand voordat het wordt opgeslagen.` },
    { icon: Lock, t: "Beveiligd", d: "Bestanden worden opgeslagen buiten het publieke deel van de website, onder een willekeurige naam. Er bestaat geen openbare link naar. Alleen ingelogde medewerkers met de juiste rol kunnen ze downloaden, en elke download wordt vastgelegd in een logboek." },
    { icon: Eye, t: "Ingezien", d: "Alleen de mensen die je aanvraag behandelen bekijken je bestanden, en alleen om je vraag te begrijpen en een voorstel te maken. We openen bestanden met macro's uitgeschakeld en gebruiken je gegevens nooit voor andere doeleinden, voorbeelden of training van software." },
    { icon: Archive, t: "Bewaard", d: `Leidt je aanvraag niet tot een opdracht, dan bewaren we bijlagen maximaal ${r.attachmentDays} dagen en de aanvraag met je contactgegevens maximaal ${r.requestDays} dagen. Uploads die je niet verstuurt, verwijderen we binnen ${r.orphanUploadHours} uur. Bij een opdracht gelden de afspraken in de opdrachtbevestiging.` },
    { icon: Trash2, t: "Verwijderd", d: "Na de bewaartermijn worden bestanden en gegevens automatisch verwijderd. Wil je eerder dat we alles verwijderen? Stuur een bericht met je aanvraagnummer; we bevestigen de verwijdering." },
  ];
  return (
    <>
      <PageHero crumbs={[{ href: "/vertrouwelijkheid", label: "Vertrouwelijkheid" }]} eyebrow="Vertrouwelijkheid" cell="V1" title="Jouw cijfers blijven van jou" lead="Om je goed te helpen, zien we soms je omzet, kosten, salarissen of klantgegevens. Daar gaan we zorgvuldig mee om. Zo werkt het, stap voor stap." />
      <Section tone="white" className="pt-4">
        <ol className="grid gap-4 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.t} className="card relative p-6">
              <span className="font-mono text-[12px] text-excel">Stap {i + 1}</span>
              <s.icon className="mt-3 h-7 w-7 text-forest" aria-hidden />
              <h2 className="mt-3 font-display text-xl font-bold">{s.t}</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="prose-es">
            <h2>Liever geen echte cijfers delen?</h2>
            <p>Dat begrijpen we. Voor de intake is een geanonimiseerde versie of een bestand met verzonnen getallen bijna altijd genoeg: het gaat ons om de structuur, niet om de bedragen. Je kunt ook eerst zonder bestand een aanvraag doen en later iets delen.</p>
            <p>Desgewenst tekenen we vooraf een geheimhoudingsverklaring. Bij een opdracht waarin we persoonsgegevens verwerken, sluiten we een verwerkersovereenkomst.</p>
          </div>
          <div className="prose-es">
            <h2>Je rechten</h2>
            <p>Je kunt altijd vragen welke gegevens we van je hebben, ze laten corrigeren of laten verwijderen. Lees meer in de <Link href="/privacy">privacyverklaring</Link>. De website gebruikt geen tracking- of advertentiecookies; zie de <Link href="/cookies">cookieverklaring</Link>.</p>
          </div>
        </div>
      </Section>
      <section className="container py-20"><CtaBand title="Vragen over vertrouwelijkheid?" text="Bespreek het gerust in het kennismakingsgesprek, voordat je iets deelt." cta="Neem contact op" href="/contact" /></section>
    </>
  );
}
