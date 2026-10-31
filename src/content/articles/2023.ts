import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };
const PYTHON = { title: "Microsoft Support: Inleiding tot Python in Excel", url: "https://support.microsoft.com/office/introduction-to-python-in-excel-55643c2e-ff56-4168-b1ce-9428c8308545" };
const COPILOT = { title: "Microsoft Learn: Microsoft 365 Copilot", url: "https://learn.microsoft.com/copilot/microsoft-365/" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };

export const articles2023: ArticleContent[] = [
  {
    number: 61, slug: "microsoft-introduceert-python-in-excel-als-preview", subjectYear: 2023, visual: "python", status: "PUBLISHED",
    title: "Microsoft introduceert Python in Excel als preview",
    summary: "In augustus 2023 kondigde Microsoft Python in Excel aan, als publieke preview voor een deel van de Insiders. Python-code draait in de cloud en schrijft resultaten terug naar het werkblad.",
    topics: ["python"], serviceLinks: ["financiele-modellen", "vba-power-query-automatisering"],
    sources: [PYTHON, EXCELBLOG],
    factNote: "Aankondiging 22 augustus 2023, publieke preview voor Microsoft 365 Insiders (Beta Channel, Windows). Algemene beschikbaarheid pas in 2024.",
    body: `Python is al jaren een van de meest gebruikte talen voor data-analyse. Veel analisten werkten met twee gereedschappen: Excel voor de presentatie en de dagelijkse cijfers, Python voor de zware analyses. In augustus 2023 kondigde Microsoft aan dat die twee samenkomen: **Python in Excel**, als publieke preview.

## Hoe het werkt

Je typt =PY( in een cel, of kiest Python in het lint, en schrijft Python-code direct in die cel. Met een speciale functie verwijs je naar Excel-bereiken of tabellen. Het resultaat komt terug in het werkblad: als waarde, als tabel of als grafiek.

Belangrijk: de code draait **niet op je eigen computer**, maar in een afgeschermde omgeving in de Microsoft-cloud. Daar is een vaste set bibliotheken beschikbaar via Anaconda, zoals pandas voor data-analyse, Matplotlib en seaborn voor grafieken en statsmodels voor statistiek.

## Status in 2023

- **Preview**, niet algemeen beschikbaar.
- Alleen voor een deel van de **Microsoft 365 Insiders** op Windows.
- Microsoft gaf aan dat er na de preview mogelijk licentievoorwaarden zouden gelden voor uitgebreidere rekenkracht.

## Waarom dit interessant is

- **Analyses die met formules lastig zijn**, zoals regressie, clustering of geavanceerde tijdreeksanalyse, kunnen direct in het werkboek.
- **Grafieken** die Excel standaard niet kent, zoals heatmaps met veel detail of verdelingsgrafieken.
- **Datavoorbereiding** met pandas voor wie dat gewend is.
- **Eén bestand** in plaats van een losse Python-omgeving en een Excel-rapport.

## Kanttekeningen

- **Gegevens gaan naar de cloud.** Voor gevoelige gegevens moet je nagaan of dat binnen je beleid past. Microsoft beschrijft de beveiligings- en privacyaspecten in zijn documentatie.
- **Geen internettoegang** vanuit de code: je kunt geen externe bronnen ophalen vanuit Python. Gegevens komen via Excel of Power Query binnen.
- **Een nieuwe vaardigheid.** Wie een model met Python overneemt, moet Python kunnen lezen.
- **Beschikbaarheid** verschilde per platform en licentie.

## Wat dit voor bedrijven betekende

In 2023 was Python in Excel vooral iets om mee te experimenteren. Voor productiemodellen was de preview-status een reden om terughoudend te zijn. In de [artikelen over 2024](/excel-door-de-jaren/2024) lees je hoe het daarna verderging.`,
    practice: "Werkt er in je organisatie al iemand met Python voor analyses? Dan is dit het moment om samen te verkennen welke analyses in Excel zelf kunnen. Begin met een kopie van niet-gevoelige gegevens.",
  },
  {
    number: 62, slug: "de-mogelijkheden-van-python-voor-financiele-analyses", subjectYear: 2023, visual: "python", status: "PUBLISHED",
    title: "De mogelijkheden van Python voor financiële analyses",
    summary: "Wat kan een controller of financieel analist met Python in Excel? Van statistische prognoses tot uitschieteranalyse: een verkenning van toepassingen en grenzen.",
    topics: ["python", "finance"], serviceLinks: ["financiele-modellen"],
    sources: [PYTHON, EXCELBLOG],
    body: `Met de introductie van Python in Excel als preview in 2023 rees de vraag: wat heeft een financiële afdeling eraan? De meeste financiële modellen draaien op optellen, aftrekken en verdelen, en daar is Excel uitstekend in. Python voegt vooral iets toe waar het gaat om **patronen, verdelingen en voorspellingen**.

## Toepassingen in finance

**Prognoses op basis van historie.** Met statistische tijdreeksmodellen kun je een omzetprognose maken die rekening houdt met trend en seizoenspatroon. Excel heeft zelf FORECAST.ETS, maar Python biedt meer modellen en meer controle over de parameters.

**Uitschieters opsporen.** Welke boekingen wijken sterk af van het patroon? Met statistische methoden markeer je ongebruikelijke bedragen, leveranciers of tijdstippen. Nuttig voor interne controle.

**Verdelingen en risico.** Een Monte Carlo-simulatie van een investering: duizenden scenario's met variërende aannames, en een verdeling van de uitkomst. In Excel kan dat ook, maar in Python is het compacter en flexibeler.

**Clusteranalyse.** Klanten groeperen op basis van omzet, marge en betaalgedrag, zonder vooraf de groepen te bepalen.

**Visualisatie.** Grafieken die Excel niet standaard heeft, zoals uitgebreide heatmaps, boxplots en verdelingsgrafieken.

## Wat Python niet beter doet

- **De basis van een financieel model**: begroting, resultatenrekening, balans, kasstroom. Dat blijft in formules transparanter.
- **Eenvoudige rapportages**: draaitabellen en formules zijn sneller en voor iedereen leesbaar.
- **Alles wat de accountant of directie moet kunnen narekenen.** Een formule kan iedereen volgen; Python-code niet.

## Een goede verdeling

In een model dat Python gebruikt, houden we de rollen gescheiden:

- **Excel** voor invoer, aannames, kernberekeningen en rapportage.
- **Python** voor specifieke analyses, met een duidelijk afgebakende in- en uitvoer.
- **Documentatie** van elke Python-cel: wat doet het, welke bibliotheek, welke aannames.

## Een waarschuwing

Statistische modellen geven een schijn van precisie. Een prognose met drie decimalen is niet nauwkeuriger dan een goed onderbouwde schatting. Maak altijd zichtbaar hoe onzeker een voorspelling is, bijvoorbeeld met een bandbreedte.

## Terugblik

Python in Excel is een waardevolle aanvulling voor specifieke analyses, geen vervanging van een goed opgebouwd financieel model. Bij [financiële modellen](/diensten/financiele-modellen) gebruiken we het waar het meerwaarde heeft en de omgeving van de klant het toelaat.`,
    practice: "Welke financiële vraag beantwoord je nu op gevoel, omdat de analyse in Excel te complex is? Bijvoorbeeld: welke klanten gaan waarschijnlijk later betalen? Dat zijn de vragen waar Python in Excel iets kan toevoegen.",
  },
  {
    number: 63, slug: "microsoft-365-copilot-en-de-toekomst-van-spreadsheets", subjectYear: 2023, visual: "ai", status: "PUBLISHED",
    title: "Microsoft 365 Copilot en de toekomst van spreadsheets",
    summary: "In maart 2023 kondigde Microsoft 365 Copilot aan: een AI-assistent in Word, Excel, PowerPoint, Outlook en Teams. In november 2023 werd het beschikbaar voor grote zakelijke klanten, met Excel nog in preview.",
    topics: ["ai-en-copilot"], serviceLinks: ["excel-op-maat-laten-maken"],
    sources: [COPILOT, EXCELBLOG],
    factNote: "Aankondiging 16 maart 2023; beschikbaar voor enterprise-klanten per 1 november 2023 (met minimumafname). Copilot in Excel was toen nog in preview. Nalopen.",
    body: `In maart 2023 presenteerde Microsoft **Microsoft 365 Copilot**: een AI-assistent die is ingebouwd in de bekende Office-programma's en die werkt met de gegevens van de organisatie. Voor Excel beloofde Microsoft dat gebruikers in gewone taal vragen konden stellen over hun gegevens, formules konden laten voorstellen en analyses konden laten maken.

## De tijdlijn in 2023

- **Maart 2023**: aankondiging van Microsoft 365 Copilot.
- **Gedurende 2023**: beperkte testprogramma's bij geselecteerde klanten.
- **November 2023**: beschikbaar voor grote zakelijke klanten, tegen een aanvullende licentie per gebruiker. Copilot in Excel had op dat moment nog de status preview.

Voor het mkb was Copilot in 2023 dus nog nauwelijks bereikbaar. Dat veranderde begin 2024.

## Wat Copilot in Excel zou moeten kunnen

- **Vragen beantwoorden** over gegevens in een tabel: wat zijn de grootste klanten, waar zit de groei?
- **Formules voorstellen** voor nieuwe kolommen.
- **Markeren, sorteren en filteren** op basis van een beschrijving.
- **Grafieken en draaitabellen** voorstellen.

In de eerste versies werkte Copilot in Excel alleen met gegevens die als **tabel** waren opgemaakt, en het bestand moest in OneDrive of SharePoint staan.

## Wat dit betekent voor spreadsheets

De komst van AI-assistenten verandert de manier waarop mensen met Excel werken. Minder zoeken naar de juiste functie, meer vragen stellen. Maar de kern blijft hetzelfde:

- **Gestructureerde gegevens** zijn een voorwaarde. Een AI-assistent kan weinig met een rommelig werkblad vol samengevoegde cellen.
- **Een goed model** blijft nodig. AI kan helpen bij een formule, maar bepaalt niet hoe een begroting moet zijn opgebouwd.
- **Controle** blijft essentieel. Een voorgestelde formule kan er goed uitzien en toch fout zijn.

## Terugblik

2023 was het jaar van de aankondigingen. De vraag hoe AI werkelijk zou landen in het dagelijks gebruik van Excel, werd in de jaren daarna beantwoord. Het belangrijkste inzicht bleef: AI werkt het best op een goed gestructureerd werkboek. Juist daar ligt de waarde van [Excel op maat](/diensten/excel-op-maat-laten-maken).`,
    practice: "Zijn je belangrijkste gegevens opgemaakt als Excel-tabel (Ctrl+T), met duidelijke kolomkoppen en zonder samengevoegde cellen? Dat is de basis voor elke vorm van AI-ondersteuning, en ook zonder AI een goed idee.",
  },
  {
    number: 64, slug: "ai-ondersteuning-bij-het-analyseren-van-gegevens", subjectYear: 2023, visual: "ai", status: "PUBLISHED",
    title: "AI-ondersteuning bij het analyseren van gegevens",
    summary: "Al voor Copilot had Excel functies die patronen in gegevens zoeken, zoals Gegevens analyseren. In 2023 kwam AI-ondersteuning in een stroomversnelling. Wat kan het, en wat vraagt het van je gegevens?",
    topics: ["ai-en-copilot", "rapportage"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [{ title: "Microsoft Support: Gegevens analyseren in Excel", url: "https://support.microsoft.com/office/analyze-data-in-excel-3223aab8-f543-4fda-85ed-76bb0295ffc4" }, COPILOT],
    body: `AI in Excel begon niet met Copilot. Al in 2019 bracht Microsoft **Ideeën**, later hernoemd tot **Gegevens analyseren**: een functie die een tabel bekijkt en zelf patronen, trends en uitschieters voorstelt, met bijbehorende grafieken. Je kon ook vragen stellen in gewone taal, zoals "omzet per regio". In 2023, met de aankondiging van Copilot, kreeg AI-ondersteuning bij analyse een nieuwe impuls.

## Wat AI-analyse goed doet

- **Snel een eerste beeld** van een onbekende dataset: welke kolommen zijn er, wat zijn de grootste waarden, waar zitten trends?
- **Patronen voorstellen** die je zelf niet direct zou zoeken, zoals een afwijking in een bepaalde maand.
- **Drempel verlagen** voor gebruikers die geen draaitabel kunnen maken.

## Waar het tekortschiet

- **Context.** De AI weet niet dat de omzet in juli altijd daalt door de bouwvakvakantie, of dat een daling bij één klant komt door een bewuste prijsverhoging.
- **Bedrijfslogica.** Wat is een "afwijking" voor jouw organisatie? Dat hangt af van normen die niet in de gegevens staan.
- **Betrouwbaarheid.** Een voorgestelde analyse kan statistisch kloppen en toch irrelevant zijn.
- **Herhaalbaarheid.** Een maandrapport moet elke maand dezelfde opbouw hebben. Een AI-voorstel kan elke keer anders zijn.

## Wat AI van je gegevens vraagt

AI-ondersteuning werkt alleen goed als de gegevens daarvoor geschikt zijn:

- **Tabelvorm**: één rij per record, één kolom per kenmerk.
- **Duidelijke kolomnamen**: "Omzet excl. btw" in plaats van "Kolom F".
- **Consistente waarden**: niet de ene keer "NH" en de andere keer "Noord-Holland".
- **Geen subtotalen** tussen de gegevens.
- **Geen samengevoegde cellen.**

Dat zijn precies dezelfde eisen die goede rapportage stelt, met of zonder AI.

## Een praktische rolverdeling

AI is sterk voor **verkennen**: snel zien wat er in een dataset zit. Voor **rapporteren**, waar consistentie en controle belangrijk zijn, blijft een vast ontworpen dashboard de betere keuze. Een goede combinatie: gebruik AI om vragen te ontdekken, en verwerk de belangrijkste vragen in het vaste rapport.

## Terugblik

AI maakte analyse toegankelijker, maar verving het ontwerp van een goed rapport niet. Bij [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages) zorgen we dat de onderliggende gegevens zo zijn ingericht dat zowel mensen als AI er goed mee kunnen werken.`,
    practice: "Probeer Gegevens analyseren (tabblad Start) op een tabel met je verkoopgegevens. Levert het bruikbare inzichten op, of vooral onzin? Het antwoord zegt veel over hoe goed je gegevens gestructureerd zijn.",
  },
  {
    number: 65, slug: "power-query-combineren-met-moderne-formules", subjectYear: 2023, visual: "query", status: "PUBLISHED",
    title: "Power Query combineren met moderne formules",
    summary: "Power Query en dynamische matrixformules zijn geen concurrenten maar partners. Hoe verdeel je het werk tussen beide voor een snel, betrouwbaar en flexibel model?",
    topics: ["data-en-power-query", "formules", "modelontwerp"], serviceLinks: ["vba-power-query-automatisering", "dashboards-en-managementrapportages"],
    sources: [PQDOCS, EXCELBLOG],
    body: `In 2023 had Excel twee volwassen manieren om gegevens te bewerken: **Power Query** en **dynamische matrixformules**. Beide kunnen filteren, samenvoegen, sorteren en verrijken. De vraag is dus niet óf je ze gebruikt, maar welke voor welk deel van het werk.

## De sterke punten van Power Query

- **Externe bronnen**: exports, databases, mappen met bestanden, SharePoint-lijsten.
- **Opschonen**: typen, spaties, foutieve waarden, kolommen hernoemen, draaien en ontdraaien.
- **Grote volumes**: honderdduizenden regels zonder dat het werkboek traag wordt.
- **Vastgelegde stappen**: herhaalbaar en controleerbaar.

## De sterke punten van formules

- **Directe interactie**: het resultaat verandert direct als de gebruiker een keuze maakt.
- **Rekenen met invoer en aannames** uit het werkboek.
- **Flexibele presentatie**: top-N, afwijkingen boven een drempel, overzichten per selectie.

## Een patroon dat goed werkt

**Laag 1: Power Query** haalt de gegevens binnen, schoont ze op en levert een nette tabel in het werkboek. Bijvoorbeeld alle transacties van het jaar, met gemapte rekeningen en afdelingen.

**Laag 2: formules** rekenen op die tabel, met de keuzes van de gebruiker: periode, afdeling, scenario. FILTER, SUMIFS, XLOOKUP en LET doen het werk.

**Laag 3: presentatie** toont de resultaten in tabellen en grafieken.

Het voordeel: wat zwaar en herhaalbaar is, gebeurt één keer bij het verversen. Wat interactief moet zijn, rekent direct.

## Valkuilen

- **Power Query voor interactie gebruiken.** Een parameter in een query die de gebruiker moet aanpassen en daarna ververst, is onhandig.
- **Formules voor zware opschoning.** Tienduizenden regels met TEXTBEFORE, TRIM en XLOOKUP maken het werkboek traag.
- **Verwijzingen naar posities in een querytabel.** Als de tabel na verversen een andere lengte heeft, kloppen vaste celverwijzingen niet meer. Gebruik tabelverwijzingen.
- **Geen verversingsstatus.** Laat zien wanneer de gegevens voor het laatst zijn ververst.

## Terugblik

De combinatie van Power Query en moderne formules is in veel van onze modellen de standaard. In het [managementdashboard](/voorbeelden/managementdashboard) en de [horeca-omzetanalyse](/voorbeelden/horeca-omzetanalyse) zie je hoe de lagen samenwerken.`,
    practice: "Kijk in je belangrijkste model waar de gegevens binnenkomen. Worden ze geplakt en daarna met formules opgeschoond? Dan levert het verplaatsen van die opschoning naar Power Query vaak direct een sneller en betrouwbaarder model op.",
  },
  {
    number: 66, slug: "geavanceerde-statistische-analyses-vanuit-excel", subjectYear: 2023, visual: "python", status: "PUBLISHED",
    title: "Geavanceerde statistische analyses vanuit Excel",
    summary: "Excel heeft altijd al statistische functies gehad, van regressie tot prognoses. Met Python in Excel kwam daar in 2023 een nieuwe laag bij. Een overzicht van wat kan, en wanneer je beter een specialist inschakelt.",
    topics: ["python", "formules"], serviceLinks: ["financiele-modellen", "planning-en-operationele-tools"],
    sources: [PYTHON, SUPPORT],
    body: `Statistiek in Excel is niet nieuw. Functies als AVERAGE, STDEV, CORREL en LINEST bestaan al decennia. De invoegtoepassing **Analysis ToolPak** biedt regressie, variantieanalyse en histogrammen. En sinds Excel 2016 bestaat **FORECAST.ETS** voor prognoses met seizoenspatronen. Met de preview van Python in Excel in 2023 werd het arsenaal flink uitgebreid.

## Wat Excel zelf al kan

- **Beschrijvende statistiek**: gemiddelde, mediaan, spreiding, percentielen.
- **Correlatie en regressie**: met CORREL, SLOPE, INTERCEPT en LINEST, of de ToolPak.
- **Prognoses**: FORECAST.LINEAR en FORECAST.ETS, en het Prognoseblad.
- **Hypothesetoetsen**: T.TEST, CHISQ.TEST en verwante functies.

Voor veel bedrijfstoepassingen is dat voldoende.

## Wat Python toevoegt

- **Meer modellen**: tijdreeksmodellen met uitgebreidere instellingen, logistische regressie, clustering.
- **Betere diagnostiek**: residuen, betrouwbaarheidsintervallen, modelvergelijkingen.
- **Rijkere visualisatie**: verdelingen, boxplots, correlatiematrices.
- **Simulaties** met grote aantallen herhalingen.

## Praktijkvoorbeelden

- **Productie**: welke factoren hangen samen met uitval of afkeur? Een regressieanalyse op machine, ploeg, grondstof en temperatuur. Zie ook ons voorbeeld [productie-efficiency](/voorbeelden/productie-efficiency).
- **Horeca**: hoe sterk hangt de omzet samen met het weer en de dag van de week?
- **Personeel**: welke patronen zijn er in ziekteverzuim?
- **Voorraad**: hoeveel veiligheidsvoorraad is nodig bij een gegeven variatie in vraag en levertijd?

## Wanneer voorzichtig zijn

Statistiek is een vak. Een paar valkuilen:

- **Correlatie is geen oorzaak.** Dat omzet en temperatuur samenhangen, betekent niet dat het een het ander veroorzaakt.
- **Te weinig gegevens.** Een seizoenspatroon schatten op basis van anderhalf jaar is wankel.
- **Overfitting.** Een model dat de historie perfect verklaart, voorspelt de toekomst vaak slecht.
- **Onzekerheid verbergen.** Een prognose zonder bandbreedte suggereert een zekerheid die er niet is.

## Terugblik

Excel is een prima plek voor praktische statistiek in bedrijven. Voor beslissingen met grote gevolgen is een toetsing door iemand met statistische kennis verstandig. Bij [planning en operationele tools](/diensten/planning-en-operationele-tools) gebruiken we statistiek waar het de planning verbetert, en maken we de onzekerheid zichtbaar.`,
    practice: "Gebruik je prognoses zonder bandbreedte? Voeg een onder- en bovengrens toe, bijvoorbeeld met de betrouwbaarheidsinterval-optie van het Prognoseblad. Het gesprek over de prognose wordt daar direct beter van.",
  },
  {
    number: 67, slug: "waarom-menselijke-controle-bij-ai-berekeningen-essentieel-blijft", subjectYear: 2023, visual: "shield", status: "PUBLISHED",
    title: "Waarom menselijke controle bij AI-berekeningen essentieel blijft",
    summary: "AI kan formules voorstellen, analyses maken en conclusies trekken. Maar het kan ook overtuigend fout zijn. Waarom controle door een mens met kennis van het vak onmisbaar blijft.",
    topics: ["ai-en-copilot", "modelontwerp", "veiligheid"], serviceLinks: ["excel-controleren-en-herstellen"],
    sources: [COPILOT],
    body: `Met de komst van AI-assistenten in 2023 ontstond een nieuwe verleiding: de AI vragen een formule te schrijven of een analyse te maken, en het resultaat overnemen. Soms gaat dat goed. Soms niet. En het lastige is dat een fout antwoord er net zo overtuigend uitziet als een goed antwoord.

## Hoe AI fouten maakt

**Verkeerde aannames over de gegevens.** De AI ziet een kolom "Bedrag" en neemt aan dat het om omzet gaat, terwijl het creditnota's zijn.

**Verkeerde interpretatie van de vraag.** "Omzet dit jaar" kan kalenderjaar of boekjaar betekenen, met of zonder btw.

**Formules die werken, maar niet kloppen.** Een SUMIFS met een verkeerd criterium geeft een getal, geen foutmelding.

**Bedrijfsregels ontbreken.** De AI weet niet dat intercompany-omzet moet worden uitgesloten, of dat een bepaalde klant in twee systemen voorkomt.

**Zelfverzekerde toelichting.** De begeleidende uitleg klinkt logisch, ook als de berekening fout is.

## Waarom dit in finance extra zwaar weegt

Financiële cijfers worden gebruikt voor besluiten, rapportages aan banken en aandeelhouders, belastingaangiften en jaarrekeningen. Een fout heeft gevolgen. Bovendien geldt: wie het rapport ondertekent, is verantwoordelijk, niet de AI.

## Hoe je AI verantwoord inzet

- **Gebruik AI voor voorstellen, niet voor besluiten.** Elke formule of analyse wordt beoordeeld voordat ze in een model of rapport komt.
- **Controleer op een bekend antwoord.** Laat de AI iets berekenen waarvan je de uitkomst al weet, en kijk of het klopt.
- **Begrijp de formule.** Neem geen formule over die je niet kunt uitleggen.
- **Bouw controles in het model.** Aansluitingen en plausibiliteitscontroles vangen fouten op, ongeacht of ze door een mens of een AI zijn gemaakt.
- **Leg vast wat door AI is gemaakt**, zodat een controleur weet waar extra aandacht nodig is.
- **Let op vertrouwelijkheid.** Ga na welke gegevens je met een AI-dienst deelt, en of dat binnen het beleid van je organisatie past.

## De rol van de mens

AI verschuift het werk van maken naar beoordelen. Dat vraagt juist méér kennis: van het vak, van het model en van de gegevens. Een controller die begrijpt hoe een berekening hoort te werken, kan AI goed inzetten. Iemand die dat niet begrijpt, kan een fout niet herkennen.

## Terugblik

Bij [Excel controleren en herstellen](/diensten/excel-controleren-en-herstellen) beoordelen we modellen ongeacht wie of wat de formules heeft geschreven. Lees ook hoe we zelf met AI en jouw gegevens omgaan op de pagina [vertrouwelijkheid](/vertrouwelijkheid).`,
    practice: "Spreek in je team af hoe je omgaat met door AI voorgestelde formules en analyses. Een eenvoudige regel: niets in een rapport of model zonder dat iemand de uitkomst heeft gecontroleerd tegen een onafhankelijke bron.",
  },
  {
    number: 68, slug: "data-voorbereiden-voor-betere-managementinformatie", subjectYear: 2023, visual: "query", status: "PUBLISHED",
    title: "Data voorbereiden voor betere managementinformatie",
    summary: "Goede managementinformatie begint niet bij het dashboard, maar bij de gegevens. Hoe zorg je dat de basis klopt: van bronnen en definities tot mapping en controles.",
    topics: ["data-en-power-query", "rapportage"], serviceLinks: ["dashboards-en-managementrapportages", "vba-power-query-automatisering"],
    sources: [PQDOCS],
    body: `Een veelgehoorde wens: "we willen een mooi dashboard". Maar als je doorvraagt, blijkt het probleem vaak eerder in de keten te zitten. De cijfers komen uit drie systemen die elk een andere definitie van omzet hanteren. Afdelingen heten in het ene systeem anders dan in het andere. En niemand weet precies welke kosten in het rapport zijn meegenomen. In 2023, met de belofte van AI-analyses, werd dit belangrijker dan ooit: AI op slechte gegevens levert snelle, overtuigende, foute antwoorden.

## Vier stappen voor een goede basis

**1. Bronnen in kaart brengen.** Welke systemen leveren gegevens? Boekhouding, CRM, urenregistratie, kassasysteem, planning. Hoe komen de gegevens eruit: export, koppeling, handmatig? Hoe vaak?

**2. Definities vastleggen.** Wat is omzet: gefactureerd of geleverd, met of zonder kortingen? Wat is een actieve klant? Wat telt als productieve uren? Leg dit vast in een begrippenlijst, en zorg dat het model die definities volgt.

**3. Stamgegevens en mapping.** Eén lijst van afdelingen, kostenplaatsen, productgroepen en klanten, met een vaste code. Een mappingtabel vertaalt de codes uit elk bronsysteem naar die vaste lijst.

**4. Controles en volledigheid.** Zijn alle periodes en entiteiten aanwezig? Sluit het totaal aan op de bron? Zijn er regels die niet konden worden gemapt?

## Excel als laag tussen bron en rapport

Voor veel mkb-bedrijven is Excel, met Power Query, de logische plek voor deze voorbereiding:

- **Power Query** haalt de bronnen op en schoont ze op.
- **Mappingtabellen** in het werkboek zijn eenvoudig te beheren door de financiële afdeling.
- **Een gegevenstabel** met één regel per transactie en vaste dimensies vormt de basis voor alle rapportages.
- **Een controleblad** bewaakt de kwaliteit.

Groeit de organisatie, dan kan dezelfde opzet later worden overgezet naar een datawarehouse of Power BI.

## Wat het oplevert

- Rapporten die aansluiten op de administratie.
- Minder discussie over welk getal klopt.
- Snellere maandafsluiting.
- Een solide basis voor AI-analyses.

## Terugblik

Een goed dashboard is het topje van de ijsberg. Bij [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages) besteden we vaak meer tijd aan de gegevensvoorbereiding dan aan het dashboard zelf, en dat is precies waarom het rapport daarna betrouwbaar is.`,
    practice: "Vraag drie collega's wat zij verstaan onder 'omzet' of 'een actieve klant'. Verschillen de antwoorden? Dan is een begrippenlijst de eerste stap naar betere managementinformatie.",
  },
  {
    number: 69, slug: "het-verschil-tussen-een-dashboard-en-een-financieel-model", subjectYear: 2023, visual: "chart", status: "PUBLISHED",
    title: "Het verschil tussen een dashboard en een financieel model",
    summary: "Een dashboard laat zien wat er is gebeurd. Een financieel model rekent door wat er kan gebeuren. Ze worden vaak door elkaar gehaald, met teleurstelling als gevolg.",
    topics: ["rapportage", "finance", "modelontwerp"], serviceLinks: ["dashboards-en-managementrapportages", "financiele-modellen"],
    sources: [SUPPORT],
    body: `"We willen een dashboard waarmee we ook kunnen zien wat er gebeurt als we de prijzen verhogen." Het is een begrijpelijke wens, maar hij combineert twee verschillende dingen. Een **dashboard** en een **financieel model** hebben een ander doel, een andere opbouw en een andere gebruiker.

## Een dashboard

**Doel:** inzicht geven in wat er is gebeurd en hoe het er nu voor staat.

**Gegevens:** realisatie uit bronsystemen, vergeleken met budget, prognose of vorig jaar.

**Kenmerken:**

- Leest gegevens, rekent weinig.
- Moet actueel en betrouwbaar zijn.
- Vaste opbouw, elke periode hetzelfde.
- Gericht op signaleren: waar wijken we af?

**Gebruiker:** management, budgethouders, soms medewerkers.

## Een financieel model

**Doel:** doorrekenen wat er kan gebeuren onder bepaalde aannames.

**Gegevens:** aannames, drivers en historische basis.

**Kenmerken:**

- Rekent veel, met duidelijke logica van aanname naar uitkomst.
- Moet flexibel zijn: scenario's, gevoeligheden.
- Opbouw volgt de bedrijfslogica: volumes, prijzen, kosten, investeringen, financiering.
- Gericht op beslissen: wat als?

**Gebruiker:** controller, CFO, directie, soms bank of investeerder.

## Waarom het verschil ertoe doet

Een dashboard dat ook een model wil zijn, wordt ingewikkeld en traag. Een model dat ook een dashboard wil zijn, mist de actualiteit en de vaste structuur die een rapportage nodig heeft. Beide verliezen hun kracht.

## Hoe ze samenwerken

De beste oplossing is vaak een combinatie, met een duidelijke verbinding:

- Het **dashboard** toont de realisatie en signaleert afwijkingen.
- Het **model** gebruikt de realisatie als startpunt voor de prognose.
- De **prognose** uit het model komt terug in het dashboard als vergelijkingsbasis.

Zo blijft elk instrument doen waar het goed in is.

## Een voorbeeld

Een groothandel wil weten wat een prijsverhoging van vier procent doet. Het **dashboard** laat de huidige marge per productgroep zien. Het **model** rekent door wat er gebeurt met omzet, marge en kasstroom bij verschillende aannames over het volume-effect. De directie besluit, en de nieuwe prognose wordt de vergelijkingsbasis in het dashboard.

## Terugblik

Bij de start van een opdracht vragen we altijd: wil je zien wat er is gebeurd, of doorrekenen wat er kan gebeuren? Het antwoord bepaalt of je een [dashboard](/diensten/dashboards-en-managementrapportages), een [financieel model](/diensten/financiele-modellen) of allebei nodig hebt. Gebruik onze [modelvergelijker](/modelvergelijker) om te zien welk type bij je vraag past.`,
    practice: "Kijk naar je huidige rapportage. Wordt er vooral teruggekeken, of ook vooruit gerekend? Als je in een dashboard aannames aanpast om scenario's te maken, is een apart model waarschijnlijk een betere keuze.",
  },
  {
    number: 70, slug: "excel-als-onderdeel-van-een-bredere-bedrijfsdatastrategie", subjectYear: 2023, visual: "query", status: "PUBLISHED",
    title: "Excel als onderdeel van een bredere bedrijfsdatastrategie",
    summary: "Excel wordt soms gezien als het probleem in een datastrategie: te veel losse bestanden, geen controle. Maar met de juiste rol is Excel een waardevol onderdeel van het geheel.",
    topics: ["data-en-power-query", "modelontwerp"], serviceLinks: ["vba-power-query-automatisering", "doorontwikkeling-en-onderhoud"],
    sources: [PQDOCS, EXCELBLOG],
    body: `In 2023 begonnen veel organisaties, aangemoedigd door de beloftes van AI, na te denken over een **datastrategie**: hoe zorg je dat gegevens betrouwbaar, toegankelijk en bruikbaar zijn? In die gesprekken komt Excel vaak naar voren als probleem. Honderden losse bestanden, geen centrale definities, kopieën van gegevens overal. Toch is de conclusie "weg met Excel" zelden de juiste.

## Waarom Excel blijft

- **Flexibiliteit.** Geen ander gereedschap maakt het zo makkelijk om snel een berekening te maken of een idee door te rekenen.
- **Kennis.** Vrijwel iedereen in een organisatie kan ermee werken.
- **Kosten.** Het is er al, en het werkt.
- **Integratie.** Excel kan gegevens ophalen uit vrijwel elk systeem en levert gegevens aan Power BI en andere tools.

## Waar Excel tekortschiet

- **Als bron van waarheid**: Excel is geen database. Stamgegevens en transacties horen in een systeem met toegangsbeheer en logging.
- **Bij veel gelijktijdige gebruikers** die dezelfde gegevens bewerken.
- **Bij zeer grote volumes**.
- **Bij strikte eisen aan audittrail** en rechten per gebruiker.

## De juiste rol

In een goede datastrategie heeft Excel een duidelijke plek:

**Bronnen** zijn systemen: boekhouding, ERP, CRM, HR. Daar worden gegevens vastgelegd.

**Een centrale laag** brengt gegevens samen en legt definities vast. Voor grotere organisaties is dat een datawarehouse of een Power BI-dataset. Voor kleinere organisaties kan dat een goed opgebouwd Excel-werkboek met Power Query zijn.

**Excel als analyse- en modelleeromgeving** gebruikt die centrale gegevens: voor begrotingen, scenario's, analyses en rapportages waar financials zelf in willen werken.

## Principes

- **Verwijs, kopieer niet.** Excel haalt gegevens op uit de centrale laag, in plaats van een eigen kopie bij te houden.
- **Gedeelde definities.** Dezelfde begrippenlijst voor Excel, Power BI en systemen.
- **Inventariseer bedrijfskritische bestanden.** Welke Excel-modellen zijn essentieel? Die verdienen documentatie, controles en een eigenaar.
- **Laat Excel doen waar het goed in is**, en verplaats wat er niet hoort naar een systeem.

## Terugblik

Een datastrategie zonder Excel is voor de meeste organisaties niet realistisch. Een datastrategie waarin Excel een duidelijke, beheerste rol heeft, wel. Bij [doorontwikkeling en onderhoud](/diensten/doorontwikkeling-en-onderhoud) helpen we bedrijfskritische modellen een stabiele plek te geven in het geheel.`,
    practice: "Maak een lijst van de vijf Excel-bestanden waar je organisatie het meest van afhankelijk is. Heeft elk bestand een eigenaar, documentatie en controles? Dat is het begin van een realistische datastrategie.",
  },
];
