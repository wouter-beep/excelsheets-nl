/**
 * Dienstenpagina's — brontekst. Wordt bij `npm run db:seed` in de database gezet
 * en is daarna aan te passen via beheer > Diensten.
 */
export type ServiceContent = {
  slug: string;
  navTitle: string;
  title: string;
  h1: string;
  lead: string;
  problemTitle: string;
  problem: string;
  deliverables: { title: string; text: string }[];
  example: { title: string; text: string; bullets: string[] };
  benefits: { title: string; text: string }[];
  approach: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  visual: string;
  relatedModels: string[];
  seoTitle: string;
  metaDescription: string;
};

export const services: ServiceContent[] = [
  {
    slug: "excel-op-maat-laten-maken",
    navTitle: "Excel op maat",
    title: "Excel op maat laten maken",
    h1: "Excel op maat laten maken, precies zoals jouw bedrijf werkt",
    lead:
      "Je weet wat je wilt zien, berekenen of plannen, maar het bestand bestaat nog niet. Wij vertalen jouw werkwijze naar een Excel-model dat logisch in elkaar zit, betrouwbaar rekent en prettig werkt voor iedereen die ermee aan de slag gaat.",
    problemTitle: "Een goed idee, maar geen tijd of kennis om het te bouwen",
    problem:
      "Veel ondernemers en afdelingen werken met een verzameling losse lijstjes, een sheet die ooit door een oud-collega is gemaakt of een standaardtemplate dat net niet past. Je verliest tijd aan overtypen en twijfelt of de uitkomsten kloppen. Een maatwerkmodel begint bij jouw proces: welke gegevens heb je, wie vult wat in en welke beslissing wil je er uiteindelijk mee nemen?",
    deliverables: [
      { title: "Een helder opgebouwd werkboek", text: "Gescheiden tabbladen voor invoer, berekeningen en uitkomsten, zodat je altijd weet waar je iets aanpast en waar je het resultaat ziet." },
      { title: "Formules die je kunt volgen", text: "We gebruiken moderne functies waar dat helpt en houden berekeningen herleidbaar. Geen geneste formule van drie regels als het ook leesbaar kan." },
      { title: "Invoer die fouten voorkomt", text: "Keuzelijsten, datavalidatie en duidelijke invoervelden, zodat collega's niet per ongeluk een tekst in een bedragkolom zetten." },
      { title: "Controles en signaleringen", text: "Ingebouwde checks die direct laten zien als een totaal niet aansluit of een verplichte waarde ontbreekt." },
      { title: "Korte handleiding", text: "Een uitlegblad in het bestand zelf: wat doet elk tabblad, wat vul je wanneer in en wat moet je laten staan." },
    ],
    example: {
      title: "Voorbeeld: een offerte- en calculatietool voor een installatiebedrijf",
      text:
        "Een installateur maakt offertes door oude offertes te kopiëren en bedragen aan te passen. Wij bouwen een tool waarin de werkvoorbereider materialen en uren kiest uit actuele lijsten. Het model rekent automatisch toeslagen, marge en btw uit en maakt een nette offertepagina.",
      bullets: [
        "Artikelen en uurtarieven op één beheerd tabblad",
        "Automatische opslag voor algemene kosten, winst en risico",
        "Controle op minimale marge per offerte",
        "Afdrukklare offerte in de eigen huisstijl",
      ],
    },
    benefits: [
      { title: "Minder handwerk", text: "Wat je nu elke week opnieuw doet, doet het model voortaan voor je." },
      { title: "Meer zekerheid", text: "Controles laten zien of de cijfers kloppen voordat je ze deelt." },
      { title: "Overdraagbaar", text: "Een collega kan het bestand overnemen zonder dat jij naast hem hoeft te zitten." },
      { title: "Groeit mee", text: "De structuur is zo opgezet dat een extra vestiging, product of jaar geen nieuw bestand vraagt." },
    ],
    approach: [
      { title: "Kennismaking", text: "Je vertelt wat je wilt bereiken. Een globale omschrijving of een schets op papier is genoeg." },
      { title: "Voorstel", text: "We beschrijven welke tabbladen, invoer en uitkomsten we voor ogen hebben en maken een voorstel." },
      { title: "Bouwen en afstemmen", text: "We bouwen in stappen en laten tussentijds zien hoe het werkt, zodat je kunt bijsturen." },
      { title: "Testen en opleveren", text: "We testen met jouw echte gegevens, lopen het model samen door en leveren het op met uitleg." },
    ],
    faq: [
      { q: "Moet ik zelf een uitgebreide specificatie aanleveren?", a: "Nee. Een korte omschrijving van wat je wilt bereiken is voldoende om te beginnen. De details werken we samen uit in het eerste gesprek." },
      { q: "Werkt het model ook op een Mac of in Excel voor het web?", a: "Dat kan, mits we er vooraf rekening mee houden. Sommige functies, zoals VBA-macro's, werken niet in Excel voor het web. We stemmen de techniek af op de omgeving waarin je werkt." },
      { q: "Kan ik het model zelf aanpassen?", a: "Ja. Je wordt eigenaar van het bestand en we bouwen het zo dat gangbare aanpassingen, zoals een nieuw jaar of een extra product, zonder ons kunnen." },
    ],
    visual: "kostprijsberekening",
    relatedModels: ["kostprijsberekening", "projecten-nacalculatie", "voorraadbeheer"],
    seoTitle: "Excel laten maken op maat | ExcelSheets.nl",
    metaDescription:
      "Excel bestand laten maken dat precies past bij jouw bedrijf? Wij bouwen betrouwbare Excel-modellen, calculatietools en overzichten op maat. Vertel ons wat je nodig hebt.",
  },
  {
    slug: "excel-bestand-verbeteren",
    navTitle: "Excel verbeteren",
    title: "Bestaande Excel-bestanden verbeteren",
    h1: "Je Excel-bestand werkt nog, maar niemand durft er meer aan te komen",
    lead:
      "Bestanden groeien mee met het bedrijf: een extra kolom hier, een tabblad daar, een kopie van vorig jaar. Wij brengen structuur aan zonder dat je opnieuw hoeft te beginnen, en maken het bestand weer snel, overzichtelijk en betrouwbaar.",
    problemTitle: "Herkenbaar: het bestand van iedereen en niemand",
    problem:
      "Er staan verwijzingen naar tabbladen die niet meer bestaan, formules zijn ergens overschreven door vaste waarden en het openen duurt steeds langer. Iedereen werkt eromheen, maar niemand weet nog precies hoe het in elkaar zit. Dat is geen schande: het is wat er gebeurt met een bestand dat intensief wordt gebruikt. Het is wel een risico als er beslissingen op worden gebaseerd.",
    deliverables: [
      { title: "Analyse van het huidige bestand", text: "We brengen in kaart welke tabbladen, formules, koppelingen en macro's er zijn en waar de risico's zitten." },
      { title: "Opgeschoonde structuur", text: "Invoer, berekening en rapportage uit elkaar getrokken, met een logische volgorde van tabbladen." },
      { title: "Betrouwbare formules", text: "Overschreven formules hersteld, harde getallen vervangen door verwijzingen, kwetsbare constructies vervangen." },
      { title: "Betere prestaties", text: "Volatiele functies, overbodige opmaak en onnodig grote bereiken aangepakt, zodat het bestand weer vlot rekent." },
      { title: "Behoud van wat goed is", text: "We gooien niet alles weg. Wat werkt en waar gebruikers aan gewend zijn, blijft herkenbaar." },
    ],
    example: {
      title: "Voorbeeld: een omzetrapportage die elke maand een dag kost",
      text:
        "Een groothandel stelt de maandrapportage samen uit drie exports die met de hand in één tabblad worden geplakt. Er zijn vier versies van het bestand in omloop. Wij vervangen het plakken door een Power Query-import, voegen een controle toe op het aantal regels en totaalbedrag, en maken één rapportage die per maand te filteren is.",
      bullets: [
        "Van handmatig plakken naar één klik op Vernieuwen",
        "Controle: exporttotaal sluit aan op rapportagetotaal",
        "Eén versie met een duidelijke wijzigingslog",
        "Opgeschoonde opmaak: het bestand is een stuk kleiner en sneller",
      ],
    },
    benefits: [
      { title: "Je houdt je bestand", text: "Geen nieuw systeem leren: het blijft Excel, alleen beter." },
      { title: "Zicht op risico's", text: "Je krijgt een overzicht van wat we hebben gevonden en wat we hebben aangepast." },
      { title: "Sneller werken", text: "Een bestand dat vlot opent en rekent, nodigt uit om het goed te gebruiken." },
      { title: "Klaar voor de toekomst", text: "Met een heldere opbouw kan het bestand weer jaren mee." },
    ],
    approach: [
      { title: "Bestand bekijken", text: "Je stuurt het bestand vertrouwelijk toe. We kijken eerst wat het doet en waar het knelt." },
      { title: "Bevindingen", text: "We bespreken wat we zien en stellen voor wat we aanpakken: van een snelle opknapbeurt tot een herbouw." },
      { title: "Verbeteren", text: "We werken in een kopie en vergelijken de uitkomsten met het origineel, zodat er niets ongemerkt verandert." },
      { title: "Overdragen", text: "Je krijgt het verbeterde bestand met een overzicht van de wijzigingen." },
    ],
    faq: [
      { q: "Moet het bestand helemaal opnieuw worden gebouwd?", a: "Meestal niet. Vaak is het voldoende om de structuur op te schonen en de zwakke plekken te herstellen. Soms is herbouwen verstandiger; dat bespreken we vooraf met argumenten." },
      { q: "Kloppen mijn huidige cijfers dan nog?", a: "We vergelijken de uitkomsten van het oude en het nieuwe bestand. Verschillen leggen we uit: soms blijkt het oude bestand een fout te bevatten." },
      { q: "Kan ik het bestand veilig aanleveren?", a: "Ja. Via de Verzoekwijzer upload je bestanden naar een afgeschermde omgeving. Alleen wij kunnen ze inzien en ze worden volgens ons bewaarbeleid verwijderd." },
    ],
    visual: "managementdashboard",
    relatedModels: ["managementdashboard", "horeca-omzetanalyse"],
    seoTitle: "Excel bestand verbeteren of opschonen | ExcelSheets.nl",
    metaDescription:
      "Is je Excel-bestand traag, foutgevoelig of onoverzichtelijk geworden? Wij verbeteren bestaande spreadsheets: betere structuur, betrouwbare formules en snellere prestaties.",
  },
  {
    slug: "financiele-modellen",
    navTitle: "Financiële modellen",
    title: "Financiële modellen ontwikkelen",
    h1: "Financiële modellen die beslissingen onderbouwen, niet alleen getallen tonen",
    lead:
      "Een investering, een overname, een nieuwe vestiging of een prijsverhoging: als er veel geld op het spel staat, wil je weten wat de gevolgen zijn. Wij bouwen financiële modellen met een kloppende samenhang tussen resultaat, balans en kasstroom.",
    problemTitle: "Een spreadsheet is snel gemaakt. Een betrouwbaar model niet.",
    problem:
      "Een financieel model moet meer kunnen dan optellen. Aannames moeten op één plek staan, scenario's moeten doorwerken in alle overzichten en de balans moet altijd sluiten. Als dat niet zo is, valt het model door de mand zodra een bank, investeerder of accountant er kritische vragen over stelt.",
    deliverables: [
      { title: "Aannamesblad", text: "Alle uitgangspunten op één plek, met bron en toelichting, zodat je precies ziet waar de uitkomsten vandaan komen." },
      { title: "Geïntegreerde overzichten", text: "Winst-en-verliesrekening, balans en kasstroomoverzicht die met elkaar verbonden zijn en op elkaar aansluiten." },
      { title: "Scenario's en gevoeligheden", text: "Basis, voorzichtig en optimistisch, plus gevoeligheidstabellen voor de variabelen die er echt toe doen." },
      { title: "Rendementsmaatstaven", text: "Netto contante waarde, interne rentabiliteit, terugverdientijd en dekkingsratio's, correct berekend en uitgelegd." },
      { title: "Controleblad", text: "Automatische checks op balansevenwicht, kasaansluiting en ontbrekende invoer." },
    ],
    example: {
      title: "Voorbeeld: een investeringsbeslissing voor een nieuw distributiecentrum",
      text:
        "Een logistiek bedrijf overweegt een uitbreiding. Het model berekent op basis van investering, verwachte volumes, tarieven en kosten de kasstromen over tien jaar, inclusief financiering en restwaarde. Met een paar schuifjes zie je wat er gebeurt bij lagere volumes of een hogere rente.",
      bullets: [
        "Investering, afschrijving en financiering per jaar",
        "NCW en IRR bij verschillende disconteringsvoeten",
        "Gevoeligheidstabel voor volume en tarief",
        "Grafiek van cumulatieve kasstroom en terugverdienmoment",
      ],
    },
    benefits: [
      { title: "Beter onderbouwd", text: "Je kunt elk getal herleiden tot een aanname en een berekening." },
      { title: "Sneller scenario's", text: "Een andere aanname doorrekenen kost seconden in plaats van een middag." },
      { title: "Sterker in gesprekken", text: "Met een transparant model sta je sterker tegenover financiers en aandeelhouders." },
      { title: "Minder modelrisico", text: "Controles vangen fouten af voordat ze in een presentatie terechtkomen." },
    ],
    approach: [
      { title: "Vraagstuk scherp krijgen", text: "Welke beslissing moet het model ondersteunen en wie gaat het gebruiken?" },
      { title: "Modelarchitectuur", text: "We schetsen de opbouw: aannames, berekeningen, overzichten en controles." },
      { title: "Bouwen en valideren", text: "We bouwen het model en toetsen de uitkomsten aan historische cijfers en eenvoudige controleberekeningen." },
      { title: "Toelichten", text: "We lopen het model met je door, zodat je het zelf kunt uitleggen en gebruiken." },
    ],
    faq: [
      { q: "Is een financieel model hetzelfde als een begroting?", a: "Niet helemaal. Een begroting legt plannen voor een jaar vast. Een financieel model rekent door wat de gevolgen zijn van keuzes en aannames, vaak over meerdere jaren en inclusief balans en kasstroom." },
      { q: "Kunnen jullie ook een bestaand model reviewen?", a: "Ja. We kunnen een model controleren op rekenfouten, logica en consistentie en je een overzicht van bevindingen geven. Een review vervangt geen accountantscontrole." },
      { q: "Rekenen jullie met belastingen?", a: "We kunnen belastingberekeningen modelmatig opnemen op basis van de uitgangspunten die jij of je adviseur aanlevert. Fiscaal advies geven we niet." },
    ],
    visual: "investeringsmodel",
    relatedModels: ["investeringsmodel", "liquiditeitsprognose", "begroting-rolling-forecast"],
    seoTitle: "Financieel model in Excel laten maken | ExcelSheets.nl",
    metaDescription:
      "Een financieel model in Excel met kloppende resultaat-, balans- en kasstroomoverzichten, scenario's en rendementsberekeningen. Gebouwd door financieel en technisch specialisten.",
  },
  {
    slug: "begroting-en-budgettering",
    navTitle: "Begrotingen",
    title: "Budgettering en begroting",
    h1: "Een begroting in Excel die je het hele jaar blijft gebruiken",
    lead:
      "Een begroting is pas waardevol als je er gedurende het jaar op stuurt. Wij bouwen begrotingsmodellen waarin afdelingen hun cijfers aanleveren, realisatie automatisch wordt ingelezen en je met een rolling forecast ziet waar het jaar eindigt.",
    problemTitle: "Begroten in twintig losse bestanden",
    problem:
      "Elke afdeling krijgt een kopie, vult die op eigen wijze in en stuurt hem terug. Daarna begint het samenvoegen, controleren en navragen. Halverwege het jaar ligt de begroting in een la, omdat het te veel werk is om realisatie en prognose ernaast te zetten.",
    deliverables: [
      { title: "Invoersjablonen per afdeling", text: "Eén vaste opzet met keuzelijsten voor grootboekrekeningen en kostenplaatsen, zodat alles dezelfde vorm heeft." },
      { title: "Automatische consolidatie", text: "Afdelingsbegrotingen worden samengevoegd tot een totaalbegroting, zonder knippen en plakken." },
      { title: "Budget versus realisatie", text: "Realisatie uit je boekhouding naast het budget, met afwijkingen per maand en cumulatief." },
      { title: "Rolling forecast", text: "Realisatie tot en met de laatste maand, aangevuld met een actuele prognose voor de rest van het jaar." },
      { title: "Toelichtingsvelden", text: "Ruimte om afwijkingen te verklaren, zodat de rapportage meer vertelt dan alleen cijfers." },
    ],
    example: {
      title: "Voorbeeld: begroting en forecast voor een dienstverlener met vijf afdelingen",
      text:
        "Een dienstverlener begroot per afdeling omzet, personeelskosten en overige kosten. Maandelijks wordt de realisatie uit de boekhouding ingelezen. De controller ziet direct welke afdelingen afwijken en past de verwachting voor de resterende maanden aan.",
      bullets: [
        "Twaalf maanden, vijf afdelingen, vaste grootboekindeling",
        "Brutoresultaat, operationele kosten en EBITDA per maand",
        "Forecast = realisatie t/m peilmaand + prognose",
        "Afwijkingen in kleur boven een in te stellen drempel",
      ],
    },
    benefits: [
      { title: "Sneller begroten", text: "Het begrotingsproces kost minder doorlooptijd en minder correspondentie." },
      { title: "Eén waarheid", text: "Iedereen werkt met dezelfde indeling en dezelfde versie." },
      { title: "Sturen in plaats van terugkijken", text: "Met de forecast zie je tijdig waar je moet bijsturen." },
      { title: "Beter gesprek met budgethouders", text: "Afwijkingen zijn zichtbaar en toegelicht." },
    ],
    approach: [
      { title: "Huidig proces doorlopen", text: "Hoe begroot je nu, wie levert wat aan en waar zit het meeste werk?" },
      { title: "Indeling vastleggen", text: "Grootboekindeling, kostenplaatsen en rapportagestructuur afspreken." },
      { title: "Model bouwen", text: "Invoersjablonen, consolidatie, realisatie-import en rapportages." },
      { title: "Eerste cyclus begeleiden", text: "We helpen bij de eerste begrotingsronde en verfijnen waar nodig." },
    ],
    faq: [
      { q: "Kan de realisatie automatisch uit mijn boekhouding komen?", a: "Vaak wel, bijvoorbeeld via een export die met Power Query wordt ingelezen. Of een directe koppeling mogelijk is, hangt af van je boekhoudpakket en licenties. Dat zoeken we vooraf uit." },
      { q: "Wat is het verschil tussen een begroting en een rolling forecast?", a: "De begroting is je plan aan het begin van het jaar. De rolling forecast is je actuele verwachting: realisatie tot nu toe plus een bijgestelde prognose voor de rest van de periode." },
      { q: "Werkt dit ook voor een kleine organisatie?", a: "Zeker. De opzet schaalt mee: voor een kleine onderneming houden we het model compact." },
    ],
    visual: "begroting-rolling-forecast",
    relatedModels: ["begroting-rolling-forecast", "managementdashboard"],
    seoTitle: "Excel begroting maken met rolling forecast | ExcelSheets.nl",
    metaDescription:
      "Een Excel-begroting die je het hele jaar gebruikt: invoer per afdeling, automatische consolidatie, budget versus realisatie en een rolling forecast. Op maat gebouwd.",
  },
  {
    slug: "dashboards-en-managementrapportages",
    navTitle: "Dashboards",
    title: "Managementrapportages en dashboards",
    h1: "Excel-dashboards die in één oogopslag laten zien hoe je ervoor staat",
    lead:
      "Elke maand dezelfde cijfers kopiëren, bestanden samenvoegen en controleren of alles klopt? Dat kan slimmer. Wij bouwen een rapportage waarmee je in één overzicht ziet hoe je bedrijf ervoor staat, en die zichzelf bijwerkt zodra er nieuwe cijfers zijn.",
    problemTitle: "Veel cijfers, weinig inzicht",
    problem:
      "De rapportage bestaat uit tientallen tabellen die elke maand opnieuw worden gevuld. Het management bladert erdoorheen op zoek naar wat belangrijk is. Een goed dashboard maakt keuzes: welke kengetallen doen ertoe, hoe vergelijk je ze en waar moet je actie op ondernemen?",
    deliverables: [
      { title: "KPI-selectie", text: "Samen bepalen we welke kengetallen echt sturing geven, met heldere definities." },
      { title: "Automatische gegevensaanvoer", text: "Brondata via Power Query of een gestructureerd importblad, zodat verversen één handeling is." },
      { title: "Interactief dashboard", text: "Filters op periode, afdeling of vestiging, met grafieken die meebewegen." },
      { title: "Afwijkingsanalyse", text: "Budget, vorig jaar en forecast naast elkaar, met signaalkleuren voor wat aandacht vraagt." },
      { title: "Afdrukbare rapportage", text: "Een nette maandrapportage die je als PDF kunt delen met directie of aandeelhouders." },
    ],
    example: {
      title: "Voorbeeld: maandrapportage voor een groep met drie werkmaatschappijen",
      text:
        "Een directie wil maandelijks omzet, brutomarge, personeelskosten en EBITDA zien per werkmaatschappij en voor de groep. De gegevens komen uit exports van het boekhoudpakket. Het dashboard ververst met één klik en toont afwijkingen ten opzichte van budget en vorig jaar.",
      bullets: [
        "KPI-tegels met trend en afwijking",
        "Waterval van budget naar realisatie",
        "Filter per maand en per werkmaatschappij",
        "Controle: dashboardtotaal = proefbalanstotaal",
      ],
    },
    benefits: [
      { title: "Uren terug", text: "Het samenstellen van de rapportage gaat van handwerk naar verversen en controleren." },
      { title: "Focus", text: "Het management ziet direct wat aandacht nodig heeft." },
      { title: "Vertrouwen", text: "Aansluitcontroles laten zien dat het dashboard op de boekhouding aansluit." },
      { title: "Vertrouwde omgeving", text: "Het blijft Excel: geen nieuwe licenties of systemen nodig." },
    ],
    approach: [
      { title: "Informatiebehoefte", text: "Welke vragen moet het dashboard beantwoorden en voor wie?" },
      { title: "Databronnen", text: "We bekijken welke exports of koppelingen beschikbaar zijn." },
      { title: "Ontwerp en bouw", text: "We ontwerpen het dashboard, bouwen de datastroom en de visualisaties." },
      { title: "Inregelen", text: "We draaien een of twee maanden mee en schaven bij." },
    ],
    faq: [
      { q: "Is Power BI niet beter dan een Excel-dashboard?", a: "Dat hangt af van de situatie. Power BI is sterk bij grote datavolumes en brede verspreiding. Excel is vaak sneller te realiseren, flexibeler voor financiële rapportages en vertrouwd voor gebruikers. We adviseren eerlijk wat past." },
      { q: "Hoe actueel is het dashboard?", a: "Zo actueel als de brongegevens. Bij een export-werkwijze ververs je wanneer er nieuwe cijfers zijn; bij een koppeling kan dat vaker." },
      { q: "Kunnen meerdere mensen het dashboard bekijken?", a: "Ja, bijvoorbeeld via SharePoint of OneDrive. We houden rekening met wie mag zien en wie mag wijzigen." },
    ],
    visual: "managementdashboard",
    relatedModels: ["managementdashboard", "productie-efficiency", "horeca-omzetanalyse"],
    seoTitle: "Excel dashboard laten maken | Managementrapportage automatiseren",
    metaDescription:
      "Een Excel-dashboard of managementrapportage laten maken die zichzelf bijwerkt? Wij bouwen interactieve dashboards met KPI's, afwijkingsanalyses en automatische data-import.",
  },
  {
    slug: "jaarrekening-en-consolidatiemodellen",
    navTitle: "Jaarrekeningmodellen",
    title: "Jaarrekening- en consolidatiemodellen",
    h1: "Jaarrekening- en consolidatiemodellen met controles die je accountant waardeert",
    lead:
      "Van proefbalans naar balans en winst-en-verliesrekening, met specificaties, mutatieoverzichten en een consolidatie over meerdere werkmaatschappijen. Wij bouwen werkboeken die het samenstellen versnellen en aansluitingen inzichtelijk maken.",
    problemTitle: "Het jaarwerk als jaarlijkse puzzel",
    problem:
      "Elk jaar opnieuw worden grootboekrekeningen handmatig gegroepeerd, specificaties uit verschillende bestanden gehaald en intercompanyposities met de hand weggestreept. Dat kost tijd en het is lastig om achteraf te laten zien hoe een cijfer tot stand is gekomen.",
    deliverables: [
      { title: "Mappingtabel", text: "Grootboekrekeningen eenmalig gekoppeld aan balans- en resultaatposten. Nieuwe rekeningen worden gesignaleerd." },
      { title: "Balans en resultatenrekening", text: "Automatisch opgebouwd uit de proefbalans, met vergelijkende cijfers." },
      { title: "Specificaties en mutatieoverzichten", text: "Verloop van vaste activa, voorzieningen en eigen vermogen, aansluitend op de balans." },
      { title: "Consolidatie", text: "Samenvoegen van werkmaatschappijen met eliminatie van intercompanyposities en -transacties." },
      { title: "Controleblad", text: "Balans in evenwicht, resultaat aansluitend, alle rekeningen gemapt: in één oogopslag groen of rood." },
    ],
    example: {
      title: "Voorbeeld: groepsrapportage voor een holding met drie dochters",
      text:
        "Een holding wil per kwartaal een geconsolideerd overzicht. De proefbalansen van de dochters worden ingelezen, intercompanyrekeningen worden automatisch tegen elkaar weggestreept en verschillen worden gesignaleerd voordat de cijfers worden gerapporteerd.",
      bullets: [
        "Proefbalans per entiteit → uniforme mapping",
        "Eliminatie van intercompany debiteuren/crediteuren",
        "Eliminatie van onderlinge omzet en inkoop",
        "Signalering van niet-aansluitende IC-saldi",
      ],
    },
    benefits: [
      { title: "Snellere afsluiting", text: "Minder handwerk bij maand-, kwartaal- en jaarafsluiting." },
      { title: "Herleidbaar", text: "Elk cijfer is terug te voeren op grootboekrekeningen." },
      { title: "Minder correcties", text: "Controles vangen ontbrekende mappings en verschillen vroeg af." },
      { title: "Beter voorbereid", text: "Een goed gedocumenteerd werkboek maakt het gesprek met je accountant efficiënter." },
    ],
    approach: [
      { title: "Rapportage-eisen", text: "Welke overzichten zijn nodig, in welke indeling en voor wie?" },
      { title: "Mapping opzetten", text: "Samen met jou koppelen we het rekeningschema aan de rapportagestructuur." },
      { title: "Werkboek bouwen", text: "Overzichten, specificaties, consolidatie en controles." },
      { title: "Proefdraaien", text: "We draaien het werkboek op een afgesloten periode en vergelijken met de bestaande cijfers." },
    ],
    faq: [
      { q: "Vervangt dit de accountant of de jaarrekeningsoftware?", a: "Nee. Het werkboek ondersteunt het voorbereiden en analyseren van cijfers. Definitieve verslaggeving moet voldoen aan de toepasselijke wet- en regelgeving en de professionele beoordeling van een deskundige." },
      { q: "Kan het werkboek omgaan met verschillende rekeningschema's?", a: "Ja. Via een mappingtabel per entiteit worden verschillende schema's naar één rapportagestructuur vertaald." },
      { q: "Hoe worden intercompanyverschillen behandeld?", a: "Het model signaleert verschillen tussen onderlinge vorderingen en schulden. Hoe een verschil wordt opgelost, blijft een beslissing van de financiële afdeling." },
    ],
    visual: "jaarrekeningwerkboek",
    relatedModels: ["jaarrekeningwerkboek", "consolidatie"],
    seoTitle: "Jaarrekening- en consolidatiemodel in Excel | ExcelSheets.nl",
    metaDescription:
      "Excel-werkboeken voor jaarrekening en consolidatie: van proefbalans naar balans en resultaat, met mapping, specificaties, eliminaties en automatische controles.",
  },
  {
    slug: "planning-en-operationele-tools",
    navTitle: "Planning",
    title: "Planning en operationele Excel-tools",
    h1: "Excel-planningen op maat voor personeel, productie en projecten",
    lead:
      "Een rooster dat rekening houdt met beschikbaarheid, een capaciteitsplanning die laat zien waar het gaat knellen, of een productieplanning die aansluit op de werkelijkheid op de vloer. Wij bouwen planningstools die passen bij hoe jouw organisatie werkt.",
    problemTitle: "Plannen op gevoel en met kleurtjes",
    problem:
      "Veel planningen bestaan uit een grote tabel met handmatig ingekleurde vakjes. Dat werkt tot er iemand ziek wordt, een order verschuift of iemand vraagt hoeveel uren er deze maand zijn ingepland. Dan begint het tellen, en blijkt dat de planning en de werkelijkheid uit elkaar zijn gegroeid.",
    deliverables: [
      { title: "Planningsoverzicht", text: "Week- en maandweergave met diensten, taken of orders in duidelijke kleuren." },
      { title: "Beschikbaarheid en bezetting", text: "Vergelijking van ingeplande capaciteit met de behoefte, per dag of per week." },
      { title: "Signaleringen", text: "Waarschuwingen bij overschrijding van contracturen, dubbele boekingen of onderbezetting." },
      { title: "Uren en kosten", text: "Automatische berekening van geplande uren en bijbehorende loonkosten." },
      { title: "Eenvoudige invoer", text: "Keuzelijsten en sneltoetsen, zodat plannen snel gaat." },
    ],
    example: {
      title: "Voorbeeld: personeelsplanning voor een zorglocatie",
      text:
        "Een zorglocatie plant vroege, late en nachtdiensten. Het model toont per dag de bezetting tegenover de minimale behoefte, telt de uren per medewerker tegen het contract en berekent de geplande loonkosten per week.",
      bullets: [
        "Dienstcodes met vaste tijden en kleuren",
        "Bezetting versus minimale behoefte per dienst",
        "Signalering bij overschrijding van contracturen",
        "Loonkosten per week, inclusief toeslagen",
      ],
    },
    benefits: [
      { title: "Sneller plannen", text: "Minder puzzelen, meer overzicht." },
      { title: "Minder verrassingen", text: "Knelpunten zie je voordat ze ontstaan." },
      { title: "Grip op kosten", text: "Je weet wat een planning kost voordat je hem publiceert." },
      { title: "Eerlijk verdeeld", text: "Uren en diensten zijn transparant per medewerker." },
    ],
    approach: [
      { title: "Meekijken", text: "Hoe wordt er nu gepland, welke regels gelden en wie gebruikt de planning?" },
      { title: "Regels vastleggen", text: "Diensten, contracturen, minimale bezetting en uitzonderingen." },
      { title: "Bouwen", text: "Planningsweergave, signaleringen en overzichten." },
      { title: "In gebruik nemen", text: "We plannen samen de eerste periode en passen aan waar nodig." },
    ],
    faq: [
      { q: "Wanneer is Excel niet meer geschikt voor planning?", a: "Als veel mensen tegelijk moeten plannen, medewerkers zelf diensten moeten ruilen via een app of als er koppelingen met tijdregistratie nodig zijn, kan een gespecialiseerd planningspakket beter passen. Dat zeggen we dan ook." },
      { q: "Kunnen meerdere planners tegelijk werken?", a: "Via OneDrive of SharePoint kan samen worden gewerkt. Voor complexe planningen maken we afspraken over wie welk deel beheert." },
      { q: "Houdt het model rekening met cao-regels?", a: "We kunnen regels opnemen die jij aanlevert, zoals maximale diensturen of rusttijden. De interpretatie van cao-afspraken blijft jouw verantwoordelijkheid." },
    ],
    visual: "personeelsplanning",
    relatedModels: ["personeelsplanning", "productie-efficiency", "voorraadbeheer"],
    seoTitle: "Excel planning op maat laten maken | ExcelSheets.nl",
    metaDescription:
      "Een Excel-planning op maat voor personeel, capaciteit of productie: met bezetting, beschikbaarheid, signaleringen en kosten. Gebouwd rond jouw werkwijze.",
  },
  {
    slug: "vba-power-query-automatisering",
    navTitle: "Automatisering",
    title: "VBA, Power Query en automatisering",
    h1: "Excel automatiseren met Power Query, Office Scripts en VBA",
    lead:
      "Gegevens importeren, opschonen, samenvoegen en rapporteren: veel terugkerend werk in Excel kan automatisch. Wij kiezen de techniek die past bij jouw omgeving en zorgen dat de automatisering begrijpelijk en onderhoudbaar blijft.",
    problemTitle: "Elke maand dezelfde twintig handelingen",
    problem:
      "Exports downloaden, kolommen verwijderen, datums omzetten, bestanden onder elkaar plakken, draaitabellen verversen. Het kost uren en één vergeten stap levert een fout op. Juist dit soort werk is uitstekend te automatiseren, mits het goed wordt opgezet.",
    deliverables: [
      { title: "Power Query-importen", text: "Gegevens uit bestanden, mappen, databases of webbronnen automatisch ophalen en opschonen." },
      { title: "Datamodellen", text: "Tabellen gekoppeld in Power Pivot voor analyses over grote datasets." },
      { title: "VBA-macro's", text: "Voor taken die echt automatisering in de desktopversie vragen, zoals bestanden genereren of verzenden." },
      { title: "Office Scripts", text: "Automatisering voor Excel voor het web, eventueel in combinatie met Power Automate." },
      { title: "Documentatie", text: "Uitleg van elke stap, zodat de automatisering geen zwarte doos wordt." },
    ],
    example: {
      title: "Voorbeeld: weekrapportage uit vijftig vestigingsbestanden",
      text:
        "Een retailketen ontvangt elke week een bestand per vestiging. Power Query leest de hele map in, controleert of alle vestigingen hebben aangeleverd en zet de gegevens in één tabel. Het dashboard ververst automatisch.",
      bullets: [
        "Map-import met controle op ontbrekende bestanden",
        "Opschonen van datums, getallen en codes",
        "Signaal bij afwijkende kolomindeling",
        "Verversen met één klik",
      ],
    },
    benefits: [
      { title: "Uren per maand terug", text: "Repeterend werk verdwijnt." },
      { title: "Minder fouten", text: "Een automatisering vergeet geen stap." },
      { title: "Schaalbaar", text: "Tien of honderd bestanden: de import werkt hetzelfde." },
      { title: "Toekomstvast", text: "We kiezen moderne technieken waar mogelijk en VBA waar dat de beste keuze is." },
    ],
    approach: [
      { title: "Proces vastleggen", text: "We kijken mee met hoe het nu gaat, stap voor stap." },
      { title: "Techniek kiezen", text: "Power Query, formules, Office Scripts of VBA: wat past bij jouw omgeving?" },
      { title: "Automatiseren", text: "We bouwen de automatisering met foutafhandeling en controles." },
      { title: "Overdragen", text: "Je krijgt uitleg en documentatie, zodat je weet wat er gebeurt." },
    ],
    faq: [
      { q: "Is VBA nog wel van deze tijd?", a: "VBA is nog steeds bruikbaar in Excel voor Windows en Mac, maar werkt niet in Excel voor het web. Veel wat vroeger met VBA moest, kan nu met Power Query of moderne formules. We gebruiken VBA alleen als het de beste oplossing is." },
      { q: "Wat is Power Query precies?", a: "Power Query is de ingebouwde functie in Excel om gegevens op te halen, op te schonen en te combineren. De stappen worden vastgelegd, zodat je ze met één klik kunt herhalen." },
      { q: "Kan Excel gekoppeld worden aan Exact Online of andere software?", a: "Dat is vaak mogelijk, bijvoorbeeld via exports, een API of een connector van een derde partij. Wat haalbaar is, hangt af van het pakket, je abonnement en de beveiligingseisen." },
    ],
    visual: "voorraadbeheer",
    relatedModels: ["voorraadbeheer", "managementdashboard"],
    seoTitle: "Excel automatiseren: Power Query specialist en VBA programmeren",
    metaDescription:
      "Excel automatiseren met Power Query, Office Scripts of VBA. Wij automatiseren imports, opschoning en rapportages, met documentatie en foutafhandeling.",
  },
  {
    slug: "excel-controleren-en-herstellen",
    navTitle: "Controle & herstel",
    title: "Excel-bestanden controleren en herstellen",
    h1: "Excel-bestand controleren of herstellen voordat een fout geld kost",
    lead:
      "Een verkeerd bereik in een SOM-formule, een verwijzing die een rij is verschoven of een vaste waarde waar een formule hoort te staan. Kleine fouten in spreadsheets kunnen grote gevolgen hebben. Wij controleren je bestand systematisch en herstellen wat niet klopt.",
    problemTitle: "Je twijfelt of de uitkomst wel klopt",
    problem:
      "Je hebt een bestand geërfd, er is een uitkomst die je niet kunt verklaren of het bestand geeft foutmeldingen. Misschien moet er binnenkort een belangrijke beslissing op worden gebaseerd. Dan wil je zekerheid over wat er onder de motorkap gebeurt.",
    deliverables: [
      { title: "Systematische review", text: "We lopen formules, verwijzingen, bereiken en koppelingen na op inconsistenties." },
      { title: "Bevindingenrapport", text: "Een overzicht van gevonden problemen met ernst, locatie en voorgestelde oplossing." },
      { title: "Herstel", text: "Op jouw verzoek herstellen we de fouten en voegen controles toe." },
      { title: "Vergelijking", text: "Een overzicht van uitkomsten vóór en na herstel, zodat je ziet wat er verandert." },
      { title: "Advies", text: "Aanbevelingen om vergelijkbare fouten in de toekomst te voorkomen." },
    ],
    example: {
      title: "Voorbeeld: een prijsmodel met onverklaarbare uitkomsten",
      text:
        "Een producent ziet dat sommige verkoopprijzen in het calculatiemodel niet logisch zijn. Uit de review blijkt dat een zoekfunctie bij nieuwe artikelen een benaderde overeenkomst gebruikt en daardoor het verkeerde tarief ophaalt. Na herstel en een extra controle kloppen alle prijzen.",
      bullets: [
        "Zoekfunctie met exacte overeenkomst",
        "Controle op artikelen zonder tarief",
        "Vergelijking oude en nieuwe prijzen",
        "Advies over beheer van de tarieflijst",
      ],
    },
    benefits: [
      { title: "Zekerheid", text: "Je weet of je op de uitkomsten kunt vertrouwen." },
      { title: "Inzicht", text: "Je begrijpt hoe het bestand werkt en waar de risico's zitten." },
      { title: "Snel geholpen", text: "Een review is vaak een overzichtelijke, afgebakende opdracht." },
      { title: "Preventie", text: "Toegevoegde controles signaleren toekomstige fouten." },
    ],
    approach: [
      { title: "Bestand aanleveren", text: "Je uploadt het bestand vertrouwelijk en vertelt wat je opvalt." },
      { title: "Afbakening", text: "We spreken af wat we controleren en hoe diep we gaan." },
      { title: "Review", text: "We analyseren het bestand en leggen bevindingen vast." },
      { title: "Bespreken en herstellen", text: "We lichten de bevindingen toe en herstellen op jouw verzoek." },
    ],
    faq: [
      { q: "Is een kleine opdracht ook welkom?", a: "Ja. Een gerichte controle van één bestand of één rekenblad is een prima opdracht." },
      { q: "Kunnen jullie garanderen dat het bestand foutloos is?", a: "Een review verkleint het risico aanzienlijk, maar een absolute garantie kan niemand geven. We beschrijven precies wat we hebben gecontroleerd en wat niet." },
      { q: "Mijn bestand bevat gevoelige gegevens. Wat nu?", a: "Je kunt gegevens vooraf anonimiseren, of het bestand via onze afgeschermde upload aanleveren. We gebruiken het alleen voor jouw vraag en verwijderen het volgens ons bewaarbeleid." },
    ],
    visual: "jaarrekeningwerkboek",
    relatedModels: ["jaarrekeningwerkboek", "kostprijsberekening"],
    seoTitle: "Excel bestand laten controleren of herstellen | ExcelSheets.nl",
    metaDescription:
      "Twijfel je of je Excel-bestand klopt? Wij controleren formules, verwijzingen en koppelingen, rapporteren de bevindingen en herstellen fouten. Ook kleine opdrachten.",
  },
  {
    slug: "doorontwikkeling-en-onderhoud",
    navTitle: "Onderhoud",
    title: "Doorontwikkeling en onderhoud",
    h1: "Je Excel-model blijft meegroeien met je bedrijf",
    lead:
      "Een nieuw boekjaar, een extra vestiging, een gewijzigde rapportagewens of een nieuwe versie van Excel. Modellen moeten worden onderhouden om bruikbaar te blijven. Wij helpen met doorontwikkeling, aanpassingen en ondersteuning wanneer je die nodig hebt.",
    problemTitle: "Het model past niet meer helemaal",
    problem:
      "Het bestand werkte goed toen het werd gebouwd, maar de organisatie is veranderd. Er zijn workarounds ontstaan en de persoon die het model kende, werkt er niet meer. Kleine aanpassingen worden steeds lastiger.",
    deliverables: [
      { title: "Jaarlijkse update", text: "Nieuw boekjaar inrichten, tarieven bijwerken en historische gegevens archiveren." },
      { title: "Uitbreidingen", text: "Extra entiteiten, producten, rapportages of koppelingen toevoegen." },
      { title: "Ondersteuning", text: "Hulp bij vragen of storingen, op afspraak of op afroep." },
      { title: "Versiebeheer", text: "Duidelijke versienummers en een wijzigingslog in het bestand." },
      { title: "Overdracht", text: "Documentatie bijwerken, zodat kennis niet bij één persoon ligt." },
    ],
    example: {
      title: "Voorbeeld: een begrotingsmodel naar het volgende jaar",
      text:
        "Elk najaar wordt het begrotingsmodel klaargezet voor het nieuwe jaar: realisatie wordt gearchiveerd, kostenplaatsen worden bijgewerkt en de rapportage krijgt de gevraagde extra uitsplitsing.",
      bullets: [
        "Archief van het afgelopen jaar",
        "Bijgewerkte stamgegevens",
        "Nieuwe rapportagewens verwerkt",
        "Wijzigingslog bijgewerkt",
      ],
    },
    benefits: [
      { title: "Continuïteit", text: "Je model blijft bruikbaar, ook als de organisatie verandert." },
      { title: "Aanspreekpunt", text: "Je weet bij wie je terechtkunt." },
      { title: "Voorspelbaar", text: "Aanpassingen worden vooraf besproken en ingeschat." },
      { title: "Kennis geborgd", text: "Documentatie groeit mee met het model." },
    ],
    approach: [
      { title: "Inventarisatie", text: "Welke modellen gebruik je en wat moet er gebeuren?" },
      { title: "Afspraken", text: "Ad hoc of periodiek: we spreken af wat past." },
      { title: "Uitvoeren", text: "Aanpassingen in een kopie, getest voordat ze live gaan." },
      { title: "Vastleggen", text: "Wijzigingen worden gedocumenteerd in het model." },
    ],
    faq: [
      { q: "Kan ik later wijzigingen laten maken?", a: "Ja. Of het model door ons of door een ander is gebouwd: we kunnen het aanpassen. Bij een bestand dat we niet kennen, beginnen we met een korte analyse." },
      { q: "Moet ik een onderhoudscontract afsluiten?", a: "Nee, dat is niet verplicht. Sommige klanten werken liever met vaste afspraken, anderen schakelen ons in wanneer het nodig is." },
      { q: "Ben ik eigenaar van het opgeleverde model?", a: "Bij maatwerk ben je in de regel eigenaar van het opgeleverde bestand en mag je het vrij aanpassen. De precieze afspraken leggen we vast in de opdrachtbevestiging." },
    ],
    visual: "begroting-rolling-forecast",
    relatedModels: ["begroting-rolling-forecast", "projecten-nacalculatie"],
    seoTitle: "Excel-model onderhoud en doorontwikkeling | ExcelSheets.nl",
    metaDescription:
      "Onderhoud en doorontwikkeling van Excel-modellen: jaarlijkse updates, uitbreidingen, ondersteuning en versiebeheer. Ook voor modellen die niet door ons zijn gebouwd.",
  },
];

export const serviceNav = services.map((s) => ({ slug: s.slug, title: s.navTitle, href: `/diensten/${s.slug}` }));
