import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/content/LegalPage";

export const metadata: Metadata = { title: "Cookieverklaring | ExcelSheets.nl", description: "ExcelSheets.nl gebruikt geen tracking- of advertentiecookies. Lees welke technische opslag de website wel gebruikt.", alternates: { canonical: "/cookies" } };

export default function Page() {
  return (
    <LegalPage title="Cookieverklaring" href="/cookies" updated="31 oktober 2026">
      <p>Kort gezegd: deze website plaatst <strong>geen tracking-, analyse- of advertentiecookies</strong>. Daarom vragen we ook niet om toestemming via een cookiebanner.</p>
      <h2>Wat we wel gebruiken</h2>
      <ul>
        <li><strong>Sessie-opslag in je browser (sessionStorage)</strong> om je antwoorden in de Verzoekwijzer tijdelijk te bewaren als je per ongeluk de pagina ververst, en om te onthouden dat je de mobiele knop onderaan hebt gesloten. Deze gegevens blijven op je eigen apparaat en verdwijnen als je het tabblad sluit.</li>
        <li><strong>Een beveiligde sessiecookie voor de beheeromgeving</strong>. Die wordt alleen geplaatst bij medewerkers die inloggen en is strikt noodzakelijk.</li>
        <li>Als botbescherming is ingeschakeld, gebruiken we <strong>Cloudflare Turnstile</strong> op het verzendformulier. Dat is een privacyvriendelijk alternatief voor een captcha en wordt niet gebruikt voor advertenties.</li>
      </ul>
      <h2>Analyse</h2>
      <p>Als we in de toekomst bezoekersstatistieken willen bijhouden, kiezen we een privacyvriendelijke oplossing zonder cookies en passen we deze verklaring vooraf aan. Zie ook de <Link href="/privacy">privacyverklaring</Link>.</p>
    </LegalPage>
  );
}
