import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };
const XLOOKUP = { title: "Microsoft Support: XLOOKUP-functie", url: "https://support.microsoft.com/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929" };

export const articles2019: ArticleContent[] = [
  {
    number: 21, slug: "xlookup-aangekondigd-de-opvolger-van-vlookup", subjectYear: 2019, visual: "lookup", status: "PUBLISHED",
    title: "XLOOKUP aangekondigd: de opvolger van VLOOKUP",
    summary: "In augustus 2019 introduceerde Microsoft XLOOKUP bij een deel van de Office Insiders. Eindelijk een zoekfunctie zonder de bekende valkuilen van VLOOKUP. Wat maakte hem zo welkom?",
    topics: ["formules"], serviceLinks: ["excel-bestand-verbeteren", "excel-op-maat-laten-maken"],
    sources: [XLOOKUP, EXCELBLOG],
    body: `VERT.ZOEKEN, of VLOOKUP, is waarschijnlijk de bekendste formule in Excel na SOM. Hij is ook een van de meest foutgevoelige. Eind augustus 2019 maakte Microsoft een opvolger beschikbaar voor een deel van de Office Insiders: **XLOOKUP** (in het Nederlands X.ZOEKEN). Bredere beschikbaarheid in Office 365 volgde in 2020.

## De problemen met VLOOKUP

- **Zoeken alleen naar rechts.** De zoekkolom moest links staan van de kolom met het resultaat.
- **Een kolomnummer.** Je gaf aan dat je de derde kolom wilde. Werd er een kolom ingevoegd, dan kreeg je stilletjes de verkeerde waarde.
- **Benaderend zoeken als standaard.** Wie het laatste argument vergat, kreeg geen foutmelding maar een benaderde, vaak verkeerde uitkomst.
- **Geen nette afhandeling van ontbrekende waarden.** Daar was een extra ALS.FOUT of IFNA omheen nodig.

## Wat XLOOKUP anders doet

XLOOKUP werkt met twee aparte bereiken: waar je zoekt en wat je terug wilt. Daarmee verdwijnen de meeste problemen in één keer:

- Zoeken naar links of naar rechts maakt niet uit.
- Een ingevoegde kolom verandert de uitkomst niet.
- **Exact zoeken is de standaard.**
- Een vierde argument geeft aan wat er moet verschijnen als de waarde niet wordt gevonden.
- Je kunt van onder naar boven zoeken, bijvoorbeeld voor de meest recente prijs.
- Het resultaat kan een hele rij of kolom zijn, dankzij dynamische matrices.

## Ook HLOOKUP en INDEX/MATCH

Wie VLOOKUP te beperkt vond, gebruikte vaak de combinatie INDEX en MATCH (INDEX en VERGELIJKEN). Die werkt goed, maar is voor veel gebruikers lastig te lezen. XLOOKUP biedt dezelfde flexibiliteit in één functie. Samen met XLOOKUP verscheen ook **XMATCH** als modernere versie van MATCH.

## Compatibiliteit

XLOOKUP werkt niet in oudere versies zoals Excel 2016 en 2019. Wie een bestand deelt met gebruikers die zo'n versie hebben, moet daar rekening mee houden. Bij het [verbeteren van bestaande bestanden](/diensten/excel-bestand-verbeteren) vervangen we VLOOKUP daarom niet automatisch, maar alleen als alle gebruikers een geschikte versie hebben.

## Terugblik

XLOOKUP is een goed voorbeeld van hoe een kleine functie een hele categorie fouten kan voorkomen. Het is een van de eerste dingen die we nalopen bij een controle: staan er VLOOKUP-formules met een vast kolomnummer in tabellen waar regelmatig kolommen bijkomen?`,
    practice: "Zoek in je belangrijkste bestand naar VERT.ZOEKEN-formules met een vast kolomnummer. Voeg in een kopie een kolom in de brontabel in en kijk of de uitkomsten veranderen. Zo ja, dan is overstappen op XLOOKUP de moeite waard.",
  },
  {
    number: 22, slug: "zakelijke-voordelen-van-modernere-zoekfuncties", subjectYear: 2019, visual: "lookup", status: "PUBLISHED",
    title: "De zakelijke voordelen van modernere zoekfuncties",
    summary: "Zoekfuncties verbinden tabellen met elkaar: prijzen met orders, rekeningen met rapportageregels. Betere zoekfuncties betekenen minder fouten in precies die verbindingen.",
    topics: ["formules", "modelontwerp"], serviceLinks: ["excel-controleren-en-herstellen"],
    sources: [XLOOKUP],
    body: `Waarom zou een directeur zich druk maken over een formule? Omdat zoekfuncties overal in bedrijfsmodellen zitten, op de plekken waar het er het meest toe doet. Een prijs wordt opgezocht bij een artikel. Een grootboekrekening wordt opgezocht in een mapping. Een uurtarief hoort bij een medewerker. Gaat daar iets mis, dan is de uitkomst fout zonder dat iemand het ziet.

## Waar zoekfouten vandaan komen

**Stille fouten.** Een VLOOKUP die benaderend zoekt, geeft een waarde terug, alleen de verkeerde. Er is geen foutmelding die je waarschuwt.

**Verschuivende kolommen.** Iemand voegt een kolom toe aan de prijstabel, en vanaf dat moment haalt het calculatiemodel de inkoopprijs op in plaats van de verkoopprijs.

**Ontbrekende waarden.** Een nieuw artikel staat nog niet in de prijstabel. De formule geeft #N/B, iemand zet er ALS.FOUT omheen met nul als uitkomst, en het artikel wordt voortaan gratis berekend.

## Wat modernere functies oplossen

XLOOKUP en XMATCH maken veel van deze fouten onwaarschijnlijker:

- **Exact zoeken is de standaard**, dus geen stille benaderingen.
- **Geen kolomnummers**, dus geen verschuivingsfouten.
- **Een expliciete waarde voor niet gevonden**, zodat je bewust kiest wat er gebeurt: een duidelijke melding in plaats van een nul.

## Wat het oplevert

- **Betrouwbaardere calculaties en offertes**, omdat prijzen en tarieven correct worden opgehaald.
- **Snellere controles**, omdat formules leesbaarder zijn en duidelijk laten zien welke tabel ze gebruiken.
- **Eenvoudiger onderhoud**, omdat tabellen kunnen worden uitgebreid zonder formules aan te passen.

## Niet alleen de functie

Een betere zoekfunctie lost niet alles op. De brontabellen moeten ook kloppen: unieke sleutels, geen dubbele artikelnummers, geen spaties achter codes. Een goede controle signaleert ontbrekende of dubbele sleutels voordat ze een probleem worden.

Bij een [controle en herstel](/diensten/excel-controleren-en-herstellen) kijken we daarom naar zowel de formules als de tabellen waar ze naar verwijzen.`,
    practice: "Zoek in je modellen naar ALS.FOUT of IFERROR rond zoekformules die nul teruggeven. Vervang die nul door een duidelijke tekst zoals 'Ontbreekt in prijslijst'. Dan zie je direct welke artikelen aandacht nodig hebben.",
  },
  {
    number: 23, slug: "verdere-ontwikkeling-van-dynamische-matrices", subjectYear: 2019, visual: "array", status: "PUBLISHED",
    title: "De verdere ontwikkeling van dynamische matrices",
    summary: "Een jaar na de aankondiging werden dynamische matrices bij steeds meer Insiders uitgerold. Wat leerden vroege gebruikers, en welke nieuwe manier van modelleren ontstond er?",
    topics: ["formules"], serviceLinks: ["excel-op-maat-laten-maken"],
    sources: [EXCELBLOG, { title: "Microsoft Support: Dynamische matrixformules", url: "https://support.microsoft.com/excel" }],
    factNote: "Algemene beschikbaarheid dynamische matrices in Office 365 (begin 2020) eventueel nalopen.",
    body: `Na de aankondiging in september 2018 werden dynamische matrices in 2019 bij steeds meer Office Insiders uitgerold. Het jaar gaf een eerste beeld van wat de nieuwe rekenwijze in de praktijk betekende, en van de aanpassingen die het van modelbouwers vroeg.

## Een nieuwe manier van denken

Klassieke Excel-modellen werken cel voor cel: een formule in de bovenste rij, gekopieerd naar beneden. Met dynamische matrices schrijf je één formule die een hele reeks oplevert. Dat vraagt om een andere manier van denken:

- In plaats van een formule per regel, schrijf je een formule per **resultaatblok**.
- In plaats van te verwijzen naar één cel, verwijs je naar een **overlopend bereik** met de #-notatie, bijvoorbeeld A2#.
- Overzichten passen zich automatisch aan de gegevens aan, in plaats van dat de gegevens moeten passen in een vast overzicht.

## Wat vroege gebruikers ontdekten

**Minder onderhoud.** Een lijst van unieke klanten met UNIQUE, gesorteerd met SORT, groeit automatisch mee. Geen vergeten regels meer.

**Kettingen van formules.** Je kunt functies combineren: FILTER binnen SORT binnen UNIQUE. Krachtig, maar ook minder leesbaar. Dat probleem zou later met LET worden aangepakt.

**Impliciete doorsnijding.** Oude formules die stilzwijgend één waarde uit een bereik pakten, kregen in de nieuwe Excel een @-teken om het oude gedrag te behouden. Dat zorgde aanvankelijk voor verwarring.

**#OVERLOOP!** De nieuwe foutmelding verscheen als een overlopend resultaat werd geblokkeerd door een cel die niet leeg was.

## Wat het betekende voor modelontwerp

Dynamische matrices maakten het mogelijk om rapportages te bouwen die zich volledig aanpassen aan de brongegevens. Een overzicht van omzet per klant, gesorteerd op omzet, met alleen klanten boven een drempel: één formule. Tegelijk werd het belangrijker om rekening te houden met de lay-out: een blok dat kan groeien, heeft ruimte nodig.

## Terugblik

2019 was het jaar waarin modelbouwers leerden met dynamische matrices te werken. Vanaf 2020 werden ze standaard in Microsoft 365. Wie nu een model [op maat laat maken](/diensten/excel-op-maat-laten-maken) in een omgeving waar iedereen Microsoft 365 gebruikt, krijgt bijna altijd formules die op dit principe zijn gebouwd.`,
    practice: "Zie je in een bestand een @-teken in formules verschijnen na het openen in een nieuwere Excel? Dat is geen fout, maar Excel die oud gedrag behoudt. Het is een teken dat het model nog volgens de oude methode is gebouwd, en mogelijk eenvoudiger kan.",
  },
  {
    number: 24, slug: "excel-en-financiele-marktgegevens", subjectYear: 2019, visual: "chart", status: "PUBLISHED",
    title: "Excel en financiële marktgegevens",
    summary: "Koersen, wisselkoersen en rentes: veel financiële modellen hebben marktgegevens nodig. Met het gegevenstype Aandelen kreeg Excel een ingebouwde bron. Wat kun je ermee, en wat niet?",
    topics: ["finance", "data-en-power-query"], serviceLinks: ["financiele-modellen"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "STOCKHISTORY is later (2020) geïntroduceerd; tekst noemt dat bewust als 'later'.",
    body: `Financiële modellen gebruiken vaak gegevens van buiten de organisatie: wisselkoersen voor buitenlandse inkoop, rentes voor financieringsberekeningen, koersen voor beleggingsoverzichten. Lange tijd betekende dat: handmatig opzoeken en overtypen, of een abonnement op een datadienst met een eigen Excel-invoegtoepassing.

## Het gegevenstype Aandelen

Met de gekoppelde gegevenstypen die in 2018 en 2019 werden uitgerold, kreeg Excel voor Office 365-gebruikers een ingebouwde manier om actuele koersgegevens op te halen. Je typt een bedrijfsnaam of tickersymbool, zet de cel om naar het gegevenstype Aandelen, en kunt daarna eigenschappen opvragen zoals koers, wijziging en marktwaarde. Later voegde Microsoft daar ook een functie aan toe voor historische koersgegevens.

## Toepassingen in het bedrijfsleven

- **Overzicht van beleggingen** of een pensioenportefeuille van een holding.
- **Benchmarking** van beursgenoteerde concurrenten of afnemers.
- **Wisselkoersen** voor een eenvoudige omrekening van buitenlandse bedragen, mits de bron en het moment duidelijk zijn.

## Belangrijke kanttekeningen

**Vertraging.** Koersgegevens kunnen vertraagd zijn en zijn niet bedoeld voor handelsbeslissingen.

**Bron en voorwaarden.** De gegevens komen van externe aanbieders. Voor officiële verslaggeving, zoals de omrekening van vreemde valuta in een jaarrekening, gelden vaak specifieke koersen, bijvoorbeeld die van de centrale bank op een bepaalde datum.

**Reproduceerbaarheid.** Een model dat bij elke opening nieuwe koersen ophaalt, geeft morgen een andere uitkomst dan vandaag. Voor rapportages wil je dat juist niet.

## Hoe wij ermee omgaan in modellen

In een [financieel model](/diensten/financiele-modellen) scheiden we live marktgegevens van de waarden waarmee wordt gerekend. Een aparte tabel bevat de koersen per peildatum, met de bron erbij. Het model rekent met de koers van de gekozen peildatum. Zo kun je actuele gegevens gebruiken én een rapportage van vorige maand exact reproduceren.

## Terugblik

De ingebouwde marktgegevens maakten Excel toegankelijker voor eenvoudige financiële analyses. Voor professioneel gebruik blijft de vraag naar bron, moment en reproduceerbaarheid minstens zo belangrijk als het ophalen zelf.`,
    practice: "Gebruik je wisselkoersen of rentes in een model? Voeg een kleine tabel toe met per peildatum de gebruikte waarde en de bron. Dat kost vijf minuten en voorkomt discussie met de accountant of bank.",
  },
  {
    number: 25, slug: "gegevens-importeren-vanuit-meerdere-bestanden", subjectYear: 2019, visual: "query", status: "PUBLISHED",
    title: "Gegevens importeren vanuit meerdere bestanden",
    summary: "Twaalf maandbestanden, vijf vestigingen, honderd orderexports: met Power Query lees je een hele map in één keer in. Hoe werkt dat, en waar moet je op letten?",
    topics: ["data-en-power-query", "automatisering"], serviceLinks: ["vba-power-query-automatisering"],
    sources: [PQDOCS],
    body: `Een veelvoorkomend patroon in bedrijven: dezelfde soort gegevens zit verspreid over veel bestanden. Een omzetoverzicht per maand, een urenexport per week, een kassabestand per vestiging. Wie een jaaroverzicht wil, moet ze allemaal openen en samenvoegen.

## Map als bron

Power Query kan een **map** als bron gebruiken. Je wijst een map aan en Power Query toont alle bestanden die erin staan. Met de functie *Combineren* bepaal je aan de hand van één voorbeeldbestand hoe de gegevens moeten worden ingelezen. Power Query past dezelfde stappen vervolgens op alle bestanden toe en zet het resultaat onder elkaar, met de bestandsnaam als extra kolom.

Komt er volgende maand een nieuw bestand bij, dan zet je het in de map en klik je op Vernieuwen.

## Wat je ervoor nodig hebt

**Een consistente structuur.** De bestanden moeten dezelfde kolommen hebben. Kleine verschillen, zoals een extra kolom, zijn op te vangen; een totaal andere indeling niet.

**Een vaste mapstructuur.** Alleen de bestanden die erbij horen, in de map. Een tijdelijk bestand of een kopie met *oud* in de naam wordt anders ook ingelezen. Met een filter op bestandsnaam of extensie kun je dat afvangen.

**Informatie uit de bestandsnaam.** Staat de maand of vestiging alleen in de bestandsnaam? Haal die er dan uit als kolom.

## Valkuilen

- **Verborgen bestanden** zoals tijdelijke Excel-bestanden die beginnen met ~$.
- **Verschillende tabbladnamen** in de bronbestanden.
- **Kopregels die afwijken**, bijvoorbeeld een titel boven de tabel in sommige bestanden.
- **Grote aantallen bestanden** op een netwerkschijf of SharePoint, wat het verversen traag kan maken.

## SharePoint en OneDrive

Staan de bestanden in SharePoint, dan gebruik je de SharePoint-map als bron in plaats van een gesynchroniseerde lokale map. Dan werkt het verversen voor iedereen, ongeacht op welke computer.

## Terugblik

Het combineren van bestanden uit een map is een van de meest waardevolle Power Query-technieken voor het mkb. Het is ook de basis van veel [automatiseringen](/diensten/vba-power-query-automatisering) die we bouwen: aanleveren in een map, verversen, klaar.`,
    practice: "Heb je een map met maand- of weekbestanden die je regelmatig samenvoegt? Controleer of ze allemaal dezelfde kolommen hebben. Zo ja, dan kan Power Query het samenvoegen in een paar minuten voor je opzetten.",
  },
  {
    number: 26, slug: "automatisering-van-periodieke-rapportages", subjectYear: 2019, visual: "script", status: "PUBLISHED",
    title: "Automatisering van periodieke rapportages",
    summary: "Elke maand dezelfde stappen: exporteren, plakken, verversen, controleren, verzenden. Welke stappen kun je automatiseren, met welk gereedschap, en wat moet een mens blijven doen?",
    topics: ["automatisering", "rapportage"], serviceLinks: ["vba-power-query-automatisering", "dashboards-en-managementrapportages"],
    sources: [PQDOCS, SUPPORT],
    body: `De maandrapportage is in veel bedrijven een ritueel. Na de maandafsluiting worden exports gemaakt, in een bestand geplakt, draaitabellen ververst, grafieken gecontroleerd, opmerkingen toegevoegd en het geheel als PDF gemaild. Een halve tot hele dag werk, elke maand opnieuw.

## De stappen ontleed

Bijna elke periodieke rapportage bestaat uit dezelfde stappen:

1. Gegevens ophalen uit één of meer systemen.
2. Gegevens opschonen en omzetten.
3. Berekeningen en vergelijkingen maken.
4. Controleren of alles klopt.
5. Toelichting schrijven.
6. Verspreiden.

## Welk gereedschap voor welke stap

**Ophalen en opschonen: Power Query.** Vastgelegde stappen die elke maand hetzelfde doen.

**Berekenen: formules en het datamodel.** Kengetallen, vergelijkingen met budget en vorig jaar, afwijkingen.

**Controleren: ingebouwde controles.** Aansluitingen met de bron, signalering van ontbrekende mappings, drempels voor afwijkingen.

**Verspreiden: VBA of Office Scripts.** Bijvoorbeeld een PDF per afdeling genereren, of een bestand op een vaste plek opslaan. Ook Power Automate kan hier een rol spelen.

## Wat een mens moet blijven doen

Automatisering maakt de rapportage sneller en betrouwbaarder, maar niet slimmer. De **toelichting** blijft mensenwerk: waarom wijkt de omzet af, welke actie volgt eruit? Ook de **beoordeling van controles** is een menselijke stap: een signaal dat een rekening niet is gemapt, vraagt om een beslissing.

De winst zit erin dat de tijd die vrijkomt naar precies die analyse kan gaan.

## Hoe je begint

Begin niet met het automatiseren van de laatste stap. Een macro die een PDF maakt van een handmatig opgebouwd rapport, automatiseert het minst foutgevoelige deel. Begin bij de gegevens: als het ophalen en opschonen betrouwbaar is, volgt de rest vanzelf.

## Terugblik

In 2019 waren alle bouwstenen voor geautomatiseerde rapportages in Excel beschikbaar: Power Query, het datamodel en VBA. De opkomst van Office Scripts en later AI heeft het gereedschap uitgebreid, maar de volgorde is hetzelfde gebleven. Zie ook hoe we [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages) opzetten.`,
    practice: "Schrijf de stappen van je maandrapportage op met de tijd die elke stap kost. De stappen met het meeste handwerk en de meeste kans op fouten zijn de eerste kandidaten voor automatisering, meestal het ophalen en samenvoegen van gegevens.",
  },
  {
    number: 27, slug: "moderne-dashboards-voor-financiele-controllers", subjectYear: 2019, visual: "chart", status: "PUBLISHED",
    title: "Moderne dashboards voor financiële controllers",
    summary: "Een controllersdashboard is geen marketingposter. Het moet snel laten zien waar afwijkingen zitten, waar ze vandaan komen en of de cijfers betrouwbaar zijn. Zo ontwerp je er een.",
    topics: ["rapportage", "finance"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [SUPPORT],
    body: `Een dashboard voor een financial controller heeft een ander doel dan een dashboard voor een salesteam. Het gaat minder om motivatie en meer om **sturing en betrouwbaarheid**. De controller wil in één oogopslag zien waar de cijfers afwijken van de verwachting, wat de oorzaak is en of de onderliggende gegevens kloppen.

## De bouwstenen

**Een paar kerncijfers.** Omzet, brutomarge, EBITDA, liquiditeit en eventueel een operationeel kengetal. Elk met realisatie, budget en vorig jaar, en het verschil.

**Een verklaring van afwijkingen.** Een **watervalgrafiek** laat zien hoe je van het begrote naar het gerealiseerde resultaat komt: hoeveel door hogere omzet, hoeveel door een lagere marge, hoeveel door hogere kosten. Dat is waardevoller dan drie losse staafdiagrammen.

**Trends.** Een maandelijks verloop met het budget als referentielijn, zodat je ziet of een afwijking incidenteel is of structureel.

**Signaleringen.** Afwijkingen boven een drempel worden gemarkeerd, zodat het oog direct op de juiste plek valt.

**Een controlestatus.** Sluit de rapportage aan op de proefbalans? Zijn alle rekeningen gemapt? Een groen of rood signaal op het dashboard zelf.

## Ontwerpprincipes

- **Minder kleur, meer betekenis.** Gebruik kleur alleen voor afwijkingen en markeringen, niet voor decoratie.
- **Consistente schalen.** Grafieken die je wilt vergelijken, krijgen dezelfde as.
- **Getallen afgerond op het juiste niveau.** Duizenden euro's in een directierapport, niet tot op de cent.
- **Een vaste plek voor de selectie.** Welke periode, welke afdeling, welk scenario.
- **Toelichting in het dashboard**, niet in een aparte e-mail.

## Excel als platform

Moderne Excel-functies maken dit soort dashboards goed haalbaar: dynamische bereiken voor grafieken, voorwaardelijke opmaak voor signaleringen, slicers voor selecties. Belangrijker dan de techniek is de opbouw eronder: een betrouwbare gegevensstroom en vaste definities.

## Terugblik

Wat in 2019 een modern controllersdashboard was, is het nog steeds: weinig kengetallen, goede verklaringen en zichtbare betrouwbaarheid. Bekijk het [managementdashboard](/voorbeelden/managementdashboard) voor een werkend voorbeeld met waterval en controles.`,
    practice: "Kijk naar je huidige dashboard en tel het aantal kleuren en grafieken. Kun je met de helft hetzelfde vertellen? Vervang drie losse staafdiagrammen door één waterval van budget naar realisatie, en zie of het gesprek verandert.",
  },
  {
    number: 28, slug: "belang-van-controleformules-in-begrotingen", subjectYear: 2019, visual: "shield", status: "PUBLISHED",
    title: "Het belang van controleformules in begrotingen",
    summary: "Een begroting met een fout wordt een jaar lang als maatstaf gebruikt. Controleformules vangen de meeste fouten af voordat het zover komt. Welke controles horen in elke begroting?",
    topics: ["finance", "modelontwerp"], serviceLinks: ["begroting-en-budgettering", "excel-controleren-en-herstellen"],
    sources: [SUPPORT],
    body: `Een fout in een eenmalige analyse is vervelend. Een fout in een begroting is erger: de begroting wordt een jaar lang gebruikt als maatstaf voor afdelingen, als basis voor afspraken met de bank en als vertrekpunt voor de forecast. Een vergeten rij of een dubbel getelde kostenpost werkt het hele jaar door.

## Waar begrotingen misgaan

- **Totalen die niet aansluiten.** De som van de afdelingen is niet gelijk aan het totaal van de onderneming, omdat een afdeling in het totaalblad ontbreekt.
- **Maanden die niet optellen tot het jaar.** Een jaarbedrag wordt verdeeld over twaalf maanden, maar door afronding of een handmatige aanpassing klopt de som niet meer.
- **Ontbrekende rekeningen.** Een nieuwe kostensoort staat in de begroting van één afdeling, maar wordt in het totaal niet meegenomen.
- **Tekens.** Kosten als positief getal op de ene plek en als negatief op de andere.
- **Verouderde koppelingen** naar bestanden van vorig jaar.

## Controles die in elke begroting horen

**Totaalcontrole.** Som van alle afdelingen min het totaal: moet nul zijn.

**Maandcontrole.** Som van de maanden min het jaarbedrag per regel: moet nul zijn.

**Mappingcontrole.** Zijn alle rekeningen uit de begroting gekoppeld aan een rapportageregel?

**Volledigheidscontrole.** Heeft elke afdeling een begroting ingeleverd? Zijn er afdelingen met nul omzet of nul kosten die dat niet zouden moeten hebben?

**Plausibiliteitscontrole.** Wijkt de begroting per regel meer dan een bepaald percentage af van vorig jaar? Dat is niet per se fout, maar wel een vraag waard.

## Zichtbaar maken

Controles hebben pas waarde als iemand ze ziet. Zet ze op een controleblad met een duidelijke status per controle, en toon een samenvattend signaal op het overzichtsblad. Een begroting met een rode controle wordt niet vastgesteld.

## Terugblik

In 2019 begonnen steeds meer organisaties controles niet als luxe te zien maar als onderdeel van het proces. Het zijn eenvoudige formules die veel opleveren. In elke [begroting die we bouwen](/diensten/begroting-en-budgettering) zijn ze standaard aanwezig, en het is een van de eerste dingen die we toevoegen bij een [controle en herstel](/diensten/excel-controleren-en-herstellen).`,
    practice: "Voeg aan je begroting één controleregel toe: totaal van alle afdelingen min het totaal van de onderneming. Laat de cel rood kleuren als het verschil niet nul is. Het is de eenvoudigste controle die er is, en hij vangt verrassend vaak iets af.",
  },
  {
    number: 29, slug: "waarom-sommige-spreadsheets-langzaam-worden", subjectYear: 2019, visual: "grid", status: "PUBLISHED",
    title: "Waarom sommige spreadsheets langzaam worden",
    summary: "Een bestand dat bij elke wijziging seconden nadenkt, kost dagelijks tijd en frustratie. De oorzaken zijn vaak te vinden in een paar herkenbare patronen. Zo maak je een traag bestand weer snel.",
    topics: ["modelontwerp"], serviceLinks: ["excel-bestand-verbeteren", "excel-controleren-en-herstellen"],
    sources: [{ title: "Microsoft Learn: Excel-prestaties verbeteren", url: "https://learn.microsoft.com/office/vba/excel/concepts/excel-performance/excel-improving-calcuation-performance" }],
    factNote: "Link naar Microsoft Learn-pagina over Excel-prestaties controleren (URL bevat mogelijk typfout in origineel pad).",
    body: `Bijna iedereen die met Excel werkt, kent het: je past één getal aan en onderin het scherm verschijnt *Berekenen (4 processors): 23%*. Het bestand is ooit snel geweest, maar is in de loop der jaren steeds trager geworden. Wat is er gebeurd?

## De meest voorkomende oorzaken

**Volatiele functies.** Functies zoals NU, VANDAAG, INDIRECT, VERSCHUIVING (OFFSET) en ASELECT worden bij elke wijziging opnieuw berekend, samen met alles wat ervan afhangt. Een paar honderd INDIRECT-formules kunnen een heel model vertragen.

**Verwijzingen naar hele kolommen.** Een formule die verwijst naar A:A, rekent in principe met ruim een miljoen rijen. In moderne Excel is dat beter geoptimaliseerd, maar in combinatie met matrixberekeningen of SOMPRODUCT kan het nog steeds traag zijn.

**Duizenden zoekformules.** Elke VLOOKUP of SUMIFS doorzoekt een tabel. Tienduizend van die formules op een grote tabel is veel rekenwerk.

**Lange afhankelijkheidsketens.** Een berekening die afhangt van een berekening die afhangt van een berekening, over meerdere tabbladen.

**Opmaak en objecten.** Voorwaardelijke opmaak op hele kolommen, duizenden opmaakregels die door kopiëren zijn ontstaan, of verborgen vormen en namen.

**Externe koppelingen.** Verwijzingen naar andere bestanden, mogelijk op een trage netwerkschijf.

## Hoe je het oplost

- **Vervang volatiele functies** door niet-volatiele alternatieven. INDEX in plaats van OFFSET, een vaste verwijzing of tabelverwijzing in plaats van INDIRECT.
- **Gebruik tabellen** in plaats van hele kolommen, zodat formules precies zo groot zijn als nodig.
- **Bereken één keer, verwijs vaak.** Een hulpkolom met een sleutel is sneller dan dezelfde complexe voorwaarde in duizend formules.
- **Verplaats zware bewerkingen naar Power Query** of het datamodel, waar ze één keer bij het verversen gebeuren.
- **Ruim op**: overbodige opmaakregels, ongebruikte namen, verborgen objecten.

## Meten, niet gokken

Voordat je gaat optimaliseren, is het slim om te meten welk tabblad of welke formules de meeste rekentijd kosten. Vaak zit het grootste deel van de vertraging in een klein deel van het model.

## Terugblik

Prestatieproblemen zijn een van de meest gehoorde redenen om een bestand te laten [verbeteren](/diensten/excel-bestand-verbeteren). Het goede nieuws: met gerichte aanpassingen is een bestand vaak vele malen sneller te maken, zonder dat de gebruiker anders hoeft te werken.`,
    practice: "Zoek in je trage bestand naar INDIRECT en VERSCHUIVING (OFFSET) en tel hoe vaak ze voorkomen. Staan ze in honderden cellen, dan is dat waarschijnlijk een belangrijke oorzaak. Vervangen kost wat tijd, maar het effect is vaak direct merkbaar.",
  },
  {
    number: 30, slug: "opkomst-van-professionelere-spreadsheetarchitectuur", subjectYear: 2019, visual: "grid", status: "PUBLISHED",
    title: "De opkomst van professionelere spreadsheetarchitectuur",
    summary: "Modelleerstandaarden, vaste kleurcodes en een scheiding tussen invoer, berekening en uitvoer: in de financiële wereld werd spreadsheetontwerp steeds meer een vak. Wat kun je daarvan leren?",
    topics: ["modelontwerp", "finance"], serviceLinks: ["financiele-modellen", "excel-op-maat-laten-maken"],
    sources: [SUPPORT],
    body: `In de wereld van projectfinanciering, fusies en overnames en corporate finance werden financiële modellen al langer volgens strikte richtlijnen gebouwd. Daar is een fout in een model niet alleen vervelend, maar kan het om miljoenen gaan. Rond 2019 vonden die principes steeds vaker hun weg naar het reguliere bedrijfsleven.

## Modelleerstandaarden

Verschillende organisaties en adviesbureaus publiceerden in de loop der jaren standaarden voor het bouwen van spreadsheetmodellen. Ze verschillen in details, maar delen een aantal kernprincipes:

- **Scheiding van invoer, berekening en uitvoer.** Elk op een eigen plek, zodat duidelijk is wat aannames zijn en wat uitkomsten.
- **Consistente formules per rij.** Een formule is over de hele tijdas hetzelfde. Geen uitzonderingen in kolom H.
- **Eén tijdas.** Alle tabbladen met tijdreeksen gebruiken dezelfde kolommen voor dezelfde periodes.
- **Kleurcodes.** Bijvoorbeeld blauw voor invoer, zwart voor berekeningen, groen voor verwijzingen naar andere tabbladen.
- **Eenvoudige formules.** Liever drie leesbare stappen dan één formule die niemand begrijpt.
- **Controles.** Balans sluit, kasstroom sluit aan op de balans, geen foutwaarden.

## Waarom het ook voor het mkb relevant is

Een middelgroot bedrijf heeft geen team van modelleurs, maar wel modellen die belangrijk zijn: de begroting, de liquiditeitsprognose, de calculatie. Juist omdat er weinig mensen zijn die het model kennen, is een herkenbare, voorspelbare opbouw waardevol. Een nieuwe controller, een accountant of een bank kan het model dan sneller doorgronden.

## Niet dogmatisch

Standaarden zijn hulpmiddelen, geen doel. Een eenvoudige urenplanning hoeft niet volgens dezelfde strikte regels te worden gebouwd als een projectfinancieringsmodel. Kies de principes die passen bij het belang en de levensduur van het model. Moderne functies zoals LET en dynamische matrices vragen soms ook om een eigen invulling van de regels.

## Terugblik

De professionalisering van spreadsheetontwerp is sinds 2019 doorgezet. Bij het bouwen van [financiële modellen](/diensten/financiele-modellen) gebruiken we deze principes als basis: herkenbaar, consistent en controleerbaar. In onze [voorbeelden](/voorbeelden) zie je ze terug in de kleurcodes en controlebladen.`,
    practice: "Kies voor je belangrijkste model één kleur voor invoercellen en pas die consequent toe. Het is de kleinste stap richting een professionele opbouw, en gebruikers zien direct waar ze iets mogen veranderen.",
  },
];
