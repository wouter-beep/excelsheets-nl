import type { ArticleContent } from "./types";

const EXCELBLOG = { title: "Microsoft Excel Blog (Tech Community)", url: "https://techcommunity.microsoft.com/category/microsoft365/blog/excelblog" };
const PQDOCS = { title: "Microsoft Learn: Power Query-documentatie", url: "https://learn.microsoft.com/power-query/" };
const SUPPORT = { title: "Microsoft Support: Excel", url: "https://support.microsoft.com/excel" };

export const articles2017: ArticleContent[] = [
  {
    number: 1, slug: "waarom-power-query-belangrijker-werd-voor-bedrijfsrapportages", subjectYear: 2017, visual: "query", status: "PUBLISHED",
    title: "Waarom Power Query steeds belangrijker werd voor bedrijfsrapportages",
    summary: "Sinds Excel 2016 zit Power Query standaard in Excel onder de naam Ophalen en transformeren. In 2017 werd duidelijk wat dat betekende: rapportages die zichzelf vullen in plaats van kopiëren en plakken.",
    topics: ["data-en-power-query", "rapportage"], serviceLinks: ["vba-power-query-automatisering", "dashboards-en-managementrapportages"],
    sources: [PQDOCS, EXCELBLOG],
    body: `Power Query begon als losse invoegtoepassing voor Excel 2010 en 2013. Met Excel 2016 werd het onderdeel van Excel zelf, op het tabblad Gegevens onder de naam **Ophalen en transformeren**. Rond 2017 was die versie in veel organisaties uitgerold, en daarmee kwam een gereedschap binnen bereik dat voorheen vooral bij BI-specialisten lag.

## Van handwerk naar vastgelegde stappen

De klassieke maandrapportage begint met een export uit het boekhoudpakket. Die export wordt geopend, kolommen worden verwijderd, codes worden omgezet en het resultaat wordt in een rapportagebestand geplakt. Elke maand opnieuw, en elke keer met kans op een verschoven kolom of een vergeten regel.

Power Query legt die stappen vast. Je beschrijft één keer hoe de gegevens moeten worden opgeschoond: welke kolommen je nodig hebt, hoe datums moeten worden gelezen, welke grootboekrekening bij welke rapportageregel hoort. De volgende maand vervang je alleen het bronbestand en klik je op **Vernieuwen**.

## Wat het oplevert

- **Herhaalbaarheid.** Dezelfde stappen leveren elke maand hetzelfde resultaat, ongeacht wie de rapportage maakt.
- **Herleidbaarheid.** In de lijst met toegepaste stappen zie je precies wat er met de gegevens is gebeurd.
- **Meerdere bronnen.** Een export uit de boekhouding, een urenoverzicht en een budgetbestand laten zich samenvoegen tot één tabel.
- **Minder fouten.** Het grootste risico in spreadsheets, handmatig kopiëren, verdwijnt grotendeels.

## Waar je op moet letten

Power Query is geen vervanging voor goede rekenlogica. Het is het voorportaal: gegevens ophalen, opschonen en vormgeven. De berekeningen zelf horen in heldere formules of een datamodel. Ook is het verstandig de query's logische namen te geven en bronpaden niet hard te coderen in een persoonlijke map, zodat collega's het bestand kunnen verversen.

Een tweede aandachtspunt is de Excel-versie. De mogelijkheden van Power Query zijn het meest compleet in Excel voor Windows. Wie met verschillende versies werkt, moet daar bij het ontwerp rekening mee houden.

## Terugkijkend

Wat in 2017 nog als specialistische functie voelde, is inmiddels de basis van vrijwel elke [geautomatiseerde rapportage](/diensten/vba-power-query-automatisering) die we bouwen. Het is het verschil tussen een bestand dat je elke maand opnieuw maakt en een bestand dat je elke maand ververst.`,
    practice: "Besteed je elke maand uren aan het samenvoegen van exports? Dan is de kans groot dat Power Query dat grotendeels kan overnemen. Begin met één terugkerende export en leg de opschoonstappen vast. Zie ook het [managementdashboard](/voorbeelden/managementdashboard) als voorbeeld van een rapportage die op deze manier wordt gevoed.",
  },
  {
    number: 2, slug: "van-losse-spreadsheets-naar-gestructureerde-datamodellen", subjectYear: 2017, visual: "grid", status: "PUBLISHED",
    title: "De overgang van losse spreadsheets naar gestructureerde datamodellen",
    summary: "Steeds meer organisaties ontdekten dat het probleem niet Excel was, maar de manier waarop bestanden waren opgebouwd. Een terugblik op de verschuiving naar tabellen, relaties en één bron van waarheid.",
    topics: ["modelontwerp", "data-en-power-query"], serviceLinks: ["excel-bestand-verbeteren", "excel-op-maat-laten-maken"],
    sources: [SUPPORT, PQDOCS],
    body: `Veel bedrijfsspreadsheets zijn niet ontworpen, maar gegroeid. Een tabblad per maand, een kopie per afdeling, een samenvattingsblad met verwijzingen naar al die kopieën. Het werkt, tot er een maand wordt toegevoegd, een kolom verschuift of iemand een kopie van een kopie bewerkt.

## Wat er rond 2017 veranderde

Excel had al langer de functie **Opmaken als tabel**, maar met Power Query en Power Pivot als vast onderdeel van Excel 2016 werd het denken in tabellen en relaties praktisch toepasbaar. In plaats van twaalf maandtabbladen maak je één tabel met een kolom *Maand*. In plaats van gegevens naar elkaar te kopiëren, leg je relaties tussen tabellen, zoals tussen transacties en een grootboekschema.

## De kenmerken van een gestructureerd model

- **Eén plek per gegeven.** Een tarief, een grootboekmapping of een budget staat precies één keer in het model.
- **Lange tabellen in plaats van brede.** Elke regel is één gebeurtenis, met kolommen voor datum, afdeling, rekening en bedrag. Dat is makkelijker te filteren en uit te breiden.
- **Scheiding van invoer, berekening en uitkomst.** Wie het rapport leest, hoeft niet te weten hoe het is berekend. Wie het model onderhoudt, weet precies waar iets staat.
- **Tabellen met namen.** Een formule die verwijst naar *Transacties[Bedrag]* is begrijpelijker en groeit automatisch mee.

## Waarom het lastig is om over te stappen

Een bestaand bestand omzetten is meer dan een technische klus. Gebruikers zijn gewend aan hun tabbladen en weten precies waar ze moeten klikken. Daarom werkt een geleidelijke aanpak vaak beter: eerst de brondata structureren, dan de berekeningen, en pas daarna de rapportage vernieuwen. De uitkomsten blijven gedurende de overgang vergelijkbaar met het oude bestand, zodat gebruikers vertrouwen houden.

## Wat het oplevert

Een gestructureerd model is minder spectaculair dan een dashboard, maar het is de reden dat dat dashboard over twee jaar nog klopt. Een extra afdeling of een nieuw boekjaar is een paar regels extra, geen nieuw bestand. Fouten worden zichtbaar in controles in plaats van verborgen in een vergeten tabblad.

Wil je weten of jouw bestand toe is aan zo'n herstructurering, bekijk dan wat we doen bij het [verbeteren van bestaande Excel-bestanden](/diensten/excel-bestand-verbeteren).`,
    practice: "Tel in je belangrijkste bestand hoeveel tabbladen dezelfde opbouw hebben. Zijn het er meer dan drie, dan is het waarschijnlijk de moeite waard om ze samen te voegen tot één tabel met een extra kolom. Dat maakt het bestand kleiner, sneller en makkelijker te controleren.",
  },
  {
    number: 3, slug: "wat-power-pivot-betekent-voor-grote-datasets", subjectYear: 2017, visual: "grid", status: "PUBLISHED",
    title: "Wat Power Pivot betekent voor grote datasets",
    summary: "Power Pivot brengt een kolomgeoriënteerd datamodel naar Excel. Daarmee analyseer je miljoenen regels zonder het werkblad te belasten. Wat kan het, en wanneer gebruik je het?",
    topics: ["data-en-power-query", "rapportage"], serviceLinks: ["dashboards-en-managementrapportages", "financiele-modellen"],
    sources: [{ title: "Microsoft Support: Power Pivot – krachtige gegevensanalyse en gegevensmodellering in Excel", url: "https://support.microsoft.com/excel" }, EXCELBLOG],
    body: `Een werkblad in Excel heeft ruim een miljoen rijen. Dat klinkt als veel, maar een jaar aan orderregels of kassabonnen haalt die grens sneller dan je denkt. En lang voordat die grens bereikt is, worden formules als SUMIFS over honderdduizenden rijen traag.

## Het datamodel achter Excel

Power Pivot werkt met het **datamodel**: een database-achtige opslag binnen het Excel-bestand. Gegevens worden daarin per kolom gecomprimeerd opgeslagen, waardoor grote tabellen weinig ruimte innemen en snel te doorzoeken zijn. Je ziet de gegevens niet in een werkblad, maar gebruikt ze via draaitabellen en draaigrafieken.

Het datamodel kent **relaties** tussen tabellen. Een tabel met verkopen koppel je aan een tabel met producten en een kalendertabel. Een draaitabel kan dan omzet per productgroep per kwartaal tonen zonder dat je eerst kolommen hoeft op te zoeken en toe te voegen.

## Metingen in DAX

Berekeningen in het datamodel schrijf je als **metingen** in DAX, de formuletaal die ook in Power BI wordt gebruikt. Een meting zoals *Brutomarge %* wordt één keer gedefinieerd en werkt vervolgens in elke draaitabel, per product, per klant of per maand. Dat voorkomt dat dezelfde berekening op tien plekken net iets anders wordt gemaakt.

## Wanneer gebruik je het?

- Bij **grote transactietabellen**, zoals orderregels, boekingen of urenregistraties.
- Als je **meerdere tabellen** wilt combineren zonder ze eerst samen te voegen.
- Als dezelfde **kengetallen** in veel verschillende rapporten terugkomen.

Minder geschikt is Power Pivot voor modellen waarin gebruikers zelf getallen invoeren en direct de doorwerking willen zien, zoals een begroting of een investeringsberekening. Daar zijn gewone formules transparanter.

## Beschikbaarheid

Power Pivot is niet in elke Excel-editie even volledig beschikbaar geweest; vooral in oudere versies hing het af van de licentie. Controleer dus vooraf welke versie de gebruikers van een model hebben. Het datamodel vormde ook de brug naar Power BI: wie in Excel met Power Pivot werkt, kan een groot deel van die kennis hergebruiken.

Voor [dashboards en managementrapportages](/diensten/dashboards-en-managementrapportages) met veel data is het datamodel vaak de beste basis.`,
    practice: "Heb je een draaitabel op een tabel die elke maand duizenden regels groeit, en wordt het bestand steeds trager? Dan is het datamodel waarschijnlijk de oplossing. Laad de gegevens via Power Query rechtstreeks in het datamodel in plaats van in een werkblad.",
  },
  {
    number: 4, slug: "goede-managementrapportage-begint-bij-goede-brongegevens", subjectYear: 2017, visual: "chart", status: "PUBLISHED",
    title: "Een goede managementrapportage begint bij goede brongegevens",
    summary: "Een dashboard is zo betrouwbaar als de gegevens eronder. Waarom de meeste tijd in een goede rapportage niet in de grafieken gaat zitten, maar in mapping, definities en controles.",
    topics: ["rapportage", "modelontwerp"], serviceLinks: ["dashboards-en-managementrapportages", "jaarrekening-en-consolidatiemodellen"],
    sources: [PQDOCS],
    body: `Wie aan een managementrapportage denkt, denkt aan grafieken, kleuren en kengetallen. Maar wie er ooit een heeft gebouwd, weet dat het moeilijkste deel onzichtbaar is: zorgen dat de cijfers kloppen en dat iedereen hetzelfde bedoelt met *omzet*.

## Drie vragen vóór de eerste grafiek

**Waar komen de gegevens vandaan?** Een export uit het boekhoudpakket, een ERP-systeem, een urenregistratie of een handmatig bijgehouden lijst. Elke bron heeft zijn eigen eigenaardigheden: datums als tekst, negatieve bedragen als credit, afdelingen die halverwege het jaar zijn hernoemd.

**Hoe vertaal je bronregels naar rapportageregels?** Een grootboekschema heeft vaak honderden rekeningen; een managementrapportage een paar tientallen regels. De **mapping** daartussen is de kern van de rapportage. Leg die vast in een aparte tabel, niet verstopt in formules.

**Hoe weet je dat het klopt?** Een rapportage zonder aansluiting met de proefbalans is een mening, geen rapportage. Bouw controles in: is het totaal van de rapportage gelijk aan het totaal van de bron? Zijn er rekeningen die nergens naartoe zijn gemapt?

## Definities zijn afspraken

*Brutomarge*, *EBITDA* of *productieve uren*: begrippen die in elk bedrijf net iets anders worden ingevuld. Schrijf de definitie op en verwerk hem op één plek in het model. Zo voorkom je dat de controller en de directeur over verschillende getallen praten.

## Wat dit betekent voor de opbouw

Een goede rapportage heeft een duidelijke lagenstructuur:

- **Bron**: ruwe gegevens, onveranderd ingelezen.
- **Mapping en verrijking**: rekeningen naar rapportageregels, codes naar namen.
- **Berekening**: kengetallen, vergelijking met budget en vorig jaar.
- **Presentatie**: het dashboard dat de lezer ziet.
- **Controle**: aansluitingen en signaleringen.

Het voordeel is dat elke laag apart te controleren en aan te passen is. Een nieuwe grootboekrekening vraagt één regel in de mapping, niet een aanpassing in tien formules.

## Terugblik

Rond 2017 werd deze werkwijze in Excel goed uitvoerbaar dankzij Power Query. Het principe is ouder en blijft overeind, ook nu AI-assistenten grafieken voor je kunnen maken: een assistent kan een grafiek tekenen, maar niet beslissen welke rekening onder welke kostensoort hoort. In het [managementdashboard](/voorbeelden/managementdashboard) zie je hoe brondata, mapping en controles samenkomen.`,
    practice: "Controleer of je huidige rapportage een aansluiting met de proefbalans heeft. Zo niet, voeg dan één controleregel toe: totaal rapportage min totaal bron. Staat daar geen nul, dan weet je dat er iets mist, en dat is waardevoller dan elke grafiek.",
  },
  {
    number: 5, slug: "excel-als-alternatief-voor-handmatige-consolidaties", subjectYear: 2017, visual: "grid", status: "PUBLISHED",
    title: "Excel als alternatief voor handmatige consolidaties",
    summary: "Groepen met meerdere entiteiten voegen hun cijfers vaak handmatig samen. Met een vast aanleverformat, Power Query en eliminatieregels wordt consolidatie in Excel een herhaalbaar proces.",
    topics: ["finance", "data-en-power-query"], serviceLinks: ["jaarrekening-en-consolidatiemodellen"],
    sources: [PQDOCS, SUPPORT],
    body: `In middelgrote groepen is consolidatie vaak een klus voor één persoon met veel geduld. De werkmaatschappijen leveren hun cijfers aan, elk in een net iets ander format, en de groepscontroller zet ze naast elkaar, telt ze op en zoekt de onderlinge posities bij elkaar. Specialistische consolidatiesoftware is er, maar voor een handvol entiteiten vaak te zwaar en te duur.

## De bouwstenen van consolidatie in Excel

**Een vast aanleverformat.** Elke entiteit levert haar proefbalans aan in dezelfde structuur: rekeningnummer, omschrijving, saldo, en voor intercompany-posten de tegenpartij. Dat kan een eigen tabblad of een export zijn, zolang de kolommen gelijk zijn.

**Automatisch samenvoegen.** Power Query leest alle aangeleverde bestanden uit een map in en zet ze onder elkaar, met een kolom voor de entiteit. Een nieuwe werkmaatschappij betekent een bestand erbij, geen nieuwe formules.

**Mapping naar een groepsschema.** Werkmaatschappijen gebruiken vaak verschillende rekeningschema's. Een mappingtabel vertaalt elke lokale rekening naar een groepsrekening.

**Eliminaties.** Onderlinge leveringen, vorderingen en schulden moeten tegen elkaar wegvallen. Een intercompany-matrix laat per paar entiteiten zien of de vordering bij de één gelijk is aan de schuld bij de ander.

## Waar het meestal misgaat

Het lastigste deel is zelden de optelling; het zijn de **verschillen**. Een factuur die bij de ene entiteit in december is geboekt en bij de andere in januari. Een koersverschil. Een vergeten doorbelasting. Een goed model signaleert die verschillen direct en laat zien bij welk paar entiteiten ze zitten, met een drempel voor afrondingsverschillen.

## Grenzen van Excel

Consolidatie in Excel werkt goed voor groepen met een overzichtelijk aantal entiteiten en een eenvoudige structuur. Bij veel valuta's, minderheidsbelangen, complexe deelnemingsstructuren of strenge auditeisen kan specialistische software beter passen. Ook dan blijft Excel vaak in gebruik voor analyse en aansluitingen.

In ons voorbeeld van een [consolidatiewerkboek](/voorbeelden/consolidatie) zie je hoe drie werkmaatschappijen worden samengevoegd en hoe eliminaties en verschillen zichtbaar worden. Lees meer over [jaarrekening- en consolidatiemodellen](/diensten/jaarrekening-en-consolidatiemodellen).`,
    practice: "Vraag bij de volgende afsluiting alle entiteiten om hun intercompany-saldi per tegenpartij in hetzelfde format. Alleen al een overzicht van verschillen per paar entiteiten bespaart vaak een dag zoeken.",
  },
  {
    number: 6, slug: "ontwikkeling-van-online-samenwerken-aan-excel-bestanden", subjectYear: 2017, visual: "collab", status: "PUBLISHED",
    title: "De ontwikkeling van online samenwerken aan Excel-bestanden",
    summary: "In 2017 bracht Microsoft co-authoring naar de desktopversie van Excel voor Office 365-abonnees. Gelijktijdig werken in één bestand werd mogelijk, maar vroeg ook om een ander modelontwerp.",
    topics: ["samenwerken"], serviceLinks: ["excel-op-maat-laten-maken", "planning-en-operationele-tools"],
    sources: [EXCELBLOG, { title: "Microsoft Support: Samenwerken aan Excel-werkmappen met cocreatie", url: "https://support.microsoft.com/excel" }],
    factNote: "Datering co-authoring Excel desktop (Insiders medio 2017, daarna breder uitgerold) eventueel nog nalopen in het Excel Blog-archief.",
    body: `Lang was een Excel-bestand op een netwerkschijf een bestand voor één persoon tegelijk. Wie het als tweede opende, kreeg de melding dat het bestand vergrendeld was en kon kiezen tussen wachten of een alleen-lezenversie. Gedeelde werkmappen bestonden, maar hadden zoveel beperkingen dat ze in de praktijk weinig werden gebruikt.

## Wat er in 2017 veranderde

Excel Online ondersteunde al gelijktijdig bewerken. In 2017 begon Microsoft met het uitrollen van **co-authoring in de desktopversie** van Excel voor Office 365-abonnees, eerst voor deelnemers aan het Insider-programma en daarna breder. Voorwaarde: het bestand staat in OneDrive, OneDrive voor Bedrijven of SharePoint Online. Collega's zien elkaars selectie en wijzigingen verschijnen vrijwel direct. Tegelijk kwam **AutoSave** beschikbaar voor bestanden in de cloud.

## Wat het betekent voor modelontwerp

Gelijktijdig werken klinkt eenvoudig, maar heeft gevolgen voor hoe je een model bouwt:

- **Macro's.** Bestanden met VBA-code kunnen in de desktopversie worden gedeeld, maar macro's werken niet in Excel voor het web. Wie een model voor meerdere gebruikers bouwt, moet daar rekening mee houden.
- **Invoergebieden.** Als vijf mensen tegelijk in één tabblad werken, raken ze elkaar in de weg. Een eigen invoerblad per afdeling of persoon werkt beter.
- **Beveiliging.** Rekenbladen beveiligen tegen per ongeluk overschrijven wordt belangrijker naarmate meer mensen het bestand openen.
- **AutoSave.** Elke wijziging wordt direct opgeslagen. Even iets uitproberen en dan niet opslaan, werkt niet meer. Versiegeschiedenis in OneDrive of SharePoint is dan je vangnet.

## Samenwerken is een proces

De technologie lost het vergrendelingsprobleem op, maar niet de vraag wie wat mag wijzigen. Goede afspraken blijven nodig: wie levert wanneer welke gegevens aan, wie keurt goed, wanneer wordt een versie bevroren voor rapportage? Een model dat dat proces ondersteunt, met duidelijke invoerblokken en controles per afdeling, maakt samenwerken een stuk prettiger.

Voor [planningstools](/diensten/planning-en-operationele-tools) en begrotingen waarin meerdere afdelingen tegelijk werken, is dit inmiddels een standaardvraag bij het ontwerp.`,
    practice: "Werkt je team nog met bestanden op een netwerkschijf en de melding 'bestand is vergrendeld'? Verhuizen naar SharePoint of OneDrive lost dat op, maar controleer eerst of het bestand macro's gebruikt die in Excel voor het web niet werken.",
  },
  {
    number: 7, slug: "financiele-forecastmodellen-worden-steeds-belangrijker", subjectYear: 2017, visual: "chart", status: "PUBLISHED",
    title: "Financiële forecastmodellen worden steeds belangrijker",
    summary: "Een begroting is na een paar maanden achterhaald. Steeds meer bedrijven vullen hem aan met een forecast: realisatie tot nu toe plus een bijgestelde verwachting. Hoe bouw je dat goed op in Excel?",
    topics: ["finance"], serviceLinks: ["begroting-en-budgettering", "financiele-modellen"],
    sources: [SUPPORT],
    body: `De jaarbegroting wordt meestal in het najaar gemaakt, met de kennis van dat moment. In maart is er een grote klant bijgekomen, in mei is een machine uitgevallen en in september blijken de energiekosten hoger dan verwacht. De begroting zegt dan steeds minder over waar het jaar op uitkomt.

## Begroting en forecast naast elkaar

Een **forecast** geeft antwoord op de vraag: waar komen we dit jaar uit als we alles weten wat we nu weten? Hij bestaat uit twee delen: de **realisatie** tot en met de afgesloten maand, en een **prognose** voor de resterende maanden. De begroting blijft bestaan als referentie: daar heb je afspraken over gemaakt en daar rapporteer je afwijkingen tegen.

Bij een **rolling forecast** kijk je steeds een vaste periode vooruit, bijvoorbeeld twaalf maanden, ongeacht waar het boekjaar eindigt.

## Hoe je een forecast opbouwt in Excel

- **Eén tabel voor alle scenario's.** Realisatie, budget en forecast als kolom *Scenario* in dezelfde tabel, niet als drie losse bestanden.
- **Een peilmaand.** Eén cel bepaalt tot welke maand realisatie geldt. Alle formules gebruiken die cel, zodat je de forecast elke maand met één wijziging doorschuift.
- **Drivers in plaats van bedragen.** Prognoseer omzet op basis van aantallen en prijzen, inkoop als percentage van omzet, personeelskosten op basis van fte's en loonindexatie. Dan beweegt het model logisch mee als een aanname verandert.
- **Duidelijke vergelijkingen.** Forecast tegenover budget en tegenover vorig jaar, met de belangrijkste afwijkingen bovenaan.

## Valkuilen

De grootste valkuil is een forecast die vooral de begroting herhaalt voor de resterende maanden. Dan lijkt alles op schema tot het laatste kwartaal. Een tweede valkuil is te veel detail: een forecast op honderd grootboekrekeningen wordt zelden serieus bijgewerkt. Kies het detailniveau waarop je daadwerkelijk kunt sturen.

## Terugblik

In 2017 had Excel nog geen dynamische matrices of LET, maar de principes waren hetzelfde. Moderne functies maken de formules korter en overzichtelijker; de opbouw met scenario's, een peilmaand en drivers blijft de kern. Bekijk het voorbeeld van een [begroting met rolling forecast](/voorbeelden/begroting-rolling-forecast).`,
    practice: "Heb je alleen een begroting? Voeg dan één kolom toe: verwachte jaaruitkomst, gebaseerd op realisatie tot nu toe plus een eerlijke inschatting voor de rest van het jaar. Alleen al die kolom verandert het gesprek over de cijfers.",
  },
  {
    number: 8, slug: "waarom-datavalidatie-essentieel-is", subjectYear: 2017, visual: "shield", status: "PUBLISHED",
    title: "Waarom datavalidatie essentieel is in professionele Excel-modellen",
    summary: "Het goedkoopste moment om een fout te voorkomen, is bij de invoer. Datavalidatie is een van de oudste functies van Excel en nog altijd een van de meest onderschatte.",
    topics: ["modelontwerp"], serviceLinks: ["excel-op-maat-laten-maken", "excel-controleren-en-herstellen"],
    sources: [{ title: "Microsoft Support: Gegevensvalidatie toepassen op cellen", url: "https://support.microsoft.com/excel" }],
    body: `Een model rekent precies uit wat je erin stopt. Een bedrag ingevoerd als tekst, een afdelingsnaam met een extra spatie of een datum in het verkeerde formaat: het model geeft een uitkomst, maar niet de juiste. En vaak merk je het pas als iemand vraagt waarom de totalen niet kloppen.

## Wat datavalidatie doet

Met **gegevensvalidatie** bepaal je welke invoer een cel accepteert. De bekendste toepassing is de keuzelijst: een cel waarin je alleen een afdeling uit een vaste lijst kunt kiezen. Maar er is meer mogelijk:

- **Getallen binnen grenzen**, zoals een percentage tussen 0 en 100.
- **Datums binnen een periode**, zoals alleen datums in het huidige boekjaar.
- **Tekstlengte**, bijvoorbeeld voor codes met een vast aantal tekens.
- **Aangepaste regels** met een formule, zoals: dit veld is verplicht als in de vorige kolom *Ja* is gekozen.

Bij elke regel kun je een **invoerbericht** tonen dat uitlegt wat er verwacht wordt, en een **foutmelding** die zegt wat er mis is.

## Keuzelijsten op basis van tabellen

Een keuzelijst die verwijst naar een vaste lijst cellen, moet worden aangepast als er een afdeling bijkomt. Laat de lijst daarom verwijzen naar een tabel. Een nieuwe regel in de tabel verschijnt dan automatisch in de keuzelijst. Met moderne functies kun je ook **afhankelijke keuzelijsten** maken: eerst een afdeling kiezen, daarna alleen de kostenplaatsen van die afdeling.

## Validatie is geen beveiliging

Gegevensvalidatie voorkomt tikfouten, maar is geen waterdichte beveiliging. Wie een waarde plakt, omzeilt de controle in veel gevallen. Combineer validatie daarom met:

- **Vaste stijlen voor invoercellen**, zodat duidelijk is waar je iets mag invullen.
- **Beveiligde rekenbladen**, zodat formules niet per ongeluk worden overschreven.
- **Controles in het model** die alsnog signaleren als er een ongeldige waarde staat, bijvoorbeeld een kostenplaats die niet in de stamtabel voorkomt.

## Klein detail, groot effect

Datavalidatie is in een paar minuten ingesteld en voorkomt uren zoeken. In elk model dat we bouwen, is het een standaardonderdeel van de invoerbladen, net als de [controles](/kwaliteit) die achteraf nog eens nakijken of alles klopt.`,
    practice: "Zoek in je belangrijkste invoerblad de kolom waar het vaakst iets misgaat, meestal een afdeling, kostenplaats of productcode. Maak daar een keuzelijst van die naar een tabel verwijst. Vijf minuten werk, en een hele categorie fouten verdwijnt.",
  },
  {
    number: 9, slug: "slimme-draaitabellen-voor-omzet-en-margeanalyse", subjectYear: 2017, visual: "chart", status: "PUBLISHED",
    title: "Slimme draaitabellen voor omzet- en margeanalyse",
    summary: "Draaitabellen zijn er al decennia, maar met tabellen als bron, slicers, tijdlijnen en het datamodel werden ze een volwaardig analyse-instrument. Zo haal je er meer uit voor omzet en marge.",
    topics: ["rapportage"], serviceLinks: ["dashboards-en-managementrapportages"],
    sources: [{ title: "Microsoft Support: Een draaitabel maken om werkbladgegevens te analyseren", url: "https://support.microsoft.com/excel" }],
    body: `Bijna iedere Excel-gebruiker heeft weleens een draaitabel gemaakt. Minder mensen gebruiken de mogelijkheden die draaitabellen in de loop der jaren hebben gekregen. Voor omzet- en margeanalyses zijn juist die extra's waardevol.

## Begin met een goede bron

Een draaitabel is zo goed als de tabel eronder. Gebruik als bron een **Excel-tabel** (of het datamodel), niet een vast bereik. Dan worden nieuwe regels automatisch meegenomen bij het vernieuwen. Zorg dat elke regel één transactie is, met kolommen voor datum, klant, product, aantal, omzet en kostprijs.

## Marge berekenen op de juiste manier

Een veelgemaakte fout: de margepercentages per regel optellen of middelen. Het margepercentage van een groep is niet het gemiddelde van de percentages, maar de **totale marge gedeeld door de totale omzet**. In een draaitabel los je dat op met een **berekend veld** (marge = omzet − kostprijs, en margepercentage = marge / omzet), of beter nog met een meting in het datamodel.

## Slicers en tijdlijnen

**Slicers** zijn knoppen waarmee je filtert op bijvoorbeeld vestiging of productgroep. **Tijdlijnen** doen hetzelfde voor datums. Eén slicer kan meerdere draaitabellen tegelijk filteren, waardoor je met een paar draaitabellen en grafieken een eenvoudig interactief overzicht bouwt.

## Analyses die het verschil maken

- **Omzet en marge per klant**, gesorteerd op marge in plaats van omzet. De grootste klant is niet altijd de meest winstgevende.
- **Productmix**: welk aandeel van de omzet komt uit producten met een lage marge?
- **Prijs- en volume-effect**: is de omzet gestegen door meer verkopen of door hogere prijzen?
- **Vergelijking met vorig jaar**, via de optie *Waarden weergeven als* verschil of percentage ten opzichte van een vorige periode.

## Wanneer een draaitabel niet genoeg is

Draaitabellen zijn ideaal om te verkennen. Voor een vaste maandrapportage met een strakke opmaak, vaste regels en commentaar zijn formules op basis van dezelfde brontabel vaak beter beheersbaar. Moderne functies zoals GROUPBY en PIVOTBY, die Microsoft later introduceerde, maken dat onderscheid kleiner.

Hoe een margeanalyse eruit kan zien voor een bedrijf met meerdere vestigingen, zie je in de [horeca-omzetanalyse](/voorbeelden/horeca-omzetanalyse).`,
    practice: "Maak een draaitabel van je verkopen per klant en zet zowel omzet als marge erin. Sorteer op marge. De volgorde is bijna altijd anders dan je verwacht, en dat is precies de informatie die je nodig hebt voor prijsgesprekken.",
  },
  {
    number: 10, slug: "voordelen-van-een-gestandaardiseerde-rapportagestructuur", subjectYear: 2017, visual: "grid", status: "PUBLISHED",
    title: "De voordelen van een gestandaardiseerde Excel-rapportagestructuur",
    summary: "Elke afdeling haar eigen format, elke maand een andere layout: het kost tijd en vertrouwen. Een vaste rapportagestructuur maakt cijfers vergelijkbaar en processen voorspelbaar.",
    topics: ["rapportage", "modelontwerp"], serviceLinks: ["dashboards-en-managementrapportages", "doorontwikkeling-en-onderhoud"],
    sources: [SUPPORT],
    body: `In veel organisaties ziet elke rapportage er net iets anders uit. De verkoopafdeling heeft haar eigen overzicht, de operationele afdeling een ander, en de maandrapportage voor de directie wordt elke keer opnieuw samengesteld. Het gevolg: discussies over welk getal klopt en veel tijd die opgaat aan het samenvoegen van overzichten.

## Wat standaardiseren inhoudt

Een gestandaardiseerde rapportagestructuur betekent niet dat alles er hetzelfde uit moet zien. Het betekent dat een paar dingen vastliggen:

- **Een vaste regelindeling**, zoals omzet, brutomarge, personeelskosten, overige kosten en EBITDA, met heldere definities.
- **Vaste vergelijkingen**: realisatie, budget, vorig jaar en forecast, altijd in dezelfde volgorde.
- **Vaste periodes**: maand, jaar tot nu toe en jaarverwachting.
- **Vaste plaatsen voor toelichting**, zodat afwijkingen worden uitgelegd en niet alleen getoond.

## De voordelen

**Vergelijkbaarheid.** Als elke afdeling dezelfde structuur gebruikt, kun je ze naast elkaar zetten en optellen tot een totaal zonder handmatige vertaalslag.

**Snelheid.** Een vaste structuur kan worden geautomatiseerd. De gegevens worden elke maand op dezelfde manier ingelezen en gepresenteerd.

**Vertrouwen.** Lezers weten waar ze moeten kijken. Na een paar maanden zien ze in één oogopslag of er iets bijzonders is.

**Overdraagbaarheid.** Een nieuwe controller of een vervanger tijdens de vakantie kan de rapportage maken zonder het wiel opnieuw uit te vinden.

## Hoe je het in Excel inricht

Leg de rapportagestructuur vast in een **stamtabel**: elke rapportageregel met code, omschrijving, volgorde en het type (omzet, kosten, subtotaal). De mapping van grootboekrekeningen verwijst naar die codes. De rapportage zelf wordt opgebouwd uit formules die per regelcode optellen. Een nieuwe regel of een gewijzigde volgorde pas je aan in de stamtabel, niet in tien rapporten.

## Ruimte voor maatwerk

Standaardiseren betekent niet dat er geen ruimte is voor specifieke analyses. De vaste structuur vormt de basis; afdelingsspecifieke analyses bouw je eromheen, op dezelfde gegevens. Zo blijft het totaalbeeld consistent.

Een vaste structuur is ook de basis voor [doorontwikkeling en onderhoud](/diensten/doorontwikkeling-en-onderhoud): als de structuur helder is, kun je het model jarenlang laten meegroeien.`,
    practice: "Leg de rapportages van twee afdelingen naast elkaar en noteer de verschillen in regels, definities en volgorde. Die lijst is het begin van een gezamenlijke structuur en vaak een eye-opener voor beide afdelingen.",
  },
];
