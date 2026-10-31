/** Veelgestelde vragen — brontekst voor de seed; daarna aanpasbaar in beheer > Team, FAQ & cases. */
export const faqItems: { question: string; answer: string; category: string }[] = [
  {
    category: "kosten",
    question: "Wat kost een Excel-oplossing op maat?",
    answer:
      "Dat hangt af van de omvang en de complexiteit, en daarom noemen we op de website geen vaste prijzen. Een kleine verbetering van een bestaand bestand is iets heel anders dan een begrotingsmodel voor vijf afdelingen met een koppeling naar je boekhouding.\n\nNa een kort kennismakingsgesprek ontvang je een voorstel met een duidelijke omschrijving van wat we bouwen, de planning en de prijs. Meestal werken we met een vaste prijs per afgebakende opdracht; bij doorlopend werk kan een uurtarief of strippenkaart beter passen. Je zit pas ergens aan vast als je het voorstel accepteert.",
  },
  {
    category: "aanpak",
    question: "Kan een bestaande sheet worden verbeterd?",
    answer:
      "Ja, en dat is vaak een verstandige eerste stap. We kijken eerst wat er goed gaat en waar het misgaat: trage berekeningen, formules die niemand meer begrijpt, handmatige stappen of uitkomsten die niet aansluiten.\n\nDaarna adviseren we of verbeteren voldoende is of dat een nieuwe opzet uiteindelijk minder werk kost. Soms is dat laatste het geval, bijvoorbeeld als een bestand in de loop van jaren uit tientallen gekopieerde tabbladen is gaan bestaan. We bespreken dat altijd eerst met je.",
  },
  {
    category: "aanpak",
    question: "Is een kleine opdracht ook welkom?",
    answer:
      "Ja. Een formule die steeds een foutmelding geeft, een draaitabel die je maandelijks opnieuw opbouwt of een rapportage die net iets beter moet: ook dat zijn goede opdrachten. Kleine verbeteringen leveren vaak verrassend veel tijd op.\n\nBeschrijf je vraag gewoon in de Verzoekwijzer. Als we denken dat je het met een korte uitleg zelf kunt oplossen, zeggen we dat ook.",
  },
  {
    category: "techniek",
    question: "Kan mijn Excel-bestand gekoppeld worden aan Exact Online?",
    answer:
      "Vaak wel, maar de beste manier hangt af van je abonnement en wat je precies wilt ophalen. De eenvoudigste en meest robuuste route is meestal een vaste export (bijvoorbeeld een proefbalans of grootboekmutaties) die Power Query automatisch inleest en opschoont. Je hoeft dan alleen nog het exportbestand te vervangen en te vernieuwen.\n\nEen directe koppeling via een API of een connector van een derde partij kan ook, maar vraagt om de juiste rechten, aandacht voor beveiliging en soms extra licentiekosten. Dat geldt op vergelijkbare wijze voor pakketten als AFAS, Twinfield of SnelStart. We zoeken dit bij de intake voor je uit en kiezen samen de route die past bij hoe vaak de gegevens ververst moeten worden.",
  },
  {
    category: "techniek",
    question: "Wat is mogelijk met Power Query?",
    answer:
      "Power Query is de ingebouwde tool in Excel om gegevens op te halen, op te schonen en samen te voegen. Denk aan: alle CSV-exports uit een map in één keer inlezen, kolommen hernoemen en splitsen, codes vertalen naar omschrijvingen en tabellen uit verschillende bronnen combineren.\n\nHet grote voordeel is dat de stappen worden vastgelegd. Volgende maand klik je op Vernieuwen en gebeurt hetzelfde opnieuw, zonder kopiëren en plakken. Power Query is minder geschikt voor complexe rekenlogica; die zetten we meestal in formules of een datamodel. Let op: de mogelijkheden verschillen per Excel-versie en zijn het meest compleet in Excel voor Windows.",
  },
  {
    category: "techniek",
    question: "Kunnen meerdere mensen het model gebruiken?",
    answer:
      "Ja, maar het ontwerp hangt af van hoe ze dat doen. Werken collega's tegelijk in hetzelfde bestand via OneDrive of SharePoint, dan houden we rekening met co-authoring: geen macro's die daar niet werken, duidelijke invoergebieden per persoon en beveiligde rekenbladen.\n\nLeveren afdelingen ieder hun eigen deel aan, dan kan een opzet met losse invoerbestanden en een centraal bestand dat ze samenvoegt beter werken. Bij grote groepen gebruikers of veel gelijktijdige wijzigingen bespreken we eerlijk of een database of webapplicatie niet beter past.",
  },
  {
    category: "techniek",
    question: "Is VBA noodzakelijk?",
    answer:
      "Steeds minder vaak. Veel wat vroeger een macro vroeg, los je nu op met Power Query, moderne formules zoals FILTER, XLOOKUP en LET, of met tabellen en datavalidatie. Dat is meestal beter onderhoudbaar en werkt ook in Excel voor het web.\n\nVBA blijft nuttig voor taken als het automatisch aanmaken van rapporten per afdeling, het versturen van bestanden of het aansturen van andere Office-programma's. Houd er rekening mee dat VBA niet werkt in Excel voor het web en op de Mac beperkingen heeft. Office Scripts is daar soms een alternatief voor. We kiezen de techniek die past bij jouw situatie, niet andersom.",
  },
  {
    category: "aanpak",
    question: "Kan ik later wijzigingen laten maken?",
    answer:
      "Ja. Bedrijven veranderen en een goed model verandert mee: een nieuwe afdeling, een ander rekeningschema of een extra rapportage. Omdat we modellen gestructureerd en gedocumenteerd opbouwen, zijn zulke aanpassingen meestal goed te doen.\n\nJe kunt per wijziging een kleine opdracht geven of afspraken maken over doorlopend onderhoud. Ook als jouw eigen collega's het model aanpassen, is dat geen probleem: je krijgt een bestand zonder verborgen trucs.",
  },
  {
    category: "vertrouwelijkheid",
    question: "Blijven mijn gegevens vertrouwelijk?",
    answer:
      "Ja. Bestanden die je via de website uploadt, worden afgeschermd opgeslagen, zijn nooit publiek bereikbaar en worden alleen ingezien door de mensen die je aanvraag behandelen. Bestanden die niet tot een opdracht leiden, verwijderen we automatisch na de bewaartermijn die op de pagina Vertrouwelijkheid staat.\n\nWil je liever geen echte cijfers delen? Een geanonimiseerde versie of een bestand met fictieve getallen is voor de intake bijna altijd voldoende. Desgewenst tekenen we vooraf een geheimhoudingsverklaring, en bij een opdracht leggen we afspraken over de verwerking van gegevens vast.",
  },
  {
    category: "aanpak",
    question: "Hoelang duurt de ontwikkeling?",
    answer:
      "Een gerichte verbetering kan binnen enkele dagen klaar zijn. Een nieuw model met meerdere tabbladen, controles en een dashboard neemt meestal enkele weken in beslag, inclusief testen en jouw feedbackrondes. Uitgebreide modellen met koppelingen of consolidaties duren langer.\n\nDe doorlooptijd hangt vaak minder af van het bouwen dan van het aanleveren van gegevens en het plannen van afstemmomenten. In het voorstel staat een realistische planning. Heb je een harde deadline, zoals een begrotingsronde, vertel dat dan meteen.",
  },
  {
    category: "aanpak",
    question: "Ben ik eigenaar van het opgeleverde model?",
    answer:
      "Na volledige betaling mag je het opgeleverde model onbeperkt gebruiken, aanpassen en binnen je organisatie verspreiden. Je krijgt een open bestand: geen verborgen bladen met wachtwoorden die alleen wij kennen en geen afhankelijkheid van ons voor kleine wijzigingen.\n\nDe precieze afspraken over intellectueel eigendom en hergebruik van algemene bouwstenen leggen we vast in het voorstel en de algemene voorwaarden. Heb je specifieke eisen, bijvoorbeeld omdat het model onderdeel wordt van een product dat je verkoopt, bespreek dat dan vooraf.",
  },
  {
    category: "advies",
    question: "Wanneer is Excel niet meer de beste oplossing?",
    answer:
      "Excel is sterk in flexibele berekeningen, scenario's, planning en rapportages die financiële mensen zelf willen kunnen volgen. Het wordt minder geschikt als veel mensen tegelijk transacties invoeren, als je een volledig audittrail per wijziging nodig hebt, bij miljoenen regels data of als het proces strikte toegangsrechten per record vraagt.\n\nIn die gevallen kan een database, een BI-tool zoals Power BI of een (maatwerk)applicatie beter passen. Vaak blijft Excel dan nog steeds de plek voor analyse en scenario's. We zeggen het eerlijk als we denken dat Excel niet de juiste keuze is, ook als dat betekent dat wij de opdracht niet uitvoeren.",
  },
];
