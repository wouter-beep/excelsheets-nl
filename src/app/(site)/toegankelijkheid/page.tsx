import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/content/LegalPage";

export const metadata: Metadata = { title: "Toegankelijkheid | ExcelSheets.nl", description: "Hoe ExcelSheets.nl werkt aan een toegankelijke website volgens WCAG 2.2 niveau AA.", alternates: { canonical: "/toegankelijkheid" } };

export default function Page() {
  return (
    <LegalPage title="Toegankelijkheid" href="/toegankelijkheid" updated="31 oktober 2026">
      <p>We willen dat iedereen deze website goed kan gebruiken, ook met een schermlezer, alleen een toetsenbord, vergroting of andere hulpmiddelen. We streven naar <strong>WCAG 2.2 niveau AA</strong>.</p>
      <h2>Wat we hebben gedaan</h2>
      <ul>
        <li>Duidelijke koppenstructuur, oriëntatiepunten en een link om direct naar de inhoud te springen.</li>
        <li>Alle functies, ook de interactieve werkboeken en de Verzoekwijzer, zijn met het toetsenbord te bedienen, met een zichtbare focus.</li>
        <li>Voldoende kleurcontrast; informatie wordt niet alleen met kleur overgebracht.</li>
        <li>Formulieren met labels, foutmeldingen in tekst en meldingen die schermlezers voorlezen.</li>
        <li>Animaties worden beperkt als je in je systeem &ldquo;beweging verminderen&rdquo; hebt ingesteld.</li>
        <li>Knoppen en keuzes zijn groot genoeg om op een touchscreen te gebruiken.</li>
      </ul>
      <h2>Bekende beperkingen</h2>
      <ul>
        <li>De interactieve demomodellen bevatten grafieken. De onderliggende cijfers staan altijd ook in de tabbladen van het werkboek en in het downloadbare Excel-bestand.</li>
        <li>Downloadbare Excel-bestanden volgen de toegankelijkheidsrichtlijnen van Excel zo goed mogelijk, maar zijn complexe documenten. Heb je moeite met een bestand, laat het ons weten.</li>
      </ul>
      <h2>Iets gevonden dat niet goed werkt?</h2>
      <p>Laat het ons weten via de <Link href="/contact">contactpagina</Link>. We proberen binnen vijf werkdagen te reageren en een oplossing te bieden.</p>
      <p>Deze verklaring is opgesteld op basis van eigen controles tijdens de ontwikkeling. Een onafhankelijke toetsing is nog niet uitgevoerd.</p>
    </LegalPage>
  );
}
