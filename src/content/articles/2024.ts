import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const PYTHON = { title: "Microsoft Support: Inleiding tot Python in Excel", url: "https://support.microsoft.com/office/introduction-to-python-in-excel-55643c2e-ff56-4168-b1ce-9428c8308545" };
const COPILOT = { title: "Microsoft Learn: Microsoft 365 Copilot", url: "https://learn.microsoft.com/copilot/microsoft-365/" };
const ACCESS = { title: "Microsoft Support: Excel-documenten toegankelijk maken", url: "https://support.microsoft.com/office/make-your-excel-documents-accessible-to-people-with-disabilities-6cc05fc5-1314-48b5-8eb3-683e49b3e593" };
const LTSC = { title: "Microsoft Learn: Overzicht van Office LTSC 2024", url: "https://learn.microsoft.com/office/ltsc/2024/overview" };

export const articles2024: ArticleContent[] = [
  {
    number: 71, slug: "copilot-in-excel-algemeen-beschikbaar", subjectYear: 2024, visual: "ai", status: "PUBLISHED",
    title: "Copilot in Excel algemeen beschikbaar",
    summary: "In 2024 werd Copilot bereikbaar voor organisaties van elke omvang, en in september verliet Copilot in Excel de previewfase. Wat kan het, wat vraagt het, en hoe zet je het verstandig in?",
    topics: ["ai-en-copilot"], serviceLinks: ["excel-op-maat-laten-maken", "excel-controleren-en-herstellen"],
    sources: [COPILOT, EXCELBLOG],
    factNote: "Januari 2024: Copilot for Microsoft 365 beschikbaar voor bedrijven van elke omvang (zonder minimumafname). September 2024: Copilot in Excel algemeen beschikbaar. Nalopen tegen Microsoft-aankondigingen.",
    body: `Waar 2023 het jaar van de aankondigingen was, werd 2024 het jaar waarin AI in Excel echt bereikbaar werd. In januari maakte Microsoft de zakelijke Copilot-licentie beschikbaar voor organisaties van elke omvang, zonder minimumaantal gebruikers. In september 2024 verliet **Copilot in Excel** de previewfase en werd het algemeen beschikbaar voor gebruikers met een geschikte licentie.

## Wat Copilot in Excel kan

- **Vragen stellen over gegevens**: "welke tien klanten hadden de grootste omzetgroei?"
- **Formulekolommen voorstellen**: Copilot stelt een formule voor, legt uit wat die doet en voegt hem toe na bevestiging.
- **Markeren, sorteren en filteren** op basis van een beschrijving.
- **Grafieken en draaitabellen** maken.
- **Inzichten** voorstellen bij een dataset.

Microsoft breidde de mogelijkheden in de loop van 2024 uit, onder meer met ondersteuning voor gegevens die niet als tabel waren opgemaakt en met Python-analyses via Copilot.

## Wat het vraagt

- **Een licentie.** Copilot voor Microsoft 365 is een betaalde aanvulling op het zakelijke abonnement.
- **Opslag in de cloud.** Copilot in Excel werkt met bestanden in OneDrive of SharePoint, met automatisch opslaan aan.
- **Gestructureerde gegevens.** Hoe netter de gegevens, hoe beter de antwoorden.
- **Kritische gebruikers.** Copilot kan fouten maken. Elke voorgestelde formule moet worden begrepen en gecontroleerd.

## Waar het goed werkt

- Snel een eerste analyse van een onbekende dataset.
- Formules voor wie de juiste functie niet kent.
- Uitleg van bestaande formules.
- Ad-hocvragen tijdens een overleg.

## Waar het minder geschikt voor is

- Het **ontwerp** van een bedrijfskritisch model.
- **Rapportages** die elke periode exact gelijk moeten zijn opgebouwd.
- Berekeningen waarbij **bedrijfsregels** een rol spelen die niet in de gegevens staan.

## Gegevens en vertrouwelijkheid

Copilot werkt binnen de Microsoft 365-omgeving van de organisatie en respecteert de bestaande toegangsrechten. Dat betekent ook: als rechten te ruim zijn ingesteld, kan Copilot informatie vinden die een gebruiker eigenlijk niet zou moeten zien. Voor veel organisaties was de komst van Copilot daarom een aanleiding om het rechtenbeheer op orde te brengen.

## Terugblik

Copilot maakte Excel toegankelijker, maar verschoof ook verantwoordelijkheid: van het maken van formules naar het beoordelen ervan. Een goed opgebouwd [model op maat](/diensten/excel-op-maat-laten-maken) en een [onafhankelijke controle](/diensten/excel-controleren-en-herstellen) blijven de basis.`,
    practice: "Overweeg je Copilot? Begin met een proef op niet-gevoelige gegevens, en laat de rechten op je SharePoint-omgeving vooraf nalopen. Zo weet je wat Copilot kan vinden, en voorkom je verrassingen.",
  },
  {
    number: 72, slug: "python-in-excel-algemeen-beschikbaar-voor-windows", subjectYear: 2024, visual: "python", status: "PUBLISHED",
    title: "Python in Excel algemeen beschikbaar voor geschikte Windows-gebruikers",
    summary: "Na een jaar preview werd Python in Excel in september 2024 algemeen beschikbaar voor zakelijke Microsoft 365-gebruikers op Windows. Wat dat betekent voor modellen in de praktijk.",
    topics: ["python"], serviceLinks: ["financiele-modellen", "vba-power-query-automatisering"],
    sources: [PYTHON, EXCELBLOG],
    factNote: "Algemene beschikbaarheid september 2024 voor Microsoft 365 Business en Enterprise op Windows (Current Channel). Status voor web, Mac en particuliere abonnementen apart nalopen.",
    body: `In augustus 2023 kondigde Microsoft Python in Excel aan als preview. In september 2024 volgde de **algemene beschikbaarheid** voor zakelijke gebruikers van Microsoft 365 op Windows. Daarmee werd het voor het eerst een serieuze optie voor productiemodellen, met een paar voorwaarden.

## Voor wie

De algemene beschikbaarheid gold voor:

- **Zakelijke abonnementen** (Business en Enterprise) van Microsoft 365.
- **Excel voor Windows**, in het reguliere updatekanaal.

Voor Excel op het web, Mac en particuliere abonnementen gold een andere status; Microsoft breidde de beschikbaarheid daar in de periode daarna stap voor stap uit.

## Standaard en premium rekenkracht

Bij de algemene beschikbaarheid introduceerde Microsoft onderscheid in rekenkracht. Met de standaardversie kun je Python-formules gebruiken, maar met beperkte rekentijd. Voor snellere berekeningen bood Microsoft een betaalde aanvulling. Voor de meeste bedrijfstoepassingen volstaat de standaardversie; zware simulaties kunnen tegen de grenzen aanlopen.

## Wat het betekent voor modellen

**Gedeelde bestanden.** Een collega die Python in Excel niet heeft, ziet de laatst berekende waarden, maar kan de Python-cellen niet opnieuw berekenen. Stem dus af wie het model gebruikt.

**Gegevens naar de cloud.** Python-code draait in de Microsoft-cloud. Microsoft beschrijft de isolatie en beveiliging in zijn documentatie, maar het blijft een afweging voor gevoelige gegevens.

**Onderhoudbaarheid.** Een model met Python vraagt dat iemand Python kan lezen. Documenteer elke Python-cel.

**Rekenvolgorde.** Python-cellen worden in een vaste volgorde berekend (van links naar rechts, van boven naar beneden per blad). Een model moet daar rekening mee houden.

## Goede toepassingen

- Statistische prognoses en tijdreeksanalyse.
- Uitschieteranalyse in transacties.
- Clustering van klanten of producten.
- Uitgebreide visualisaties.
- Complexe datavoorbereiding voor wie pandas kent.

## Wanneer niet

- Voor de kern van een begroting of jaarrekening: houd die in transparante formules.
- Als de gebruikers geen toegang hebben tot Python in Excel.
- Als de gegevens het tenant niet mogen verlaten volgens intern beleid.

## Terugblik

De algemene beschikbaarheid maakte Python in Excel tot een volwaardig gereedschap. Bij [financiële modellen](/diensten/financiele-modellen) gebruiken we het voor specifieke analyses, met duidelijke afspraken over gebruik en documentatie.`,
    practice: "Ga na of jouw Microsoft 365-licentie en Excel-versie Python in Excel ondersteunen: typ =PY( in een cel. Krijg je een Python-cel, dan kun je ermee aan de slag. Begin met een kopie van niet-gevoelige gegevens.",
  },
  {
    number: 73, slug: "wat-excel-2024-toevoegt-aan-bedrijfsmodellen", subjectYear: 2024, visual: "array", status: "PUBLISHED",
    title: "Wat Excel 2024 toevoegt aan bedrijfsmodellen",
    summary: "In oktober 2024 verscheen Excel 2024 als losse versie, met de tekst- en matrixfuncties uit 2022, LAMBDA, de IMAGE-functie en dynamische grafieken. Wat betekent dat voor gemengde omgevingen?",
    topics: ["formules"], serviceLinks: ["excel-op-maat-laten-maken", "excel-bestand-verbeteren"],
    sources: [LTSC, EXCELBLOG],
    factNote: "Office LTSC 2024 en Office 2024 verschenen 1 oktober 2024 (resp. 16 september commercieel aangekondigd). Functielijst nalopen tegen Microsoft-pagina 'Wat is er nieuw in Excel 2024'.",
    body: `Drie jaar na Excel 2021 verscheen in oktober 2024 **Excel 2024**, als onderdeel van Office 2024 en Office LTSC 2024. Voor organisaties die niet met een Microsoft 365-abonnement werken, kwam daarmee een volgende generatie functies binnen bereik.

## Wat er bij kwam ten opzichte van Excel 2021

- **LAMBDA** en de hulpfuncties (MAP, REDUCE, SCAN, BYROW, BYCOL, MAKEARRAY).
- **De veertien tekst- en matrixfuncties** uit 2022, waaronder TEXTSPLIT, TEXTBEFORE, TEXTAFTER, VSTACK, HSTACK, TAKE, DROP, CHOOSECOLS en CHOOSEROWS.
- **IMAGE**: een afbeelding vanaf een webadres in een cel tonen.
- **Dynamische grafieken**: grafieken die meebewegen met een overlopend bereik.
- Verbeteringen aan toegankelijkheid en een nieuw standaardthema.

## Wat er niet in zat

Functies die Microsoft na de vaststelling van Excel 2024 aan Microsoft 365 toevoegde, zitten niet in de losse versie. Ook **Copilot** en **Python in Excel** zijn gekoppeld aan Microsoft 365 en geen onderdeel van Excel 2024.

## Wat dit betekent voor gemengde omgevingen

Met Excel 2024 ontstaan er grofweg vier groepen gebruikers:

| Versie | Moderne functies |
|---|---|
| Excel 2016 / 2019 | Klassieke functies |
| Excel 2021 | Dynamische matrices, XLOOKUP, LET |
| Excel 2024 | Plus LAMBDA en de tekst- en matrixfuncties uit 2022 |
| Microsoft 365 | Alles, inclusief nieuwere functies, Copilot en Python |

Bij een model dat gedeeld wordt met externe partijen, is het verstandig om uit te gaan van de laagste versie die ermee moet werken. Microsoft heeft ook aangekondigd wanneer de ondersteuning voor oudere versies stopt; voor Office 2016 en 2019 is dat oktober 2025.

## Praktisch

- Inventariseer de versies bij de gebruikers van je belangrijkste modellen.
- Plan de overstap naar moderne functies samen met de upgrade van de laatste gebruikers met een oudere versie.
- Leg in het model vast welke minimale versie nodig is.

## Terugblik

Excel 2024 verkleinde de kloof tussen de losse versie en Microsoft 365, maar die kloof bestaat nog steeds en groeit weer met elke nieuwe functie. Bij [Excel op maat](/diensten/excel-op-maat-laten-maken) leggen we de minimale versie vooraf vast, zodat het model bij iedereen werkt.`,
    practice: "Kijk bij Bestand > Account welke Excel-versie je gebruikt, en vraag dat ook na bij de belangrijkste gebruikers van je modellen. Werkt iedereen met Excel 2024 of Microsoft 365, dan kun je TEXTSPLIT en LAMBDA veilig inzetten.",
  },
  {
    number: 74, slug: "dynamische-grafieken-voor-veranderende-datasets", subjectYear: 2024, visual: "chart", status: "PUBLISHED",
    title: "Dynamische grafieken voor veranderende datasets",
    summary: "Een grafiek die automatisch meegroeit met het aantal periodes, klanten of producten. Wat jarenlang omwegen vroeg, werd met grafieken op basis van dynamische matrices eenvoudiger.",
    topics: ["rapportage", "formules"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [EXCELBLOG, SUPPORT],
    body: `Een bekende ergernis in Excel: je maakt een grafiek van de omzet per maand, en in februari moet je het bereik aanpassen omdat januari erbij is gekomen. Of een grafiek van de top tien klanten, die niet meeverandert als de lijst verandert. Jarenlang waren daar omwegen voor. Met de ondersteuning voor **dynamische matrices in grafieken**, in Microsoft 365 en Excel 2024, werd het eenvoudiger.

## De oude omwegen

- **Tabellen als bron**: een grafiek op een Excel-tabel groeit mee met nieuwe rijen. Dat werkt goed, maar alleen voor de volledige tabel.
- **Benoemde bereiken met OFFSET**: een bereik dat zich aanpast aan het aantal gevulde cellen. Werkt, maar is lastig te onderhouden en vluchtig.
- **Vaste bereiken met ruimte**: een grafiek over twaalf maanden, met lege maanden die als nul worden getoond.

## Grafieken op overlopende bereiken

Met de nieuwe ondersteuning kan een grafiek direct verwijzen naar een **overlopend bereik**, het resultaat van een formule als FILTER, SORT of TAKE. Wordt het resultaat langer of korter, dan past de grafiek zich aan.

Voorbeelden:

- **Top N**: de tien grootste klanten, gesorteerd. Verandert de top tien, dan verandert de grafiek.
- **Selectie door de gebruiker**: alle maanden van het gekozen jaar, of alle producten van de gekozen productgroep.
- **Groeiende tijdreeksen**: alleen de maanden waarvoor al realisatie is.

## Ontwerpregels voor dynamische grafieken

- **Maximale omvang.** Een grafiek die meegroeit tot honderd categorieën is onleesbaar. Beperk met TAKE tot een redelijk aantal en voeg een categorie "overig" toe.
- **Vaste kleuren.** Als de volgorde van categorieën verandert, kan de kleur per categorie verschuiven. Gebruik voor categorieën die een vaste betekenis hebben, liever een vaste volgorde.
- **Lege resultaten.** Wat toont de grafiek als het filter niets oplevert? Een duidelijke melding is beter dan een lege grafiek.
- **As-schaal.** Bij sterk wisselende waarden kan een automatische as misleiden. Overweeg een vaste minimum- of maximumwaarde.

## Compatibiliteit

Grafieken op dynamische matrices werken in Microsoft 365 en Excel 2024. In oudere versies zie je de laatst opgeslagen grafiek, maar past hij zich niet aan.

## Terugblik

Dynamische grafieken maken dashboards levendiger en verminderen onderhoud. In ons [managementdashboard](/voorbeelden/managementdashboard) passen grafieken zich aan de gekozen afdeling en periode aan. Meer bij [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages).`,
    practice: "Heb je grafieken waarvan je elke maand het bereik aanpast? Zet de brongegevens in een tabel, of baseer de grafiek op een FILTER-formule. Dan hoeft dat nooit meer.",
  },
  {
    number: 75, slug: "nieuwe-aandacht-voor-toegankelijkheid-in-excel", subjectYear: 2024, visual: "grid", status: "PUBLISHED",
    title: "Nieuwe aandacht voor toegankelijkheid in Excel",
    summary: "Een Excel-bestand moet bruikbaar zijn voor iedereen, ook voor mensen met een visuele beperking of die met een schermlezer werken. Microsoft gaf toegankelijkheid in 2024 meer zichtbaarheid. Wat kun je zelf doen?",
    topics: ["modelontwerp", "rapportage"], serviceLinks: ["excel-op-maat-laten-maken", "dashboards-en-managementrapportages"],
    sources: [ACCESS, EXCELBLOG],
    factNote: "Datering 'Toegankelijkheidslint' en nieuwe standaardopmaak (Aptos) nalopen; deze kwamen in 2023-2024 beschikbaar in Microsoft 365 en zitten in Excel 2024.",
    body: `Toegankelijkheid is in Excel lang een ondergeschoven kindje geweest. Toch gebruiken veel mensen Excel met een schermlezer, met een hoge vergroting of met beperkt kleurenzicht. Microsoft gaf toegankelijkheid de afgelopen jaren meer aandacht, met onder meer de **Toegankelijkheidscontrole**, een eigen **Toegankelijkheidslint** en een nieuw standaardlettertype en -thema met betere leesbaarheid. Met Excel 2024 kwamen die verbeteringen ook in de losse versie.

## Waarom het ertoe doet

- **Collega's en klanten** met een beperking moeten met je bestanden kunnen werken.
- **Overheden en publieke organisaties** hebben wettelijke toegankelijkheidseisen voor documenten.
- **Iedereen profiteert**: een toegankelijk bestand is ook duidelijker voor wie geen beperking heeft.

## Veelvoorkomende problemen

- **Kleur als enige betekenisdrager**: rood voor fout, groen voor goed, zonder tekst of symbool.
- **Te weinig contrast** tussen tekst en achtergrond.
- **Samengevoegde cellen**, die schermlezers in de war brengen.
- **Grafieken zonder alternatieve tekst.**
- **Tabbladen zonder betekenisvolle naam**, zoals "Blad3".
- **Lege rijen en kolommen** als opmaak, waardoor een schermlezer denkt dat de tabel eindigt.
- **Tabellen zonder kopregel.**

## Wat je kunt doen

1. **Draai de Toegankelijkheidscontrole** (tabblad Controleren). Die vindt veel problemen automatisch.
2. **Gebruik tabellen** met een kopregel, zodat schermlezers kolomnamen voorlezen.
3. **Geef grafieken en afbeeldingen alternatieve tekst** die de kern van de grafiek beschrijft.
4. **Combineer kleur met tekst of symbolen**: niet alleen een rode cel, maar ook "Afwijking" of een pictogram.
5. **Zorg voor voldoende contrast**, en gebruik geen lichtgrijze tekst op wit.
6. **Vermijd samengevoegde cellen**; gebruik "Centreren over selectie" voor koppen.
7. **Geef tabbladen duidelijke namen.**
8. **Begin elk blad in cel A1** met een titel die zegt wat er op het blad staat.

## Toegankelijkheid in dashboards

Dashboards zijn extra gevoelig: veel kleur, veel grafieken, weinig tekst. Een toegankelijk dashboard heeft voor elk visueel element ook een tekstuele samenvatting, en een kleurgebruik dat ook bij kleurenblindheid werkt.

## Terugblik

Toegankelijkheid is een kwestie van goed ontwerp. Wij bouwen onze modellen en deze website met toegankelijkheid als uitgangspunt; lees meer op onze pagina over [toegankelijkheid](/toegankelijkheid). Voor maatwerk zie [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages).`,
    practice: "Open je belangrijkste rapport en kies Controleren > Toegankelijkheid controleren. Los de eerste drie meldingen op. Meestal kost dat een kwartier en wordt het rapport voor iedereen duidelijker.",
  },
  {
    number: 76, slug: "checkboxen-in-excel-en-nieuwe-invoermogelijkheden", subjectYear: 2024, visual: "grid", status: "REVIEW",
    title: "Checkboxen in Excel en nieuwe invoermogelijkheden",
    summary: "In 2024 kreeg Excel in Microsoft 365 selectievakjes die je direct in een cel plaatst, als WAAR/ONWAAR-waarde. Een kleine functie met grote gevolgen voor checklists, takenlijsten en planningen.",
    topics: ["modelontwerp", "formules"], serviceLinks: ["planning-en-operationele-tools"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "Selectievakjes in cellen: Insiders eind 2023/begin 2024, algemene beschikbaarheid in Microsoft 365 in de loop van 2024. Beschikbaarheid per platform en in Excel 2024 (LTSC) nalopen.",
    body: `Selectievakjes in Excel bestonden al lang, maar als **formulierbesturingselement**: een los object dat boven de cellen zweeft en via een koppeling een waarde in een cel zet. Lastig om te kopiëren, lastig om uit te lijnen, en een bron van ergernis bij het sorteren. In 2024 voegde Microsoft aan Microsoft 365 **selectievakjes in de cel** toe.

## Hoe het werkt

Je selecteert een bereik en kiest Invoegen > Selectievakje. Elke cel krijgt een selectievakje. De waarde van de cel is **WAAR** (aangevinkt) of **ONWAAR** (niet aangevinkt). Daarmee gedraagt het vakje zich als elke andere celwaarde:

- **Kopiëren, sorteren en filteren** werkt gewoon.
- **Formules** kunnen direct naar de cel verwijzen.
- **Voorwaardelijke opmaak** kan op de waarde reageren.

## Toepassingen

**Checklists.** Een maandafsluitingschecklist met een vinkje per stap, en een voortgangspercentage met COUNTIF.

**Takenlijsten en planningen.** Afgeronde taken grijs maken met voorwaardelijke opmaak, en filteren op wat nog openstaat.

**Selecties voor berekeningen.** Welke projecten nemen we mee in de prognose? Vink aan, en de totalen passen zich aan met FILTER of SUMIFS.

**Instellingen.** Een vinkje voor "toon btw" of "inclusief intercompany" op het aannameblad.

**Goedkeuring.** Een vinkje per regel dat aangeeft of een post is gecontroleerd.

## Aandachtspunten

- **Compatibiliteit.** In versies zonder ondersteuning zie je de onderliggende WAAR/ONWAAR-waarde in plaats van een vakje. Het model blijft werken, maar ziet er anders uit.
- **Geen audittrail.** Een vinkje zegt niet wie het heeft gezet en wanneer. Voor formele goedkeuringen is een kolom met naam en datum, of een systeem met logging, beter.
- **Per ongeluk aanvinken.** Bij gedeelde bestanden is één klik genoeg. Bescherm vakjes die niet door iedereen mogen worden aangepast.

## Andere nieuwe invoermogelijkheden

In dezelfde periode verbeterde Microsoft ook andere invoerfuncties, zoals keuzelijsten met zoekfunctie bij gegevensvalidatie. Samen maken ze Excel geschikter als eenvoudig invoerformulier, zonder macro's.

## Terugblik

Een kleine functie, maar typisch voor de richting van Excel: minder objecten en macro's, meer functionaliteit in de cel zelf. Bij [planning en operationele tools](/diensten/planning-en-operationele-tools) gebruiken we selectievakjes voor checklists en selecties, waar de Excel-versies van de gebruikers het toelaten.`,
    practice: "Heb je een checklist in Excel met een kolom waarin 'x' of 'ja' wordt getypt? Vervang die door selectievakjes, en voeg een voortgangsbalk toe met het aantal aangevinkte stappen. Het maakt de lijst direct overzichtelijker.",
  },
  {
    number: 77, slug: "nieuwe-tekst-en-matrixfuncties-in-excel-2024", subjectYear: 2024, visual: "array", status: "REVIEW",
    title: "Nieuwe tekst- en matrixfuncties in 2024",
    summary: "GROUPBY, PIVOTBY, PERCENTOF en de reguliere-expressiefuncties: in 2024 voegde Microsoft aan Microsoft 365 functies toe die samenvatten en tekstbewerkingen naar een hoger niveau tillen. Een overzicht, met aandacht voor wat in welke versie zit.",
    topics: ["formules"], serviceLinks: ["dashboards-en-managementrapportages", "excel-bestand-verbeteren"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "GROUPBY/PIVOTBY/PERCENTOF: aangekondigd eind 2023 (Insiders), algemeen beschikbaar in Microsoft 365 in 2024. REGEXTEST/REGEXEXTRACT/REGEXREPLACE: aangekondigd mei 2024 (Insiders), algemene beschikbaarheid later. Geen van deze functies zit in Excel 2024 (LTSC); nalopen.",
    body: `De titel van dit onderwerp zou kunnen doen denken dat Excel 2024 vol nieuwe functies zat. In werkelijkheid bevatte de losse versie Excel 2024 vooral functies die Microsoft 365-gebruikers al eerder hadden, zoals de tekst- en matrixfuncties uit 2022. Wie in 2024 met Microsoft 365 werkte, kreeg er een nieuwe generatie bij. Een overzicht, met nadruk op de vraag waar je ze kunt gebruiken.

## GROUPBY en PIVOTBY

**GROUPBY** groepeert gegevens op een of meer kolommen en berekent per groep een samenvatting, zoals een som of gemiddelde. **PIVOTBY** doet hetzelfde in twee richtingen, als een draaitabel in één formule.

Het voordeel ten opzichte van een draaitabel: het resultaat werkt **direct bij** als de gegevens veranderen, zonder te verversen, en is te combineren met andere formules. Het voordeel ten opzichte van SUMIFS: je hoeft de lijst met groepen niet zelf op te bouwen.

## PERCENTOF

**PERCENTOF** berekent het aandeel van een deel in het geheel. Handig als samenvattingsfunctie binnen GROUPBY en PIVOTBY, bijvoorbeeld voor het aandeel van elke klant in de totale omzet.

## Reguliere expressies

Met **REGEXTEST**, **REGEXEXTRACT** en **REGEXREPLACE** kun je tekst controleren, uitknippen en vervangen op basis van een patroon. Voorbeelden:

- Controleren of een postcode het Nederlandse formaat heeft.
- Een factuurnummer van een vast patroon uit een omschrijving halen.
- Alle niet-cijfers uit een telefoonnummer verwijderen.

Reguliere expressies zijn krachtig, maar ook cryptisch. Documenteer elk patroon en test het op echte gegevens.

## Wat zit waar?

| Functie | Microsoft 365 | Excel 2024 |
|---|---|---|
| TEXTSPLIT, VSTACK, TAKE e.a. (2022) | Ja | Ja |
| LAMBDA en hulpfuncties | Ja | Ja |
| GROUPBY, PIVOTBY, PERCENTOF | Ja | Nee |
| REGEX-functies | Ja (na uitrol) | Nee |

## Wanneer gebruiken?

Voor interne modellen bij organisaties die volledig met Microsoft 365 werken, zijn GROUPBY en PIVOTBY een aanwinst voor rapportages. Voor modellen die met externe partijen worden gedeeld, is voorzichtigheid geboden.

## Terugblik

De snelheid waarmee Microsoft nieuwe functies toevoegt, maakt het belangrijk om bij elk model vast te leggen welke versie nodig is. Bij het [verbeteren van een bestaand bestand](/diensten/excel-bestand-verbeteren) kijken we welke nieuwe functies echte winst opleveren voor jouw situatie.`,
    practice: "Heb je draaitabellen die je steeds moet verversen, of SUMIFS-overzichten met een handmatig bijgehouden lijst van groepen? Als je organisatie volledig op Microsoft 365 werkt, probeer dan GROUPBY als alternatief.",
  },
  {
    number: 78, slug: "slimmere-financiele-analyses-met-python", subjectYear: 2024, visual: "python", status: "PUBLISHED",
    title: "Slimmere financiële analyses met Python",
    summary: "Met de algemene beschikbaarheid van Python in Excel en de koppeling met Copilot werd het in 2024 eenvoudiger om geavanceerde analyses te maken. Drie uitgewerkte toepassingen voor de financiële afdeling.",
    topics: ["python", "finance", "ai-en-copilot"], serviceLinks: ["financiele-modellen"],
    sources: [PYTHON, EXCELBLOG],
    factNote: "Copilot in Excel met Python (geavanceerde analyse): preview aangekondigd september 2024. Status nalopen.",
    body: `Met de algemene beschikbaarheid van Python in Excel in september 2024 kondigde Microsoft ook een preview aan van **Copilot in Excel met Python**: Copilot schrijft de Python-code op basis van een vraag in gewone taal. Daarmee kwamen geavanceerde analyses binnen bereik van wie zelf geen Python schrijft. Drie toepassingen voor de financiële afdeling.

## 1. Debiteurenanalyse

**Vraag:** welke klanten betalen structureel later dan de afgesproken termijn, en wordt dat erger?

**Aanpak:** op basis van de betaalhistorie per klant bereken je het gemiddelde aantal dagen te laat, de spreiding en de trend. Een clusteranalyse groepeert klanten in betaalprofielen. De uitkomst gebruik je in de [liquiditeitsprognose](/voorbeelden/liquiditeitsprognose) om de verwachte ontvangsten realistischer in te plannen.

## 2. Omzetprognose met seizoenspatroon

**Vraag:** wat is een realistische omzetverwachting voor de komende twaalf maanden?

**Aanpak:** een tijdreeksmodel op de maandomzet van de afgelopen jaren, dat trend en seizoenspatroon scheidt. Het resultaat is een prognose met een bandbreedte. Belangrijk: de statistische prognose is een startpunt. Bekende ontwikkelingen, zoals een nieuwe klant of een prijsverhoging, voeg je er als aanpassing aan toe.

## 3. Afwijkende boekingen

**Vraag:** zitten er boekingen tussen die afwijken van het normale patroon?

**Aanpak:** per rekening en leverancier bepaal je wat normaal is qua bedrag, frequentie en tijdstip. Boekingen die sterk afwijken, komen op een lijst voor nadere controle. Dat vervangt de accountantscontrole niet, maar helpt bij de interne beheersing.

## Wat je moet regelen

- **Documentatie.** Elke analyse krijgt een beschrijving: welke gegevens, welke methode, welke aannames.
- **Controle.** Door Copilot gegenereerde code wordt beoordeeld door iemand die Python leest, of de uitkomst wordt gecontroleerd tegen een bekende waarde.
- **Reproduceerbaarheid.** Dezelfde gegevens moeten dezelfde uitkomst geven. Stel bij willekeurige methoden een vaste startwaarde in.
- **Vertrouwelijkheid.** Gegevens worden in de cloud verwerkt. Ga na of dat past bij het beleid voor de betreffende gegevens.

## Terugblik

Python en Copilot maken analyses toegankelijker, maar de vraag welke analyse zinvol is en hoe je de uitkomst interpreteert, blijft vakwerk. Bij [financiële modellen](/diensten/financiele-modellen) combineren we deze analyses met een transparant model, zodat de uitkomsten herleidbaar blijven.`,
    practice: "Kies één terugkerende vraag waar je nu geen goed antwoord op hebt, zoals het betaalgedrag van klanten. Verzamel de historie in één nette tabel. Dat is de voorbereiding die elke analyse nodig heeft, met of zonder Python.",
  },
  {
    number: 79, slug: "de-praktische-grenzen-van-ai-gegenereerde-formules", subjectYear: 2024, visual: "ai", status: "PUBLISHED",
    title: "De praktische grenzen van AI-gegenereerde formules",
    summary: "Copilot en andere AI-assistenten schrijven formules in seconden. Maar wanneer gaat het mis, en hoe herken je dat? Vijf patronen uit de praktijk.",
    topics: ["ai-en-copilot", "formules", "modelontwerp"], serviceLinks: ["excel-controleren-en-herstellen"],
    sources: [COPILOT],
    body: `Met Copilot in Excel algemeen beschikbaar en AI-chatbots binnen ieders bereik, werd het in 2024 gewoon om een formule te laten schrijven in plaats van hem zelf te bedenken. Dat werkt vaak goed. Maar er zijn patronen waarin het regelmatig misgaat. Wie ze kent, kan ze herkennen.

## 1. De verkeerde kolom

Een tabel met "Bedrag", "Bedrag excl." en "Bedrag incl. btw". De vraag "totale omzet per klant" levert een formule op die de verkeerde kolom optelt. Het resultaat is een getal dat realistisch lijkt.

**Herkennen:** controleer welke kolommen in de formule worden gebruikt.

## 2. Ontbrekende uitzonderingen

"Omzet per maand" zonder rekening te houden met creditnota's, intercompany-omzet of geannuleerde orders. De AI kent die bedrijfsregels niet, tenzij je ze expliciet noemt.

**Herkennen:** vergelijk het totaal met een bekende bron, zoals de omzet uit de boekhouding.

## 3. Absolute en relatieve verwijzingen

Een formule werkt in de eerste rij, maar na doortrekken verschuift een verwijzing die vast had moeten staan, of andersom.

**Herkennen:** controleer de formule in de eerste, middelste en laatste rij.

## 4. Te complexe oplossingen

De AI levert een indrukwekkende formule van vijf regels, waar een eenvoudige SUMIFS hetzelfde had gedaan. Werkt, maar is onleesbaar voor de volgende gebruiker.

**Herkennen:** vraag je af of je de formule aan een collega kunt uitleggen. Zo niet, vraag om een eenvoudigere variant.

## 5. Versie-afhankelijke functies

De AI gebruikt een functie die in jouw Excel-versie, of in die van de ontvanger, niet bestaat.

**Herkennen:** test het bestand in de versie van de gebruikers.

## Een werkwijze die werkt

- **Formuleer precies**: noem de kolommen, de periode, de uitzonderingen.
- **Vraag om uitleg** bij de formule, en lees die kritisch.
- **Test op een bekend antwoord**: een klant of maand waarvan je de uitkomst weet.
- **Bouw controles in**: totalen die moeten aansluiten op een bron.
- **Houd het eenvoudig**: een leesbare formule is beter dan een slimme.

## De grens

AI is goed in het vertalen van een duidelijke vraag naar een formule. AI is niet goed in het bedenken van de juiste vraag, of in het kennen van de context van jouw bedrijf. Die twee blijven mensenwerk.

## Terugblik

Bij een [controle van een model](/diensten/excel-controleren-en-herstellen) zien we steeds vaker AI-gegenereerde formules. De fouten zijn anders dan menselijke fouten, maar met de juiste controles net zo goed op te sporen.`,
    practice: "Laat de volgende keer dat je een formule door AI laat schrijven, de AI ook uitleggen wat de formule doet in gewone taal. Klopt de uitleg met wat je bedoelde? Dat is de snelste eerste controle.",
  },
  {
    number: 80, slug: "excel-dashboards-in-een-wereld-van-realtime-rapportage", subjectYear: 2024, visual: "chart", status: "PUBLISHED",
    title: "Excel-dashboards in een wereld van realtime rapportage",
    summary: "Management verwacht steeds vaker actuele cijfers, niet een rapport van vorige maand. Wat betekent dat voor Excel-dashboards, en wanneer is een ander gereedschap beter?",
    topics: ["rapportage", "data-en-power-query"], serviceLinks: ["dashboards-en-managementrapportages", "vba-power-query-automatisering"],
    sources: [EXCELBLOG, { title: "Microsoft Learn: Power BI-documentatie", url: "https://learn.microsoft.com/power-bi/" }],
    body: `"Kan ik niet gewoon zien hoe het er vandaag voor staat?" Het is een vraag die controllers steeds vaker horen. Bankrekeningen zijn realtime, webshops tonen live bestellingen, en planningssystemen weten op elk moment wat er gebeurt. Een maandrapport dat twee weken na het einde van de maand verschijnt, voelt dan traag.

## Wat realtime eigenlijk betekent

Echte realtime rapportage, waarbij elke transactie direct zichtbaar is, is voor de meeste managementvragen niet nodig en soms zelfs onwenselijk. Cijfers van vandaag zijn vaak onvolledig: facturen zijn nog niet geboekt, voorraadcorrecties nog niet verwerkt. Wat management meestal wil, is:

- **Actueel**: cijfers van gisteren of van deze week, niet van vorige maand.
- **Betrouwbaar**: cijfers die kloppen, ook als ze nog niet definitief zijn.
- **Zonder handwerk**: niemand die eerst een rapport moet maken.

## Wat Excel kan

- **Power Query** ververst gegevens uit bronnen bij het openen van het bestand of met een klik.
- **Verbindingen met databases en online bronnen** halen actuele gegevens op.
- **Office Scripts en Power Automate** kunnen een dashboard op vaste tijden verversen en de kerncijfers verspreiden.
- **Bestanden in SharePoint** zijn altijd de nieuwste versie.

Voor dagelijkse of wekelijkse actualiteit is Excel daarmee prima geschikt.

## Wanneer Power BI beter is

- **Automatisch verversen** in de cloud, zonder dat iemand het bestand opent.
- **Veel gebruikers** met verschillende rechten op dezelfde gegevens.
- **Grote datavolumes**.
- **Mobiel gebruik** met een app.

## Een combinatie

Veel organisaties kiezen voor beide:

- **Power BI** voor operationele dashboards die vaak worden bekeken.
- **Excel** voor financiële analyses, begrotingen en rapportages waar financials in willen rekenen, toelichten en corrigeren.
- **Gedeelde gegevens**: Excel kan verbinding maken met Power BI-datasets, zodat beide dezelfde cijfers gebruiken.

## Actualiteit en betrouwbaarheid

Hoe actueler, hoe belangrijker het is om te laten zien hoe definitief een cijfer is. Een goed dashboard toont:

- **Wanneer** de gegevens voor het laatst zijn ververst.
- **Welke periode** al is afgesloten en welke nog voorlopig is.
- **Welke controles** zijn uitgevoerd.

## Terugblik

Excel blijft een sterk gereedschap voor managementrapportages, mits de gegevens automatisch binnenkomen en de status duidelijk is. Bij [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages) adviseren we eerlijk wanneer Excel de beste keuze is, en wanneer Power BI beter past.`,
    practice: "Vraag je managementteam welke drie cijfers ze graag vaker zouden zien. Vaak blijkt dat een wekelijks overzicht van die drie cijfers meer oplevert dan een realtime dashboard met alles.",
  },
];
