import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const PYTHON = { title: "Microsoft Support: Inleiding tot Python in Excel", url: "https://support.microsoft.com/office/introduction-to-python-in-excel-55643c2e-ff56-4168-b1ce-9428c8308545" };
const COPILOT = { title: "Microsoft Learn: Microsoft 365 Copilot", url: "https://learn.microsoft.com/copilot/microsoft-365/" };
const EXCELSITE = { title: "Microsoft Excel (productpagina)", url: "https://www.microsoft.com/microsoft-365/excel" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };

/**
 * 2025: alle artikelen staan op REVIEW. Functies uit dit jaar zaten bij het schrijven
 * vaak nog in preview of in gefaseerde uitrol; de redactie controleert status, platform
 * en licentie per artikel voordat het wordt gepubliceerd.
 */
export const articles2025: ArticleContent[] = [
  {
    number: 81, slug: "excel-bestaat-veertig-jaar", subjectYear: 2025, visual: "forty", status: "REVIEW",
    title: "Excel bestaat veertig jaar: van spreadsheet tot bedrijfsplatform",
    summary: "In 2025 bestond Excel veertig jaar. Wat begon als rekenprogramma voor de Macintosh, is uitgegroeid tot een platform voor data, automatisering en AI. Een terugblik op wat er veranderde, en wat hetzelfde bleef.",
    topics: ["modelontwerp"], serviceLinks: ["excel-op-maat-laten-maken"],
    sources: [EXCELBLOG, EXCELSITE],
    factNote: "Excel 1.0 verscheen in 1985 voor de Apple Macintosh (doorgaans genoemd: 30 september 1985); de eerste Windows-versie (Excel 2.0) in 1987. Nalopen tegen Microsoft-bron over het jubileum.",
    body: `In 1985 verscheen de eerste versie van Excel, voor de Apple Macintosh. Twee jaar later volgde een versie voor Windows. In 2025 bestond Excel dus veertig jaar. Weinig bedrijfssoftware heeft zo lang zo'n centrale rol gespeeld. Een moment om terug te kijken, met de nadruk op wat het betekent voor bedrijven.

## Van rekenblad naar platform

In grote lijnen zie je vier fases:

**Het rekenblad.** Cellen, formules, grafieken. Een digitale versie van het ruitjespapier van de boekhouder, maar dan met automatisch herberekenen.

**De macro.** Met VBA werd Excel programmeerbaar. Bedrijven bouwden er complete applicaties mee, van offertesystemen tot planningstools.

**Data.** Met Power Query en Power Pivot, rond 2010 tot 2016, werd Excel een gereedschap om gegevens uit andere systemen op te halen, op te schonen en te analyseren.

**Cloud en AI.** Met Microsoft 365 kwamen samenwerken in de browser, automatisering via Power Automate, dynamische matrices, Python en Copilot.

## Wat hetzelfde bleef

Opvallend is wat in veertig jaar niet veranderde:

- **Het raster van cellen** als basis. Iedereen begrijpt het direct.
- **Formules die je kunt zien en volgen.** Transparantie is de grootste kracht van Excel.
- **De vrijheid** om alles te bouwen. En daarmee ook het risico dat het rommelig wordt.
- **De rol van de gebruiker.** Excel doet wat je vraagt, niet wat je bedoelt.

## Wat dit zegt over de toekomst

De belangrijkste les van veertig jaar Excel: nieuwe functies maken meer mogelijk, maar maken goed ontwerp niet overbodig. VBA maakte het mogelijk om alles te automatiseren, en leverde ook ondoorgrondelijke macro's op. Power Query maakte gegevens ophalen eenvoudig, en leverde ook queryketens op die niemand begrijpt. AI maakt het mogelijk om in seconden een formule te krijgen, en zal ook modellen opleveren die niemand kan controleren.

Wat blijft werken: een duidelijke structuur, scheiding van invoer, berekening en uitvoer, controles en documentatie.

## Excelsheets.nl en veertig jaar Excel

Wij werken met de mogelijkheden van nu: moderne formules, Power Query, Python en AI waar dat past. Maar de principes zijn tijdloos. Daarom beginnen we bij elk [model op maat](/diensten/excel-op-maat-laten-maken) met de vraag hoe jouw bedrijf werkt, en pas daarna met de techniek. Bekijk de hele ontwikkeling in onze [tijdlijn](/excel-door-de-jaren/tijdlijn).`,
    practice: "Hoe oud is het oudste Excel-bestand dat in je organisatie nog dagelijks wordt gebruikt? Als het ouder is dan tien jaar, is de kans groot dat het gebouwd is met technieken die inmiddels eenvoudiger en betrouwbaarder kunnen.",
  },
  {
    number: 82, slug: "agent-mode-in-excel-als-preview", subjectYear: 2025, visual: "ai", status: "REVIEW",
    title: "De introductie van Agent Mode in Excel als preview",
    summary: "In het najaar van 2025 introduceerde Microsoft Agent Mode in Excel als preview: Copilot dat niet alleen antwoord geeft, maar zelf meerdere stappen uitvoert in het werkboek. Wat is het, en hoe ga je ermee om?",
    topics: ["ai-en-copilot"], serviceLinks: ["excel-controleren-en-herstellen", "excel-op-maat-laten-maken"],
    sources: [EXCELBLOG, COPILOT],
    factNote: "Agent Mode aangekondigd eind september 2025 als preview (Frontier-programma), eerst in Excel op het web. Precieze datum, platform en licentievoorwaarden nalopen.",
    body: `Tot 2025 was Copilot in Excel vooral een assistent die vragen beantwoordt en voorstellen doet. In het najaar van 2025 introduceerde Microsoft **Agent Mode** als preview. Het verschil: in plaats van één antwoord voert Copilot een reeks stappen uit om een doel te bereiken. Bijvoorbeeld: "maak een maandbegroting voor een kleine webwinkel met een overzicht van de kasstroom". Copilot maakt dan zelf tabbladen, tabellen, formules en grafieken, en controleert onderweg of de uitkomsten kloppen.

## Hoe het werkt

Volgens de aankondiging van Microsoft:

- Je beschrijft in gewone taal wat je wilt bereiken.
- Copilot plant de stappen, voert ze uit in het werkboek en laat zien wat het doet.
- Je kunt tussentijds bijsturen of vragen om aanpassingen.
- De preview was in eerste instantie beschikbaar in Excel op het web, via het previewprogramma van Microsoft.

## Wat het belooft

- **Snelheid**: een eerste versie van een model in minuten.
- **Toegankelijkheid**: gebruikers zonder diepe Excel-kennis kunnen een werkend model laten maken.
- **Iteratie**: snel varianten uitproberen.

## Waar je op moet letten

**Begrijp je wat er is gemaakt?** Een model dat in minuten is gebouwd, moet nog steeds worden begrepen door wie het gebruikt. Neem de tijd om de opbouw na te lopen.

**Klopt de logica?** Agent Mode maakt aannames. Die zijn niet altijd de aannames die bij jouw bedrijf passen. Controleer ze.

**Is het onderhoudbaar?** Wie past het model over een half jaar aan? Kan die persoon de structuur volgen?

**Welke gegevens deel je?** Ga na wat er met je gegevens gebeurt in een previewfunctie, en of dat past binnen het beleid van je organisatie.

**Preview betekent preview.** Functies, beschikbaarheid en voorwaarden kunnen veranderen.

## Een nuttige rol

Agent Mode is waardevol als **startpunt**: een eerste opzet, een prototype om over te praten, een snelle verkenning. Voor een bedrijfskritisch model is het een begin, geen eindproduct. De stap van prototype naar betrouwbaar model, met controles, documentatie en een structuur die past bij hoe je bedrijf werkt, blijft vakwerk.

## Terugblik

Agent Mode markeert een verschuiving: van AI die helpt bij een formule naar AI die een heel model opzet. Dat maakt het des te belangrijker dat iemand het resultaat beoordeelt. Bij [Excel controleren en herstellen](/diensten/excel-controleren-en-herstellen) kun je een door AI gemaakt model laten toetsen voordat je erop gaat sturen.`,
    practice: "Als je met Agent Mode experimenteert, vraag het model dan ook om een tabblad met uitleg en controles. Wat het daar opschrijft, laat zien welke aannames het heeft gemaakt, en die moet jij beoordelen.",
  },
  {
    number: 83, slug: "de-copilot-functie-in-excel-als-preview", subjectYear: 2025, visual: "ai", status: "REVIEW",
    title: "De COPILOT-functie in Excel als preview",
    summary: "Met de COPILOT-functie kun je AI aanroepen vanuit een gewone formule, bijvoorbeeld om tekst te classificeren of samen te vatten. Een krachtige toevoeging met duidelijke grenzen.",
    topics: ["ai-en-copilot", "formules"], serviceLinks: ["excel-bestand-verbeteren", "dashboards-en-managementrapportages"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "COPILOT-functie aangekondigd in augustus 2025 als preview (Beta Channel, Windows en Mac). Microsoft gaf aan dat de functie niet bedoeld is voor taken die nauwkeurigheid of reproduceerbaarheid vereisen. Status en limieten nalopen.",
    body: `In de zomer van 2025 kondigde Microsoft een nieuwe functie aan voor gebruikers met een Copilot-licentie: **COPILOT**. Het idee is eenvoudig: je schrijft in een formule een opdracht in gewone taal, verwijst naar cellen, en de functie geeft het antwoord van de AI terug in het werkblad. Het resultaat werkt bij als de gegevens veranderen, net als bij elke andere formule.

## Waarvoor het bedoeld is

Volgens de aankondiging is de functie vooral geschikt voor taken met tekst:

- **Classificeren**: klantfeedback indelen in categorieën als prijs, levering of kwaliteit.
- **Samenvatten**: een lange omschrijving terugbrengen tot één zin.
- **Extraheren**: de productnaam uit een vrije-tekstomschrijving halen.
- **Genereren**: een korte omschrijving bij een product of een conceptantwoord.

## Waarvoor het niet bedoeld is

Microsoft gaf zelf aan dat de functie **niet** bedoeld is voor:

- Berekeningen waar nauwkeurigheid essentieel is. Gebruik daarvoor gewone formules.
- Taken die reproduceerbaar moeten zijn. Een AI kan bij dezelfde vraag een iets ander antwoord geven.
- Juridische, financiële of andere toepassingen met hoge risico's, zonder menselijke controle.

Daarnaast gelden er limieten op het aantal aanroepen, en heeft de functie geen toegang tot actuele gegevens van internet of uit andere bestanden.

## Een voorbeeld

Een horecabedrijf verzamelt opmerkingen van gasten via een formulier. Met de COPILOT-functie deel je elke opmerking in bij een vaste categorie: eten, bediening, sfeer, prijs of overig. Een draaitabel laat daarna zien waar de meeste opmerkingen over gaan. Dat had vroeger uren handwerk gekost.

Belangrijk: geef de categorieën vast mee in de opdracht, en controleer een steekproef van de indeling.

## Aandachtspunten

- **Vaste categorieën** maken de uitkomst consistenter dan open vragen.
- **Steekproefcontrole**: beoordeel een deel van de uitkomsten handmatig.
- **Bevriezen**: wil je dat de uitkomst niet meer verandert, kopieer dan de waarden naar een vaste kolom.
- **Gevoelige gegevens**: ga na of de gegevens met de AI-dienst mogen worden verwerkt.
- **Licentie**: de functie vraagt een Copilot-licentie; collega's zonder licentie kunnen de formule niet herberekenen.

## Terugblik

De COPILOT-functie brengt AI naar de plek waar Excel-gebruikers al werken: de formule. Gebruik het voor wat AI goed kan, tekst begrijpen, en houd rekenwerk bij gewone formules. Bij het [verbeteren van een bestaand bestand](/diensten/excel-bestand-verbeteren) kijken we waar zo'n functie tijd bespaart.`,
    practice: "Heb je een kolom met vrije tekst die je handmatig indeelt in categorieën? Dat is de typische toepassing voor de COPILOT-functie. Leg de categorieën vast, test op een steekproef van twintig regels en vergelijk met je eigen indeling.",
  },
  {
    number: 84, slug: "trimrange-en-slimmere-bereikselectie", subjectYear: 2025, visual: "array", status: "REVIEW",
    title: "TRIMRANGE en slimmere bereikselectie",
    summary: "Verwijzen naar een hele kolom is handig maar traag; een vast bereik is snel maar groeit niet mee. TRIMRANGE en de bijbehorende verwijzingsnotatie lossen dat dilemma op.",
    topics: ["formules", "modelontwerp"], serviceLinks: ["excel-bestand-verbeteren", "doorontwikkeling-en-onderhoud"],
    sources: [EXCELBLOG, SUPPORT],
    factNote: "TRIMRANGE en 'trim references' (punt-notatie, zoals A:.A) aangekondigd eind 2024 voor Insiders; algemene beschikbaarheid in Microsoft 365 in de loop van 2025. Nalopen.",
    body: `Elke Excel-bouwer kent het dilemma. Verwijs je naar **A:A**, de hele kolom, dan groeit de formule automatisch mee met nieuwe gegevens. Maar met dynamische matrices levert dat een resultaat van ruim een miljoen rijen op, en het kan het werkboek traag maken. Verwijs je naar **A2:A500**, dan is het snel, maar moet je het bereik aanpassen als er meer gegevens komen. Excel-tabellen waren de gebruikelijke oplossing, maar die passen niet overal.

## TRIMRANGE

Met **TRIMRANGE** knip je lege rijen en kolommen aan de randen van een bereik weg. TRIMRANGE(A:A) geeft alleen het deel van kolom A dat daadwerkelijk gegevens bevat. Je kunt kiezen of je alleen aan het begin, alleen aan het eind of aan beide kanten wilt trimmen.

## De verkorte notatie

Naast de functie introduceerde Microsoft een verkorte schrijfwijze: een **punt** in de bereikverwijzing. Zo betekent A:.A ongeveer hetzelfde als TRIMRANGE(A:A), met het trimmen aan het einde. Ook bij gewone bereiken werkt het, zoals A2:.D1000: alleen het gevulde deel van dat bereik.

## Wat het oplevert

- **Formules die meegroeien** zonder het nadeel van volledige kolommen.
- **Dynamische matrices zonder lege staart**: een UNIQUE op een hele kolom geeft geen nul of lege waarde meer aan het eind.
- **Eenvoudiger dan OFFSET**-constructies, en niet vluchtig.
- **Goed te combineren** met FILTER, SORT, XLOOKUP en GROUPBY.

## Wanneer toch een tabel?

Excel-tabellen blijven in veel gevallen de beste keuze:

- **Leesbare verwijzingen**: Omzet[Bedrag] zegt meer dan B:.B.
- **Automatische opmaak en doortrekken** van formules.
- **Basis voor Power Query, draaitabellen en Copilot.**

TRIMRANGE is vooral handig waar een tabel niet kan of niet past: bij bereiken die door Power Query of een export worden gevuld zonder tabelopmaak, in oudere modellen die je niet volledig wilt ombouwen, of bij overlopende resultaten.

## Aandachtspunten

- **Leesbaarheid.** De punt-notatie is compact maar valt weinig op. Iemand die de notatie niet kent, kan hem over het hoofd zien. Leg het uit in de documentatie.
- **Lege cellen in het midden** worden niet weggeknipt; alleen aan de randen.
- **Compatibiliteit**: werkt alleen in versies die de functie ondersteunen.

## Terugblik

Een technische functie, maar met directe winst in onderhoud en snelheid. Bij [doorontwikkeling en onderhoud](/diensten/doorontwikkeling-en-onderhoud) vervangen we vaste of te ruime bereiken waar dat het model verbetert.`,
    practice: "Zoek in je modellen naar formules met bereiken als A2:A10000 of verwijzingen naar hele kolommen in dynamische matrixformules. Als het model traag is of als je bereiken regelmatig moet aanpassen, zijn dat de plekken voor een tabel of TRIMRANGE.",
  },
  {
    number: 85, slug: "copilot-helpt-excel-formules-uitleggen", subjectYear: 2025, visual: "ai", status: "REVIEW",
    title: "Copilot helpt Excel-formules uitleggen",
    summary: "Een van de meest praktische toepassingen van AI in Excel: uitleg bij bestaande formules. Hoe helpt dat bij het overnemen, controleren en documenteren van modellen?",
    topics: ["ai-en-copilot", "modelontwerp"], serviceLinks: ["excel-controleren-en-herstellen", "doorontwikkeling-en-onderhoud"],
    sources: [COPILOT, EXCELBLOG],
    factNote: "Formule-uitleg via Copilot bestond al in 2024; in 2025 werd dit verder geïntegreerd (o.a. uitleg direct vanuit de cel). Exacte functie, naam en beschikbaarheid nalopen.",
    body: `Wie een Excel-model overneemt van een collega, kent het: een formule van drie regels, met geneste functies, verwijzingen naar andere bladen en een paar benoemde bereiken. Wat doet dit eigenlijk? Een van de meest praktische toepassingen van Copilot in Excel is het **uitleggen van formules**. Microsoft maakte dat in de loop van 2024 en 2025 steeds toegankelijker, tot uitleg direct vanuit de cel.

## Hoe het helpt

**Overnemen van modellen.** Een nieuwe controller kan formule voor formule laten uitleggen wat er gebeurt, in plaats van alles zelf te ontrafelen.

**Controleren.** De uitleg in gewone taal maakt het makkelijker om te zien of de formule doet wat de bedoeling is. "Telt de omzet op voor alle klanten in regio Noord" klopt niet als het om regio Zuid had moeten gaan.

**Documenteren.** De uitleg is een startpunt voor documentatie op het uitlegblad.

**Leren.** Wie een onbekende functie tegenkomt, leert sneller hoe die werkt.

## Waar het tekortschiet

- **Wat, niet waarom.** Copilot kan uitleggen wat een formule technisch doet, maar niet waarom de maker het zo heeft gedaan. Waarom wordt rekening 8400 uitgesloten? Dat staat niet in de formule.
- **Context.** De uitleg kan namen van bereiken interpreteren, maar weet niet wat ze in jouw bedrijf betekenen.
- **Fouten.** Een uitleg kan zelf onjuist zijn, vooral bij complexe of ongebruikelijke formules. Controleer bij twijfel door de formule stap voor stap te evalueren (Formules > Formule evalueren).
- **Omvang.** Uitleg per formule is nuttig, maar een model met honderden formules vraagt een overzicht van de structuur, niet alleen uitleg per cel.

## Een goede werkwijze bij het overnemen van een model

1. **Begin met de structuur**: welke bladen, wat is invoer, wat is uitvoer?
2. **Volg de hoofdlijn**: van de belangrijkste uitkomst terug naar de bronnen.
3. **Laat complexe formules uitleggen** en noteer de uitleg.
4. **Vraag de vorige eigenaar naar het waarom**, zolang dat nog kan.
5. **Leg alles vast** op een uitlegblad.

## Terugblik

Formule-uitleg is een van de nuttigste AI-functies in Excel: weinig risico, veel tijdwinst. Het vervangt de documentatie van een model niet, maar maakt het opstellen ervan wel eenvoudiger. Neem je een model over en wil je zekerheid? Bij [Excel controleren en herstellen](/diensten/excel-controleren-en-herstellen) lopen we het model systematisch door.`,
    practice: "Kies de drie formules in je belangrijkste model die je het minst goed begrijpt. Laat ze uitleggen, door Copilot of een collega, en schrijf de uitleg in één zin naast de formule. Je model is daarna voor de volgende gebruiker een stuk toegankelijker.",
  },
  {
    number: 86, slug: "gegevens-opschonen-met-ai-ondersteuning", subjectYear: 2025, visual: "ai", status: "REVIEW",
    title: "Gegevens opschonen met AI-ondersteuning",
    summary: "Dubbele klanten, inconsistente schrijfwijzen, ontbrekende waarden: gegevens opschonen is tijdrovend. AI-functies in Excel kunnen helpen, maar vragen om een gestructureerde aanpak.",
    topics: ["ai-en-copilot", "data-en-power-query"], serviceLinks: ["vba-power-query-automatisering", "excel-bestand-verbeteren"],
    sources: [EXCELBLOG, PQDOCS],
    factNote: "Microsoft introduceerde in 2024-2025 meerdere AI-gestuurde opschoonfuncties (o.a. suggesties voor inconsistenties en opschoning via Copilot). Exacte functienamen en beschikbaarheid nalopen.",
    body: `Elke analist weet het: het meeste werk zit niet in de analyse, maar in het opschonen van de gegevens. "Jansen B.V.", "Jansen BV" en "Jansen bv" als drie verschillende klanten. Postcodes met en zonder spatie. Datums als tekst. In 2024 en 2025 voegde Microsoft verschillende AI-gestuurde mogelijkheden toe om hierbij te helpen, van suggesties voor inconsistente waarden tot opschoning via Copilot.

## Waar AI goed in is

- **Inconsistente schrijfwijzen herkennen**: varianten van dezelfde naam of plaats.
- **Patronen herkennen**: datums in verschillende formaten, telefoonnummers met en zonder landcode.
- **Ontbrekende of afwijkende waarden** signaleren.
- **Voorstellen doen** voor standaardisatie.

## Waar AI tekortschiet

- **Bedrijfskennis.** Is "Jansen Bouw" dezelfde klant als "Jansen B.V."? Dat weet alleen iemand die de klanten kent.
- **Herhaalbaarheid.** Een AI-opschoning die je elke maand opnieuw doet, kan elke keer een iets andere uitkomst geven.
- **Spoor.** Achteraf is niet altijd te zien welke waarden zijn aangepast en waarom.

## Een combinatie die werkt

**Stap 1: AI om te ontdekken.** Gebruik AI-suggesties om te zien welke soorten problemen er in de gegevens zitten.

**Stap 2: regels vastleggen.** Leg de beslissingen vast: deze varianten worden deze klant, postcodes zonder spatie, datums in dit formaat.

**Stap 3: Power Query om toe te passen.** Leg de opschoning vast als stappen in Power Query, met een mappingtabel voor naamvarianten. Elke maand dezelfde stappen, met dezelfde uitkomst.

**Stap 4: controleren.** Een overzicht van regels die niet aan de regels voldoen, voor handmatige beoordeling.

**Stap 5: bij de bron oplossen.** Het beste is om problemen te voorkomen: validatie in het bronsysteem, vaste keuzelijsten, afspraken over invoer.

## Waarom niet alles met AI?

Voor eenmalige analyses is opschonen met AI prima. Voor terugkerende processen, en zeker voor financiële rapportages, wil je dat de opschoning **voorspelbaar, controleerbaar en herhaalbaar** is. Dat is precies wat Power Query biedt. AI helpt bij het ontdekken; vaste regels zorgen voor de betrouwbaarheid.

## Terugblik

AI maakt het makkelijker om problemen in gegevens te vinden. Het oplossen blijft een kwestie van keuzes en vaste processen. Bij [Power Query en automatisering](/diensten/vba-power-query-automatisering) bouwen we opschoningsprocessen die elke maand hetzelfde resultaat geven.`,
    practice: "Neem je klanten- of leverancierslijst en sorteer op naam. Hoeveel dubbele of bijna-dubbele namen zie je? Dat geeft een goede indruk van hoeveel winst er te halen is met een vaste opschoningsstap.",
  },
  {
    number: 87, slug: "python-in-excel-breder-toegankelijk-via-het-web", subjectYear: 2025, visual: "python", status: "REVIEW",
    title: "Python in Excel breder toegankelijk via het web",
    summary: "Na de algemene beschikbaarheid op Windows in 2024 breidde Microsoft Python in Excel uit naar andere platforms, waaronder Excel op het web. Wat verandert er voor teams die samenwerken?",
    topics: ["python", "samenwerken"], serviceLinks: ["financiele-modellen"],
    sources: [PYTHON, EXCELBLOG],
    factNote: "Datering en voorwaarden van Python in Excel op het web (en Mac) nalopen. Per abonnementstype verschillend; mogelijk deels in 2024 al beschikbaar.",
    body: `Toen Python in Excel in september 2024 algemeen beschikbaar werd, gold dat voor zakelijke gebruikers van Excel voor Windows. Voor teams die met verschillende apparaten en in de browser werken, was dat een beperking: een collega op een Mac of in de browser kon Python-cellen niet opnieuw berekenen. Microsoft breidde de beschikbaarheid daarna uit, waaronder naar **Excel op het web**.

## Waarom het web belangrijk is

- **Samenwerken.** Veel teams werken in gedeelde bestanden via Teams en SharePoint, die standaard in de browser openen.
- **Verschillende apparaten.** Niet iedereen heeft een Windows-computer met de nieuwste Excel.
- **Geen installatie.** Python-code draait toch al in de cloud; de browser is een logische plek.

## Wat het betekent voor modellen

Met bredere beschikbaarheid wordt Python in Excel een realistischere optie voor modellen die door een team worden gebruikt. Wel blijft gelden:

- **Licentie en abonnement** bepalen de toegang. Controleer per gebruiker.
- **Rekenkracht** kan verschillen tussen standaard- en premiumgebruik.
- **Gegevens** worden in de cloud verwerkt.
- **Onderhoud** vraagt Python-kennis in het team.

## Een praktische opzet voor teams

**Rollen.** Niet iedereen hoeft Python te schrijven. Een analist onderhoudt de Python-cellen; de rest van het team gebruikt de uitkomsten.

**Afgebakende analyses.** Python-cellen staan op een eigen blad, met duidelijke invoer en uitvoer. De rest van het model werkt met gewone formules.

**Documentatie.** Per Python-cel: doel, bibliotheek, invoer, uitvoer, beperkingen.

**Terugvaloptie.** Wat gebeurt er als een gebruiker Python niet kan berekenen? De laatst berekende waarden blijven zichtbaar, maar zijn mogelijk niet actueel. Toon de berekeningsdatum.

## Voorbeeldtoepassingen voor teams

- Een verkoopteam dat wekelijks een prognose per regio bekijkt, gemaakt met een statistisch model.
- Een inkoopteam dat leveranciers vergelijkt op levertijd en prijsvariatie.
- Een controller die maandelijks een uitschieteranalyse op boekingen uitvoert en deelt met de accountant.

## Terugblik

Bredere beschikbaarheid maakt Python in Excel geschikter voor teams, maar de basisvragen blijven: wie onderhoudt het, wie begrijpt het, en welke gegevens mogen naar de cloud? Bij [financiële modellen](/diensten/financiele-modellen) beantwoorden we die vragen voordat we Python inzetten.`,
    practice: "Werkt je team in de browser, op Windows en op Mac door elkaar? Test dan een eenvoudige Python-cel op elk platform dat je gebruikt, voordat je Python opneemt in een gedeeld model.",
  },
  {
    number: 88, slug: "de-toekomst-van-automatische-financiele-rapportage", subjectYear: 2025, visual: "chart", status: "REVIEW",
    title: "De toekomst van automatische financiële rapportage",
    summary: "AI kan toelichtingen schrijven, afwijkingen verklaren en rapporten opmaken. Hoe ziet financiële rapportage eruit als een groot deel van het werk wordt geautomatiseerd, en wat blijft er voor de controller?",
    topics: ["rapportage", "finance", "ai-en-copilot"], serviceLinks: ["dashboards-en-managementrapportages", "financiele-modellen"],
    sources: [EXCELBLOG, COPILOT],
    factNote: "Beschouwend artikel. Controleer vóór publicatie of de genoemde AI-mogelijkheden (afwijkingen signaleren, concepttoelichtingen) overeenkomen met de functies die in 2025 beschikbaar waren.",
    body: `Een maandrapportage bestaat grofweg uit vier stappen: gegevens verzamelen, cijfers berekenen, afwijkingen analyseren en een toelichting schrijven. De eerste twee stappen zijn bij veel bedrijven al grotendeels geautomatiseerd met Power Query en goed opgebouwde modellen. In 2025 kwam AI binnen bereik voor de laatste twee stappen.

## Wat AI kan bijdragen

**Afwijkingen signaleren.** Welke posten wijken meer dan een drempel af van budget of vorig jaar? Dat kon al met formules, maar AI kan ook ongebruikelijke patronen vinden die niet in een vaste regel passen.

**Een eerste toelichting schrijven.** "De personeelskosten liggen 8 procent boven budget, vooral door inhuur bij de afdeling Logistiek in maart." AI kan zo'n tekst opstellen op basis van de cijfers.

**Rapporten opmaken.** Grafieken, tabellen en samenvattingen in een vaste opmaak.

**Vragen beantwoorden.** Een directielid kan in het rapport doorvragen: waarom is de marge in regio Zuid gedaald?

## Wat AI niet kan

**De echte oorzaak kennen.** AI ziet dat de kosten zijn gestegen, maar weet niet dat dit komt door een bewuste beslissing om extra mensen in te huren voor een grote order. De controller weet dat.

**Beoordelen wat belangrijk is.** Een afwijking van 50.000 euro kan onbelangrijk zijn (timing) en een afwijking van 5.000 euro kan een signaal zijn (structureel). Dat vraagt kennis van het bedrijf.

**Verantwoordelijkheid nemen.** De directie moet kunnen vertrouwen op het rapport. Daar staat een mens voor in.

## Een realistisch beeld

De toekomst van financiële rapportage is waarschijnlijk niet volledig geautomatiseerd, maar wel anders verdeeld:

- **Verzamelen en berekenen**: volledig automatisch, met controles.
- **Signaleren**: automatisch, met door de controller ingestelde drempels.
- **Toelichten**: AI maakt een concept, de controller vult aan en corrigeert.
- **Interpreteren en adviseren**: de controller.

## Wat nodig is

- **Een betrouwbare basis**: gegevens en berekeningen die kloppen. AI op slechte cijfers levert overtuigende onzin op.
- **Vaste definities en drempels**: wat is een relevante afwijking?
- **Een duidelijke workflow** voor beoordeling van AI-teksten.
- **Transparantie**: het rapport laat zien welke delen automatisch zijn opgesteld.

## Terugblik

Automatisering verschuift de tijd van de controller van maken naar duiden. Dat is waardevol, maar alleen als de basis op orde is. Bij [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages) bouwen we die basis.`,
    practice: "Meet hoeveel tijd je maandelijkse rapportage kost, verdeeld over verzamelen, berekenen, analyseren en toelichten. Als verzamelen en berekenen meer dan de helft van de tijd kosten, ligt daar de eerste winst, nog vóór AI.",
  },
  {
    number: 89, slug: "hoe-controllers-excel-en-ai-verantwoord-combineren", subjectYear: 2025, visual: "shield", status: "REVIEW",
    title: "Hoe controllers Excel en AI verantwoord combineren",
    summary: "AI in Excel biedt kansen, maar ook risico's voor betrouwbaarheid, vertrouwelijkheid en verantwoording. Een praktisch kader voor controllers en financiële afdelingen.",
    topics: ["ai-en-copilot", "finance", "veiligheid"], serviceLinks: ["excel-controleren-en-herstellen", "financiele-modellen"],
    sources: [COPILOT, { title: "Autoriteit Persoonsgegevens: AI en algoritmes", url: "https://autoriteitpersoonsgegevens.nl/themas/algoritmes-ai" }],
    factNote: "Beschouwend artikel. Controleer de link naar de Autoriteit Persoonsgegevens en of de genoemde AI-functies (COPILOT-functie, Python met Copilot) in 2025 zo beschikbaar waren.",
    body: `In 2025 hadden de meeste financiële afdelingen toegang tot AI in een of andere vorm: Copilot in Excel, de COPILOT-functie, Python met Copilot, of algemene AI-chatbots. De vraag was niet meer óf AI werd gebruikt, maar hoe. Voor controllers, die verantwoordelijk zijn voor de betrouwbaarheid van financiële informatie, vraagt dat om een duidelijk kader.

## Vier vragen voor elk gebruik

**1. Welke gegevens?** Gaat het om openbare of geanonimiseerde gegevens, om interne bedrijfsgegevens, of om persoonsgegevens? Elke categorie vraagt een eigen afweging. Persoonsgegevens, zoals salarissen of klantgegevens, vallen onder de AVG.

**2. Welke dienst?** Werkt de AI binnen de beveiligde Microsoft 365-omgeving van de organisatie, met de bestaande afspraken over gegevensverwerking? Of is het een externe dienst waarvan niet duidelijk is wat er met de gegevens gebeurt?

**3. Welk doel?** Verkennen en voorbereiden, of iets wat direct in een rapport of besluit terechtkomt?

**4. Welke controle?** Wie beoordeelt het resultaat, en hoe?

## Een eenvoudig kader

| Toepassing | Risico | Controle |
|---|---|---|
| Formule-uitleg, verkenning | Laag | Eigen beoordeling |
| Formules voor een model | Middel | Test op bekende uitkomsten, review |
| Analyses voor rapportage | Middel tot hoog | Review door tweede persoon, aansluiting op bron |
| Teksten in externe rapporten | Hoog | Volledige inhoudelijke review |

## Praktische afspraken

- **Een lijst van toegestane AI-diensten**, in overleg met IT en de privacyfunctionaris.
- **Geen persoonsgegevens** in AI-diensten buiten de beheerde omgeving.
- **Markeren** wat door AI is opgesteld, zodat een reviewer weet waar extra aandacht nodig is.
- **Controles in het model** die onafhankelijk van de maker werken.
- **Vierogenprincipe** voor alles wat extern gaat.
- **Vastleggen** welke AI is gebruikt bij belangrijke analyses, voor de verantwoording.

## Kansen benutten

Een kader is geen rem. Het maakt juist mogelijk om AI met vertrouwen te gebruiken voor wat het goed kan: formules uitleggen, gegevens verkennen, conceptteksten schrijven, patronen vinden. De tijd die dat bespaart, kan naar analyse en advies.

## Terugblik

Verantwoord AI-gebruik in finance is geen technisch vraagstuk, maar een kwestie van afspraken en discipline. Bij [Excel controleren en herstellen](/diensten/excel-controleren-en-herstellen) toetsen we modellen ongeacht hoe ze zijn gemaakt. Lees hoe we zelf met AI en jouw gegevens omgaan bij [vertrouwelijkheid](/vertrouwelijkheid).`,
    practice: "Stel met je team een korte lijst op: welke AI-diensten gebruiken we, voor welke gegevens, en wie controleert het resultaat? Eén A4 is genoeg om veel onduidelijkheid te voorkomen.",
  },
  {
    number: 90, slug: "waarom-goed-financieel-modelontwerp-onmisbaar-blijft", subjectYear: 2025, visual: "grid", status: "REVIEW",
    title: "Waarom goed financieel modelontwerp onmisbaar blijft",
    summary: "Als AI in seconden een model kan opzetten, waarom zou je dan nog investeren in ontwerp? Omdat een model pas waarde heeft als je erop kunt vertrouwen, het kunt uitleggen en het kunt onderhouden.",
    topics: ["modelontwerp", "finance"], serviceLinks: ["financiele-modellen", "excel-op-maat-laten-maken"],
    sources: [EXCELBLOG],
    factNote: "Beschouwend artikel. De openingszin verwijst naar Agent Mode (preview eind 2025); status en beschikbaarheid nalopen.",
    body: `Eind 2025 kon je Copilot in Excel vragen om een begroting, een investeringsanalyse of een liquiditeitsprognose op te zetten, en kreeg je binnen een paar minuten een werkend model. Dat roept een terechte vraag op: is het ontwerpen van financiële modellen nog wel een vak?

Ons antwoord: meer dan ooit. Niet ondanks AI, maar juist door AI.

## Wat een goed model onderscheidt

**Het past bij hoe je bedrijf werkt.** Een generiek model rekent met omzet en kosten. Een goed model rekent met jouw drivers: projecturen, bezettingsgraad, dekkingsbijdrage per productgroep, betalingstermijnen per klantsegment.

**Je kunt het uitleggen.** Elke uitkomst is herleidbaar naar aannames en bronnen. Als de bank of de raad van commissarissen vraagt "waar komt dit getal vandaan?", heb je een antwoord.

**Het signaleert zijn eigen fouten.** Controles op aansluiting, plausibiliteit en volledigheid zijn ingebouwd.

**Het is onderhoudbaar.** Over een jaar kan iemand anders het aanpassen zonder alles te breken.

**Het is gebouwd voor beslissingen.** Scenario's, gevoeligheden en een duidelijke presentatie van wat ertoe doet.

## Waarom AI dit niet vanzelf oplost

- AI kent je bedrijf niet. Het kan vragen stellen, maar het weet niet welke vragen ertoe doen.
- AI optimaliseert voor een werkend resultaat, niet voor een onderhoudbaar resultaat.
- AI-modellen zijn vaak generiek, omdat de opdracht generiek is.
- Wie het model niet heeft ontworpen, begrijpt de keuzes erachter niet.

## Waarom AI het belangrijker maakt

Met AI worden meer modellen gemaakt, sneller, door meer mensen. Dat betekent ook meer modellen die niemand echt begrijpt, met aannames die niemand heeft gecontroleerd. Juist dan is het waardevol om de bedrijfskritische modellen solide te ontwerpen.

## Hoe AI en ontwerp samengaan

- **AI voor de eerste opzet**, als gespreksstof en prototype.
- **Ontwerp** voor de structuur, de drivers en de controles.
- **AI voor onderhoud**: formules uitleggen, documentatie bijwerken.
- **Mensen** voor beoordeling en verantwoording.

## Terugblik

Veertig jaar Excel laat zien: elke nieuwe technologie maakt meer mogelijk, maar maakt goed ontwerp niet overbodig. Bij [financiële modellen](/diensten/financiele-modellen) ontwerpen we modellen die passen bij hoe jouw bedrijf werkt, met of zonder AI in de gereedschapskist. Lees hoe we dat aanpakken in onze [werkwijze](/werkwijze).`,
    practice: "Neem je belangrijkste financiële model en stel jezelf drie vragen: kan ik elke uitkomst herleiden, signaleert het model zijn eigen fouten, en kan een collega het aanpassen? Elk 'nee' is een concreet verbeterpunt.",
  },
];
