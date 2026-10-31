import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/content/LegalPage";
import { getCompany, getRetention } from "@/lib/settings";

export const metadata: Metadata = { title: "Privacyverklaring | ExcelSheets.nl", description: "Hoe ExcelSheets.nl omgaat met persoonsgegevens en bestanden die je via de website deelt.", alternates: { canonical: "/privacy" } };
export const revalidate = 300;

export default async function Page() {
  const [c, r] = await Promise.all([getCompany(), getRetention()]);
  const who = c.legalName ?? "ExcelSheets.nl";
  const complete = !!(c.legalName && c.email && c.address);
  return (
    <LegalPage title="Privacyverklaring" href="/privacy" updated="31 oktober 2026" notice={!complete ? "Deze privacyverklaring is nog niet volledig: de gegevens van de verwerkingsverantwoordelijke (rechtspersoon, adres, KvK en contactadres) moeten nog worden ingevuld en de tekst moet juridisch worden gecontroleerd voordat de website live gaat." : undefined}>
      <h2>Wie is verantwoordelijk?</h2>
      <p>{who} is verantwoordelijk voor de verwerking van persoonsgegevens via deze website.{c.address && <> Adres: {c.address}.</>}{c.kvk && <> KvK: {c.kvk}.</>} {c.email ? <>Vragen over privacy kun je sturen naar <a href={`mailto:${c.email}`}>{c.email}</a>.</> : <>Voor vragen over privacy kun je contact opnemen via de <Link href="/contact">contactpagina</Link>.</>}</p>
      <h2>Welke gegevens verwerken we?</h2>
      <ul>
        <li><strong>Contactgegevens</strong> die je invult: naam, bedrijfsnaam, zakelijk e-mailadres, eventueel telefoonnummer en je contactvoorkeur.</li>
        <li><strong>De inhoud van je aanvraag</strong>: je antwoorden in de Verzoekwijzer, je omschrijving en de samenvatting.</li>
        <li><strong>Bestanden</strong> die je uploadt. Die kunnen bedrijfsgegevens en soms persoonsgegevens bevatten.</li>
        <li><strong>Technische gegevens</strong> die nodig zijn om de site veilig te laten werken. Voor bescherming tegen misbruik gebruiken we een gehashte, niet-herleidbare waarde van je IP-adres die alleen kort in het werkgeheugen staat en niet wordt opgeslagen.</li>
      </ul>
      <h2>Waarvoor gebruiken we ze?</h2>
      <p>Alleen om je aanvraag te beoordelen, contact met je op te nemen, een voorstel te maken en, als je opdracht geeft, de opdracht uit te voeren. De grondslag is het nemen van maatregelen op jouw verzoek voorafgaand aan een overeenkomst, en bij een opdracht de uitvoering daarvan. We gebruiken je gegevens niet voor nieuwsbrieven of marketing zonder je aparte toestemming, en niet om software of AI-modellen te trainen.</p>
      <h2>Hoe lang bewaren we ze?</h2>
      <p>Leidt een aanvraag niet tot een opdracht, dan verwijderen we geüploade bestanden na maximaal {r.attachmentDays} dagen en de aanvraag met je contactgegevens na maximaal {r.requestDays} dagen. Uploads die je niet verstuurt, worden binnen {r.orphanUploadHours} uur verwijderd. Bij een opdracht bewaren we gegevens zolang dat nodig is voor de uitvoering en de wettelijke (fiscale) bewaarplicht.</p>
      <h2>Met wie delen we gegevens?</h2>
      <p>We verkopen geen gegevens. We maken gebruik van dienstverleners die ons helpen de website en e-mail te laten werken, zoals hosting, een e-maildienst en een virusscanner. Met deze partijen sluiten we verwerkersovereenkomsten. Gegevens worden zoveel mogelijk binnen de Europese Economische Ruimte verwerkt.</p>
      <h2>Beveiliging</h2>
      <p>De website gebruikt een versleutelde verbinding. Bestanden worden afgeschermd opgeslagen, zijn niet publiek bereikbaar en worden gescand op malware. Alleen geautoriseerde medewerkers hebben toegang, en downloads worden gelogd. Lees meer op de pagina <Link href="/vertrouwelijkheid">Vertrouwelijkheid</Link>.</p>
      <h2>Je rechten</h2>
      <p>Je hebt het recht op inzage, correctie, verwijdering, beperking van de verwerking, overdraagbaarheid en bezwaar. Stuur je verzoek met je aanvraagnummer; we reageren binnen een maand. Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de <a href="https://autoriteitpersoonsgegevens.nl" rel="noopener" target="_blank">Autoriteit Persoonsgegevens</a>.</p>
      <h2>Cookies</h2>
      <p>We gebruiken geen tracking- of advertentiecookies. Zie de <Link href="/cookies">cookieverklaring</Link>.</p>
    </LegalPage>
  );
}
