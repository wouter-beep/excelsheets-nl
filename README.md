# Excelsheets.nl

Website en beheeromgeving voor Excelsheets.nl: Excel-maatwerk voor bedrijven.
Next.js 15 (App Router), React 19, TypeScript, Tailwind, Prisma.

## Lokaal starten

```bash
npm install
cp .env.example .env        # vul AUTH_SECRET (min. 32 tekens), ADMIN_EMAIL en ADMIN_PASSWORD (min. 12 tekens) in
npm run setup               # prisma generate + db push + seed + demo-xlsx
npm run dev                 # http://localhost:3000, beheer op /admin
```

Overige scripts:

| Script | Doel |
|---|---|
| `npm test` | Vitest: uploadcontrole, validatie, classificatie, sessies, 12 demomodellen + xlsx-export, 100 artikelen |
| `npm run typecheck` | TypeScript-controle |
| `npm run build` / `npm start` | Productiebuild |
| `npm run retention` | Bewaartermijnen toepassen (`-- --dry-run` om eerst te kijken). Dagelijks via cron draaien |
| `npm run verify:articles` | Lengte, nummering en interne links van de artikelen controleren |
| `npm run db:seed` | Diensten, voorbeelden, thema's en artikelen (bij)werken. `SEED_OVERWRITE_ARTICLES=true` overschrijft bestaande artikelen |

## Opbouw

- `src/app/(site)`: openbare website (homepage, Verzoekwijzer, diensten, voorbeelden, vertrouwenspagina's, Excel door de jaren, tools).
- `src/app/admin`: beheeromgeving (login, aanvragen, contacten, artikelen, diensten, voorbeelden, team/FAQ/cases, instellingen, gebruikers). Rollen: OWNER, ADMIN, EDITOR, SALES.
- `src/app/api`: uploads, aanvragen, contact, xlsx-downloads, beheer-exports.
- `src/lib/server`: opslag (buiten /public, ClamAV-scan), e-mail (SMTP of demomodus), rate limiting, Turnstile, sessies, audit.
- `src/models` + `src/components/models`: de 12 interactieve demomodellen. Dezelfde berekening voedt scherm en .xlsx-download.
- `src/content`: standaardteksten (diensten, FAQ, demo-cases, tijdlijn, 100 artikelen). Na de seed is de database leidend; beheer past daar aan.
- `src/config/site.ts`: centrale bedrijfsgegevens en uploadbeleid. Geen verzonnen team, klanten of reviews: vul echte gegevens in via beheer.

## Artikelen "Excel door de jaren"

100 artikelen over 2017–2026, tien per jaar. Het onderwerpjaar staat los van de publicatiedatum.
Artikelen over 2025 en 2026 en enkele andere met onzekere data staan op **REVIEW** met een redactienotitie
(`factNote`). Ze zijn niet zichtbaar voor bezoekers (alleen de titel onder "In redactie") en in beheer te bekijken via **Bekijk**.
Controleer per artikel status, platform en licentie bij Microsoft en zet het daarna op Gepubliceerd.

## Live zetten: checklist

**Verplicht**
1. Database: `provider = "postgresql"` in `prisma/schema.prisma`, `DATABASE_URL` naar PostgreSQL, daarna `npx prisma migrate deploy` of `db push` en de seed.
2. `AUTH_SECRET`: nieuw willekeurig geheim van minimaal 32 tekens (`openssl rand -base64 48`).
3. `ADMIN_EMAIL` / `ADMIN_PASSWORD` voor het eerste eigenaarsaccount; wachtwoord daarna in beheer wijzigen.
4. `NEXT_PUBLIC_SITE_URL="https://www.excelsheets.nl"` en `SITE_INDEXABLE="true"` (alleen op productie).
5. E-mail: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, en `ADMIN_NOTIFY_EMAILS` voor meldingen. Zonder SMTP worden mails alleen als HTML in `storage/private/outbox` gezet.
6. Opslag: `STORAGE_DIR` op een persistente, niet-publieke schijf (geen tijdelijke container-opslag).
7. Virusscan: ClamAV (clamd) draaien en `CLAMAV_HOST`/`CLAMAV_PORT` zetten. In productie worden uploads geweigerd als scannen niet lukt, tenzij `MALWARE_SCAN_REQUIRED=false`.
8. Dagelijkse cron voor `npm run retention`.
9. HTTPS afdwingen bij de hosting (cookies zijn `secure` in productie).

**Inhoud en juridisch**
10. Bedrijfsgegevens (KvK, btw, adres, telefoon, e-mail) via `COMPANY_*`, `CONTACT_*` of beheer > Instellingen.
11. Echte teamleden en foto's in beheer > Team; tot die tijd toont de site geen personen.
12. Privacyverklaring, cookieverklaring en algemene voorwaarden laten toetsen; de voorwaarden staan nu als concept met noindex.
13. Demo-cases vervangen of aanvullen met echte cases, alleen met toestemming van de klant.
14. Artikelen op REVIEW controleren en publiceren.

**Aanbevolen**
15. Cloudflare Turnstile: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` en `TURNSTILE_SECRET_KEY` (honeypot en minimale invultijd werken altijd).
16. Meerdere serverinstanties: rate limiting naar Redis verplaatsen (`src/lib/server/rate-limit.ts`, interface blijft gelijk).
17. Back-ups van database en `STORAGE_DIR`, en monitoring/uptime.
