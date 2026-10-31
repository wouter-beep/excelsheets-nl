import type { Metadata } from "next";
import { LegalPage } from "@/components/content/LegalPage";
import { getCompany } from "@/lib/settings";

export const metadata: Metadata = { title: "Algemene voorwaarden (concept) | ExcelSheets.nl", description: "Concept van de algemene voorwaarden van ExcelSheets.nl.", alternates: { canonical: "/algemene-voorwaarden" }, robots: { index: false, follow: true } };
export const revalidate = 300;

export default async function Page() {
  const c = await getCompany();
  const who = c.legalName ?? "ExcelSheets.nl";
  return (
    <LegalPage title="Algemene voorwaarden" href="/algemene-voorwaarden" updated="31 oktober 2026 (concept)" notice={<><strong>Concept.</strong> Deze voorwaarden zijn een eerste opzet en moeten juridisch worden gecontroleerd en aangevuld voordat ze van toepassing kunnen zijn. Tot die tijd gelden de afspraken in het voorstel of de opdrachtbevestiging.</>}>
      <h2>1. Toepasselijkheid</h2>
      <p>Deze voorwaarden gelden voor alle voorstellen en opdrachten van {who} (hierna: ExcelSheets.nl) aan zakelijke opdrachtgevers, tenzij schriftelijk anders is afgesproken.</p>
      <h2>2. Voorstel en opdracht</h2>
      <p>Een voorstel is vrijblijvend en dertig dagen geldig, tenzij anders vermeld. Een opdracht komt tot stand door schriftelijke aanvaarding van het voorstel. Werkzaamheden die buiten de omschrijving vallen, worden vooraf besproken en apart in rekening gebracht.</p>
      <h2>3. Uitvoering</h2>
      <p>ExcelSheets.nl voert de opdracht zorgvuldig en naar beste vermogen uit. Het betreft een inspanningsverplichting. De opdrachtgever zorgt tijdig voor de benodigde gegevens en informatie en is verantwoordelijk voor de juistheid daarvan.</p>
      <h2>4. Oplevering en acceptatie</h2>
      <p>Na oplevering heeft de opdrachtgever een in het voorstel genoemde termijn om het model te testen. Gebreken die binnen die termijn worden gemeld en die vallen binnen de afgesproken functionaliteit, worden kosteloos hersteld.</p>
      <h2>5. Gebruik van uitkomsten</h2>
      <p>Een Excel-model is een hulpmiddel. De opdrachtgever blijft verantwoordelijk voor beslissingen die op basis van het model worden genomen, voor de invoer van gegevens en voor wijzigingen die na oplevering door anderen worden aangebracht. ExcelSheets.nl geeft geen fiscaal, juridisch of accountancy-advies.</p>
      <h2>6. Intellectueel eigendom</h2>
      <p>Na volledige betaling verkrijgt de opdrachtgever een onbeperkt gebruiksrecht op het opgeleverde model binnen de eigen organisatie, inclusief het recht om het aan te passen. Algemene kennis, methoden en herbruikbare bouwstenen blijven eigendom van ExcelSheets.nl.</p>
      <h2>7. Vertrouwelijkheid en gegevens</h2>
      <p>Beide partijen houden vertrouwelijke informatie geheim. Voor zover ExcelSheets.nl persoonsgegevens verwerkt in opdracht, sluiten partijen een verwerkersovereenkomst.</p>
      <h2>8. Betaling</h2>
      <p>Facturen worden binnen veertien dagen na factuurdatum voldaan, tenzij anders afgesproken.</p>
      <h2>9. Aansprakelijkheid</h2>
      <p>[Nog juridisch uit te werken: beperking van aansprakelijkheid tot het factuurbedrag van de betreffende opdracht, uitsluiting van indirecte schade, behoudens opzet of bewuste roekeloosheid.]</p>
      <h2>10. Toepasselijk recht</h2>
      <p>Op deze voorwaarden en alle opdrachten is Nederlands recht van toepassing.</p>
    </LegalPage>
  );
}
