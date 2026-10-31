import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const XLOOKUP = { title: "Microsoft Support: XLOOKUP-functie", url: "https://support.microsoft.com/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929" };
const FILTER = { title: "Microsoft Support: FILTER-functie", url: "https://support.microsoft.com/office/filter-function-f4f7cb66-82eb-4767-8f7c-4877ad80c759" };
const LET = { title: "Microsoft Support: LET-functie", url: "https://support.microsoft.com/office/let-function-34842dd8-b92b-4d3f-b325-b8b8f9908999" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };

export const articles2020: ArticleContent[] = [
  {
    number: 31, slug: "xlookup-breder-beschikbaar-in-microsoft-365", subjectYear: 2020, visual: "lookup", status: "PUBLISHED",
    title: "XLOOKUP breder beschikbaar in Microsoft 365",
    summary: "Na een periode bij Insiders kwam XLOOKUP in 2020 beschikbaar voor Microsoft 365-abonnees. Daarmee begon de praktische overstap van VLOOKUP naar een veiligere zoekfunctie, met een paar aandachtspunten.",
    topics: ["formules"], serviceLinks: ["excel-bestand-verbeteren", "doorontwikkeling-en-onderhoud"],
    sources: [XLOOKUP, EXCELBLOG],
    factNote: "Exacte datum algemene beschikbaarheid XLOOKUP in Microsoft 365 (begin 2020) nalopen.",
    body: `In 2019 was XLOOKUP nog een functie voor Insiders. In de loop van 2020 kwam hij beschikbaar voor gebruikers van Microsoft 365 (zoals Office 365 vanaf april 2020 heette). Voor veel organisaties was dat het moment om serieus naar hun zoekformules te kijken.

## Een overstap met beleid

XLOOKUP is in vrijwel alle opzichten beter dan VLOOKUP. Toch is massaal vervangen niet altijd verstandig:

**Gemengde versies.** In veel organisaties werken niet alle medewerkers met dezelfde versie. Een bestand met XLOOKUP toont in Excel 2016 of 2019 foutmeldingen. Pas wanneer iedereen die het bestand gebruikt Microsoft 365 heeft (of later Excel 2021 of nieuwer), is de overstap veilig.

**Externe ontvangers.** Een model dat naar klanten, accountants of banken gaat, wordt geopend in hun versie van Excel. Daar heb je geen invloed op.

**Werkende formules.** Een VLOOKUP die correct is opgezet met exact zoeken en een stabiele tabel, is niet fout. Vervangen levert dan vooral onderhoudswinst op, geen directe foutreductie.

## Waar de overstap het meeste oplevert

- **Tabellen waar regelmatig kolommen bijkomen**, zoals prijslijsten en stamgegevens.
- **Zoeken naar links**, waar nu een omslachtige INDEX/MATCH-constructie staat.
- **Meerdere kolommen tegelijk ophalen**, bijvoorbeeld naam, afdeling en tarief bij een personeelsnummer. XLOOKUP kan dat met één formule.
- **Laatste voorkomen vinden**, zoals de meest recente prijs van een artikel.

## Een praktische aanpak

1. Inventariseer welke Excel-versies de gebruikers hebben.
2. Begin met nieuwe modellen en nieuwe tabbladen.
3. Vervang in bestaande modellen eerst de foutgevoelige formules: die met vaste kolomnummers in tabellen die veranderen.
4. Test na vervanging of de uitkomsten gelijk blijven.

## Terugblik

XLOOKUP werd binnen een paar jaar de standaard zoekfunctie voor wie met Microsoft 365 werkt, en sinds Excel 2021 ook voor wie Excel als losse licentie heeft. Bij [doorontwikkeling en onderhoud](/diensten/doorontwikkeling-en-onderhoud) van bestaande modellen nemen we zulke moderniseringen mee wanneer het moment geschikt is.`,
    practice: "Weet je welke Excel-versies er in je organisatie in gebruik zijn? Vraag het na bij IT. Die informatie bepaalt welke moderne functies je veilig kunt inzetten in gedeelde bestanden.",
  },
  {
    number: 32, slug: "filter-sort-en-unique-veranderen-modelleren", subjectYear: 2020, visual: "array", status: "PUBLISHED",
    title: "FILTER, SORT en UNIQUE veranderen de manier van modelleren",
    summary: "Met de algemene beschikbaarheid van dynamische matrices in 2020 kwamen FILTER, SORT en UNIQUE binnen bereik van alle Microsoft 365-gebruikers. Drie functies die veel handwerk overbodig maken.",
    topics: ["formules", "rapportage"], serviceLinks: ["dashboards-en-managementrapportages", "excel-op-maat-laten-maken"],
    sources: [FILTER, EXCELBLOG],
    factNote: "Algemene beschikbaarheid dynamische matrices: begin 2020 (Monthly Channel). Nalopen.",
    body: `Begin 2020 maakte Microsoft dynamische matrices algemeen beschikbaar voor Office 365-abonnees. Daarmee kwamen ook de bijbehorende functies binnen bereik van een groot publiek. Drie daarvan veranderden de manier waarop overzichten in Excel worden gebouwd: **FILTER**, **SORT** en **UNIQUE**.

## FILTER: de lijst die zichzelf bijhoudt

FILTER geeft alle rijen uit een tabel die aan een of meer voorwaarden voldoen. Voorbeelden:

- Alle openstaande facturen ouder dan dertig dagen.
- Alle projecten waarvan de verwachte marge onder de tien procent ligt.
- Alle medewerkers van een gekozen afdeling.

Het resultaat is een levende lijst. Verandert de brontabel of de voorwaarde, dan verandert de lijst mee. Geen autofilter dat iemand vergeet aan of uit te zetten, geen kopie die verouderd raakt.

## SORT en SORTBY: altijd op volgorde

SORT sorteert een bereik op een of meer kolommen; SORTBY sorteert op basis van een ander bereik. Een top tien van klanten op omzet is daarmee één formule: sorteer aflopend en neem de eerste tien rijen.

## UNIQUE: de stamtabel die meegroeit

UNIQUE geeft de unieke waarden uit een lijst. Daarmee bouw je bijvoorbeeld automatisch een lijst van alle afdelingen of klanten die in de transacties voorkomen. Gecombineerd met SORT krijg je een alfabetische lijst die nooit een nieuwe klant mist.

## Samen sterker

De echte kracht zit in de combinatie. Een overzicht van omzet per klant, alleen voor klanten met omzet boven een drempel, gesorteerd van hoog naar laag, was voorheen een draaitabel met handmatige stappen. Met deze functies is het een formuleblok dat zichzelf bijwerkt.

## Aandachtspunten

- **Ruimte.** Een overlopend resultaat heeft lege cellen nodig. Ontwerp de lay-out met ruimte voor groei.
- **Leesbaarheid.** Lange combinaties van functies worden snel onleesbaar. De LET-functie, die later in 2020 verscheen, helpt daarbij.
- **Lege resultaten.** Als niets aan de voorwaarde voldoet, geeft FILTER een fout. Het derde argument bepaalt wat er dan getoond wordt.
- **Compatibiliteit** met gebruikers die geen Microsoft 365 hebben.

## Terugblik

Voor [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages) zijn deze functies inmiddels basisgereedschap. Ze maken overzichten mogelijk die altijd actueel zijn, zonder macro's en zonder handwerk.`,
    practice: "Heb je een lijst die je regelmatig handmatig filtert en kopieert, bijvoorbeeld openstaande posten of projecten in de rode zone? Vervang die door één FILTER-formule op de brontabel. De lijst is dan altijd actueel.",
  },
  {
    number: 33, slug: "let-functie-maakt-formules-overzichtelijker", subjectYear: 2020, visual: "array", status: "PUBLISHED",
    title: "De LET-functie maakt formules overzichtelijker",
    summary: "In 2020 introduceerde Microsoft LET: een manier om tussenresultaten in een formule een naam te geven. Het lijkt een kleine toevoeging, maar het maakt complexe formules leesbaar en vaak sneller.",
    topics: ["formules", "modelontwerp"], serviceLinks: ["excel-op-maat-laten-maken", "excel-controleren-en-herstellen"],
    sources: [LET, EXCELBLOG],
    factNote: "LET: aankondiging maart 2020 (bèta), algemene beschikbaarheid later in 2020. Nalopen.",
    body: `Iedereen die weleens een formule van een collega heeft moeten ontcijferen, kent het probleem: een regel van driehonderd tekens, met dezelfde deelberekening drie keer herhaald, en haakjes die elkaar in een eindeloze rij afsluiten. In maart 2020 kondigde Microsoft een functie aan die daar iets aan doet: **LET**. Na een bètaperiode kwam LET breder beschikbaar in Microsoft 365.

## Hoe LET werkt

Met LET geef je binnen een formule een naam aan een waarde of tussenberekening, en gebruik je die naam vervolgens in de rest van de formule. In woorden:

> laat *omzet* de som van de omzetkolom zijn, laat *kosten* de som van de kostenkolom zijn, en geef dan *omzet min kosten* gedeeld door *omzet*.

De formule leest als een korte redenering in plaats van een puzzel.

## Drie voordelen

**Leesbaarheid.** Namen als *omzet*, *marge* of *peilmaand* maken direct duidelijk wat er wordt berekend. Een controleur of opvolger begrijpt de formule sneller.

**Geen herhaling.** Een deelberekening die drie keer voorkomt, schrijf je één keer. Pas je hem aan, dan hoeft dat maar op één plek.

**Prestaties.** Excel berekent een benoemde waarde binnen LET één keer, in plaats van elke keer dat hij voorkomt. Bij zware berekeningen kan dat merkbaar schelen.

## LET en dynamische matrices

LET kwam precies op het goede moment. Met dynamische matrices werden formules krachtiger, maar ook langer: FILTER binnen SORT binnen UNIQUE. Met LET kun je zo'n keten opknippen in benoemde stappen: eerst de gefilterde gegevens, dan de unieke klanten, dan de sortering.

## Wanneer wel, wanneer niet

LET is ideaal voor formules die een paar tussenstappen hebben. Voor berekeningen die op meerdere plekken in het model terugkomen, is een aparte hulpcel of hulpkolom vaak beter: die is zichtbaar en controleerbaar. En wie een berekening echt overal wil hergebruiken, kreeg later de mogelijkheid om er met LAMBDA een eigen functie van te maken.

## Terugblik

LET is een van die functies die de kwaliteit van modellen verbeteren zonder dat de gebruiker het merkt. Bij een [controle van een model](/diensten/excel-controleren-en-herstellen) is een onleesbare formule een risico; met LET herschrijven we hem zodat de logica weer te volgen is.`,
    practice: "Zoek in je model de langste formule op. Probeer in een paar zinnen op te schrijven wat hij doet. Lukt dat niet in één keer, dan is het een goede kandidaat om met LET te herschrijven, of op te knippen in hulpkolommen.",
  },
  {
    number: 34, slug: "dynamische-matrices-en-automatisch-uitbreidende-berekeningen", subjectYear: 2020, visual: "array", status: "PUBLISHED",
    title: "Dynamische matrices en automatisch uitbreidende berekeningen",
    summary: "Een tijdas die meegroeit met de periode, een rapport dat zich aanpast aan het aantal afdelingen: met SEQUENCE en overlopende bereiken bouw je modellen die niet meer handmatig hoeven te worden uitgebreid.",
    topics: ["formules", "modelontwerp"], serviceLinks: ["financiele-modellen", "planning-en-operationele-tools"],
    sources: [EXCELBLOG, SUPPORT],
    body: `Elk jaar hetzelfde ritueel: het model voor volgend jaar maken. Kolommen toevoegen, formules doortrekken, maandnamen aanpassen, grafiekbereiken verlengen. Met de algemene beschikbaarheid van dynamische matrices in 2020 werd het mogelijk om modellen te bouwen die zichzelf uitbreiden.

## De tijdas als formule

Met **SEQUENCE** genereer je een reeks getallen. Combineer je die met een startdatum, dan heb je een tijdas: twaalf maanden, 52 weken of 13 weken vanaf een gekozen begindatum. Verander de startdatum of het aantal periodes, en de hele tijdas past zich aan.

Formules die naar die tijdas verwijzen met de #-notatie, rekenen automatisch voor alle periodes. Een liquiditeitsprognose van 13 weken wordt een prognose van 26 weken door één getal te veranderen.

## Rapporten die meegroeien

Een rapport met een regel per afdeling, gebaseerd op UNIQUE, krijgt automatisch een regel erbij als er een nieuwe afdeling in de gegevens verschijnt. Met formules die naar dat overlopende bereik verwijzen, worden de bijbehorende bedragen ook automatisch berekend.

## Grafieken

Grafieken die verwijzen naar een overlopend bereik groeien niet altijd automatisch mee. Een veelgebruikte oplossing in die tijd was een benoemd bereik dat naar het overlopende bereik verwijst. Later voegde Microsoft betere ondersteuning toe voor grafieken op basis van dynamische matrices.

## Wat het oplevert

- **Minder jaarlijks onderhoud.** Het model voor volgend jaar is dezelfde werkmap met een andere startdatum.
- **Minder fouten.** Geen formules die vergeten zijn door te trekken, geen maand die ontbreekt in het totaal.
- **Flexibiliteit.** Dezelfde opzet werkt voor een maand-, week- of kwartaalplanning.

## Aandachtspunten

Een model dat zichzelf uitbreidt, moet ontworpen zijn met ruimte. Wat er onder of naast een overlopend bereik staat, kan in de weg zitten. Ook moet duidelijk zijn voor gebruikers welke cellen ze kunnen aanpassen en welke door formules worden gevuld.

## Terugblik

Voor [planningstools](/diensten/planning-en-operationele-tools) en [financiële modellen](/diensten/financiele-modellen) met een tijdas is dit inmiddels de standaardaanpak in Microsoft 365. De [liquiditeitsprognose](/voorbeelden/liquiditeitsprognose) in onze voorbeelden is op deze manier opgezet.`,
    practice: "Hoeveel tijd kost het om je belangrijkste planning of begroting klaar te maken voor een nieuw jaar? Als het antwoord meer dan een uur is, loont het om de tijdas en de rapportageregels dynamisch te maken.",
  },
  {
    number: 35, slug: "meer-mogelijkheden-om-eigen-gegevens-te-koppelen", subjectYear: 2020, visual: "query", status: "PUBLISHED",
    title: "Meer mogelijkheden om eigen gegevens te koppelen",
    summary: "Na de gegevenstypen voor aandelen en geografie werkte Microsoft aan manieren om ook eigen bedrijfsgegevens als gegevenstype te gebruiken, via Power Query en Power BI. Wat betekent dat voor stamgegevens?",
    topics: ["data-en-power-query"], serviceLinks: ["vba-power-query-automatisering"],
    sources: [EXCELBLOG, PQDOCS],
    factNote: "Datering Power Query- en Power BI-gegevenstypen (aankondigingen 2020, beschikbaarheid daarna, afhankelijk van licentie) nalopen.",
    body: `De gegevenstypen voor aandelen en geografie lieten zien hoe een cel kan verwijzen naar een object met meerdere eigenschappen. De logische volgende vraag van bedrijven was: kan dat ook met onze eigen gegevens? Klanten, producten, medewerkers, vestigingen. Rond 2020 kondigde Microsoft aan dat dat mogelijk zou worden, langs twee routes.

## Route 1: Power Query

Een tabel die je met Power Query ophaalt, kun je omzetten naar een **gegevenstype**. Elke rij wordt dan een object, met de kolommen als eigenschappen. In een werkblad verschijnt bijvoorbeeld alleen de productnaam, maar via de cel kun je de prijs, de categorie en de leverancier opvragen.

## Route 2: Power BI

Organisaties die Power BI gebruiken, konden gecertificeerde datasets beschikbaar stellen als **organisatiegegevenstypen** in Excel. Een gebruiker typt een klantnaam en Excel herkent de klant uit de centrale dataset, met alle afgesproken eigenschappen. Deze route hing af van de licenties en instellingen van de organisatie.

## Waarom dit interessant is

**Eén bron van waarheid.** Stamgegevens komen uit een centraal beheerde bron in plaats van een kopie in elk bestand.

**Compacte werkbladen.** Eén kolom met objecten in plaats van tien kolommen met eigenschappen.

**Minder zoekformules.** Eigenschappen opvragen via de cel vervangt een deel van de zoekformules.

## Kanttekeningen

- **Herkenbaarheid.** Niet iedere gebruiker begrijpt direct wat een gegevenstype is. Documentatie in het model is belangrijk.
- **Compatibiliteit.** Oudere versies en sommige platforms ondersteunen gegevenstypen niet of beperkt.
- **Afhankelijkheid.** Werkt de verbinding met de bron niet, dan werken de eigenschappen ook niet.
- **Licenties.** Vooral de Power BI-route is afhankelijk van het abonnement van de organisatie.

## Wat we in de praktijk zien

In de meeste mkb-modellen is een gewone stamtabel met XLOOKUP nog steeds de meest transparante oplossing. Gegevenstypen zijn interessant voor organisaties die al een centraal beheerde gegevensbron hebben en die breed in Excel willen ontsluiten. Bij [Power Query en automatisering](/diensten/vba-power-query-automatisering) kijken we samen welke aanpak het beste past.`,
    practice: "Hoeveel bestanden in je organisatie bevatten een eigen kopie van de klanten- of productenlijst? Elke kopie kan verouderd zijn. Eén centrale stamtabel waar andere bestanden naar verwijzen, is de eerste stap, ongeacht de techniek.",
  },
  {
    number: 36, slug: "waarom-versiebeheer-in-excel-belangrijk-is", subjectYear: 2020, visual: "collab", status: "PUBLISHED",
    title: "Waarom versiebeheer in Excel belangrijk is",
    summary: "Begroting_def.xlsx, Begroting_def_v2.xlsx, Begroting_def_v2_echt.xlsx. Iedereen kent het. Met de verschuiving naar thuiswerken in 2020 werd goed versiebeheer belangrijker dan ooit.",
    topics: ["samenwerken", "modelontwerp"], serviceLinks: ["doorontwikkeling-en-onderhoud"],
    sources: [{ title: "Microsoft Support: Eerdere versies van een bestand weergeven in OneDrive of SharePoint", url: "https://support.microsoft.com/excel" }],
    body: `Toen in het voorjaar van 2020 veel organisaties van de ene op de andere dag thuis gingen werken, werd een oud probleem ineens zichtbaar. Bestanden die op kantoor op een netwerkschijf stonden, werden gemaild, lokaal opgeslagen en weer teruggestuurd. Binnen een paar weken bestonden er van hetzelfde model meerdere versies, en wist niemand meer welke de juiste was.

## Twee soorten versiebeheer

**Versies van het bestand.** Welke versie is de actuele? Wat is er sinds vorige week veranderd? Kan ik terug naar de versie van voor de laatste wijziging?

**Versies van het model.** Wanneer is de structuur van het model aangepast, door wie en waarom? Welke versie van het model is gebruikt voor de begroting die de directie heeft vastgesteld?

## Bestandsversies: laat het systeem het doen

OneDrive en SharePoint houden automatisch een **versiegeschiedenis** bij. Elke opgeslagen versie is terug te halen, met de naam van degene die de wijziging heeft gedaan. In combinatie met co-authoring is er één bestand dat iedereen bewerkt, in plaats van tien kopieën.

Afspraken blijven nodig:

- **Eén locatie** voor het actuele bestand, geen kopieën in mail of op de desktop.
- **Bevroren versies** voor momenten die ertoe doen, zoals de vastgestelde begroting. Sla een kopie op met een duidelijke naam en datum, en maak hem alleen-lezen.

## Modelversies: leg wijzigingen vast

Voor belangrijke modellen is het waardevol om een **wijzigingslog** bij te houden: een tabblad met datum, versie, wat er is veranderd en door wie. Bijvoorbeeld: *v1.4, 12 oktober, kostenplaats Logistiek toegevoegd, mapping aangepast.* Het kost weinig tijd en helpt enorm als iemand vraagt waarom een cijfer anders is dan vorige maand.

## Vergelijken van versies

Wie twee versies van een model wil vergelijken, heeft in sommige Microsoft 365-edities gereedschap zoals *Spreadsheet Compare* tot zijn beschikking. Een eenvoudigere aanpak is een controle in het model zelf: een tabblad dat de kernuitkomsten van de huidige en vorige versie naast elkaar zet.

## Terugblik

Versiebeheer is geen technisch onderwerp, maar een kwestie van afspraken en discipline, ondersteund door de juiste opslag. Bij [doorontwikkeling en onderhoud](/diensten/doorontwikkeling-en-onderhoud) leveren we elke nieuwe versie op met een wijzigingslog.`,
    practice: "Zoek naar bestanden met 'def', 'final' of 'v2' in de naam in je gedeelde mappen. Elk zo'n bestand is een teken dat versiebeheer handmatig gebeurt. Verplaats het actuele model naar SharePoint of OneDrive en verwijder of archiveer de kopieën.",
  },
  {
    number: 37, slug: "financiele-scenarios-bij-grote-economische-onzekerheid", subjectYear: 2020, visual: "chart", status: "PUBLISHED",
    title: "Financiële scenario's bij grote economische onzekerheid",
    summary: "In 2020 werd in korte tijd duidelijk hoe snel een begroting kan verouderen. Bedrijven moesten in dagen in plaats van maanden scenario's doorrekenen voor omzet, kosten en liquiditeit.",
    topics: ["finance"], serviceLinks: ["financiele-modellen", "begroting-en-budgettering"],
    sources: [SUPPORT],
    body: `In maart 2020 veranderde de economische situatie voor veel bedrijven binnen enkele weken. Omzet viel weg of verschoof, leveranciers konden niet leveren, en overheden kondigden steunmaatregelen aan. De begroting die in het najaar was gemaakt, zei ineens weinig meer. Wat directies nodig hadden, was een snel antwoord op de vraag: hoe lang kunnen we dit volhouden, en wat gebeurt er als het langer duurt?

## Wat er nodig was

**Snelheid.** Scenario's moesten binnen dagen worden doorgerekend, niet in een begrotingsronde van weken.

**Liquiditeit voorop.** In een crisis is niet het resultaat, maar de kas bepalend. Een winstgevend bedrijf kan in de problemen komen als klanten later betalen.

**Meerdere scenario's tegelijk.** Een kort dal, een langdurige daling, een gedeeltelijk herstel. Allemaal naast elkaar.

**Steunmaatregelen verwerken.** Regelingen voor loonkosten, uitstel van belastingbetalingen en leningen hadden elk hun eigen effect op resultaat en kasstroom.

## Wat goed werkte in Excel

Bedrijven met een model dat op **drivers** was gebouwd, waren snel. Als omzet is opgebouwd uit volumes en prijzen, en kosten uit vaste en variabele delen, kun je een scenario doorrekenen door een paar aannames aan te passen. Wie een begroting had met alleen vaste bedragen per maand, moest alles opnieuw maken.

Ook een **wekelijkse liquiditeitsprognose** bleek waardevol. Een maandoverzicht verbergt dat de salarissen aan het eind van de maand worden betaald en de grootste klant halverwege.

## Lessen voor daarna

- **Bouw modellen op drivers**, ook in rustige tijden. Het maakt ze flexibeler voor elke verandering.
- **Houd een liquiditeitsprognose bij**, ook als de kas ruim lijkt.
- **Leg scenario's vast** in één model, niet in kopieën van bestanden.
- **Maak de belangrijkste aannames zichtbaar**, zodat de directie begrijpt waar de uitkomsten op rusten.

## Terugblik

2020 liet zien dat financiële modellen geen jaarlijks ritueel zijn, maar stuurinstrumenten die snel moeten kunnen meebewegen. Een [financieel model](/diensten/financiele-modellen) met scenario's en een [liquiditeitsprognose](/voorbeelden/liquiditeitsprognose) zijn sindsdien voor veel bedrijven een vast onderdeel van de bedrijfsvoering.`,
    practice: "Kun je binnen een uur doorrekenen wat er met je banksaldo gebeurt als de omzet drie maanden twintig procent lager is? Zo niet, dan is dit het moment om een eenvoudige liquiditeitsprognose met scenario's op te zetten.",
  },
  {
    number: 38, slug: "automatische-dashboards-voor-thuiswerkende-managementteams", subjectYear: 2020, visual: "chart", status: "PUBLISHED",
    title: "Automatische dashboards voor thuiswerkende managementteams",
    summary: "Toen het managementoverleg verhuisde naar videobellen, veranderde ook de rapportage. Dashboards moesten zelfstandig leesbaar, altijd actueel en veilig te delen zijn.",
    topics: ["rapportage", "samenwerken"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [SUPPORT],
    body: `In een kantoor kan de controller de maandcijfers even toelichten aan de tafel. Toen managementteams in 2020 massaal vanuit huis gingen werken, viel dat moment weg. Het managementoverleg verhuisde naar videobellen, waar iedereen naar hetzelfde gedeelde scherm keek, of juist naar zijn eigen kopie van het bestand.

## Wat er veranderde

**Zelfstandig leesbaar.** Een dashboard moest zonder mondelinge toelichting te begrijpen zijn. Titels die zeggen wat je ziet, eenheden bij elk getal, een korte tekst bij elke opvallende afwijking.

**Altijd actueel.** Een PDF van vorige week is achterhaald op het moment dat iemand vraagt hoe het er nu voor staat. Een dashboard dat zichzelf ververst vanuit de bron, voorkomt dat.

**Veilig delen.** Bestanden met financiële gegevens werden vaker gedeeld buiten het kantoornetwerk. Delen via een beheerde omgeving zoals SharePoint, met de juiste rechten, werd belangrijker dan ooit.

**Geschikt voor een klein scherm.** Een dashboard dat op een groot kantoorscherm goed leesbaar was, bleek op een laptop met een videogesprek ernaast te druk.

## Ontwerpkeuzes die hielpen

- **Eén pagina met de kern.** De vijf kerncijfers, met het verschil ten opzichte van budget en vorig jaar.
- **Detail op aparte bladen** die je alleen opent als er een vraag is.
- **Tekstvakken voor toelichting**, gekoppeld aan een cel zodat de controller ze per maand kan bijwerken.
- **Grotere letters en minder grafieken.**
- **Een vaste structuur**, zodat iedereen in het gesprek weet waar hij moet kijken.

## Excel en Power BI

Voor organisaties die verder wilden, werd Power BI interessanter: dashboards in de browser, automatisch ververst, met rechten per gebruiker. Tegelijk bleef Excel populair voor rapportages waar financiële mensen zelf in willen rekenen en toelichten. Veel organisaties kozen een combinatie.

## Terugblik

Het werken op afstand heeft de verwachtingen van rapportages blijvend veranderd. Ook nu teams weer vaker samen op kantoor zitten, verwachten managers dat een dashboard actueel en zelfstandig leesbaar is. Zie onze aanpak voor [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages).`,
    practice: "Stuur je dashboard naar een collega die niet bij het maandoverleg is geweest, zonder toelichting. Vraag wat de drie belangrijkste conclusies zijn. Komen die overeen met wat jij wilde vertellen? Zo niet, dan mist het dashboard context.",
  },
  {
    number: 39, slug: "het-einde-van-onnodig-kopieren-en-plakken", subjectYear: 2020, visual: "query", status: "PUBLISHED",
    title: "Het einde van onnodig kopiëren en plakken",
    summary: "Kopiëren en plakken is de meest gebruikte en meest riskante handeling in Excel. Met de gereedschappen die in 2020 breed beschikbaar waren, werd het in de meeste processen overbodig.",
    topics: ["automatisering", "data-en-power-query"], serviceLinks: ["vba-power-query-automatisering", "excel-bestand-verbeteren"],
    sources: [PQDOCS],
    body: `Als je één ding zou mogen veranderen aan de manier waarop de meeste bedrijven Excel gebruiken, dan zou het dit zijn: minder kopiëren en plakken. Het is de handeling waarmee de meeste fouten ontstaan, en die de meeste tijd kost bij terugkerende processen.

## Waarom kopiëren en plakken riskant is

- **Verkeerde selectie.** Een rij te weinig geselecteerd, of de kopregel twee keer meegenomen.
- **Verkeerde plek.** Geplakt in kolom C in plaats van D, of een regel lager dan vorige maand.
- **Overschreven formules.** Waarden geplakt over cellen waar formules hoorden te staan.
- **Verborgen rijen en filters.** Gefilterde gegevens kopiëren levert soms meer of minder op dan je denkt.
- **Geen spoor.** Achteraf is niet te zien wat er is geplakt, wanneer en waarvandaan.

## De alternatieven

Rond 2020 waren in Microsoft 365 alle gereedschappen beschikbaar om kopiëren en plakken in de meeste processen overbodig te maken:

**Power Query** voor het ophalen van gegevens uit exports, andere werkmappen, mappen met bestanden en databases. Vastgelegde stappen, elke keer hetzelfde.

**Tabellen en tabelverwijzingen** voor het verbinden van gegevens binnen een werkmap, zonder kopieën.

**Dynamische matrices** voor overzichten die zichzelf vullen op basis van een brontabel, met FILTER, SORT en UNIQUE.

**Verwijzingen in plaats van waarden.** Een cel die verwijst naar de bron, in plaats van een kopie van de waarde, blijft automatisch actueel.

## Wanneer kopiëren wel prima is

Kopiëren is niet altijd fout. Een eenmalige analyse, een snelle berekening voor een overleg: geen probleem. Het risico zit in **terugkerende processen**: wat je elke week of maand opnieuw doet, verdient een vaste, geautomatiseerde stap.

## Een vuistregel

Als je dezelfde gegevens vaker dan drie keer kopieert en plakt op dezelfde manier, is het tijd om het te automatiseren. Meestal kost dat minder tijd dan je denkt, en de winst stapelt zich op met elke maand die volgt.

## Terugblik

Het verminderen van kopiëren en plakken is de rode draad in bijna elk verbetertraject. Bij het [verbeteren van een bestaand bestand](/diensten/excel-bestand-verbeteren) is het vaak de grootste tijdwinst, en de grootste stap in betrouwbaarheid.`,
    practice: "Houd een week lang bij hoe vaak je gegevens van het ene bestand naar het andere kopieert, en waarvoor. De handelingen die elke week terugkomen, zijn je eerste kandidaten voor Power Query.",
  },
  {
    number: 40, slug: "foutbestendige-modellen-voor-begroting-en-liquiditeit", subjectYear: 2020, visual: "shield", status: "PUBLISHED",
    title: "Foutbestendige modellen voor begroting en liquiditeit",
    summary: "Als beslissingen snel moeten worden genomen, moet het model betrouwbaar zijn. Hoe bouw je begrotings- en liquiditeitsmodellen die fouten voorkomen, signaleren en begrijpelijk maken?",
    topics: ["finance", "modelontwerp"], serviceLinks: ["begroting-en-budgettering", "financiele-modellen"],
    sources: [SUPPORT],
    body: `In 2020 namen veel bedrijven ingrijpende beslissingen op basis van spreadsheets: wel of niet een lening aanvragen, personeel behouden of niet, investeringen uitstellen. Juist dan is het essentieel dat het model klopt. Een fout in een liquiditeitsprognose kan betekenen dat een tekort te laat wordt gezien, of dat er onnodig wordt bezuinigd.

## Drie lagen van foutbestendigheid

**1. Voorkomen.** De beste fout is de fout die niet kan ontstaan.

- Invoercellen met datavalidatie: alleen getallen, alleen datums binnen de periode, alleen bestaande kostenplaatsen.
- Beveiligde rekenbladen, zodat formules niet worden overschreven.
- Eén plek voor elke aanname.
- Tabellen in plaats van vaste bereiken, zodat nieuwe regels automatisch worden meegenomen.

**2. Signaleren.** Wat toch misgaat, moet zichtbaar worden.

- **Aansluitcontroles**: begroting per afdeling sluit aan op het totaal; liquiditeitsprognose sluit aan op het actuele banksaldo.
- **Plausibiliteitscontroles**: een maand met nul omzet, een negatieve voorraad, een betalingstermijn van 300 dagen.
- **Foutwaarden**: een controle die telt hoeveel #N/B of #DEEL/0! er in het model staan.

**3. Begrijpelijk maken.** Een model dat niemand begrijpt, wordt verkeerd gebruikt.

- Een uitlegblad met de opbouw en de belangrijkste aannames.
- Duidelijke labels bij elke uitkomst, met eenheid en periode.
- Een overzicht van welke aannames de uitkomst het sterkst beïnvloeden.

## Specifiek voor liquiditeit

Een liquiditeitsprognose heeft een paar eigen valkuilen:

- **Btw en loonheffing** worden vaak vergeten of in de verkeerde periode geplaatst.
- **Betalingstermijnen** van debiteuren worden optimistisch ingeschat.
- **Eenmalige posten** zoals investeringen, aflossingen en vakantiegeld ontbreken.
- **Het startsaldo** sluit niet aan op de bank.

Een goede prognose heeft een controle op het startsaldo en een kalender voor vaste betalingen.

## Terugblik

Foutbestendigheid is geen luxe voor grote bedrijven. Het is wat een spreadsheet onderscheidt van een stuurinstrument. In de [liquiditeitsprognose](/voorbeelden/liquiditeitsprognose) en de [begroting met rolling forecast](/voorbeelden/begroting-rolling-forecast) zie je hoe controles zijn ingebouwd.`,
    practice: "Controleer of het startsaldo van je liquiditeitsprognose aansluit op het werkelijke banksaldo van vandaag. Het is de eenvoudigste controle, en als die niet klopt, kloppen de weken erna ook niet.",
  },
];
