import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };

export const articles2018: ArticleContent[] = [
  {
    number: 11, slug: "microsoft-kondigt-ai-ondersteunde-inzichten-in-excel-aan", subjectYear: 2018, visual: "ai", status: "PUBLISHED",
    title: "Microsoft kondigt AI-ondersteunde inzichten in Excel aan",
    summary: "Met Ideeën (Ideas) liet Microsoft Excel zelf patronen, trends en uitschieters in een tabel voorstellen. Een eerste stap naar AI in de spreadsheet, en een les in wat AI wel en niet kan.",
    topics: ["ai-en-copilot", "rapportage"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "Naamgeving: Insights (2017, Insiders) → Ideas (2018) → Analyze Data (later). Exacte data in Excel Blog-archief nalopen.",
    body: `Lang voordat iemand van Copilot had gehoord, experimenteerde Microsoft al met kunstmatige intelligentie in Excel. In 2017 verscheen voor Office Insiders een functie onder de naam *Insights*, en in 2018 presenteerde Microsoft de doorontwikkeling daarvan als **Ideeën** (Ideas). Later kreeg de functie de naam *Gegevens analyseren* (Analyze Data).

## Wat de functie deed

Je selecteert een tabel en klikt op Ideeën. Excel analyseert de gegevens in de cloud en stelt een reeks grafieken en draaitabellen voor: een trend over de tijd, een categorie die opvallend afwijkt, een uitschieter in een maand, de verdeling van omzet over productgroepen. Met één klik voeg je een voorstel toe aan je werkmap.

Voor wie een nieuwe dataset voor het eerst bekijkt, was dat een snelle manier om een eerste indruk te krijgen. Je hoefde niet zelf te bedenken welke draaitabel je zou maken; Excel deed suggesties.

## Wat het niet deed

De voorstellen waren gebaseerd op statistische patronen, niet op kennis van je bedrijf. Een afwijking in december kan een seizoenseffect zijn dat iedereen kent, of een boekingsfout. Een trend kan verklaard worden door een prijsverhoging die al was gepland. Ideeën kon die context niet kennen.

Daarnaast werkte de functie het best met nette tabellen: één kopregel, geen samengevoegde cellen, geen subtotalen tussen de regels. Wie een rommelig werkblad aanbood, kreeg weinig bruikbare suggesties.

## Wat we ervan leerden

Achteraf gezien liet Ideeën al zien wat ook voor latere AI-functies geldt:

- **Goede brongegevens zijn een voorwaarde.** AI werkt beter op gestructureerde tabellen.
- **AI vindt patronen, mensen geven betekenis.** De vraag of een afwijking relevant is, vraagt kennis van het bedrijf.
- **Verkennen is iets anders dan rapporteren.** Een suggestie is een startpunt; een managementrapportage vraagt vaste definities en controles.

## De lijn naar nu

Ideeën was een bescheiden begin. De echte doorbraak van AI in Excel kwam jaren later met Copilot. Maar de basisvraag bleef dezelfde: hoe gebruik je automatische analyse zonder de controle over je cijfers te verliezen? Dat is precies waar een goed opgebouwd [dashboard](/diensten/dashboards-en-managementrapportages) en een vaste rapportagestructuur het verschil maken.`,
    practice: "Automatische analysefuncties zijn handig om een nieuwe dataset te verkennen. Gebruik ze als startpunt, maar laat de vaste maandrapportage altijd steunen op gedefinieerde kengetallen en controles. Zo weet je dat een opvallende uitschieter echt iets betekent.",
  },
  {
    number: 12, slug: "opkomst-van-nieuwe-gegevenstypen-in-excel", subjectYear: 2018, visual: "grid", status: "PUBLISHED",
    title: "De opkomst van nieuwe gegevenstypen in Excel",
    summary: "Met gekoppelde gegevenstypen voor aandelen en geografie kreeg een cel in Excel meer dan één waarde. Een kleine functie met een groot idee: een cel als verwijzing naar een rijk gegevensobject.",
    topics: ["formules", "data-en-power-query"], serviceLinks: ["financiele-modellen"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "Aankondiging 2018 (Insiders), bredere beschikbaarheid daarna. Beschikbaarheid gegevenstypen verschilt per abonnement.",
    body: `Een cel in Excel bevatte decennialang één ding: een getal, een tekst, een datum of een formule. In 2018 introduceerde Microsoft voor Office 365-gebruikers in een preview een nieuw concept: **gekoppelde gegevenstypen**. De eerste twee waren *Aandelen* (Stocks) en *Geografie* (Geography).

## Hoe het werkt

Je typt in een cel de naam van een land, stad of beursgenoteerd bedrijf en zet de cel om naar een gegevenstype. Excel zoekt de bijbehorende gegevens op in een online bron en toont een klein pictogram in de cel. Achter dat pictogram zit een hele kaart met eigenschappen: voor een land onder meer de hoofdstad, het aantal inwoners en de oppervlakte; voor een aandeel onder meer de koers en de marktwaarde.

Die eigenschappen haal je met een eenvoudige verwijzing naar de cel tevoorschijn, bijvoorbeeld de bevolking van het land in cel A2. Ververs je de gegevens, dan worden de waarden bijgewerkt.

## Waarom dit meer is dan een gimmick

Het principe is belangrijker dan de twee voorbeelden. Een cel wordt een **verwijzing naar een object** met meerdere eigenschappen, in plaats van een losse waarde. Dat idee kwam later terug in eigen gegevenstypen op basis van Power Query en in koppelingen met organisatiegegevens.

Voor bedrijven betekent het dat stamgegevens, zoals klanten, producten of vestigingen, als één samenhangend object in een werkblad kunnen staan, met eigenschappen die je opvraagt wanneer je ze nodig hebt.

## Kanttekeningen

- **Bron en actualiteit.** De gegevens komen van externe aanbieders. Voor beslissingen met financiële gevolgen moet je weten hoe actueel ze zijn en waar ze vandaan komen.
- **Niet geschikt voor handel.** Koersgegevens kunnen vertraagd zijn en zijn niet bedoeld voor realtime handelsbeslissingen.
- **Compatibiliteit.** Gebruikers met oudere Excel-versies zien gegevenstypen niet of niet volledig. Bij gedeelde modellen is dat een aandachtspunt.

## Wat het betekent voor modelbouw

Gegevenstypen maken een model compacter en beter leesbaar. Tegelijk introduceren ze een afhankelijkheid van een externe bron. In een [financieel model](/diensten/financiele-modellen) leggen we daarom vast welke waarden op welk moment zijn opgehaald, zodat uitkomsten reproduceerbaar blijven.`,
    practice: "Gebruik je externe gegevens, zoals wisselkoersen of marktprijzen, in een model? Leg dan altijd vast welke waarde op welk moment is gebruikt. Een kolom met een peildatum en een bevroren kopie van de waarde voorkomen discussie achteraf.",
  },
  {
    number: 13, slug: "dynamic-arrays-belangrijke-stap-voor-modern-excel", subjectYear: 2018, visual: "array", status: "PUBLISHED",
    title: "Dynamic arrays: een belangrijke stap voor modern Excel",
    summary: "In september 2018 kondigde Microsoft dynamische matrices aan: formules die automatisch uitlopen over meerdere cellen. Het veranderde de manier waarop je in Excel rekent fundamenteel.",
    topics: ["formules"], serviceLinks: ["excel-op-maat-laten-maken", "excel-bestand-verbeteren"],
    sources: [EXCELBLOG, { title: "Microsoft Support: Dynamische matrixformules en overlopend matrixgedrag", url: "https://support.microsoft.com/excel" }],
    body: `Op de Ignite-conferentie in september 2018 kondigde Microsoft een van de grootste veranderingen in de rekenengine van Excel aan: **dynamische matrices**. De functionaliteit kwam eerst beschikbaar voor een deel van de Office Insiders; algemene beschikbaarheid in Office 365 volgde later.

## Wat er veranderde

Voorheen leverde een formule één uitkomst in één cel. Wilde je meerdere uitkomsten, zoals een gefilterde lijst, dan moest je de formule naar beneden kopiëren of een ingewikkelde matrixformule invoeren met Ctrl+Shift+Enter.

Met dynamische matrices kan één formule een hele reeks uitkomsten opleveren. Die uitkomsten **lopen over** (spill) naar de cellen eronder of ernaast. Verandert de bron, dan groeit of krimpt het resultaat automatisch mee.

## De nieuwe functies

Samen met het nieuwe gedrag kondigde Microsoft een reeks functies aan die er optimaal gebruik van maken:

- **FILTER**: alle rijen die aan een voorwaarde voldoen.
- **SORT** en **SORTBY**: een gesorteerde versie van een bereik.
- **UNIQUE**: de unieke waarden uit een lijst.
- **SEQUENCE**: een reeks getallen, bijvoorbeeld maanden of weeknummers.
- **RANDARRAY**: een matrix met willekeurige getallen.

## Waarom dit zo belangrijk is

Het grootste voordeel is niet dat formules korter worden, maar dat **modellen robuuster worden**. Een lijst met unieke afdelingen die automatisch meegroeit, betekent dat je niet meer vergeet een nieuwe afdeling toe te voegen aan het overzicht. Een gefilterde lijst van openstaande facturen hoeft niet meer handmatig te worden bijgewerkt.

Daarnaast verdwijnen veel hulpkolommen en gekopieerde formules, en daarmee een belangrijke bron van fouten: de formule die in rij 1 t/m 500 staat, maar niet in rij 501.

## Waar je op moet letten

Dynamische matrices werken niet in oudere Excel-versies. Een bestand met FILTER of UNIQUE dat wordt geopend in Excel 2016 of 2019 toont foutmeldingen of statische waarden. Bij modellen die breed worden gedeeld, is het dus belangrijk te weten welke versie de gebruikers hebben.

Ook vraagt het nieuwe gedrag om ruimte: een formule die overloopt, heeft lege cellen nodig. Staat daar iets, dan geeft Excel de fout #OVERLOOP!.

## Terugblik

Dynamische matrices legden de basis voor bijna alle latere formulevernieuwingen, van XLOOKUP en LET tot LAMBDA en de tekstfuncties van 2022. In de modellen die we nu [op maat bouwen](/diensten/excel-op-maat-laten-maken) zijn ze vaak de ruggengraat.`,
    practice: "Heb je overzichten die je handmatig bijwerkt als er een klant, product of afdeling bijkomt? Met UNIQUE en FILTER maak je ze zelfvoorzienend. Controleer wel eerst of alle gebruikers een Excel-versie hebben die dynamische matrices ondersteunt.",
  },
  {
    number: 14, slug: "gegevensherkenning-vanuit-afbeeldingen", subjectYear: 2018, visual: "grid", status: "PUBLISHED",
    title: "De ontwikkeling van gegevensherkenning vanuit afbeeldingen",
    summary: "Een foto van een tabel maken en hem als bewerkbare gegevens in Excel krijgen. Microsoft bracht die mogelijkheid eerst naar de mobiele app. Handig, mits je weet waar de grenzen liggen.",
    topics: ["data-en-power-query", "ai-en-copilot"], serviceLinks: ["vba-power-query-automatisering"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "Datering 'Gegevens uit afbeelding invoegen': aankondiging 2018, eerst Android, later iOS en desktop. Precieze data nalopen.",
    body: `Een geprinte prijslijst, een tabel in een PDF-scan of een overzicht op een whiteboard: veel gegevens bestaan alleen als beeld. Overtypen kost tijd en levert fouten op. Microsoft kondigde rond 2018 een functie aan die dat moest oplossen: **gegevens uit een afbeelding invoegen**, aanvankelijk in de mobiele Excel-app voor Android en later ook op andere platforms.

## Hoe het werkt

Je maakt met de camera van je telefoon een foto van een tabel. Excel herkent met beeldherkenning de rijen, kolommen en tekens, en zet ze om naar cellen. Voordat de gegevens worden ingevoegd, kun je twijfelgevallen controleren en corrigeren; Excel markeert de cellen waarbij de herkenning onzeker is.

## Waar het van pas komt

- **Eenmalige overname** van een tabel uit een document dat je niet digitaal hebt.
- **Snel vastleggen** van een overzicht tijdens een overleg.
- **Kleine lijsten** zoals een prijsopgave of een rooster op papier.

## Waar het niet voor bedoeld is

Beeldherkenning maakt fouten. Een 1 die een 7 wordt, een komma die een punt wordt, of een kolom die verschuift doordat een cel leeg was. Voor een lijst van twintig regels is dat snel te controleren. Voor een structurele gegevensstroom, zoals inkoopfacturen of bankafschriften, is het geen betrouwbare basis.

Voor terugkerende gegevens is het beter om bij de bron te beginnen: een digitale export, een CSV-bestand of een koppeling. Daar zijn de gegevens al gestructureerd en is er geen herkenningsstap nodig.

## Een les over automatisering

De functie laat een principe zien dat voor elke automatisering geldt: **automatiseer het proces, niet alleen de stap.** Als je elke maand een geprinte lijst fotografeert, los je met beeldherkenning het overtypen op, maar niet het feit dat de gegevens op papier staan. Vaak is de betere vraag: kan de leverancier, het systeem of de collega de gegevens digitaal aanleveren?

## Terugblik

Beeldherkenning is in de jaren daarna verder verbeterd en onderdeel geworden van bredere AI-functies. Het principe blijft overeind: controleer automatisch herkende gegevens altijd voordat je erop rekent. In de [automatiseringen](/diensten/vba-power-query-automatisering) die we bouwen, beginnen we daarom bij de meest gestructureerde bron die beschikbaar is.`,
    practice: "Gebruik beeldherkenning voor eenmalige klusjes. Krijg je dezelfde gegevens elke maand op papier of als scan? Vraag dan of de bron een digitale export kan leveren. Dat is bijna altijd betrouwbaarder en sneller.",
  },
  {
    number: 15, slug: "excel-en-de-avg-veilig-omgaan-met-bedrijfsgegevens", subjectYear: 2018, visual: "shield", status: "PUBLISHED",
    title: "Excel en de AVG: veilig omgaan met bedrijfsgegevens",
    summary: "Sinds 25 mei 2018 geldt de Algemene verordening gegevensbescherming. Spreadsheets met namen, salarissen of klantgegevens vallen daar gewoon onder. Wat betekent dat in de praktijk?",
    topics: ["veiligheid", "modelontwerp"], serviceLinks: ["planning-en-operationele-tools", "excel-controleren-en-herstellen"],
    sources: [{ title: "Verordening (EU) 2016/679 (AVG/GDPR), EUR-Lex", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }, { title: "Autoriteit Persoonsgegevens", url: "https://autoriteitpersoonsgegevens.nl" }],
    body: `Op 25 mei 2018 werd de **Algemene verordening gegevensbescherming** (AVG) van toepassing in de hele Europese Unie. Veel organisaties richtten zich op hun CRM, hun website en hun nieuwsbrief. Maar een groot deel van de persoonsgegevens in een gemiddeld bedrijf staat in spreadsheets: personeelsplanningen, salarisoverzichten, klantlijsten en exportbestanden.

## Spreadsheets zijn ook verwerkingen

De AVG maakt geen onderscheid tussen een database en een Excel-bestand. Staat er een naam, e-mailadres, telefoonnummer, salaris of verzuimregistratie in, dan verwerk je persoonsgegevens. Dezelfde principes gelden: doelbinding, dataminimalisatie, juistheid, beperkte bewaartermijn en passende beveiliging.

## Waar het in de praktijk misgaat

- **Kopieën.** Een export uit het salarissysteem wordt opgeslagen op een laptop, gemaild naar een collega en bewaard in een downloadmap.
- **Te veel gegevens.** Voor een bezettingsoverzicht zijn geen geboortedata of BSN-nummers nodig, maar ze staan er wel in omdat de export ze bevatte.
- **Geen opruiming.** Oude versies van bestanden met persoonsgegevens blijven jarenlang bestaan.
- **Onbeveiligde deling.** Een bestand met gevoelige gegevens wordt gedeeld via een openbare link.

## Wat je in een Excel-model kunt doen

**Minimaliseer.** Haal alleen de kolommen op die je nodig hebt. Met Power Query kun je bij het inlezen direct overbodige kolommen verwijderen, zodat ze nooit in het werkboek terechtkomen.

**Pseudonimiseer waar mogelijk.** Voor analyses volstaat vaak een personeelsnummer in plaats van een naam.

**Scheid gevoelige gegevens.** Zet bijvoorbeeld salarisgegevens op een apart, beveiligd tabblad of in een apart bestand, en toon in het overzicht alleen totalen.

**Beheer toegang centraal.** Sla bestanden op in een omgeving met toegangsbeheer en versiegeschiedenis, zoals SharePoint, in plaats van op lokale schijven of in e-mailbijlagen.

**Spreek bewaartermijnen af.** En pas ze ook toe op de spreadsheets, niet alleen op de systemen.

## Wachtwoorden zijn geen beveiliging

Bladbeveiliging in Excel voorkomt dat iemand per ongeluk een formule overschrijft. Het is geen beveiliging tegen iemand die gegevens wil inzien. Echte beveiliging zit in wie toegang heeft tot het bestand.

Bij [planningstools](/diensten/planning-en-operationele-tools) met personeelsgegevens is dit vanaf het eerste ontwerp een uitgangspunt.`,
    practice: "Zoek in je gedeelde mappen naar bestanden met 'export', 'salaris' of 'personeel' in de naam. Controleer per bestand of het nog nodig is, wie erbij kan en of alle kolommen nodig zijn. Dit levert vaak meer op dan een nieuw beleidsdocument.",
  },
  {
    number: 16, slug: "waarom-dashboards-vaker-interactief-worden", subjectYear: 2018, visual: "chart", status: "PUBLISHED",
    title: "Waarom dashboards vaker interactief worden",
    summary: "Van een statische PDF naar een dashboard waarin je zelf filtert en doorklikt. Waarom managers dat steeds vaker verwachten, en hoe je in Excel interactiviteit toevoegt zonder het overzicht te verliezen.",
    topics: ["rapportage"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [SUPPORT],
    body: `De klassieke managementrapportage was een document: een PDF met tabellen en grafieken, maandelijks gemaild. Wie een vraag had, moest die stellen aan de controller, die vervolgens een nieuwe analyse maakte. Rond 2018 verschoof de verwachting. BI-tools als Power BI maakten interactieve dashboards populair, en managers wilden ook in Excel zelf kunnen filteren.

## Wat interactiviteit oplevert

**Eigen vragen beantwoorden.** Hoe doet deze afdeling het? Hoe zag dezelfde maand er vorig jaar uit? Een manager kan het zelf zien, zonder te wachten.

**Eén dashboard voor meerdere lezers.** In plaats van een aparte rapportage per afdeling, kiest elke lezer zijn eigen selectie.

**Van overzicht naar detail.** Begin met het totaal, klik door naar de afdeling, en daarna naar de rekeningen die de afwijking verklaren.

## Interactiviteit in Excel

Excel biedt meerdere manieren om een dashboard interactief te maken:

- **Slicers en tijdlijnen** op draaitabellen, voor snelle filters op afdeling, product of periode.
- **Keuzelijsten met datavalidatie**, gekoppeld aan formules die de getoonde gegevens bepalen. Bijvoorbeeld een cel waarin je de peilmaand kiest.
- **Formulierbesturingselementen**, zoals schuifbalken en keuzerondjes, voor scenario's.
- **Hyperlinks** tussen overzicht en detailbladen.

## De valkuil: te veel knoppen

Een dashboard met twintig filters is geen dashboard meer, maar een analyse-instrument. De lezer verliest het overzicht en het risico op verkeerde conclusies groeit: wie vergeet dat er nog een filter aanstaat, kijkt naar het verkeerde getal.

Een paar richtlijnen:

- **Maximaal drie of vier keuzes**, zoals periode, afdeling en scenario.
- **Altijd zichtbaar welke selectie actief is**, bij voorkeur in de titel van het dashboard.
- **Een vaste standaardweergave** die het totaalbeeld toont.
- **Detail op een apart blad**, zodat het hoofdoverzicht rustig blijft.

## Excel of Power BI?

Power BI is sterker in grote datasets, automatische verversing en delen via de browser. Excel is sterker in flexibiliteit, scenario's en rekenwerk dat financiële mensen zelf willen volgen. In de praktijk vullen ze elkaar aan. Voor veel middelgrote bedrijven is een goed opgezet Excel-dashboard een prima start.

Probeer het zelf in het [managementdashboard](/voorbeelden/managementdashboard): kies een peilmaand, filter op afdeling en zie de waterval meebewegen.`,
    practice: "Vraag de lezers van je rapportage welke drie vragen ze het vaakst stellen na het lezen. Maak precies die drie vragen beantwoordbaar met een keuze in het dashboard, en niet meer.",
  },
  {
    number: 17, slug: "power-query-als-schakel-tussen-bedrijfssoftware-en-excel", subjectYear: 2018, visual: "query", status: "PUBLISHED",
    title: "Power Query als schakel tussen bedrijfssoftware en Excel",
    summary: "Boekhouding, ERP, CRM en urenregistratie: elk systeem heeft zijn eigen export. Power Query werd de vertaler die al die bronnen samenbrengt in één consistent Excel-model.",
    topics: ["data-en-power-query", "automatisering"], serviceLinks: ["vba-power-query-automatisering"],
    sources: [PQDOCS],
    body: `In een gemiddeld mkb-bedrijf draaien al snel vier of vijf systemen: een boekhoudpakket, een ERP- of ordersysteem, een CRM, een urenregistratie en misschien een webshop. Elk systeem levert zijn eigen rapporten, maar de vragen van de directie gaan bijna altijd over de combinatie: wat is de marge per klant, inclusief de uren die we eraan besteden?

## Het probleem van exports

Elk systeem exporteert anders. Het ene levert datums als tekst, het andere bedragen met een punt als decimaalteken. Klantnummers hebben in het ene systeem voorloopnullen en in het andere niet. Kolomnamen veranderen na een update. Wie die exports handmatig combineert, besteedt meer tijd aan opschonen dan aan analyseren.

## Power Query als vertaler

Power Query is gemaakt voor precies dit werk. Het kan gegevens ophalen uit onder meer:

- **Bestanden**: Excel, CSV, tekst, XML en JSON, ook alle bestanden in een map tegelijk.
- **Databases**: zoals SQL Server en andere databases waarvoor een connector beschikbaar is.
- **Webbronnen en API's**: gegevens van een webadres, mits de bron dat toestaat.
- **SharePoint en OneDrive**: lijsten en bestanden in Microsoft 365.

Per bron leg je de stappen vast om de gegevens in een standaardvorm te brengen. Daarna kun je ze samenvoegen: orders met klanten, uren met projecten, boekingen met een rekeningschema.

## Ontwerpprincipes

- **Eén query per bron**, die alleen opschoont. Daarna aparte query's die combineren. Zo vind je snel waar een probleem zit.
- **Typen expliciet instellen**: datums als datum, bedragen als decimaal getal. Dat voorkomt verrassingen.
- **Robuust tegen kleine wijzigingen**: verwijs naar kolomnamen, niet naar posities, en houd rekening met lege bestanden.
- **Parameters voor paden**, zodat een collega het bestand op een andere locatie kan verversen.

## Koppelen of exporteren?

Een directe koppeling met een systeem klinkt ideaal, maar vraagt om rechten, beveiliging en soms extra licenties. Een vaste export die automatisch wordt ingelezen is vaak eenvoudiger, robuuster en goed genoeg voor maandelijkse rapportages. De keuze hangt af van hoe actueel de gegevens moeten zijn.

Bij [Power Query en automatisering](/diensten/vba-power-query-automatisering) beginnen we daarom altijd met de vraag hoe vaak de gegevens ververst moeten worden en wie dat doet.`,
    practice: "Maak een lijstje van alle exports die maandelijks in je rapportages terechtkomen, met per export de bron, het formaat en wie hem maakt. Dat overzicht is de blauwdruk voor een geautomatiseerde gegevensstroom.",
  },
  {
    number: 18, slug: "professionele-spreadsheet-is-meer-dan-formules", subjectYear: 2018, visual: "grid", status: "PUBLISHED",
    title: "Een professionele spreadsheet is meer dan een verzameling formules",
    summary: "Formules zijn het makkelijkste deel. Wat een spreadsheet professioneel maakt, zijn structuur, controles, documentatie en een ontwerp dat rekening houdt met de mensen die ermee werken.",
    topics: ["modelontwerp"], serviceLinks: ["excel-op-maat-laten-maken", "excel-controleren-en-herstellen"],
    sources: [SUPPORT],
    body: `Onderzoek naar spreadsheetfouten laat al jaren hetzelfde beeld zien: in een groot deel van de bedrijfsspreadsheets zitten fouten, en een deel daarvan heeft financiële gevolgen. Toch zijn het zelden de ingewikkelde formules die het probleem vormen. Het gaat mis in de opbouw.

## Vijf kenmerken van een professioneel model

**1. Een duidelijke structuur.** Invoer, berekeningen en uitkomsten staan op aparte plekken. Wie het model opent, ziet direct waar hij iets mag invullen en waar de resultaten staan.

**2. Eén plek per gegeven.** Een btw-percentage, een uurtarief of een indexatie staat één keer in het model en wordt overal naar verwezen. Nooit hetzelfde getal op drie plekken typen.

**3. Consistente formules.** Een formule in een kolom is in elke rij hetzelfde. Uitzonderingen worden niet stilletjes overschreven met een vast getal, maar zichtbaar gemaakt.

**4. Ingebouwde controles.** Sluit de balans? Is de som van de afdelingen gelijk aan het totaal? Zijn er codes die niet in de stamtabel voorkomen? Een controleblad maakt het verschil tussen hopen en weten.

**5. Documentatie.** Een uitlegblad dat beschrijft wat elk tabblad doet, wat de gebruiker moet invullen en hoe de gegevens worden ververst.

## Ontwerp voor gebruikers

Een model wordt meestal niet gebruikt door degene die het heeft gebouwd. Denk daarom aan:

- **Herkenbare invoercellen** met een vaste kleur.
- **Keuzelijsten** in plaats van vrije tekst.
- **Begrijpelijke foutmeldingen**, in plaats van #N/B in het dashboard.
- **Logische volgorde van tabbladen**, van invoer naar uitkomst.
- **Beveiliging** van rekenbladen tegen per ongeluk overschrijven.

## Waarom dit vaak ontbreekt

Spreadsheets groeien. Iemand begint met een eenvoudig overzicht, voegt een kolom toe, kopieert een tabblad, en drie jaar later draait de begroting op een bestand dat nooit is ontworpen. Niemand heeft het bewust slecht gedaan; er is gewoon nooit een moment geweest om het goed te doen.

Dat moment kun je creëren. Een [controle van een bestaand model](/diensten/excel-controleren-en-herstellen) laat zien waar de risico's zitten, en vaak is met gerichte verbeteringen al veel gewonnen. Op onze pagina over [kwaliteit](/kwaliteit) lees je welke tien punten we bij elk model nalopen.`,
    practice: "Open je belangrijkste model en vraag een collega zonder uitleg een waarde aan te passen en een uitkomst te vinden. Kijk waar hij twijfelt. Die momenten zijn precies de plekken waar structuur, kleur of documentatie ontbreekt.",
  },
  {
    number: 19, slug: "scenarioanalyses-voor-ondernemers-en-financieel-managers", subjectYear: 2018, visual: "chart", status: "PUBLISHED",
    title: "Scenarioanalyses voor ondernemers en financieel managers",
    summary: "Wat als de omzet tien procent lager uitvalt, of de lonen harder stijgen? Een goed scenariomodel laat het effect zien zonder dat je het hele bestand hoeft te kopiëren.",
    topics: ["finance"], serviceLinks: ["financiele-modellen", "begroting-en-budgettering"],
    sources: [{ title: "Microsoft Support: Inleiding tot wat-als-analyse", url: "https://support.microsoft.com/excel" }],
    body: `Een begroting is één verhaal over de toekomst. In werkelijkheid zijn er meerdere verhalen mogelijk, en de vraag is vaak niet wat er gaat gebeuren, maar wat er gebeurt *als*. Scenarioanalyse helpt ondernemers en financieel managers om voorbereid te zijn.

## De klassieke aanpak

Veel scenario's in Excel ontstaan door het bestand te kopiëren: *Begroting basis.xlsx*, *Begroting pessimistisch.xlsx*, *Begroting optimistisch v2.xlsx*. Dat werkt voor één moment, maar zodra het basisbestand wordt aangepast, lopen de versies uit elkaar.

## Een scenariomodel in één bestand

**Aannames centraal.** Alle variabelen die je wilt laten variëren, zoals omzetgroei, brutomarge, loonstijging en betalingstermijn, staan op één aannameblad.

**Scenario's als kolommen.** Per aanname een kolom voor basis, voorzichtig en optimistisch. Eén keuzecel bepaalt welk scenario actief is; het model rekent met de waarden uit die kolom.

**Drivers in plaats van bedragen.** Het model rekent omzet uit als volume maal prijs, inkoop als percentage, personeelskosten als fte maal kosten per fte. Zo werkt een aanname logisch door in alle onderdelen.

**Vergelijking naast elkaar.** Een overzicht dat de belangrijkste uitkomsten van alle scenario's tegelijk toont: resultaat, kasstroom en laagste banksaldo.

## Gevoeligheidsanalyse

Scenario's veranderen meerdere aannames tegelijk. Een **gevoeligheidsanalyse** verandert er één of twee, om te zien welke het meest impact hebben. Een gegevenstabel (Wat-als-analyse) in Excel berekent bijvoorbeeld het resultaat voor een reeks volumes en prijzen. Zo zie je direct waar het model gevoelig voor is, en dus waar je beter onderbouwde aannames nodig hebt.

## Wat een goed scenario is

Een scenario is geen willekeurige min tien procent. Het is een samenhangend verhaal: als de grootste klant vertrekt, daalt de omzet, maar dalen ook de inkoop en mogelijk de personeelskosten. Werk scenario's daarom uit met de mensen die het bedrijf kennen.

## Terugblik

In 2018 waren de mogelijkheden in Excel al ruim voldoende voor goede scenarioanalyse. Latere functies zoals LET en dynamische matrices maakten de formules overzichtelijker, maar de kern bleef: aannames centraal, drivers en vergelijking. In het [investeringsmodel](/voorbeelden/investeringsmodel) zie je een gevoeligheidstabel voor volume en disconteringsvoet in actie.`,
    practice: "Kies de drie aannames waar je het minst zeker van bent en zet ze op één blad, met voor elk een voorzichtige en een optimistische waarde. Laat je model ermee rekenen. Het verschil in uitkomst vertelt je waar je het eerst meer onderzoek moet doen.",
  },
  {
    number: 20, slug: "excel-modellen-geschikt-maken-voor-groeiende-organisaties", subjectYear: 2018, visual: "grid", status: "PUBLISHED",
    title: "Excel-modellen geschikt maken voor groeiende organisaties",
    summary: "Wat werkte bij twintig medewerkers en één vestiging, loopt vast bij vijftig medewerkers en drie vestigingen. Hoe ontwerp je een Excel-model dat meegroeit met je bedrijf?",
    topics: ["modelontwerp"], serviceLinks: ["doorontwikkeling-en-onderhoud", "excel-bestand-verbeteren"],
    sources: [SUPPORT],
    body: `Groei is goed nieuws, maar niet voor elke spreadsheet. Het planningsbestand dat perfect werkte voor één team, raakt overbelast als er een tweede vestiging bijkomt. De begroting met één tabblad per afdeling krijgt er drie tabbladen bij en de totalen kloppen niet meer. Het kostprijsmodel voor tien producten is niet ontworpen voor honderd.

## Waar groei een model breekt

- **Vaste bereiken.** Een formule die optelt tot rij 200 mist alles daarna.
- **Kopieën per eenheid.** Een tabblad per vestiging of afdeling betekent dat elke wijziging op meerdere plekken moet.
- **Handmatige koppelingen.** Een totaalblad dat naar specifieke cellen in andere tabbladen verwijst, moet bij elke uitbreiding worden aangepast.
- **Eén gebruiker.** Een model dat ontworpen is voor één persoon, is lastig te gebruiken als vijf mensen tegelijk iets moeten invullen.
- **Prestaties.** Wat met duizend regels snel was, wordt met honderdduizend regels traag.

## Ontwerpen voor groei

**Gebruik tabellen.** Excel-tabellen groeien automatisch mee. Formules die naar een tabelkolom verwijzen, nemen nieuwe regels vanzelf mee.

**Dimensies als kolom, niet als tabblad.** Vestiging, afdeling en jaar zijn kolommen in één tabel. Een nieuwe vestiging is dan een nieuwe waarde, geen nieuw tabblad.

**Stamtabellen.** Lijsten van afdelingen, kostenplaatsen, producten en medewerkers staan op één plek. Overzichten en keuzelijsten verwijzen ernaar.

**Scheid invoer per gebruiker.** Als meerdere mensen gegevens aanleveren, geef ze elk een eigen invoerblok of bestand, en voeg die automatisch samen.

**Denk aan volume.** Gebruik Power Query en het datamodel voor grote hoeveelheden transacties, en houd zware berekeningen buiten het werkblad.

## Wanneer is Excel niet meer genoeg?

Groei betekent soms ook dat Excel niet meer het juiste gereedschap is: als veel mensen tegelijk transacties invoeren, als elke wijziging traceerbaar moet zijn, of als gegevens realtime moeten zijn. Een goed ontworpen model maakt die overstap makkelijker, omdat de gegevens al gestructureerd zijn.

Een model dat meegroeit, vraagt af en toe onderhoud. Daarom bieden we naast de bouw ook [doorontwikkeling en onderhoud](/diensten/doorontwikkeling-en-onderhoud), zodat het model blijft passen bij hoe je bedrijf werkt.`,
    practice: "Stel jezelf bij elk belangrijk model de vraag: wat moet ik aanpassen als er morgen een vestiging, afdeling of productgroep bijkomt? Is het antwoord meer dan een regel in een tabel, dan is het model niet ontworpen voor groei.",
  },
];
