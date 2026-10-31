import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const LAMBDA = { title: "Microsoft Support: LAMBDA-functie", url: "https://support.microsoft.com/office/lambda-function-bd212d27-1cd1-4321-a34a-ccbf254b8b67" };
const SCRIPTS = { title: "Microsoft Learn: Office Scripts in Excel", url: "https://learn.microsoft.com/office/dev/scripts/overview/excel" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };
const MACROBLOCK = { title: "Microsoft Learn: Macro's uit internet worden standaard geblokkeerd in Office", url: "https://learn.microsoft.com/microsoft-365-apps/security/internet-macros-blocked" };

export const articles2022: ArticleContent[] = [
  {
    number: 51, slug: "veertien-nieuwe-tekst-en-matrixfuncties", subjectYear: 2022, visual: "array", status: "PUBLISHED",
    title: "Veertien nieuwe tekst- en matrixfuncties voor Excel",
    summary: "In maart 2022 kondigde Microsoft veertien nieuwe functies aan voor het werken met tekst en matrices, eerst voor Insiders en later in het jaar voor Microsoft 365. Een overzicht en wat ze in de praktijk oplossen.",
    topics: ["formules"], serviceLinks: ["excel-bestand-verbeteren", "excel-op-maat-laten-maken"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "Aankondiging maart 2022 (Insiders); algemene beschikbaarheid in Microsoft 365 rond het derde kwartaal van 2022. Exacte datum nalopen.",
    body: `Na de dynamische matrices in 2020 en LAMBDA in 2021 kwam Microsoft in maart 2022 met een nieuwe reeks: **veertien functies** die het werken met tekst en matrices eenvoudiger maken. Ze verschenen eerst bij Insiders en kwamen later in 2022 beschikbaar voor gebruikers van Microsoft 365.

## Drie groepen

**Tekst splitsen en knippen**

- **TEXTSPLIT**: splitst tekst op een scheidingsteken, over kolommen en rijen.
- **TEXTBEFORE** en **TEXTAFTER**: geven het deel van een tekst vóór of na een bepaald teken of woord.

**Matrices samenvoegen en vormen**

- **VSTACK** en **HSTACK**: plakken bereiken onder of naast elkaar.
- **TOROW** en **TOCOL**: zetten een bereik om naar één rij of kolom.
- **WRAPROWS** en **WRAPCOLS**: verdelen een lange lijst over meerdere rijen of kolommen.
- **EXPAND**: vult een matrix aan tot een opgegeven grootte.

**Delen van een matrix selecteren**

- **TAKE** en **DROP**: nemen of laten de eerste of laatste rijen of kolommen weg.
- **CHOOSEROWS** en **CHOOSECOLS**: selecteren specifieke rijen of kolommen.

## Wat ze oplossen

Een paar typische situaties uit de praktijk:

- **Exports met gecombineerde velden**, zoals "Jansen, P. - Amsterdam" in één kolom. Met TEXTBEFORE en TEXTAFTER haal je de onderdelen er zonder hulpkolommen uit.
- **Tabellen van meerdere tabbladen samenvoegen**, bijvoorbeeld de omzetlijsten van drie vestigingen. VSTACK zet ze onder elkaar in één levende lijst.
- **Top N-overzichten**: SORT gevolgd door TAKE geeft de bovenste tien.
- **Kolommen in een andere volgorde tonen** in een rapport, met CHOOSECOLS, zonder de bron aan te passen.

## Kanttekeningen

- Deze functies werken alleen in **Microsoft 365** (en later in Excel 2024). Excel 2021 kent ze niet.
- Voor grote, terugkerende transformaties blijft **Power Query** vaak de betere keuze: beter controleerbaar en sneller bij grote volumes.
- Lange combinaties van matrixfuncties worden snel onleesbaar. Gebruik LET om stappen een naam te geven.

## Terugblik

Met deze veertien functies werd het mogelijk om veel bewerkingen die voorheen hulpkolommen, macro's of Power Query vroegen, in één formule te doen. In de volgende artikelen gaan we dieper in op [TEXTSPLIT](/excel-door-de-jaren/2022/textsplit-en-moderne-tekstverwerking) en [TEXTBEFORE en TEXTAFTER](/excel-door-de-jaren/2022/textbefore-en-textafter-in-bedrijfsadministraties).`,
    practice: "Zoek in je modellen naar kolommen met LEFT, MID, FIND en LEN door elkaar. Dat zijn vaak pogingen om tekst te splitsen. Met TEXTBEFORE, TEXTAFTER of TEXTSPLIT is dat korter, leesbaarder en minder foutgevoelig.",
  },
  {
    number: 52, slug: "textsplit-en-moderne-tekstverwerking", subjectYear: 2022, visual: "text", status: "PUBLISHED",
    title: "TEXTSPLIT en moderne tekstverwerking",
    summary: "Tekst splitsen was in Excel altijd omslachtig: Tekst naar kolommen, of een woud van LEFT, MID en FIND. TEXTSPLIT maakt er één formule van die automatisch meebeweegt met de brongegevens.",
    topics: ["formules", "data-en-power-query"], serviceLinks: ["excel-bestand-verbeteren", "vba-power-query-automatisering"],
    sources: [EXCELBLOG, SUPPORT],
    body: `Wie gegevens uit andere systemen in Excel verwerkt, krijgt vroeg of laat te maken met tekst die gesplitst moet worden. Een adres in één veld, een lijst met tags gescheiden door komma's, een omschrijving met een projectcode erin. Tot 2022 had je daar twee manieren voor, en beide hadden nadelen.

## De oude manieren

**Tekst naar kolommen.** Een wizard die de tekst eenmalig splitst. Snel, maar statisch: bij nieuwe gegevens moet je het opnieuw doen.

**Formules met LEFT, MID, RIGHT, FIND en LEN.** Dynamisch, maar lastig te schrijven en nog lastiger te lezen. Een fout in de positie levert een half woord op.

## TEXTSPLIT

**TEXTSPLIT** splitst tekst op een of meer scheidingstekens. Het resultaat loopt over naar de cellen ernaast (of eronder). Je kunt splitsen over kolommen, over rijen of beide tegelijk.

Voorbeelden van wat je ermee doet:

- **"Amsterdam;Rotterdam;Utrecht"** splitsen in drie kolommen.
- **Meerdere scheidingstekens** tegelijk gebruiken, zoals komma én puntkomma.
- **Lege waarden** tussen twee scheidingstekens overslaan.
- **Een tekst met regels en velden** omzetten naar een tabel, door zowel een kolom- als een rijscheidingsteken op te geven.

## Een voorbeeld uit de administratie

Een bankexport bevat een omschrijvingsveld als *"Factuur 2022-0145 / Klant 1032 / Termijn 2"*. Met TEXTSPLIT op " / " krijg je drie kolommen: factuurnummer, klantnummer en termijn. Die kun je vervolgens gebruiken om de betaling automatisch te koppelen aan de openstaande post.

## Valkuilen

- **Inconsistente brongegevens.** Als de ene regel " / " gebruikt en de andere "/", gaat het mis. Controleer de bron of geef meerdere scheidingstekens op.
- **Getallen als tekst.** Het resultaat van TEXTSPLIT is tekst. Voor berekeningen moet je het omzetten naar een getal.
- **Overlopende resultaten** hebben ruimte nodig. Over een hele kolom kan TEXTSPLIT niet per rij overlopen; daarvoor combineer je het met andere functies of gebruik je Power Query.

## TEXTSPLIT of Power Query?

Voor eenmalige of kleine bewerkingen in een model is TEXTSPLIT ideaal. Voor het opschonen van een grote export die elke maand terugkomt, is Power Query met de stap *Kolom splitsen* meestal robuuster. Bij [automatisering met Power Query](/diensten/vba-power-query-automatisering) kiezen we per situatie.`,
    practice: "Kijk in je exports naar velden waarin meerdere gegevens zijn samengevoegd, zoals omschrijvingen met codes. Als je die nu handmatig uitsplitst, kan één TEXTSPLIT-formule of een Power Query-stap dat structureel overnemen.",
  },
  {
    number: 53, slug: "textbefore-en-textafter-in-bedrijfsadministraties", subjectYear: 2022, visual: "text", status: "PUBLISHED",
    title: "TEXTBEFORE en TEXTAFTER in bedrijfsadministraties",
    summary: "Een factuurnummer uit een omschrijving halen, een domeinnaam uit een e-mailadres, een kostenplaats uit een code: TEXTBEFORE en TEXTAFTER maken dit soort bewerkingen eenvoudig en leesbaar.",
    topics: ["formules"], serviceLinks: ["excel-bestand-verbeteren"],
    sources: [EXCELBLOG, SUPPORT],
    body: `Waar TEXTSPLIT een tekst opdeelt in alle onderdelen, doen **TEXTBEFORE** en **TEXTAFTER** iets gerichters: ze geven het stuk tekst vóór of na een bepaald teken of woord. Dat klinkt eenvoudig, en dat is precies de kracht.

## Hoe ze werken

- **TEXTBEFORE**(tekst; scheidingsteken) geeft alles vóór het scheidingsteken.
- **TEXTAFTER**(tekst; scheidingsteken) geeft alles erna.

Met extra argumenten kun je onder meer kiezen:

- **Welk voorkomen**: het eerste, het tweede, of het laatste (met een negatief getal).
- **Hoofdlettergevoelig** of niet.
- **Wat er gebeurt** als het scheidingsteken niet voorkomt.

## Voorbeelden uit de administratie

**Kostenplaats uit een grootboekcode.** Code *4100-230-MKT*: TEXTBEFORE met "-" geeft *4100* (rekening); TEXTAFTER met "-" en voorkomen -1 geeft *MKT* (afdeling).

**Domein uit een e-mailadres.** Alles na "@" geeft het domein. Handig om klanten per organisatie te groeperen.

**Factuurnummer uit een betaalomschrijving.** Alles na *"Factuur "* en vóór de eerstvolgende spatie.

**Achternaam uit "Achternaam, Voornaam".** Alles vóór de komma.

**Bestandsnaam uit een pad.** Alles na de laatste backslash.

## Vergelijking met de oude aanpak

Met de klassieke functies zag het factuurnummer-voorbeeld er ongeveer zo uit: een MID-functie met een FIND voor de beginpositie, een tweede FIND voor de eindpositie en een LEN-berekening voor de lengte. Bij een fout in één van de posities klopt de uitkomst niet meer. Met TEXTAFTER en TEXTBEFORE is het een formule die je hardop kunt voorlezen: *"de tekst na 'Factuur ', tot de eerste spatie"*.

## Robuust maken

Bedrijfsgegevens zijn zelden perfect consistent. Twee tips:

- Gebruik het argument voor **"niet gevonden"** om een duidelijke melding te geven in plaats van een foutwaarde.
- Combineer met **TRIM** om overbodige spaties te verwijderen.

En voeg een controle toe die telt hoeveel regels geen resultaat opleveren. Dan weet je wanneer de bron van patroon verandert.

## Terugblik

TEXTBEFORE en TEXTAFTER zijn geen spectaculaire functies, maar ze maken veel administratieve modellen leesbaarder. Bij het [verbeteren van een bestaand bestand](/diensten/excel-bestand-verbeteren) vervangen we geneste tekstformules er regelmatig door.`,
    practice: "Zoek in je modellen naar formules waarin FIND of SEARCH binnen MID of LEFT staat. Herschrijf er één met TEXTBEFORE of TEXTAFTER en vergelijk de uitkomsten. Je zult zien hoeveel leesbaarder het wordt.",
  },
  {
    number: 54, slug: "lambda-en-zelfgemaakte-herbruikbare-functies", subjectYear: 2022, visual: "array", status: "PUBLISHED",
    title: "LAMBDA en zelfgemaakte herbruikbare functies",
    summary: "Met LAMBDA kun je in Excel je eigen functies maken, zonder VBA. Na een bètaperiode kwam de functie in 2022 beschikbaar in Microsoft 365, samen met hulpfuncties als MAP, REDUCE en BYROW.",
    topics: ["formules", "modelontwerp"], serviceLinks: ["excel-op-maat-laten-maken", "doorontwikkeling-en-onderhoud"],
    sources: [LAMBDA, EXCELBLOG],
    factNote: "LAMBDA aangekondigd december 2020; algemene beschikbaarheid in Microsoft 365 begin 2022. Hulpfuncties (MAP, REDUCE, SCAN, BYROW, BYCOL, MAKEARRAY, ISOMITTED) aangekondigd 2021. Data nalopen.",
    body: `Elke organisatie heeft berekeningen die op veel plekken terugkomen: een marge, een afronding volgens een interne regel, een omrekening naar fte, een check op een geldig IBAN-formaat. Tot voor kort betekende dat dezelfde formule kopiëren naar elk model, of een VBA-functie schrijven. Met **LAMBDA** kun je een eigen functie maken in Excel zelf.

## Hoe LAMBDA werkt

Een LAMBDA bestaat uit parameters en een berekening. Je slaat hem op in **Namenbeheer** onder een eigen naam, bijvoorbeeld *BRUTOMARGE*. Daarna gebruik je hem als elke andere functie: =BRUTOMARGE(omzet; kostprijs).

Microsoft kondigde LAMBDA eind 2020 aan. Na een bètaperiode kwam de functie in de loop van 2022 beschikbaar voor gebruikers van Microsoft 365.

## Hulpfuncties

Samen met LAMBDA kwamen hulpfuncties die een LAMBDA op een hele matrix toepassen:

- **MAP**: past de functie toe op elk element.
- **BYROW** en **BYCOL**: per rij of per kolom.
- **REDUCE** en **SCAN**: bouwen een resultaat stap voor stap op, zoals een lopend saldo.
- **MAKEARRAY**: maakt een matrix op basis van een berekening per rij en kolom.

## Wat het oplevert

**Eén definitie, overal hetzelfde.** Wijzig je de berekening, dan wijzigt hij overal in het werkboek.

**Leesbare formules.** =BRUTOMARGE(B2; C2) zegt meer dan =(B2-C2)/B2, zeker bij complexere logica.

**Geen macro's.** Het werkboek blijft een .xlsx, werkt in de browser en wordt niet geblokkeerd door beveiligingsinstellingen.

## Kanttekeningen

- **Zichtbaarheid.** De definitie zit in Namenbeheer. Gebruikers die dat niet kennen, zien niet wat de functie doet. Documenteer elke eigen functie op het uitlegblad.
- **Foutopsporing** in een complexe LAMBDA is lastiger dan in een reeks hulpcellen.
- **Werkboekgebonden.** Een LAMBDA bestaat alleen in de werkmap waar hij is gedefinieerd. Microsoft bood later hulpmiddelen om functies te delen, maar standaard kopieer je ze mee.
- **Compatibiliteit.** Alleen in Microsoft 365 en Excel 2024; niet in Excel 2021.

## Wanneer gebruiken we LAMBDA?

Voor berekeningen die op meerdere plekken in een model voorkomen en die een duidelijke bedrijfsregel vertegenwoordigen. Niet voor alles: een eenvoudige formule die één keer voorkomt, hoeft geen eigen functie te worden. Bij [Excel op maat](/diensten/excel-op-maat-laten-maken) leggen we eigen functies vast in een functieoverzicht in het model.`,
    practice: "Welke berekening schrijf je steeds opnieuw in je modellen? Een marge, een indexatie, een afronding? Dat is een goede eerste kandidaat voor een LAMBDA, zodat de regel op één plek staat.",
  },
  {
    number: 55, slug: "meer-mogelijkheden-voor-dynamische-datamodellen", subjectYear: 2022, visual: "array", status: "PUBLISHED",
    title: "Meer mogelijkheden voor dynamische datamodellen",
    summary: "Met VSTACK, HSTACK, CHOOSECOLS en LAMBDA kun je in Excel gegevens samenvoegen, herschikken en verrijken zonder kopieën. Wat zijn de mogelijkheden, en waar ligt de grens met Power Query en het gegevensmodel?",
    topics: ["formules", "data-en-power-query", "modelontwerp"], serviceLinks: ["dashboards-en-managementrapportages", "vba-power-query-automatisering"],
    sources: [EXCELBLOG, PQDOCS],
    body: `In 2022 kreeg Excel een complete set gereedschappen om gegevens binnen een werkmap dynamisch te bewerken. Waar je eerder Power Query of een macro nodig had om tabellen samen te voegen en te herschikken, kan dat nu ook met formules. Dat opent nieuwe mogelijkheden, maar roept ook de vraag op: wat doe je waar?

## Wat er kan met formules

- **Tabellen samenvoegen** met VSTACK, bijvoorbeeld de urenregistratie van drie teams in één overzicht.
- **Kolommen kiezen en herschikken** met CHOOSECOLS.
- **Filteren, sorteren en ontdubbelen** met FILTER, SORT en UNIQUE.
- **Verrijken** met XLOOKUP over de hele matrix, bijvoorbeeld het tarief bij elke regel.
- **Groeperen en totaliseren** met UNIQUE en SUMIFS, of met eigen LAMBDA-functies. (Later kwamen daar GROUPBY en PIVOTBY bij.)

Het resultaat is een levende tabel die meebeweegt met elke wijziging in de bron.

## Drie lagen, drie gereedschappen

In een goed opgezet model onderscheiden we drie lagen:

**1. Ophalen en opschonen.** Gegevens uit externe bronnen binnenhalen, kolommen hernoemen, typen goed zetten, fouten verwijderen. Dit is het domein van **Power Query**: herhaalbaar, controleerbaar, geschikt voor grote volumes.

**2. Relaties en grote aggregaties.** Feiten en dimensies koppelen, berekeningen over honderdduizenden regels. Dit is het domein van het **gegevensmodel** (Power Pivot) of Power BI.

**3. Flexibele analyse en presentatie.** Overzichten voor het dashboard, selecties op basis van keuzes van de gebruiker, top-N-lijsten. Hier zijn **dynamische matrixformules** sterk.

## Waar het misgaat

- **Alles in formules.** Een werkmap waarin tienduizenden regels met formules worden samengevoegd en verrijkt, wordt traag.
- **Alles in Power Query.** Een rapport dat bij elke filterkeuze moet worden ververst, is onhandig.
- **Geen scheiding.** Als opschoning, berekening en presentatie door elkaar lopen, is het model moeilijk te controleren.

## Een vuistregel

Wat herhaaldelijk met externe gegevens gebeurt: Power Query. Wat de gebruiker interactief wil verkennen: formules. Wat over grote volumes moet worden gerelateerd en geaggregeerd: het gegevensmodel.

## Terugblik

De nieuwe functies maken Excel flexibeler, maar vragen ook om bewuste keuzes. In ons [managementdashboard](/voorbeelden/managementdashboard) zie je hoe Power Query en dynamische formules samenwerken. Voor maatwerk zie [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages).`,
    practice: "Hoe lang duurt het voordat je belangrijkste model herberekend is na een wijziging? Als dat meerdere seconden is, kan het zinvol zijn om een deel van de bewerkingen van formules naar Power Query te verplaatsen.",
  },
  {
    number: 56, slug: "minder-hulpkolommen-dankzij-moderne-excel-functies", subjectYear: 2022, visual: "array", status: "PUBLISHED",
    title: "Minder hulpkolommen dankzij moderne Excel-functies",
    summary: "Hulpkolommen waren jarenlang de standaardoplossing voor complexe berekeningen. Met LET, LAMBDA en matrixfuncties zijn er veel minder nodig. Maar soms zijn ze juist de betere keuze.",
    topics: ["formules", "modelontwerp"], serviceLinks: ["excel-bestand-verbeteren", "excel-controleren-en-herstellen"],
    sources: [EXCELBLOG, SUPPORT],
    body: `Veel Excel-modellen hebben ze: kolommen die rechts van de tabel staan, of verborgen zijn, met tussenberekeningen. Een sleutel samengesteld uit twee velden. Een maandnummer uit een datum. Een vlag of een regel aan een voorwaarde voldoet. Ze zijn nodig omdat de uiteindelijke formule anders te complex wordt.

## Waarom hulpkolommen ontstonden

Met klassieke functies kon je moeilijk tussenstappen maken binnen één formule. Een zoekopdracht op twee criteria vroeg een samengestelde sleutel. Een berekening op een deel van een tekst vroeg eerst het uitknippen van dat deel. Dus zette je die tussenstap in een eigen kolom.

## Wat moderne functies veranderen

- **XLOOKUP** kan zoeken op meerdere criteria met een matrixexpressie, zonder samengestelde sleutel.
- **LET** maakt tussenstappen mogelijk binnen één formule.
- **FILTER** met meerdere voorwaarden vervangt vlagkolommen.
- **TEXTBEFORE en TEXTAFTER** maken uitgeknipte tekstkolommen vaak overbodig.
- **LAMBDA met BYROW** voert een berekening per rij uit zonder extra kolom.

## De voordelen van minder hulpkolommen

- **Compactere tabellen**, die beter te overzien zijn.
- **Minder kans op fouten** door hulpkolommen die niet zijn doorgetrokken.
- **Minder verborgen kolommen**, wat het model transparanter maakt.
- **Eenvoudiger onderhoud** bij wijzigingen in de brontabel.

## Wanneer hulpkolommen beter zijn

Toch zijn hulpkolommen niet altijd slecht. Integendeel:

- **Controleerbaarheid.** Een tussenresultaat in een zichtbare kolom kun je controleren, filteren en narekenen. Een tussenstap binnen een LET-formule niet.
- **Prestaties.** Een tussenresultaat dat door veel formules wordt gebruikt, kan beter één keer in een kolom worden berekend.
- **Begrijpelijkheid.** Voor gebruikers zonder diepe Excel-kennis is een reeks eenvoudige kolommen soms makkelijker te volgen dan één slimme formule.

## Een afweging per situatie

De vraag is niet: hoe kan het met zo min mogelijk kolommen? De vraag is: hoe is het voor de gebruiker en de controleur het best te begrijpen? Soms is dat één formule met LET, soms drie duidelijk benoemde hulpkolommen.

## Terugblik

Bij een [controle van een model](/diensten/excel-controleren-en-herstellen) kijken we niet alleen of hulpkolommen kloppen, maar ook of ze nog nodig zijn. Overbodige hulpkolommen ruimen we op; noodzakelijke maken we zichtbaar en benoemen we.`,
    practice: "Maak in je belangrijkste model verborgen kolommen zichtbaar. Weet je van elke kolom wat hij doet en waarom hij er staat? Kolommen die je niet kunt verklaren, zijn het eerste dat je moet onderzoeken.",
  },
  {
    number: 57, slug: "automatische-datacontroles-in-financiele-bestanden", subjectYear: 2022, visual: "shield", status: "PUBLISHED",
    title: "Automatische datacontroles in financiële bestanden",
    summary: "Een financieel model is zo betrouwbaar als de gegevens die erin gaan. Met moderne functies en Power Query kun je controles bouwen die afwijkingen automatisch signaleren voordat ze in het rapport terechtkomen.",
    topics: ["modelontwerp", "finance", "veiligheid"], serviceLinks: ["excel-controleren-en-herstellen", "financiele-modellen"],
    sources: [SUPPORT, PQDOCS, MACROBLOCK],
    body: `In 2022 werd een veelgebruikte route voor Excel-automatisering moeilijker: Microsoft begon macro's in bestanden van internet standaard te blokkeren. Veel organisaties gingen daardoor kritischer kijken naar hun bestanden, en naar de vraag hoe je zonder macro's betrouwbare controles inbouwt. Het antwoord ligt grotendeels in formules en Power Query.

## Drie soorten controles

**Controles op de invoer.** Klopt wat er binnenkomt?

- Zijn alle verwachte perioden, entiteiten en rekeningen aanwezig?
- Zijn er dubbele regels?
- Zijn de bedragen numeriek en binnen een redelijke bandbreedte?
- Sluit het totaal aan op een bekend controlegetal, zoals de proefbalans?

**Controles op de verwerking.** Klopt wat het model ermee doet?

- Is elke rekening gemapt naar een rapportageregel?
- Is de som van de onderdelen gelijk aan het totaal?
- Zijn er foutwaarden in de berekeningen?

**Controles op de uitkomst.** Is het resultaat plausibel?

- Balans: activa is passiva.
- Kasstroom sluit aan op mutatie liquide middelen.
- Afwijkingen ten opzichte van vorige periode boven een drempel.

## Hoe moderne functies helpen

- **FILTER** maakt een lijst van alle regels die niet voldoen, zoals niet-gemapte rekeningen.
- **UNIQUE** met **COUNTIF** vindt dubbele regels.
- **ISERROR in combinatie met SUMPRODUCT** telt foutwaarden in een bereik.
- **Power Query** kan bij het inlezen al regels markeren of afwijzen, en een aparte tabel met afgewezen regels maken.

## Een controleblad

Verzamel alle controles op één blad, met per controle:

- Een korte omschrijving.
- De verwachte en werkelijke waarde.
- Het verschil.
- Een status: in orde, waarschuwing of fout.

Bovenaan staat één totaalstatus. Zet die ook op het dashboard, zodat niemand een rapport verstuurt terwijl er een controle op rood staat.

## Terugblik

Automatische controles zijn de goedkoopste verzekering die een financieel model kan hebben. Ze kosten weinig tijd om te bouwen en voorkomen dat een fout pas wordt ontdekt in het directieoverleg. Bij [Excel controleren en herstellen](/diensten/excel-controleren-en-herstellen) voegen we ontbrekende controles toe. Zie ook onze aanpak bij [kwaliteit](/kwaliteit).`,
    practice: "Welke controle doe je nu handmatig voordat je een rapport verstuurt? Een optelling, een vergelijking met de proefbalans, een blik op de grootste afwijkingen? Zet die controle als formule in het model, zodat hij nooit meer kan worden vergeten.",
  },
  {
    number: 58, slug: "scenarios-vergelijken-zonder-meerdere-kopieen", subjectYear: 2022, visual: "chart", status: "PUBLISHED",
    title: "Scenario's vergelijken zonder meerdere kopieën",
    summary: "Een optimistisch, een realistisch en een pessimistisch scenario, elk in een eigen kopie van het bestand: een recept voor verwarring. Met moderne Excel bouw je scenario's in één model.",
    topics: ["finance", "modelontwerp"], serviceLinks: ["financiele-modellen", "begroting-en-budgettering"],
    sources: [SUPPORT],
    body: `De meest voorkomende manier om scenario's te maken in Excel is ook de meest riskante: het bestand kopiëren en in de kopie de aannames aanpassen. Na een paar weken zijn er drie versies, elk met kleine verschillen in de structuur, en weet niemand meer welke correcties in welke versie zijn gedaan.

## Waarom kopieën problemen geven

- **Structuurwijzigingen** worden in één versie gedaan en in de andere vergeten.
- **Vergelijken** is handwerk: cijfers uit drie bestanden naast elkaar zetten.
- **Versiebeheer** wordt drie keer zo ingewikkeld.
- **Onduidelijkheid** over welk scenario de basis is voor besluiten.

## Scenario's in één model

**Een scenariotabel.** Alle aannames die per scenario verschillen, staan in een tabel met een kolom per scenario: groei, prijsstijging, loonkostenstijging, betalingstermijn.

**Een scenariokiezer.** Een keuzelijst op het aannameblad bepaalt welk scenario actief is. Formules halen de actieve aanname op met XLOOKUP of INDEX.

**Een vergelijkingsoverzicht.** Om scenario's naast elkaar te zien, heb je de uitkomsten van alle scenario's tegelijk nodig. Daarvoor zijn een paar opties:

- **Gegevenstabel (Wat-als-analyse)**: berekent de uitkomst voor elk scenario door het model herhaaldelijk door te rekenen. Krachtig, maar kan bij grote modellen traag zijn.
- **Het model per scenario parallel opbouwen**: de berekening met een extra dimensie, bijvoorbeeld met dynamische matrices die voor alle scenario's tegelijk rekenen.
- **Een vastleggingsfunctie**: de uitkomsten van een scenario opslaan als waarden in een resultaattabel.

## Gevoeligheidsanalyse

Naast vaste scenario's is het waardevol om te zien welke aannames de grootste invloed hebben. Een **tornadografiek** laat per aanname zien hoeveel de uitkomst verandert bij een vaste variatie. Zo weet de directie waar ze het scherpst op moet letten.

## Wat het oplevert

- Eén model, één structuur, één plek voor wijzigingen.
- Scenario's direct vergelijkbaar in tabel en grafiek.
- Transparantie over welke aannames het verschil maken.

## Terugblik

In ons [investeringsmodel](/voorbeelden/investeringsmodel) en de [liquiditeitsprognose](/voorbeelden/liquiditeitsprognose) zie je scenario's in één model. Voor maatwerk zie [financiële modellen](/diensten/financiele-modellen).`,
    practice: "Tel hoeveel kopieën er van je begroting of prognose bestaan met 'scenario', 'optimistisch' of 'pessimistisch' in de naam. Meer dan één? Dan is het de moeite waard om de scenario's samen te brengen in één model met een scenariokiezer.",
  },
  {
    number: 59, slug: "bedrijfsprocessen-stroomlijnen-met-office-scripts", subjectYear: 2022, visual: "script", status: "REVIEW",
    title: "Bedrijfsprocessen stroomlijnen met Office Scripts",
    summary: "Office Scripts in combinatie met Power Automate maken het mogelijk om Excel-taken te automatiseren zonder dat iemand het bestand opent. Drie praktijkvoorbeelden en de aandachtspunten.",
    topics: ["automatisering", "samenwerken"], serviceLinks: ["vba-power-query-automatisering", "planning-en-operationele-tools"],
    sources: [SCRIPTS, EXCELBLOG],
    factNote: "Beschikbaarheid Office Scripts in Excel voor Windows en Mac (naast web) en licentievereisten nalopen; dit is in de loop van 2022-2023 uitgebreid.",
    body: `In 2021 werden Office Scripts breder beschikbaar. In 2022 zagen we de eerste volwassen toepassingen bij bedrijven: processen waarin Excel een schakel is in een geautomatiseerde keten. Microsoft breidde in die periode ook de ondersteuning uit, waaronder het uitvoeren van scripts in de desktopversie van Excel.

## Voorbeeld 1: wekelijkse rapportage

**Situatie:** elke maandag ververst een medewerker een rapport, maakt een PDF en mailt die naar het management.

**Geautomatiseerd:** een geplande stroom in Power Automate start elke maandag om 7.00 uur een Office Script. Het script ververst de tabellen, berekent het overzicht en geeft de kerncijfers terug aan de stroom. De stroom stuurt een bericht in Teams met de cijfers en een link naar het bestand.

## Voorbeeld 2: verwerking van aanvragen

**Situatie:** aanvragen komen binnen via een formulier, worden handmatig overgenomen in een Excel-lijst en daarna toegewezen.

**Geautomatiseerd:** bij elke nieuwe inzending voegt de stroom een regel toe aan de tabel. Een script bepaalt op basis van regels in het werkboek aan wie de aanvraag wordt toegewezen. De stroom mailt de behandelaar.

## Voorbeeld 3: controle op aanleveringen

**Situatie:** vestigingen leveren maandelijks een bestand aan in SharePoint. De controller controleert handmatig of alles compleet is.

**Geautomatiseerd:** bij elk nieuw bestand in de map voert een script controles uit: alle kolommen aanwezig, geen lege verplichte velden, totaal binnen een bandbreedte. Bij een fout krijgt de aanleveraar direct een bericht.

## Aandachtspunten

- **Licenties.** Office Scripts en de koppeling met Power Automate vragen een geschikte zakelijke Microsoft 365-licentie. Controleer dit vooraf.
- **Limieten.** Power Automate en Office Scripts hebben limieten op uitvoertijd en het aantal aanroepen. Voor zeer grote bestanden is dit een beperking.
- **Eigenaarschap.** Leg vast wie de stroom en het script beheert, en zorg dat een stroom niet afhankelijk is van het account van één medewerker.
- **Foutafhandeling.** Een stroom die stil faalt, is erger dan geen automatisering. Bouw meldingen in.
- **Tabelnamen.** Scripts verwijzen naar tabellen en bladen bij naam. Hernoemen breekt het script.

## Terugblik

Office Scripts zijn geen vervanging voor alle VBA, maar wel de logische keuze voor processen die in Microsoft 365 draaien. Bij [automatisering](/diensten/vba-power-query-automatisering) en [planning en operationele tools](/diensten/planning-en-operationele-tools) ontwerpen we de hele keten.`,
    practice: "Welk Excel-proces start altijd op een vast moment of na een vaste gebeurtenis, zoals een nieuw bestand of een ingevuld formulier? Dat is een kandidaat voor Office Scripts met Power Automate.",
  },
  {
    number: 60, slug: "professionele-dashboards-zonder-ingewikkelde-macros", subjectYear: 2022, visual: "chart", status: "PUBLISHED",
    title: "Professionele dashboards zonder ingewikkelde macro's",
    summary: "Interactieve dashboards in Excel vroegen vroeger vaak om VBA. In 2022 kan bijna alles met formules, slicers en grafieken. Dat maakt dashboards veiliger, sneller en beter te onderhouden.",
    topics: ["rapportage"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [SUPPORT, MACROBLOCK],
    body: `Wie tien jaar geleden een interactief dashboard in Excel wilde, kwam bijna altijd uit bij VBA. Knoppen om tussen periodes te wisselen, code om grafieken bij te werken, macro's om gegevens te filteren. In 2022 is dat anders. Met moderne functies, slicers en dynamische grafieken bouw je een volwaardig dashboard zonder één regel code.

## Waarom zonder macro's?

- **Beveiliging.** Sinds 2022 blokkeert Microsoft macro's in bestanden uit internet standaard. Een dashboard dat via de mail of een download binnenkomt, werkt dan niet zonder extra stappen.
- **Browser en Teams.** Macro's werken niet in Excel op het web. Een dashboard zonder macro's wel.
- **Onderhoud.** Formules en slicers kan iedere ervaren Excel-gebruiker aanpassen. VBA niet.
- **Bestandsformaat.** Een .xlsx is overal welkom; een .xlsm niet altijd.

## De bouwstenen

**Keuzecellen.** Een keuzelijst voor de periode, de afdeling of het scenario. Alle formules in het dashboard verwijzen naar die cel.

**Slicers en tijdlijnen.** Gekoppeld aan draaitabellen of tabellen geven ze een visuele, klikbare filter.

**Dynamische matrices.** FILTER, SORT en TAKE leveren de top tien, de afwijkingen boven een drempel, of de regels voor de gekozen afdeling.

**Voorwaardelijke opmaak.** Kleuren, pictogrammen en gegevensbalken die direct laten zien waar aandacht nodig is.

**Grafieken op benoemde bereiken** die meebewegen met de selectie.

**Sparklines** voor trends in een cel.

## Ontwerpprincipes

- **Eén vraag per onderdeel.** Wat is de omzet? Waar wijken we af? Wat is de trend?
- **Belangrijkste eerst.** Linksboven staan de kerncijfers.
- **Context bij elk getal**: vergelijking met budget, vorig jaar of norm.
- **Rust.** Minder kleuren, minder grafieken, meer witruimte.
- **Duidelijke status**: zijn de gegevens actueel, kloppen de controles?

## Wanneer toch iets anders?

Voor zeer grote datasets, rechten per gebruiker of automatisch verversen in de cloud is Power BI vaak beter. Voor rapportages waarin financials zelf willen rekenen en toelichten, blijft Excel sterk.

## Terugblik

Bekijk ons [managementdashboard](/voorbeelden/managementdashboard) voor een voorbeeld zonder macro's, of lees meer over [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages).`,
    practice: "Heeft je dashboard knoppen die een macro starten? Kijk per knop wat hij doet. Wisselen van periode of afdeling kan bijna altijd met een keuzelijst of slicer, waardoor het bestand zonder macro's werkt.",
  },
];
