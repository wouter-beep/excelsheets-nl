import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SmartSearch, type SearchItem } from "@/components/tools/SmartSearch";
import { getArticles, getDemoModels, getFaq, getServices } from "@/lib/content";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = { title: "Zoeken | ExcelSheets.nl", description: "Doorzoek diensten, voorbeelden, veelgestelde vragen en artikelen.", alternates: { canonical: "/zoeken" }, robots: { index: false, follow: true } };
export const revalidate = 300;

const PAGES: SearchItem[] = [
  { type: "Pagina", title: "De Excel Verzoekwijzer", text: "Vraag in een paar stappen een Excel-oplossing op maat aan.", href: "/verzoekwijzer", extra: "aanvraag offerte contact" },
  { type: "Pagina", title: "Werkwijze", text: "Luisteren, analyseren, ontwerpen, bouwen, testen en opleveren.", href: "/werkwijze" },
  { type: "Pagina", title: "Kwaliteit van onze modellen", text: "Juiste formules, controles, documentatie en onderhoudbaarheid.", href: "/kwaliteit" },
  { type: "Pagina", title: "Vertrouwelijkheid", text: "Hoe we bestanden ontvangen, beveiligen, bewaren en verwijderen.", href: "/vertrouwelijkheid", extra: "privacy avg upload bestanden" },
  { type: "Pagina", title: "Excel Health Check", text: "Zes vragen, direct een score voor je Excel-bestand.", href: "/health-check" },
  { type: "Pagina", title: "Modelvergelijker", text: "Handmatig versus geautomatiseerd, statisch versus rolling forecast.", href: "/modelvergelijker" },
  { type: "Pagina", title: "Tijdlijn: tien jaar Excel", text: "Excel-ontwikkeling van 2017 tot 2026.", href: "/excel-door-de-jaren/tijdlijn" },
  { type: "Pagina", title: "Contact", text: "Neem contact op of stel een korte vraag.", href: "/contact" },
];

export default async function Page() {
  const [services, models, faq, articles] = await Promise.all([getServices(), getDemoModels(), getFaq(), getArticles()]);
  const index: SearchItem[] = [
    ...services.map((s) => ({ type: "Dienst" as const, title: s.title, text: s.metaDescription, href: `/diensten/${s.slug}`, extra: `${s.lead} ${s.faq.map((f) => f.q).join(" ")}` })),
    ...solutions.map((s) => ({ type: "Oplossing" as const, title: s.title, text: s.text, href: s.href, extra: s.forWho })),
    ...models.map((m) => ({ type: "Voorbeeld" as const, title: m.title, text: m.summary, href: `/voorbeelden/${m.slug}`, extra: `${m.sector} ${m.highlights.join(" ")}` })),
    ...faq.map((f) => ({ type: "Vraag" as const, title: f.q, text: f.a.slice(0, 220), href: "/veelgestelde-vragen", extra: f.a })),
    ...articles.map((a) => ({ type: "Artikel" as const, title: a.title, text: a.summary, href: `/excel-door-de-jaren/${a.subjectYear}/${a.slug}`, extra: `${a.subjectYear} ${a.topics.join(" ")}` })),
    ...PAGES,
  ];
  return (
    <>
      <PageHero crumbs={[{ href: "/zoeken", label: "Zoeken" }]} eyebrow="Zoeken" cell="=ZOEKEN()" title="Waar ben je naar op zoek?" lead="Zoek in diensten, voorbeelden, veelgestelde vragen en artikelen. Je mag ook gewoon je vraag intypen." />
      <Section tone="white" className="pt-0 md:pt-0"><div className="max-w-3xl"><Suspense><SmartSearch index={index} /></Suspense></div></Section>
    </>
  );
}
