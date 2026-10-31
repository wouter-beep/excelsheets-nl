/**
 * Demonstratiecases. Fictieve bedrijven, gebaseerd op de voorbeeldmodellen.
 * Ze staan op de site altijd gemarkeerd als demonstratie. Echte referenties
 * voeg je toe via beheer, met isDemo = false en alleen met toestemming van de klant.
 */
export type CaseContent = { slug: string; title: string; client: string; sector: string; problem: string; solution: string; benefits: string[]; modelSlug: string };

export const demoCases: CaseContent[] = [
  {
    slug: "maandrapportage-technische-dienstverlener",
    title: "Van drie exports naar één maandrapportage",
    client: "Noordbrug Groep B.V.", sector: "Technische dienstverlening",
    problem: "De controller plakt elke maand drie exports uit het boekhoudpakket in een groeiend bestand met een tabblad per maand. Budget en vorig jaar staan in losse bestanden. De directie krijgt een PDF met tabellen, maar mist het verhaal: waarom wijkt de EBITDA af?",
    solution: "Een managementdashboard waarin Power Query de exports inleest en mapt naar een vaste rapportagestructuur. Realisatie, budget en vorig jaar staan in één tabel. Een watervalgrafiek laat zien welk deel van de afwijking komt uit omzet, marge en kosten. Per afdeling en peilmaand te filteren, met een instelbare drempel voor afwijkingen.",
    benefits: ["Maandafsluiting zonder kopiëren en plakken", "Afwijkingen verklaard in plaats van alleen getoond", "Eén bron voor directie en afdelingsmanagers", "Controles op aansluiting met de proefbalans"],
    modelSlug: "managementdashboard",
  },
  {
    slug: "liquiditeit-installatiebedrijf",
    title: "Liquiditeit per week in beeld bij een groeiend installatiebedrijf",
    client: "Kwartelaar Installatietechniek B.V.", sector: "Installatietechniek",
    problem: "Het bedrijf groeit, maar de rekening-courant komt steeds vaker dicht bij de limiet. Grote projecten worden in termijnen gefactureerd terwijl leveranciers en salarissen direct betaald moeten worden. De directeur stuurt op gevoel en het banksaldo van vandaag.",
    solution: "Een rollende liquiditeitsprognose van dertien weken. Debiteuren worden ingepland op hun verwachte betaaldatum, met een scenario voor betalingsvertraging. Vaste lasten, btw-afdrachten en loonheffing staan in een kalender. Een grafiek toont het verwachte saldo ten opzichte van de kredietlimiet.",
    benefits: ["Krappe weken zichtbaar voordat ze ontstaan", "Onderbouwing voor gesprekken met de bank", "Effect van later betalende klanten direct zichtbaar", "Wekelijks bij te werken in een kwartier"],
    modelSlug: "liquiditeitsprognose",
  },
  {
    slug: "kostprijs-meubelmakerij",
    title: "Onderbouwde verkoopprijzen voor een meubelmakerij",
    client: "Vlasblom Meubelmakers", sector: "Productie en ambacht",
    problem: "Offertes worden gemaakt op basis van ervaring en de prijs van een vergelijkbaar stuk van vorig jaar. Houtprijzen en lonen zijn gestegen, maar niemand weet precies wat een tafel nu kost. Op sommige maatwerkopdrachten wordt ongemerkt verlies gemaakt.",
    solution: "Een kostprijsmodel dat per product materiaal, arbeid per bewerking, machine-uren en opslagen voor indirecte kosten berekent. De verkoopprijs volgt uit een gewenste marge, met een controle op de minimale dekking. Prijzen en tarieven staan op één beheerd tabblad.",
    benefits: ["Elke verkoopprijs is herleidbaar", "Effect van een prijsstijging van hout direct zichtbaar", "Minder verliesgevende maatwerkopdrachten", "Basis voor een consistente prijslijst"],
    modelSlug: "kostprijsberekening",
  },
  {
    slug: "consolidatie-holding",
    title: "Een groepscijfer dat in één keer aansluit",
    client: "Kroonvast Holding B.V.", sector: "Holding met drie werkmaatschappijen",
    problem: "De groepscontroller voegt elk kwartaal de cijfers van drie werkmaatschappijen samen. Onderlinge leveringen en een lening van de holding moeten worden geëlimineerd, maar de bedragen sluiten zelden in één keer aan. Het zoeken naar verschillen kost dagen.",
    solution: "Een consolidatiewerkboek met een vast format per werkmaatschappij, een intercompany-matrix en automatische eliminaties. Verschillen tussen de vordering bij de ene en de schuld bij de andere entiteit worden direct gesignaleerd, met een drempel voor afronding.",
    benefits: ["Intercompany-verschillen per paar entiteiten zichtbaar", "Eliminaties automatisch en herleidbaar", "Snellere kwartaalafsluiting", "Duidelijke controleregels voor de accountant"],
    modelSlug: "consolidatie",
  },
];
