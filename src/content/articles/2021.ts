import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const WHATSNEW2021 = { title: "Microsoft Support: Wat is er nieuw in Excel 2021 voor Windows", url: "https://support.microsoft.com/excel" };
const SCRIPTS = { title: "Microsoft Learn: Office Scripts in Excel", url: "https://learn.microsoft.com/office/dev/scripts/overview/excel" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };
const LEARN_M365 = { title: "Microsoft Learn: SharePoint en OneDrive", url: "https://learn.microsoft.com/sharepoint/" };

export const articles2021: ArticleContent[] = [
  {
    number: 41, slug: "wat-excel-2021-toevoegt-aan-professioneel-spreadsheetgebruik", subjectYear: 2021, visual: "array", status: "PUBLISHED",
    title: "Wat Excel 2021 toevoegt aan professioneel spreadsheetgebruik",
    summary: "In oktober 2021 verscheen Excel 2021 als losse versie. Daarmee kwamen dynamische matrices, XLOOKUP en LET ook beschikbaar voor organisaties zonder Microsoft 365-abonnement.",
    topics: ["formules"], serviceLinks: ["excel-bestand-verbeteren", "excel-op-maat-laten-maken"],
    sources: [WHATSNEW2021, EXCELBLOG],
    factNote: "Releasedatum Office 2021 / Office LTSC 2021: oktober 2021. Functielijst controleren tegen de Microsoft-pagina.",
    body: `Niet elke organisatie werkt met een Microsoft 365-abonnement. Veel bedrijven, overheden en instellingen gebruiken een losse versie van Office die jarenlang meegaat. Voor hen was het lang wachten op de functies die Microsoft 365-gebruikers al een tijd hadden. In oktober 2021 verscheen **Excel 2021**, als onderdeel van Office 2021 en Office LTSC 2021.

## Wat er bij kwam

Excel 2021 bracht een groot deel van de formulevernieuwing van de jaren daarvoor naar de losse versie:

- **Dynamische matrices** en de bijbehorende functies: FILTER, SORT, SORTBY, UNIQUE, SEQUENCE en RANDARRAY.
- **XLOOKUP en XMATCH** als moderne zoekfuncties.
- **LET** voor benoemde tussenstappen in formules.
- Verbeteringen aan samenwerken en prestaties.

## Waarom dit belangrijk was

**Gemengde omgevingen werden eenvoudiger.** Tot 2021 kon een model met XLOOKUP alleen veilig worden gedeeld als iedereen Microsoft 365 had. Met Excel 2021 kwam er een tweede groep gebruikers bij die dezelfde formules kon lezen.

**Externe uitwisseling.** Accountants, banken en klanten met Excel 2021 of nieuwer kunnen modellen met moderne functies openen. Gebruikers van Excel 2016 en 2019 nog steeds niet.

**Een nieuw basisniveau.** Wie modellen bouwt voor een breed publiek, kon vanaf dat moment uitgaan van Excel 2021 als minimum, in plaats van Excel 2016.

## Wat er niet in zat

Een losse versie ontvangt na de release geen nieuwe functies meer, alleen beveiligingsupdates. Wat Microsoft na de vaststelling van Excel 2021 toevoegde, zoals LAMBDA en de nieuwe tekstfuncties, kwam dus niet in Excel 2021 terecht. Wie altijd de nieuwste functies wil, heeft Microsoft 365 nodig.

## Wat dit betekent bij het bouwen van een model

Bij elk model dat we maken, stellen we vooraf vast in welke versies het moet werken. Dat bepaalt welke functies we gebruiken:

- **Alleen Microsoft 365**: alle moderne functies.
- **Microsoft 365 en Excel 2021**: dynamische matrices, XLOOKUP en LET, maar geen LAMBDA of nieuwere tekstfuncties.
- **Ook oudere versies**: klassieke functies, met INDEX/MATCH in plaats van XLOOKUP.

Het is geen technisch detail, maar een ontwerpkeuze die bepaalt of het model straks bij iedereen werkt. Bij [Excel op maat](/diensten/excel-op-maat-laten-maken) leggen we die keuze vooraf met je vast.`,
    practice: "Inventariseer welke Excel-versies er binnen en buiten je organisatie met je belangrijkste bestanden werken. Werkt iedereen met Microsoft 365 of Excel 2021 en nieuwer, dan kun je veilig overstappen op dynamische matrices en XLOOKUP.",
  },
  {
    number: 42, slug: "office-scripts-voor-excel-op-het-web", subjectYear: 2021, visual: "script", status: "REVIEW",
    title: "Office Scripts beschikbaar voor Excel op het web",
    summary: "Met Office Scripts kun je taken in Excel op het web automatiseren met TypeScript, en ze koppelen aan Power Automate. Een moderne aanvulling op VBA, met eigen sterke en zwakke punten.",
    topics: ["automatisering"], serviceLinks: ["vba-power-query-automatisering"],
    sources: [SCRIPTS, EXCELBLOG],
    factNote: "Datum algemene beschikbaarheid Office Scripts (zakelijke licenties) verifiëren; preview vanaf 2020. Licentievoorwaarden per abonnement nalopen.",
    body: `VBA is al decennia de standaard om Excel te automatiseren, maar het werkt niet in de browser. Toen steeds meer mensen Excel op het web gingen gebruiken, ontstond een gat. Microsoft vulde dat met **Office Scripts**: automatisering voor Excel op het web, geschreven in TypeScript. Na een previewperiode in 2020 kwam de functie in de loop van 2021 breder beschikbaar voor zakelijke Microsoft 365-licenties.

## Hoe Office Scripts werken

Een script is een reeks stappen die Excel uitvoert: gegevens ophalen uit een tabel, opmaak toepassen, een rapport opbouwen, waarden controleren. Je kunt een script op twee manieren maken:

- **Opnemen**: met de actierecorder neem je je handelingen op. Excel zet ze om in code.
- **Schrijven**: in de code-editor schrijf of bewerk je het script zelf.

Scripts worden opgeslagen in OneDrive of SharePoint, niet in de werkmap. Dat maakt ze herbruikbaar over meerdere bestanden.

## De kracht van Power Automate

Het belangrijkste verschil met VBA is de koppeling met **Power Automate**. Een script kan worden gestart door een gebeurtenis buiten Excel:

- Een nieuw bestand in een SharePoint-map wordt automatisch verwerkt.
- Elke maandagochtend wordt een rapport bijgewerkt en gemaild.
- Een formulier dat wordt ingevuld, voegt een regel toe aan een tabel.

Zo wordt Excel onderdeel van een geautomatiseerd proces, zonder dat iemand het bestand hoeft te openen.

## Office Scripts of VBA?

| | VBA | Office Scripts |
|---|---|---|
| Werkt in | Excel voor Windows en Mac | Excel op het web (en later ook desktop) |
| Taal | Visual Basic | TypeScript |
| Opslag | In de werkmap (.xlsm) | Los, in OneDrive/SharePoint |
| Koppeling met andere systemen | Beperkt | Via Power Automate |
| Toegang tot het bestandssysteem | Ja | Nee |

VBA kan meer met de lokale computer, zoals bestanden openen en andere programma's aansturen. Office Scripts zijn beperkter, maar veiliger en beter geschikt voor processen in de cloud.

## Wanneer kiezen we wat?

Voor bestaande desktopprocessen met veel bestanden op een netwerkschijf blijft VBA vaak praktisch. Voor nieuwe processen die in Microsoft 365 draaien, zijn Office Scripts in combinatie met Power Automate meestal de betere keuze. Bij [automatisering](/diensten/vba-power-query-automatisering) maken we die afweging per proces.`,
    practice: "Is er een Excel-taak die je elke week op een vast moment uitvoert, op een bestand in SharePoint of OneDrive? Dat is een typische kandidaat voor een Office Script dat door Power Automate automatisch wordt gestart.",
  },
  {
    number: 43, slug: "excel-bestanden-centraal-delen-en-beheren", subjectYear: 2021, visual: "collab", status: "PUBLISHED",
    title: "Excel-bestanden centraal delen en beheren",
    summary: "Na een jaar thuiswerken was duidelijk dat bestanden in de mail en op de desktop niet werkten. In 2021 gingen veel organisaties over op centrale opslag in SharePoint en Teams. Wat betekent dat voor Excel-modellen?",
    topics: ["samenwerken", "veiligheid"], serviceLinks: ["doorontwikkeling-en-onderhoud", "excel-bestand-verbeteren"],
    sources: [LEARN_M365, SUPPORT],
    body: `In 2020 werd veel geïmproviseerd: bestanden via de mail, kopieën op laptops, netwerkschijven via een trage VPN. In 2021 gingen veel organisaties structureler te werk. Teams werd de plek voor overleg, en daarachter SharePoint de plek voor documenten. Voor Excel-modellen bracht dat voordelen, maar ook een paar valkuilen.

## De voordelen

**Eén actuele versie.** Iedereen werkt in hetzelfde bestand, via de browser, de desktop-app of Teams.

**Versiegeschiedenis.** Elke wijziging wordt bewaard en is terug te halen.

**Rechtenbeheer.** Per map of bestand bepaal je wie mag lezen en wie mag bewerken. Toegang intrekken is één handeling.

**Toegang overal.** Van kantoor, thuis of onderweg.

## De valkuilen

**Externe koppelingen breken.** Een model dat verwijst naar een ander bestand op de netwerkschijf, vindt die bron niet meer na de verhuizing naar SharePoint. Koppelingen moeten worden aangepast of vervangen door Power Query.

**Macro's.** Werkmappen met VBA werken niet in de browser en niet in Teams. Gebruikers moeten het bestand openen in de desktop-app. Bovendien blokkeert Windows macro's in bestanden die van internet komen, wat vanaf 2022 strenger werd afgedwongen.

**Te ruime rechten.** Een map die met "iedereen in de organisatie" wordt gedeeld, maakt salarisgegevens of klantgegevens onbedoeld breed toegankelijk.

**Synchronisatie.** Bestanden die via de OneDrive-app worden gesynchroniseerd, kunnen conflicten opleveren als iemand offline werkt.

## Een goede inrichting

- Een vaste mapstructuur per proces: invoer, model, uitvoer, archief.
- Rechten op mapniveau, niet per bestand, en zo beperkt als nodig.
- Gevoelige modellen in een aparte, afgeschermde bibliotheek.
- Afspraken over wie het model beheert en wie alleen invoert.
- Power Query-verbindingen naar SharePoint in plaats van naar lokale paden.

## Terugblik

Centrale opslag is de basis voor samenwerken en voor automatisering met Power Automate en Office Scripts. Bij de overgang naar SharePoint lopen we bestaande modellen na op koppelingen, macro's en rechten. Dat voorkomt dat een werkend model na de verhuizing ineens foutmeldingen geeft. Zie ook [vertrouwelijkheid](/vertrouwelijkheid) voor hoe wij met jouw bestanden omgaan.`,
    practice: "Open je belangrijkste model en kijk onder Gegevens naar 'Koppelingen bewerken'. Verwijst het naar bestanden op een lokale schijf of netwerkpad? Dan breekt het bij een verhuizing naar SharePoint, en is het tijd om die koppelingen te vervangen.",
  },
  {
    number: 44, slug: "moderne-excel-formules-versus-traditionele-vba", subjectYear: 2021, visual: "script", status: "PUBLISHED",
    title: "Moderne Excel-formules versus traditionele VBA",
    summary: "Veel macro's werden ooit geschreven omdat formules tekortschoten. Met dynamische matrices, LET en Power Query is een deel van die macro's overbodig geworden. Wanneer vervang je VBA, en wanneer niet?",
    topics: ["automatisering", "formules"], serviceLinks: ["vba-power-query-automatisering", "excel-bestand-verbeteren"],
    sources: [SUPPORT, PQDOCS],
    body: `In veel bedrijven draaien macro's die tien of twintig jaar geleden zijn geschreven. Vaak door een collega die er niet meer werkt. Een deel van die macro's doet iets wat Excel inmiddels zelf kan. Rond 2021, met dynamische matrices en Power Query breed beschikbaar, was het een goed moment om de balans op te maken.

## Wat macro's vaak doen

Een groot deel van de bedrijfsmacro's valt in een paar categorieën:

1. **Gegevens importeren en opschonen**: een export openen, kolommen verwijderen, regels filteren, plakken in het model.
2. **Lijsten maken**: alle regels die aan een voorwaarde voldoen, naar een ander blad kopiëren.
3. **Sorteren en ontdubbelen.**
4. **Rapporten opmaken en verspreiden**: PDF maken, mailen.
5. **Invoer controleren** en meldingen geven.

## Wat moderne Excel overneemt

- Categorie 1 is het domein van **Power Query**: vastgelegde stappen, zonder code, beter controleerbaar.
- Categorie 2 en 3 zijn met **FILTER, SORT en UNIQUE** een formule geworden die altijd actueel is.
- Categorie 5 kan voor een groot deel met **datavalidatie** en **voorwaardelijke opmaak**.

## Waar VBA nog steeds sterk is

- Interactie met andere programma's, zoals Outlook of Word.
- Werken met veel bestanden op een netwerkschijf: openen, bewerken, opslaan.
- Gebruikersformulieren met complexe logica.
- Taken die stapsgewijs gebruikersinvoer nodig hebben.

## De voordelen van vervangen

**Transparantie.** Een formule of Power Query-stap is zichtbaar en controleerbaar. Een macro is een zwarte doos voor wie geen VBA leest.

**Veiligheid.** Werkmappen zonder macro's kunnen als .xlsx worden opgeslagen, worden niet geblokkeerd door beveiligingsinstellingen en werken in de browser.

**Onderhoud.** Meer mensen begrijpen formules dan VBA.

## De risico's van vervangen

Een macro die al jaren werkt, bevat vaak uitzonderingen die nergens zijn gedocumenteerd. Bij vervanging moeten die worden gevonden. Daarom vergelijken we bij een migratie altijd de uitkomsten van de oude en de nieuwe aanpak, op meerdere perioden.

## Terugblik

De vraag is niet "VBA of formules", maar "wat is voor deze taak het meest transparante en onderhoudbare gereedschap". Bij het [verbeteren van een bestaand bestand](/diensten/excel-bestand-verbeteren) beoordelen we elke macro afzonderlijk.`,
    practice: "Open de VBA-editor (Alt+F11) in je belangrijkste werkmap en kijk welke macro's er zijn. Schrijf bij elke macro in één zin op wat hij doet. Macro's die gegevens importeren, filteren of sorteren, zijn waarschijnlijk te vervangen.",
  },
  {
    number: 45, slug: "financiele-modellen-bouwen-voor-meerdere-gebruikers", subjectYear: 2021, visual: "collab", status: "PUBLISHED",
    title: "Financiële modellen bouwen voor meerdere gebruikers",
    summary: "Een begroting waarin tien budgethouders tegelijk invullen, vraagt een ander ontwerp dan een model dat één controller gebruikt. Hoe richt je een model in voor gezamenlijk gebruik?",
    topics: ["samenwerken", "finance", "modelontwerp"], serviceLinks: ["begroting-en-budgettering", "financiele-modellen"],
    sources: [SUPPORT],
    body: `Met co-authoring werd het in de praktijk mogelijk dat meerdere mensen tegelijk in één financieel model werken. Een budgethouder vult zijn afdeling in, de controller kijkt mee, de directeur ziet het totaal groeien. Maar een model dat voor één gebruiker is gebouwd, gaat in die situatie snel kapot.

## Wat er mis kan gaan

- **Overschreven formules**: een budgethouder typt een getal in een cel die een formule hoort te bevatten.
- **Ingevuld op de verkeerde plek**: de afdeling Verkoop vult haar cijfers in op de rij van Marketing.
- **Structuurwijzigingen**: iemand voegt een rij in, en de totalen kloppen niet meer.
- **Gelijktijdige wijzigingen**: twee mensen passen dezelfde aanname aan.
- **Geen overzicht**: niemand weet welke afdelingen klaar zijn.

## Ontwerpprincipes voor meerdere gebruikers

**Scheid invoer per gebruiker.** Elke budgethouder een eigen invoerblad of een eigen gedeelte van een tabel. Zo voorkom je dat mensen elkaars werk overschrijven.

**Bescherm de rest.** Rekenbladen en rapportbladen beveiligen. Alleen invoercellen ontgrendelen.

**Gebruik tabellen.** Een invoertabel waarin regels worden toegevoegd in plaats van rijen ingevoegd, houdt de structuur intact.

**Centrale aannames, centraal beheerd.** Loonstijging, inflatie en tarieven staan op één blad dat alleen de controller aanpast.

**Een statusoverzicht.** Een blad dat per afdeling laat zien of de invoer compleet is en of de controles kloppen.

**Validatie op invoer.** Keuzelijsten voor kostensoorten, grenzen voor bedragen, verplichte toelichting bij grote posten.

## Alternatief: aparte invoerbestanden

Soms is één gedeeld bestand niet de beste oplossing. Bijvoorbeeld als budgethouders elkaars cijfers niet mogen zien. Dan kun je elke budgethouder een eigen invoerbestand geven, en die met Power Query samenvoegen in het centrale model. Dat vraagt meer opzet, maar geeft betere afscherming.

## Terugblik

Een model voor meerdere gebruikers is in de eerste plaats een kwestie van ontwerp, niet van techniek. In ons voorbeeld [begroting met rolling forecast](/voorbeelden/begroting-rolling-forecast) zie je hoe invoer, aannames en rapportage zijn gescheiden. Voor een begrotingsproces met veel budgethouders zie [begroting en budgettering](/diensten/begroting-en-budgettering).`,
    practice: "Vraag bij de volgende begrotingsronde aan drie budgethouders waar ze tegenaan liepen bij het invullen. Hun antwoorden laten precies zien waar het model niet geschikt is voor meerdere gebruikers.",
  },
  {
    number: 46, slug: "de-ontwikkeling-van-excel-in-de-browser", subjectYear: 2021, visual: "collab", status: "PUBLISHED",
    title: "De ontwikkeling van Excel in de browser",
    summary: "Excel op het web begon als een lichte viewer, maar groeide uit tot een volwaardige werkomgeving voor veel taken. Waar staat het in 2021, en waar zitten de grenzen?",
    topics: ["samenwerken"], serviceLinks: ["excel-op-maat-laten-maken"],
    sources: [SUPPORT, EXCELBLOG],
    body: `Toen Microsoft de eerste webversie van Excel introduceerde, was dat vooral een manier om bestanden te bekijken en eenvoudige wijzigingen te maken. In de jaren daarna groeide Excel op het web gestaag. Rond 2021 werkten veel mensen er dagelijks mee, vaak zonder het te merken, omdat Teams bestanden standaard in de browser opent.

## Wat goed werkte in 2021

- **Formules**, inclusief dynamische matrices, XLOOKUP en LET.
- **Tabellen, filters en sorteren.**
- **Draaitabellen** maken en bewerken, al met minder opties dan op de desktop.
- **Grafieken** en voorwaardelijke opmaak.
- **Co-authoring**, met de cursor van collega's zichtbaar in het blad.
- **Opmerkingen** met @-vermeldingen.
- **Office Scripts** voor automatisering.

## Wat (nog) niet of beperkt werkte

- **VBA-macro's** worden niet uitgevoerd in de browser.
- **Power Query**: verversen en bewerken was in de browser lange tijd beperkt. Microsoft breidde dit in de jaren daarna stap voor stap uit.
- **Het gegevensmodel en Power Pivot** waren niet volledig beschikbaar.
- **Geavanceerde opties** zoals sommige grafiektypen, de Oplosser en externe koppelingen.

## Wat dit betekent voor het ontwerp van modellen

Steeds vaker opent een gebruiker een model in de browser, zonder dat de maker daar rekening mee heeft gehouden. Dat kan leiden tot verwarring: een knop die niets doet, een gegevensverbinding die niet ververst.

Bij het ontwerp is het daarom zinvol om vast te leggen:

- **Wie werkt waar?** Invoer door budgethouders kan prima in de browser. Het verversen van gegevens door de controller misschien alleen op de desktop.
- **Wat moet in de browser werken?** Vermijd daar macro's en gebruik formules of Office Scripts.
- **Duidelijke instructies** op het startblad als iets alleen in de desktop-app werkt.

## Terugblik

Excel op het web is sindsdien verder gegroeid, met onder meer uitgebreidere Power Query-mogelijkheden en Copilot. Het onderscheid tussen desktop en browser wordt kleiner, maar is in 2021 nog groot genoeg om er bij het [ontwerp van een model op maat](/diensten/excel-op-maat-laten-maken) rekening mee te houden.`,
    practice: "Open je belangrijkste model eens in de browser via SharePoint of Teams. Werkt alles wat je collega's nodig hebben? Wat niet werkt, is een signaal dat het model aanpassing nodig heeft, of dat gebruikers duidelijke instructies nodig hebben.",
  },
  {
    number: 47, slug: "het-belang-van-een-duidelijke-workbookstructuur", subjectYear: 2021, visual: "grid", status: "PUBLISHED",
    title: "Het belang van een duidelijke workbookstructuur",
    summary: "Een model met dertig tabbladen zonder logische volgorde is lastig te gebruiken en nog lastiger te controleren. Een duidelijke structuur is de basis van elk betrouwbaar Excel-model.",
    topics: ["modelontwerp"], serviceLinks: ["excel-op-maat-laten-maken", "excel-controleren-en-herstellen"],
    sources: [SUPPORT],
    body: `Open een willekeurig bedrijfsmodel dat een paar jaar in gebruik is. De kans is groot dat je tabbladen tegenkomt als *Blad7*, *Kopie van Berekening*, *Oud niet gebruiken* en *Test Jan*. Berekeningen staan verspreid, invoer staat tussen de formules, en de uitkomst staat op een blad halverwege. Het model werkt misschien, maar niemand durft het aan te passen.

## Een vaste opbouw

Een goed werkboek heeft een herkenbare volgorde, van links naar rechts:

1. **Start**: doel van het model, versie, contactpersoon, instructies en een inhoudsopgave.
2. **Aannames en instellingen**: alle parameters op één plek.
3. **Invoer**: gegevens die door gebruikers worden ingevuld.
4. **Brongegevens**: geïmporteerde data, bij voorkeur via Power Query.
5. **Berekeningen**: de rekenlogica, zonder invoer.
6. **Uitvoer**: rapporten en dashboards.
7. **Controles**: alle controles op één blad, met een totaalstatus.

## Herkenbare kleuren

Spreek een kleurcode af en gebruik die consequent. Bijvoorbeeld: invoercellen lichtgeel, formules zonder vulling, koppelingen naar andere bladen groen. Ook de tabbladen zelf kun je een kleur geven per type.

## Eén richting

Berekeningen lopen bij voorkeur van links naar rechts en van boven naar beneden. Een blad verwijst naar bladen die ervoor staan, niet naar bladen die erna komen. Dat maakt het model leesbaar als een verhaal.

## Consistente formules

In een rij of kolom staat dezelfde formule. Een uitzondering in één cel, bijvoorbeeld een handmatige correctie in maart, is een van de grootste bronnen van fouten. Is een uitzondering nodig, maak die dan zichtbaar met een aparte correctieregel.

## Geen verborgen dingen

Verborgen tabbladen, rijen en kolommen maken een model ondoorzichtig. Groeperen (met de plus- en mintekens) is een betere manier om details in te klappen.

## Waarom dit telt

- **Gebruikers** vinden sneller wat ze nodig hebben.
- **Controleurs** kunnen de logica volgen.
- **Opvolgers** kunnen het model overnemen.
- **Fouten** vallen sneller op.

## Terugblik

Een duidelijke structuur is het verschil tussen een spreadsheet en een model. Bij elke [controle van een bestaand bestand](/diensten/excel-controleren-en-herstellen) is het een van de eerste dingen waar we naar kijken. In onze [werkwijze](/werkwijze) lees je hoe we nieuwe modellen opbouwen.`,
    practice: "Tel de tabbladen in je belangrijkste model en schrijf bij elk tabblad op of het invoer, berekening, uitvoer of overbodig is. Zie je bladen die je niet kunt plaatsen, of een mix van alles? Dan is herstructureren de eerste stap.",
  },
  {
    number: 48, slug: "gegevensstromen-tussen-excel-en-microsoft-365", subjectYear: 2021, visual: "query", status: "PUBLISHED",
    title: "Gegevensstromen tussen Excel en Microsoft 365",
    summary: "Forms, Lists, SharePoint, Power Automate en Power BI: Excel werd een knooppunt in een groter geheel. Hoe zet je gegevensstromen zo op dat ze betrouwbaar blijven?",
    topics: ["data-en-power-query", "samenwerken", "automatisering"], serviceLinks: ["vba-power-query-automatisering"],
    sources: [PQDOCS, SCRIPTS],
    body: `Met de groei van Microsoft 365 werd Excel steeds minder een losstaand bestand en steeds meer een schakel in een keten. Een formulier verzamelt gegevens, Power Automate verplaatst ze, Excel rekent, Power BI toont. Dat biedt veel mogelijkheden, maar ook nieuwe plekken waar het mis kan gaan.

## Veelvoorkomende stromen

**Microsoft Forms naar Excel.** Antwoorden op een formulier komen automatisch in een Excel-tabel. Handig voor aanvragen, registraties of interne meldingen.

**Microsoft Lists en SharePoint-lijsten.** Gestructureerde lijsten die je met Power Query in Excel ophaalt voor analyse.

**Power Automate.** Verplaatst gegevens tussen systemen, voegt regels toe aan Excel-tabellen of start Office Scripts.

**Power BI.** Gebruikt Excel als bron, of stelt datasets beschikbaar om in Excel mee te analyseren.

## Waar het mis kan gaan

- **Wijzigende kolommen.** Een extra vraag in het formulier, of een hernoemde kolom in een lijst, en de stroom loopt vast.
- **Tabellen die worden aangepast.** Power Automate schrijft naar een specifieke tabel. Wie die tabel hernoemt of verplaatst, breekt de stroom.
- **Stille fouten.** Een stroom die mislukt, meldt dat lang niet altijd duidelijk. Gegevens ontbreken zonder dat iemand het merkt.
- **Eigenaarschap.** Een stroom die is aangemaakt door een medewerker die vertrekt, kan stoppen als zijn account wordt uitgeschakeld.

## Principes voor betrouwbare stromen

- **Scheid ontvangst en verwerking.** Laat een stroom gegevens neerzetten in een vaste ontvangsttabel. Het model leest die tabel met Power Query en controleert ze.
- **Documenteer de keten**: welke bron, welke stroom, welke tabel, welke eigenaar.
- **Bouw controles in**: aantallen, datums van de laatste regel, verplichte velden.
- **Gebruik service-accounts of gedeelde eigenaarschap** voor bedrijfskritische stromen.
- **Test na elke wijziging** aan bron of formulier.

## Terugblik

Gegevensstromen maken handwerk overbodig, maar alleen als ze robuust zijn opgezet. Bij [Power Query en automatisering](/diensten/vba-power-query-automatisering) ontwerpen we de hele keten, inclusief controles op het moment dat er iets ontbreekt.`,
    practice: "Maak een lijst van alle automatische stromen die gegevens in je Excel-bestanden zetten. Weet je van elke stroom wie de eigenaar is, en wat er gebeurt als hij stopt? Zo niet, dan is dat het eerste dat je moet vastleggen.",
  },
  {
    number: 49, slug: "van-handmatige-consolidatie-naar-herhaalbare-processen", subjectYear: 2021, visual: "query", status: "PUBLISHED",
    title: "Van handmatige consolidatie naar herhaalbare processen",
    summary: "Het samenvoegen van cijfers van vestigingen, entiteiten of afdelingen is vaak een handmatig, foutgevoelig proces. Hoe maak je er een vaste, herhaalbare procedure van?",
    topics: ["finance", "data-en-power-query"], serviceLinks: ["jaarrekening-en-consolidatiemodellen", "vba-power-query-automatisering"],
    sources: [PQDOCS],
    body: `Elk kwartaal hetzelfde: de cijfers van vijf vestigingen komen binnen in vijf bestanden, elk net iets anders opgebouwd. De controller kopieert ze in een consolidatiebestand, past de indeling aan, zoekt verschillen en corrigeert. Twee dagen werk, en bij elke afsluiting weer net een beetje anders.

## Waarom handmatige consolidatie riskant is

- **Verschillende formats** per vestiging, die elke keer opnieuw moeten worden vertaald.
- **Handmatige mappings**: welke rekening hoort bij welke rapportageregel?
- **Onderlinge posten** die niet in één keer aansluiten.
- **Geen spoor**: achteraf is niet te zien welke correcties zijn gemaakt.
- **Afhankelijkheid van één persoon** die weet hoe het werkt.

## De stappen naar een herhaalbaar proces

**1. Eén aanleverformat.** Spreek met alle onderdelen af hoe ze cijfers aanleveren: vaste kolommen, vaste rekeningcodes, vaste bestandsnaam. Een aanleversjabloon met validatie helpt.

**2. Eén map, automatisch ingelezen.** Alle aanleverbestanden komen in een vaste map. Power Query leest de map in en voegt alles samen, met de bestandsnaam als bron.

**3. Mapping als tabel.** De vertaling van rekening naar rapportageregel staat in een beheerde tabel, niet in formules.

**4. Eliminaties als regels.** Intercompany-posten worden op basis van vaste regels geëlimineerd, met een matrix die verschillen per paar entiteiten toont.

**5. Controles.** Debet is credit, elke entiteit is aangeleverd, alle rekeningen zijn gemapt, intercompany sluit aan binnen een drempel.

**6. Een logboek.** Welke bestanden zijn ingelezen, wanneer, en welke handmatige correcties zijn gemaakt.

## Wat het oplevert

- De consolidatie zelf kost minuten in plaats van uren.
- De tijd gaat naar analyse van verschillen, niet naar samenvoegen.
- Iedereen kan het proces uitvoeren, niet alleen de vaste controller.
- De accountant kan de stappen volgen.

## Terugblik

De techniek (Power Query) is er al sinds 2016. Wat in 2021 veranderde, was de bereidheid om processen echt anders in te richten, mede door de ervaring van werken op afstand. In ons [consolidatievoorbeeld](/voorbeelden/consolidatie) zie je hoe de intercompany-matrix werkt. Voor maatwerk zie [jaarrekening- en consolidatiemodellen](/diensten/jaarrekening-en-consolidatiemodellen).`,
    practice: "Schrijf de stappen van je laatste consolidatie op, inclusief alle handmatige correcties. Elke stap die je elke keer herhaalt, is te automatiseren. Elke correctie die terugkomt, wijst op een aanleverafspraak die ontbreekt.",
  },
  {
    number: 50, slug: "waarom-documentatie-belangrijk-wordt-bij-complexe-modellen", subjectYear: 2021, visual: "text", status: "PUBLISHED",
    title: "Waarom documentatie belangrijk wordt bij complexe modellen",
    summary: "Modellen worden krachtiger en zijn steeds vaker gekoppeld aan andere systemen. Zonder documentatie is zo'n model na een jaar voor niemand meer te overzien, ook niet voor de maker.",
    topics: ["modelontwerp"], serviceLinks: ["doorontwikkeling-en-onderhoud", "excel-op-maat-laten-maken"],
    sources: [SUPPORT],
    body: `Documentatie is het onderdeel van een Excel-model waar het minst tijd aan wordt besteed. Logisch: het levert op dat moment niets op. Maar zodra de maker op vakantie is, het model moet worden aangepast of de accountant vragen stelt, blijkt hoe waardevol het is.

Rond 2021 werd het belang groter. Modellen bevatten Power Query-stappen, verbindingen met SharePoint, Office Scripts en Power Automate-stromen. Veel van die onderdelen zijn niet zichtbaar als je het werkboek opent.

## Wat goede documentatie bevat

**Doel en gebruik.** Waarvoor is het model, wie gebruikt het, hoe vaak?

**Opbouw.** Welke tabbladen zijn er, en wat doet elk blad?

**Bronnen.** Waar komen de gegevens vandaan? Welke export, welk systeem, welke map? Wie levert ze aan?

**Aannames.** Welke aannames liggen ten grondslag aan de berekeningen, en wie heeft ze vastgesteld?

**Werkinstructie.** Welke stappen voer je uit bij een nieuwe periode? In welke volgorde?

**Controles.** Welke controles zijn er, en wat doe je als er een op rood staat?

**Wijzigingslog.** Welke versie, welke wijziging, door wie, wanneer?

**Afhankelijkheden buiten het werkboek.** Stromen, scripts, gekoppelde bestanden en hun eigenaren.

## Waar documentatie staat

Het liefst **in het model zelf**, op een startblad of uitlegblad. Een apart document raakt kwijt of verouderd. Korte toelichtingen bij een specifieke berekening kun je kwijt in een opmerking of in een notitiekolom naast de formule.

## Hoeveel is genoeg?

Documentatie hoeft geen boekwerk te zijn. Een goede toets: kan een collega met verstand van Excel, die het model nooit heeft gezien, de maandelijkse verwerking uitvoeren en een eenvoudige wijziging maken? Zo ja, dan is de documentatie voldoende.

## Documentatie als onderdeel van de oplevering

Bij elk model dat we opleveren, hoort een uitlegblad en een korte werkinstructie. Bij [doorontwikkeling](/diensten/doorontwikkeling-en-onderhoud) werken we de documentatie mee bij, zodat het model ook over een paar jaar nog te begrijpen is. Lees meer over onze aanpak bij [kwaliteit](/kwaliteit).`,
    practice: "Vraag jezelf af: als je morgen drie weken weg bent, kan iemand anders dan het maandproces uitvoeren met jouw model? Schrijf de stappen op die je zelf uit je hoofd doet. Dat is de kern van je documentatie.",
  },
];
