import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const COPILOT = { title: "Microsoft Learn: Microsoft 365 Copilot", url: "https://learn.microsoft.com/copilot/microsoft-365/" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };
const ROADMAP = { title: "Microsoft 365 Roadmap", url: "https://www.microsoft.com/microsoft-365/roadmap" };

const NOTE_2026 =
  "Onderwerp uit het lopende jaar. Status (aankondiging, preview of algemene beschikbaarheid), platform, licentie en datum moeten vóór publicatie worden gecontroleerd tegen de Excel-blog en de Microsoft 365 Roadmap. De tekst is bewust voorzichtig geformuleerd.";

/**
 * 2026: alle artikelen staan op REVIEW. Ze beschrijven ontwikkelingen die bij het schrijven
 * nog in uitrol waren of waarvan de status snel verandert. De redactie publiceert pas na controle.
 */
export const articles2026: ArticleContent[] = [
  {
    number: 91, slug: "agent-mode-in-excel-breder-beschikbaar", subjectYear: 2026, visual: "ai", status: "REVIEW",
    title: "Agent Mode in Excel breder beschikbaar",
    summary: "Na de preview in 2025 werkt Microsoft aan bredere beschikbaarheid van Agent Mode in Excel. Wat betekent het voor bedrijven als AI zelfstandig meerdere stappen in een werkboek uitvoert?",
    topics: ["ai-en-copilot"], serviceLinks: ["excel-controleren-en-herstellen", "excel-op-maat-laten-maken"],
    sources: [EXCELBLOG, ROADMAP],
    factNote: NOTE_2026 + " Specifiek: op welke platforms en voor welke licenties Agent Mode beschikbaar is, en of de previewstatus is vervallen.",
    body: `In het najaar van 2025 introduceerde Microsoft Agent Mode als preview in Excel op het web. Copilot voert daarin zelfstandig een reeks stappen uit om een doel te bereiken: tabbladen opzetten, formules schrijven, grafieken maken en uitkomsten controleren. In 2026 werkt Microsoft aan bredere beschikbaarheid, op meer platforms en voor meer gebruikers. Controleer voor jouw situatie de actuele status en licentievoorwaarden.

## Van experiment naar dagelijks gebruik

Zolang een functie in preview is, gebruiken vooral early adopters hem. Bij bredere beschikbaarheid verandert dat: medewerkers in alle afdelingen kunnen dan modellen laten opzetten. Dat heeft gevolgen voor organisaties.

**Meer modellen.** Er worden sneller en vaker werkboeken gemaakt, ook door mensen die geen Excel-specialist zijn.

**Andere vaardigheden.** Het belangrijkste is niet meer formules kennen, maar een goede opdracht formuleren en het resultaat beoordelen.

**Nieuwe risico's.** Een model dat snel is gemaakt, wordt ook snel gebruikt voor beslissingen, soms zonder dat iemand de logica heeft gecontroleerd.

## Spelregels voor organisaties

- **Onderscheid prototype en productie.** Een door Agent Mode gemaakt model is een prototype tot het is beoordeeld.
- **Beoordeling voor bedrijfskritische modellen.** Begrotingen, prijsmodellen en rapportages aan externe partijen worden gecontroleerd door iemand met vakkennis.
- **Vraag om transparantie.** Laat de AI een uitlegblad met aannames en controles maken.
- **Let op gegevens.** Welke gegevens gebruikt de AI, en mag dat volgens het beleid van de organisatie?

## Waar Agent Mode sterk is

- Een eerste opzet voor een nieuw type analyse.
- Snel varianten van een model maken om over te praten.
- Repetitieve opbouw, zoals een sjabloon voor een nieuwe periode.

## Waar het een begin is, geen eindpunt

- Modellen die moeten aansluiten op de administratie.
- Modellen met bedrijfsspecifieke logica, zoals interne verrekenprijzen of specifieke kostenverdelingen.
- Modellen die jarenlang moeten worden onderhouden.

## Terugblik

Bredere beschikbaarheid van Agent Mode maakt het verschil tussen een snel gemaakt en een goed ontworpen model groter, niet kleiner. Bij [Excel controleren en herstellen](/diensten/excel-controleren-en-herstellen) toetsen we ook door AI opgezette modellen, en bij [Excel op maat](/diensten/excel-op-maat-laten-maken) bouwen we verder op een AI-prototype als dat een goed startpunt is.`,
    practice: "Spreek in je organisatie af wanneer een door AI gemaakt model 'productierijp' is. Bijvoorbeeld: gecontroleerd door een tweede persoon, met een uitlegblad en ten minste één aansluitcontrole.",
  },
  {
    number: 92, slug: "power-query-uitgebreider-in-excel-voor-het-web", subjectYear: 2026, visual: "query", status: "REVIEW",
    title: "Power Query uitgebreider beschikbaar in Excel voor het web",
    summary: "Lange tijd moest je voor het bouwen en verversen van Power Query-query's terug naar de desktop. Microsoft breidt de mogelijkheden in de browser stap voor stap uit. Wat betekent dat voor gedeelde modellen?",
    topics: ["data-en-power-query", "samenwerken"], serviceLinks: ["vba-power-query-automatisering"],
    sources: [PQDOCS, EXCELBLOG, ROADMAP],
    factNote: NOTE_2026 + " Specifiek: welke Power Query-functies (verversen, editor, connectors, authenticatie) in Excel op het web beschikbaar zijn, en voor welke bronnen.",
    body: `Power Query is sinds 2016 een vast onderdeel van Excel voor Windows. In Excel op het web was het lange tijd beperkt: je kon sommige query's verversen, maar niet bouwen of bewerken. Microsoft heeft de mogelijkheden in de browser de afgelopen jaren stap voor stap uitgebreid, met onder meer het verversen van meer soorten bronnen en het werken met de query-editor. In 2026 zet die ontwikkeling door. Welke functies en bronnen precies beschikbaar zijn, verschilt per licentie en verandert regelmatig.

## Waarom dit ertoe doet

**Samenwerken.** Steeds meer modellen worden gedeeld via SharePoint en Teams en openen standaard in de browser. Als het verversen van gegevens alleen op de desktop kan, ontstaat een afhankelijkheid van één persoon met de juiste installatie.

**Andere apparaten.** Gebruikers op een Mac, een Chromebook of een beheerde werkplek zonder volledige Office-installatie krijgen meer mogelijkheden.

**Automatisering.** Een model dat volledig in de cloud kan worden ververst, past beter in processen met Power Automate en Office Scripts.

## Wat je moet nalopen

- **Welke bronnen** worden ondersteund in de browser? SharePoint- en OneDrive-bestanden zijn doorgaans het eerst beschikbaar; lokale bestanden en sommige databases niet of later.
- **Authenticatie.** Hoe meldt de query zich aan bij de bron, en werkt dat voor iedereen die het bestand ververst?
- **Paden.** Een query die naar C:\\Exports verwijst, werkt niet in de browser. Gebruik SharePoint-locaties.
- **Prestaties.** Zware query's kunnen in de browser trager zijn of tegen limieten aanlopen.

## Een model klaarmaken voor de browser

1. Verplaats alle bronbestanden naar SharePoint of OneDrive.
2. Vervang lokale paden in de query's.
3. Vermijd functies of connectors die in de browser niet worden ondersteund.
4. Test het verversen in de browser, met een account van een gewone gebruiker.
5. Documenteer op het startblad hoe en waar het model wordt ververst.

## Terugblik

Power Query in de browser maakt modellen minder afhankelijk van één werkplek en één persoon. Bij [automatisering met Power Query](/diensten/vba-power-query-automatisering) richten we modellen zo in dat ze zowel op de desktop als in de browser werken, voor zover de mogelijkheden van jouw omgeving dat toelaten.`,
    practice: "Open je belangrijkste Power Query-model in de browser en probeer te verversen. Lukt dat niet, kijk dan of de bronnen op een lokale schijf staan. Dat is meestal de eerste en eenvoudigste aanpassing.",
  },
  {
    number: 93, slug: "copilot-en-python-bij-complexe-spreadsheetanalyses", subjectYear: 2026, visual: "python", status: "REVIEW",
    title: "Copilot en Python bij complexe spreadsheetanalyses",
    summary: "De combinatie van Copilot en Python maakt analyses mogelijk die voorheen een data-analist vroegen. Hoe zet je die combinatie in voor complexe vragen, zonder het overzicht te verliezen?",
    topics: ["python", "ai-en-copilot"], serviceLinks: ["financiele-modellen", "planning-en-operationele-tools"],
    sources: [COPILOT, EXCELBLOG],
    factNote: NOTE_2026 + " Specifiek: huidige naam, status en beschikbaarheid van Copilot-analyses met Python.",
    body: `Sinds 2024 kan Copilot in Excel Python-code schrijven voor analyses die met formules lastig zijn. Je stelt een vraag in gewone taal, Copilot maakt de Python-code, voert hem uit en zet het resultaat in het werkboek. Microsoft heeft deze combinatie in de loop van 2025 en 2026 verder ontwikkeld. Daarmee komen analyses als prognoses, clustering en simulaties binnen bereik van gebruikers die zelf geen Python schrijven.

## Wat het mogelijk maakt

- **Prognoses** met seizoenspatronen en bandbreedtes.
- **Segmentatie** van klanten, producten of leveranciers.
- **Simulaties** van onzekere aannames, zoals bij een investeringsbeslissing.
- **Samenhang** tussen variabelen, zoals weer en omzet, of ploeg en uitval.
- **Uitgebreide visualisaties.**

## Het risico: analyses die niemand begrijpt

Hoe krachtiger de analyse, hoe belangrijker de vraag of iemand haar kan beoordelen. Een clusteranalyse levert altijd clusters op, ook als die betekenisloos zijn. Een prognose levert altijd getallen op, ook als het model slecht past. En de gebruiker die de vraag stelde, kan de code niet lezen.

## Een werkwijze die houvast geeft

**Begin met de vraag, niet met de techniek.** Welke beslissing hangt van de analyse af? Welk antwoord zou je verrassen?

**Vraag om uitleg.** Laat Copilot in gewone taal uitleggen welke methode is gebruikt, welke aannames er zijn gemaakt en hoe betrouwbaar de uitkomst is.

**Controleer op het bekende.** Laat de analyse ook iets voorspellen of indelen wat je al weet. Klopt dat?

**Houd het reproduceerbaar.** Bewaar de code en de gegevens, zodat de analyse later opnieuw kan worden uitgevoerd.

**Laat het beoordelen.** Voor analyses die tot grote beslissingen leiden: laat iemand met statistische kennis meekijken.

## Waar het in een model hoort

In een bedrijfsmodel geven we Python-analyses een eigen plek: een analyseblad met duidelijke invoer en uitvoer. De rest van het model, zoals de begroting of de planning, blijft in transparante formules. De uitkomst van de analyse wordt een invoer voor het model, met een zichtbare bron en datum.

## Terugblik

Copilot en Python maken geavanceerde analyse toegankelijk. Dat is winst, zolang de vraag goed is en het antwoord wordt beoordeeld. Bij [financiële modellen](/diensten/financiele-modellen) en [planning en operationele tools](/diensten/planning-en-operationele-tools) gebruiken we deze analyses als onderbouwing, niet als zwarte doos.`,
    practice: "Formuleer bij de volgende analyse vooraf in één zin welke beslissing ervan afhangt. Als je dat niet kunt, is de analyse waarschijnlijk niet de eerste stap.",
  },
  {
    number: 94, slug: "meer-transparantie-over-ai-wijzigingen-in-werkboeken", subjectYear: 2026, visual: "shield", status: "REVIEW",
    title: "Meer transparantie over AI-wijzigingen in werkboeken",
    summary: "Als AI zelfstandig wijzigingen maakt in een werkboek, wil je kunnen zien wat er is veranderd. Hoe houd je grip op AI-wijzigingen, met de mogelijkheden van Excel en met eigen afspraken?",
    topics: ["ai-en-copilot", "veiligheid", "modelontwerp"], serviceLinks: ["excel-controleren-en-herstellen", "doorontwikkeling-en-onderhoud"],
    sources: [COPILOT, EXCELBLOG],
    factNote: NOTE_2026 + " Specifiek: welke functies Microsoft biedt om AI-wijzigingen te tonen, te markeren of terug te draaien.",
    body: `Toen Copilot alleen voorstellen deed, was het duidelijk wie de wijziging maakte: de gebruiker, na het accepteren van het voorstel. Met Agent Mode verandert dat. De AI voert zelf reeksen wijzigingen uit: bladen toevoegen, formules schrijven, opmaak aanpassen. Daarmee wordt een vraag belangrijk die bij gedeelde bestanden altijd al speelde: **wat is er veranderd, door wie, en waarom?**

## Wat Excel biedt

Microsoft heeft aandacht besteed aan het zichtbaar maken van wat Copilot doet: een overzicht van de stappen die de AI uitvoert, de mogelijkheid om wijzigingen ongedaan te maken, en bestaande functies zoals de **versiegeschiedenis** in OneDrive en SharePoint. Welke mogelijkheden er precies zijn, verschilt per versie en verandert regelmatig. Controleer de actuele functies in je eigen omgeving.

## Waarom het ertoe doet

- **Verantwoording.** Bij een fout in een rapport wil je kunnen nagaan of die is ontstaan door een AI-wijziging, een menselijke wijziging of een fout in de bron.
- **Controle.** Een reviewer moet weten welke delen van het model nieuw of gewijzigd zijn.
- **Vertrouwen.** Gebruikers vertrouwen een model meer als ze kunnen zien wat er is gebeurd.
- **Audit.** Bij modellen die onder toezicht van een accountant vallen, moet de totstandkoming herleidbaar zijn.

## Eigen afspraken die helpen

Ook zonder speciale functies kun je grip houden:

- **Werk in een kopie of een aparte versie** als je AI grote wijzigingen laat maken. Vergelijk daarna met de vorige versie.
- **Wijzigingslog.** Leg op een tabblad vast welke wijzigingen met AI zijn gemaakt, met datum en opdracht.
- **Markering.** Geef door AI toegevoegde bladen of bereiken een herkenbare kleur of naam, tot ze zijn beoordeeld.
- **Controles.** Kernuitkomsten die moeten aansluiten op een onafhankelijke bron, vangen fouten op ongeacht de oorzaak.
- **Vergelijkingsblad.** Zet de belangrijkste uitkomsten van voor en na de wijziging naast elkaar.

## Voor beheerders

Organisaties kunnen via het beheer van Microsoft 365 instellingen vastleggen voor het gebruik van Copilot en het bewaren van activiteiten. Overleg met IT welke logging beschikbaar is en hoe lang die wordt bewaard.

## Terugblik

Transparantie over wijzigingen is geen nieuw onderwerp, maar met AI wordt het urgenter. Bij [doorontwikkeling en onderhoud](/diensten/doorontwikkeling-en-onderhoud) houden we een wijzigingslog bij voor elke versie, ongeacht of een wijziging met of zonder AI tot stand kwam.`,
    practice: "Voeg aan je belangrijkste model een eenvoudig wijzigingslog toe: datum, wat is er veranderd, door wie, en of AI is gebruikt. Het kost een minuut per wijziging en bespaart uren als er vragen komen.",
  },
  {
    number: 95, slug: "nieuwe-functies-voor-het-analyseren-van-werkboekwijzigingen", subjectYear: 2026, visual: "collab", status: "REVIEW",
    title: "Nieuwe functies voor het analyseren van werkboekwijzigingen",
    summary: "Wie heeft deze cel aangepast, en wat stond er eerst? Excel biedt steeds meer mogelijkheden om wijzigingen in gedeelde werkboeken te volgen. Een overzicht van wat er is en hoe je het inzet.",
    topics: ["samenwerken", "modelontwerp"], serviceLinks: ["doorontwikkeling-en-onderhoud", "excel-controleren-en-herstellen"],
    sources: [SUPPORT, EXCELBLOG],
    factNote: NOTE_2026 + " Specifiek: bestaat er in 2026 een nieuwe of uitgebreide functie voor wijzigingsanalyse (naast 'Wijzigingen weergeven' en versiegeschiedenis), en voor welke platforms?",
    body: `In een gedeeld werkboek waarin tien mensen werken, is het onvermijdelijk dat er iets verandert wat niet had moeten veranderen. Een formule overschreven, een aanname aangepast, een regel verwijderd. De vraag is dan: wat is er gebeurd? Excel heeft daar in de loop van de jaren meer gereedschap voor gekregen, en die ontwikkeling gaat door, mede doordat ook AI wijzigingen maakt.

## Wat er al jaren beschikbaar is

**Wijzigingen weergeven.** Voor werkboeken in OneDrive en SharePoint toont Excel een overzicht van recente wijzigingen per cel, blad of bereik: wie, wanneer, en wat de vorige waarde was.

**Versiegeschiedenis.** Eerdere versies van het bestand openen, vergelijken en terugzetten.

**Spreadsheet Compare.** In sommige Microsoft 365-edities beschikbaar om twee versies van een werkboek gedetailleerd te vergelijken, inclusief formules.

**Opmerkingen en notities** met een spoor van discussies.

## Wat de ontwikkeling in 2026 brengt

Microsoft werkt aan betere mogelijkheden om wijzigingen te analyseren, mede om AI-wijzigingen inzichtelijk te maken. De precieze functies en hun beschikbaarheid veranderen snel. Controleer de Excel-blog en de Microsoft 365 Roadmap voor de actuele stand.

## Hoe je het inzet

**Bij een onverwachte uitkomst.** Begin bij Wijzigingen weergeven voor de cellen die de uitkomst bepalen. Vaak zie je snel welke invoer is aangepast.

**Bij een periodieke review.** Bekijk voor bedrijfskritische modellen maandelijks welke wijzigingen er zijn gedaan buiten de normale invoercellen.

**Bij een geschil of vraag van de accountant.** Gebruik de versiegeschiedenis om aan te tonen wat er op een bepaald moment in het model stond.

## Beperkingen

- Wijzigingsgeschiedenis is afhankelijk van opslag in de cloud. Lokale bestanden hebben dit niet.
- De geschiedenis wordt niet onbeperkt bewaard.
- Niet alle soorten wijzigingen worden even gedetailleerd vastgelegd.
- Een wijzigingsoverzicht vertelt wat er is veranderd, niet waarom.

## Ontwerp helpt

Het beste wijzigingsbeheer begint bij het ontwerp: invoer op vaste plekken, beveiligde rekenbladen, een wijzigingslog voor structurele aanpassingen. Dan valt een onverwachte wijziging sneller op, en is hij eenvoudiger te herleiden.

## Terugblik

Bij [doorontwikkeling en onderhoud](/diensten/doorontwikkeling-en-onderhoud) combineren we de mogelijkheden van Excel met een vaste wijzigingsprocedure, zodat elke versie herleidbaar blijft.`,
    practice: "Probeer in een gedeeld werkboek in SharePoint eens Controleren > Wijzigingen weergeven. Weet je wat elke recente wijziging was en waarom? Zo niet, dan is het tijd voor afspraken over wie wat mag wijzigen.",
  },
  {
    number: 96, slug: "copilot-helpt-bij-grafieken-en-draaitabellen", subjectYear: 2026, visual: "chart", status: "REVIEW",
    title: "Copilot helpt bij grafieken en draaitabellen",
    summary: "Een draaitabel of grafiek maken op basis van een vraag in gewone taal: het werd een van de meest gebruikte Copilot-functies. Hoe maak je er goede rapportages mee, en waar moet je op letten?",
    topics: ["ai-en-copilot", "rapportage"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [COPILOT, EXCELBLOG],
    factNote: NOTE_2026 + " Specifiek: welke grafiek- en draaitabelfuncties van Copilot in 2026 nieuw of uitgebreid zijn.",
    body: `Draaitabellen en grafieken zijn al decennia de manier om gegevens samen te vatten in Excel. Maar voor veel gebruikers blijft het maken ervan een drempel: welk veld moet in rijen, welk in kolommen, welk grafiektype past? Copilot kan sinds 2024 grafieken en draaitabellen voorstellen op basis van een vraag, en Microsoft breidt die mogelijkheden verder uit. Welke functies precies beschikbaar zijn in jouw omgeving, verandert regelmatig.

## Wat het oplevert

- **Snelheid.** "Toon de omzet per regio per kwartaal" levert direct een draaitabel op.
- **Verkenning.** Snel verschillende indelingen proberen om te zien wat interessant is.
- **Toegankelijkheid.** Gebruikers die geen draaitabel kunnen maken, krijgen toch een overzicht.

## Waar je op moet letten

**Klopt de samenvatting?** Copilot kiest welke kolom wordt opgeteld en welke filters gelden. Controleer of het om de juiste waarde gaat (bijvoorbeeld omzet exclusief btw) en de juiste periode.

**Past het grafiektype?** Een cirkeldiagram met twaalf segmenten of een 3D-grafiek is zelden een goede keuze. Een staafdiagram of lijngrafiek is meestal duidelijker.

**Is de grafiek eerlijk?** Een as die niet bij nul begint, kan kleine verschillen groot laten lijken. Soms is dat terecht, vaak niet.

**Is het herhaalbaar?** Een draaitabel die je elke maand opnieuw laat maken, kan er elke maand iets anders uitzien. Voor een vast rapport is een vaste opzet beter.

## Van verkenning naar rapport

Een goede werkwijze:

1. **Verken met Copilot.** Stel vragen, bekijk verschillende indelingen.
2. **Kies wat ertoe doet.** Welke twee of drie overzichten beantwoorden de belangrijkste vragen?
3. **Leg vast in het rapport.** Maak een vaste draaitabel of formule-overzicht, met een vaste grafiek en een vaste opmaak.
4. **Voeg context toe.** Budget, vorig jaar, een korte toelichting.

## Ontwerpregels voor grafieken

- Eén boodschap per grafiek, zichtbaar in de titel.
- Zo min mogelijk kleuren; gebruik kleur om iets te benadrukken.
- Labels direct bij de lijnen of staven, in plaats van een aparte legenda.
- Geen 3D, geen schaduw, geen overbodige rasterlijnen.

## Terugblik

Copilot verlaagt de drempel om gegevens samen te vatten. Het ontwerp van een rapport dat elke maand dezelfde vragen helder beantwoordt, blijft een bewuste keuze. Bij [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages) zetten we verkenning om in een vast, betrouwbaar rapport.`,
    practice: "Laat Copilot of een collega drie verschillende grafieken maken van dezelfde gegevens. Welke vertelt het verhaal het duidelijkst in vijf seconden? Dat is de grafiek die in je rapport hoort.",
  },
  {
    number: 97, slug: "nieuwe-mogelijkheden-om-externe-bedrijfsgegevens-te-verbinden", subjectYear: 2026, visual: "query", status: "REVIEW",
    title: "Nieuwe mogelijkheden om externe bedrijfsgegevens te verbinden",
    summary: "Boekhoudpakket, CRM, planningssysteem: steeds meer bedrijfssoftware is via de cloud te koppelen aan Excel. Hoe kies je de juiste manier van verbinden, en hoe houd je het veilig?",
    topics: ["data-en-power-query", "veiligheid"], serviceLinks: ["vba-power-query-automatisering", "dashboards-en-managementrapportages"],
    sources: [PQDOCS, EXCELBLOG],
    factNote: NOTE_2026 + " Specifiek: welke nieuwe connectors of koppelmogelijkheden (Power Query, Copilot-connectors, gegevenstypen) in 2026 beschikbaar zijn.",
    body: `De meeste bedrijven werken met een handvol cloudsystemen: een online boekhoudpakket, een CRM, een urenregistratie, een webwinkel. De gegevens daaruit komen vaak nog via een export in Excel terecht. Tegelijk groeit het aantal manieren om die systemen rechtstreeks te verbinden, via Power Query, via koppelingen van de leverancier en via de connectors van Microsoft 365. In 2026 zet die ontwikkeling door.

## De opties op een rij

**Export en import.** Het systeem levert een CSV- of Excel-bestand, dat Power Query inleest uit een vaste map. Eenvoudig en robuust, maar vraagt een handmatige stap.

**Power Query-connectors.** Directe verbindingen met databases, SharePoint, Dataverse en andere bronnen. Voor veel cloudsystemen bestaan er connectors, soms van Microsoft, soms van de leverancier.

**API's.** Veel cloudsystemen bieden een API. Power Query kan daar met een webverbinding gegevens ophalen, al vraagt dat technische kennis, vooral rond authenticatie.

**Koppelingen van de leverancier.** Sommige boekhoud- en ERP-pakketten bieden een eigen Excel-invoegtoepassing of koppeling.

**Via een tussenlaag.** Een datawarehouse of Power BI-dataset die gegevens verzamelt, waar Excel verbinding mee maakt.

## Hoe kies je?

- **Hoe vaak** heb je actuele gegevens nodig? Maandelijks: een export volstaat vaak. Dagelijks: een directe verbinding loont.
- **Hoeveel bronnen** combineer je? Bij veel bronnen is een tussenlaag overzichtelijker.
- **Wie ververst?** Een koppeling die alleen werkt met de inlog van één persoon, is kwetsbaar.
- **Wat is de omvang?** Grote volumes horen niet rechtstreeks in een werkblad.

## Veiligheid

- **Inloggegevens** horen niet in het werkboek. Gebruik de beveiligde opslag van Excel en Power Query, of een organisatieaccount.
- **Minimale rechten.** Een koppeling die alleen hoeft te lezen, krijgt alleen leesrechten.
- **Persoonsgegevens.** Haal alleen op wat nodig is; een rapport over omzet per klant heeft geen BSN's of geboortedatums nodig.
- **Toegang tot het werkboek.** Wie het werkboek kan openen, kan de opgehaalde gegevens zien.

## Terugblik

Verbinden is technisch steeds eenvoudiger, maar de keuze voor de juiste verbinding blijft maatwerk. Bij [Power Query en automatisering](/diensten/vba-power-query-automatisering) ontwerpen we koppelingen die betrouwbaar, veilig en onderhoudbaar zijn. Lees ook hoe we met jouw gegevens omgaan op [vertrouwelijkheid](/vertrouwelijkheid).`,
    practice: "Maak een lijst van alle exports die je maandelijks uit systemen haalt voor Excel. Bij elke export: hoe lang duurt het, en hoe vaak gaat het mis? De export met de meeste moeite of fouten is je eerste kandidaat voor een directe koppeling.",
  },
  {
    number: 98, slug: "ontwikkelingen-rond-meerdere-waarden-in-een-excel-cel", subjectYear: 2026, visual: "array", status: "REVIEW",
    title: "Ontwikkelingen rond meerdere waarden in één Excel-cel",
    summary: "Een cel bevatte traditioneel één waarde. Met gegevenstypen, afbeeldingen in cellen en matrices is dat beeld aan het verschuiven. Wat betekent dat voor de manier waarop we modellen bouwen?",
    topics: ["formules", "modelontwerp"], serviceLinks: ["excel-op-maat-laten-maken"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: NOTE_2026 + " Specifiek: welke concrete ontwikkeling Microsoft in 2026 heeft aangekondigd rond meerdere waarden per cel (bijv. geneste matrices, uitbreiding gegevenstypen), met status en beschikbaarheid.",
    body: `De basis van Excel is al veertig jaar hetzelfde: een raster van cellen, en elke cel bevat één waarde. Een getal, een tekst, een datum, een formule die één uitkomst geeft. In de afgelopen jaren is dat beeld stap voor stap verschoven, en die ontwikkeling gaat door.

## Hoe het begon

**Gegevenstypen (2018-2020).** Een cel met een aandeel, een land of een eigen gegevenstype is een object met meerdere eigenschappen. De cel toont één naam, maar bevat veel meer.

**Dynamische matrices (2020).** Een formule in één cel kan een hele tabel als resultaat geven, die overloopt naar de cellen ernaast.

**LAMBDA (2022).** Een cel kan een functie bevatten, die je weer aan andere functies kunt doorgeven.

**Afbeeldingen in cellen (2023-2024).** Een afbeelding is een celwaarde geworden in plaats van een los object.

**Selectievakjes (2024).** Een interactief element als celwaarde.

## Waar het naartoe gaat

De richting is duidelijk: een cel wordt steeds meer een **container** in plaats van een enkele waarde. Een veelgevraagde uitbreiding is de mogelijkheid om matrices binnen matrices te gebruiken, bijvoorbeeld een lijst met per klant de bijbehorende orders, zonder dat alles plat moet worden geslagen. Microsoft heeft op verschillende momenten stappen in die richting gezet. Welke mogelijkheden er in 2026 concreet beschikbaar zijn, verschilt per versie en licentie.

## Wat het betekent voor modellen

**Kansen**

- Compactere modellen, met minder hulpkolommen en hulptabellen.
- Rijkere informatie per regel, zoals een product met foto, specificaties en prijshistorie.
- Krachtigere formules die met gestructureerde gegevens werken.

**Risico's**

- **Minder zichtbaar.** Wat in een cel verstopt zit, zie je niet direct. Controleerbaarheid kan afnemen.
- **Compatibiliteit.** Nieuwe celtypen werken niet in oudere versies, en niet altijd bij export naar andere systemen.
- **Leercurve.** Gebruikers moeten begrijpen dat een cel meer kan bevatten dan wat ze zien.

## Ontwerpprincipe

Een model moet begrijpelijk blijven voor wie het gebruikt en controleert. Nieuwe celtypen zetten we in waar ze het model eenvoudiger maken, niet waar ze het mysterieuzer maken. Bij twijfel kiezen we voor een zichtbare tabel boven een slimme cel.

## Terugblik

De verschuiving van waarde naar container is een van de grootste veranderingen in het denkmodel van Excel. Bij [Excel op maat](/diensten/excel-op-maat-laten-maken) volgen we deze ontwikkeling en passen we haar toe waar het de gebruiker helpt.`,
    practice: "Kijk naar je modellen met veel hulpkolommen die alleen bestaan om extra informatie bij een regel te tonen. Dat zijn de plekken waar nieuwe celtypen in de toekomst winst kunnen opleveren, mits iedereen een geschikte Excel-versie heeft.",
  },
  {
    number: 99, slug: "wat-ai-betekent-voor-de-rol-van-de-financial-controller", subjectYear: 2026, visual: "ai", status: "REVIEW",
    title: "Wat AI betekent voor de toekomstige rol van de financial controller",
    summary: "Als AI formules schrijft, rapporten opstelt en afwijkingen signaleert, wat doet de controller dan nog? Meer dan ooit, maar het werk verandert. Een verkenning van de rol in een AI-tijdperk.",
    topics: ["ai-en-copilot", "finance"], serviceLinks: ["financiele-modellen", "dashboards-en-managementrapportages"],
    sources: [COPILOT, EXCELBLOG],
    factNote: NOTE_2026 + " Dit is een beschouwend artikel; controleer of verwijzingen naar functies actueel zijn.",
    body: `In tien jaar is het gereedschap van de financial controller ingrijpend veranderd. In 2017 bestond het werk voor een groot deel uit gegevens verzamelen, kopiëren, aansluiten en rapporten opmaken. Met Power Query, moderne formules en automatisering verschoof een deel daarvan naar het systeem. Met AI in Excel verschuift het verder: concepttoelichtingen, analyses, formules en zelfs hele modellen kunnen worden gegenereerd.

## Wat verdwijnt

- **Handmatig verzamelen en samenvoegen** van gegevens.
- **Formules uit het hoofd schrijven** voor standaardberekeningen.
- **Rapporten opmaken.**
- **Eerste versies van toelichtingen.**

## Wat blijft, en belangrijker wordt

**Weten hoe het bedrijf werkt.** Welke drivers bepalen het resultaat? Welke afwijking is een signaal, en welke ruis? Dat staat niet in de gegevens.

**Beoordelen.** Klopt de analyse van de AI? Is de toelichting juist? Is de formule correct? Hoe meer AI maakt, hoe meer er beoordeeld moet worden.

**Ontwerpen.** Welke informatie heeft de directie nodig? Hoe moet een model zijn opgebouwd om de juiste beslissingen te ondersteunen?

**Verantwoorden.** Wie staat in voor de cijfers? Dat blijft een mens.

**Adviseren.** Wat betekenen de cijfers voor de koers van het bedrijf? Welke keuzes zijn er?

**Beheersen.** Afspraken over gegevens, controles en gebruik van AI, in lijn met wet- en regelgeving.

## Nieuwe vaardigheden

- **Goede vragen stellen**, aan mensen én aan AI.
- **Kritisch lezen** van door AI gemaakte formules, code en teksten.
- **Gegevensbeheer**: definities, kwaliteit, eigenaarschap.
- **Modelontwerp** op een hoger abstractieniveau.
- **Communicatie**: cijfers vertalen naar beslissingen.

## De controller als architect

Een treffend beeld: de controller verschuift van **bouwer** naar **architect**. Niet meer elke steen zelf leggen, maar bepalen hoe het gebouw eruit moet zien, toezien op de kwaliteit en instaan voor het resultaat.

## Wat dit betekent voor Excel-modellen

De modellen waar een controller mee werkt, moeten die rol ondersteunen: transparant, met controles, met een duidelijke structuur waar AI op kan voortbouwen en die een mens kan beoordelen. Een rommelig model wordt met AI niet beter, maar sneller rommelig.

## Terugblik

AI maakt de controller niet overbodig, maar verandert het werk. Wij helpen controllers met [financiële modellen](/diensten/financiele-modellen) en [rapportages](/diensten/dashboards-en-managementrapportages) die de basis vormen voor die nieuwe rol.`,
    practice: "Schrijf op hoeveel uur per maand je besteedt aan verzamelen, berekenen, opmaken, analyseren en adviseren. Waar zou je meer tijd aan willen besteden? Dat is de richting waarin automatisering en AI je kunnen helpen.",
  },
  {
    number: 100, slug: "waarom-professioneel-excel-maatwerk-belangrijk-blijft", subjectYear: 2026, visual: "forty", status: "REVIEW",
    title: "Waarom professioneel Excel-maatwerk ook in het AI-tijdperk belangrijk blijft",
    summary: "Tien jaar Excel-ontwikkeling in honderd artikelen. De rode draad: gereedschap wordt krachtiger, maar een model is pas waardevol als het past bij hoe je bedrijf werkt, klopt en te onderhouden is.",
    topics: ["modelontwerp", "ai-en-copilot"], serviceLinks: ["excel-op-maat-laten-maken", "excel-controleren-en-herstellen"],
    sources: [EXCELBLOG, ROADMAP],
    factNote: NOTE_2026 + " Afsluitend artikel; controleer interne links en of de beschrijving van de AI-functies nog actueel is.",
    body: `Dit is het honderdste artikel in de reeks *Excel door de jaren*. We begonnen bij 2017, toen Power Query net onderdeel van Excel was geworden en dynamische matrices nog niet bestonden. We eindigen in 2026, met AI die zelfstandig modellen opzet, formules in gewone taal en Python in het werkboek. Wat is de rode draad?

## Tien jaar in vijf verschuivingen

**Van plakken naar verbinden.** Power Query maakte handmatig kopiëren van gegevens overbodig.

**Van cel naar matrix.** Dynamische matrices, LET en LAMBDA maakten formules krachtiger en leesbaarder.

**Van bestand naar platform.** Co-authoring, Excel op het web, Office Scripts en Power Automate maakten Excel onderdeel van een groter geheel.

**Van rekenen naar analyseren.** Python en statistische functies brachten geavanceerde analyse binnen bereik.

**Van maken naar beoordelen.** AI verschuift het werk van formules schrijven naar resultaten beoordelen.

## Wat niet veranderde

In al die jaren bleven dezelfde vragen bepalend voor de waarde van een model:

- **Past het bij hoe het bedrijf werkt?**
- **Klopt het, en signaleert het als het niet klopt?**
- **Begrijpt de gebruiker het?**
- **Kan het worden onderhouden als de situatie verandert?**
- **Ondersteunt het de beslissingen die ertoe doen?**

Geen enkele nieuwe functie heeft die vragen overbodig gemaakt. AI maakt ze juist urgenter: er worden sneller meer modellen gemaakt, door meer mensen, met minder zicht op hoe ze werken.

## Waarom maatwerk

Een generiek sjabloon of een AI-gegenereerd model is een prima startpunt. Maar bedrijven verschillen. Een installatiebedrijf met projecten in termijnen heeft een andere liquiditeitsprognose nodig dan een webwinkel. Een holding met drie werkmaatschappijen een andere consolidatie dan een eenmanszaak. Maatwerk betekent: het model volgt het bedrijf, niet andersom.

Professioneel maatwerk betekent ook: een structuur die anderen kunnen volgen, controles die fouten vangen, documentatie die het model overdraagbaar maakt, en een ontwikkelaar die de nieuwste mogelijkheden kent en weet wanneer je ze wel en niet moet gebruiken.

## Hoe wij werken

Wij bouwen Excel-modellen op maat voor bedrijven: van [financiële modellen](/diensten/financiele-modellen) en [dashboards](/diensten/dashboards-en-managementrapportages) tot [planningstools](/diensten/planning-en-operationele-tools) en [automatisering](/diensten/vba-power-query-automatisering). We gebruiken moderne functies, Power Query, Python en AI waar ze waarde toevoegen, en houden het model begrijpelijk voor wie ermee werkt. Lees meer in onze [werkwijze](/werkwijze), of bekijk de [voorbeeldmodellen](/voorbeelden).

## Tot slot

Tien jaar Excel-ontwikkeling laat zien dat het gereedschap steeds beter wordt. De vraag hoe je het goed inzet voor jouw bedrijf, blijft. Daar helpen we graag bij.`,
    practice: "Heb je een Excel-model dat belangrijk is voor je bedrijf, maar waar je niet volledig op vertrouwt? Beschrijf in de Verzoekwijzer wat het moet doen en waar het knelt. We kijken vrijblijvend met je mee.",
  },
];
