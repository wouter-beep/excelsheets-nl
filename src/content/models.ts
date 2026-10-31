/**
 * Demonstratiemodellen — metadata. De rekenlogica staat in src/models/*,
 * de interactieve weergave in src/components/models/*.
 * Alle bedrijven en cijfers zijn fictief.
 */
export type DemoModelMeta = {
  slug: string;
  title: string;
  company: string;
  sector: string;
  summary: string;
  description: string;
  audience: string;
  highlights: string[];
  tabs: string[];
  serviceSlug: string;
  interactions: string[];
};

export const demoModels: DemoModelMeta[] = [
  {
    slug: "managementdashboard", title: "Managementdashboard", company: "Noordbrug Groep B.V.", sector: "Technische dienstverlening",
    summary: "Omzet, brutomarge, EBITDA en personeelskosten per afdeling, met budget, vorig jaar en een jaarprognose.",
    description: "Een maandelijks managementdashboard voor een groep met drie afdelingen. Realisatie, budget en vorig jaar staan naast elkaar. Een waterval laat zien hoe het verschil tussen begrote en gerealiseerde EBITDA is ontstaan: door meer omzet, een lagere marge of hogere kosten. Met de peilmaand en het scenario bepaal je zelf welk beeld je ziet.",
    audience: "Directie, CFO en controllers die maandelijks willen sturen op een paar kengetallen.",
    highlights: ["Waterval van budget naar realisatie", "Filter per afdeling en peilmaand", "Afwijkingen in kleur boven een instelbare drempel", "Jaarprognose op basis van trend + scenario"],
    tabs: ["Dashboard", "Omzet", "Kosten", "Resultaat", "KPI's", "Brondata", "Instellingen"],
    serviceSlug: "dashboards-en-managementrapportages",
    interactions: ["Kies een peilmaand", "Filter op afdeling (ook via de tabel)", "Pas het scenario aan", "Wijzig de drempel op Instellingen"],
  },
  {
    slug: "begroting-rolling-forecast", title: "Jaarbegroting en rolling forecast", company: "Meridiaan Services B.V.", sector: "Facilitaire dienstverlening",
    summary: "Twaalf maanden, vijf afdelingen en een vaste grootboekindeling. Realisatie plus prognose geeft de actuele jaarverwachting.",
    description: "Een complete begroting per afdeling en grootboekcategorie. De realisatie tot en met de peilmaand wordt aangevuld met een prognose voor de rest van het jaar. Verander de omzetgroei en zie hoe inkoop, het variabele deel van de personeelskosten en de EBITDA meebewegen.",
    audience: "Controllers en financieel managers die het hele jaar willen sturen op de begroting.",
    highlights: ["Grootboek × maand begroting", "Budget versus realisatie met afwijkingen", "Forecast = realisatie + prognose", "Variabele kosten bewegen mee met omzet"],
    tabs: ["Overzicht", "Begroting", "Realisatie vs budget", "Forecast", "Aannames"],
    serviceSlug: "begroting-en-budgettering",
    interactions: ["Wissel van afdeling", "Verschuif de peilmaand", "Pas de omzetgroei en loonindexatie aan"],
  },
  {
    slug: "liquiditeitsprognose", title: "Liquiditeitsprognose 13 weken", company: "Kwartelaar Installatietechniek B.V.", sector: "Installatietechniek",
    summary: "Banksaldo per week met debiteuren, crediteuren, salarissen, belastingen, investeringen en financiering.",
    description: "Een dertienwekelijkse liquiditeitsplanning van november 2026 tot eind januari 2027. Salarissen, loonheffing, de btw-afdracht over het vierde kwartaal en een investering vallen in de juiste week. Simuleer wat er gebeurt als een deel van je debiteuren later betaalt en zie direct of je binnen de kredietlimiet blijft.",
    audience: "Ondernemers en financieel managers die hun kaspositie vooruit willen zien.",
    highlights: ["Weekplanning met echte betaaldata", "Scenario: vertraagde debiteuren", "Signalering bij krediet en limiet", "Aansluitcontrole begin- en eindsaldo"],
    tabs: ["Overzicht", "Kasstroom", "Debiteuren", "Aannames"],
    serviceSlug: "financiele-modellen",
    interactions: ["Stel de betaalvertraging in", "Bepaal welk deel van de debiteuren later betaalt", "Wijzig de kredietlimiet"],
  },
  {
    slug: "jaarrekeningwerkboek", title: "Jaarrekeningwerkboek", company: "Hofstede Varenkamp B.V.", sector: "Groothandel",
    summary: "Van proefbalans via mapping naar balans en winst-en-verliesrekening, met specificaties, mutatieoverzichten en controles.",
    description: "Een werkboek voor het voorbereiden van financiële overzichten. Elke grootboekrekening is gekoppeld aan een rubriek. Balans, W&V, specificaties en mutatieoverzichten worden automatisch opgebouwd en een controleblad laat zien of alles aansluit. Voeg een memoriaalboeking toe of simuleer een nieuwe rekening zonder mapping en zie wat de controles doen.",
    audience: "Controllers, administratiekantoren en financiële afdelingen.",
    highlights: ["Proefbalans → mapping → overzichten", "Balanscontrole en resultaataansluiting", "Mutatieoverzicht vaste activa en eigen vermogen", "Vennootschapsbelasting volgens tarieven 2025"],
    tabs: ["Proefbalans", "Mapping", "Balans", "W&V", "Specificaties", "Mutatieoverzicht", "Controles"],
    serviceSlug: "jaarrekening-en-consolidatiemodellen",
    interactions: ["Boek een extra afschrijving", "Simuleer een ongemapte rekening", "Bekijk de SUMIF-formules op Mapping"],
  },
  {
    slug: "personeelsplanning", title: "Personeelsplanning", company: "Lindewaard Zorg & Welzijn", sector: "Zorg",
    summary: "Weekrooster met diensten, bezetting versus behoefte, contracturen, toeslagen en loonkosten.",
    description: "Een rooster voor een zorglocatie met vroege, dag-, late en nachtdiensten. Het model telt per dag de bezetting tegen de minimale behoefte, vergelijkt geplande uren met contracturen en signaleert een vroege dienst direct na een nachtdienst. Klik op een dienst om hem te wijzigen en zie bezetting, uren en kosten meteen veranderen.",
    audience: "HR-managers, teamleiders en planners.",
    highlights: ["Klikbaar rooster met dienstkleuren", "Bezetting versus behoefte per dag", "Signalering contracturen en rusttijd", "Loonkosten inclusief voorbeeldtoeslagen"],
    tabs: ["Rooster", "Analyse", "Bezetting", "Uren & loonkosten", "Diensten"],
    serviceSlug: "planning-en-operationele-tools",
    interactions: ["Klik op een dienst om te wisselen", "Los de onderbezetting op vrijdag op", "Wijzig de werkgeverslasten"],
  },
  {
    slug: "horeca-omzetanalyse", title: "Horeca-omzetanalyse", company: "Grachtzicht Horeca Groep", sector: "Horeca",
    summary: "Drie vestigingen met gasten, gemiddelde besteding, omzet per uur, brutomarge en personeelskostenpercentage.",
    description: "Een analyse van een gemiddelde week voor drie vestigingen. Zie per dag en per uur waar de omzet vandaan komt, wat een gast gemiddeld besteedt en hoe de personeelskosten zich verhouden tot de omzet. Wissel van vestiging en test wat een prijsaanpassing of extra personeelsuren betekenen.",
    audience: "Horecaondernemers en bedrijfsleiders met meerdere locaties.",
    highlights: ["Warmtekaart omzet per uur", "Vergelijking van vestigingen", "Signaal bij personeelskosten boven norm", "Prijs- en personeelsscenario"],
    tabs: ["Dashboard", "Omzet per dag", "Omzet per uur", "Vestigingen"],
    serviceSlug: "dashboards-en-managementrapportages",
    interactions: ["Wissel van vestiging", "Pas de kaartprijzen aan", "Verander de personeelsinzet"],
  },
  {
    slug: "productie-efficiency", title: "Productie- en efficiëntiedashboard", company: "Molenbeek Precisietechniek B.V.", sector: "Maakindustrie",
    summary: "Volume, productiviteit, uitval, materiaalverbruik, machinebezetting en leverbetrouwbaarheid per processtap.",
    description: "Twaalf weken productiedata voor zagen, frezen, draaien en assemblage. Het dashboard vergelijkt uitval en materiaalverbruik met de norm, laat de machinebezetting per proces zien en volgt de leverbetrouwbaarheid. Filter op proces en periode.",
    audience: "Operationeel managers, productieleiders en directie in de maakindustrie.",
    highlights: ["Filters op proces en periode", "Uitval en materiaal versus norm", "Machinebezetting per proces", "Leverbetrouwbaarheid tegen doel"],
    tabs: ["Dashboard", "Productie", "Machines & levering"],
    serviceSlug: "planning-en-operationele-tools",
    interactions: ["Kies een processtap", "Wissel tussen 4, 8 en 12 weken"],
  },
  {
    slug: "kostprijsberekening", title: "Kostprijsberekening", company: "Vlasblom Meubelmakers", sector: "Productie op maat",
    summary: "Integrale kostprijs uit materiaal, arbeid, machine-uren, insteltijd en opslagen, met verkoopprijs en marge.",
    description: "Een calculatiemodel voor een eikenhouten tafel. Pas hoeveelheden en prijzen in de stuklijst aan, wijzig uren, tarieven en seriegrootte en zie direct de kostprijs, verkoopprijs en marge. Het model maakt het verschil tussen marge op verkoopprijs en opslag op kostprijs zichtbaar.",
    audience: "Producenten, werkplaatsen en calculators.",
    highlights: ["Bewerkbare stuklijst", "Insteltijd verdeeld over de serie", "Marge versus opslag uitgelegd", "Kostprijs per seriegrootte"],
    tabs: ["Calculatie", "Stuklijst", "Prijsopbouw"],
    serviceSlug: "excel-op-maat-laten-maken",
    interactions: ["Wijzig gele invoercellen", "Speel met seriegrootte en marge"],
  },
  {
    slug: "projecten-nacalculatie", title: "Projecten en nacalculatie", company: "Ravenstein Bouw & Renovatie", sector: "Bouw",
    summary: "Projectbudget, gemaakte uren, inkoop, nog te maken kosten, facturatie, voortgang en verwacht resultaat.",
    description: "Een projectenoverzicht voor vijf lopende projecten. Het model berekent per project de voortgang op basis van kosten, het onderhanden werk en het verwachte eindresultaat. Voeg extra uren of hogere inkoopprijzen toe en zie wanneer een project verliesgevend dreigt te worden.",
    audience: "Projectorganisaties, bouw- en installatiebedrijven.",
    highlights: ["Voortgang en onderhanden werk", "Verwacht resultaat per project", "Uren en inkoop versus budget", "Signalering bij verlies"],
    tabs: ["Project", "Projectoverzicht", "Uren & inkoop"],
    serviceSlug: "planning-en-operationele-tools",
    interactions: ["Kies een project", "Voeg extra uren toe", "Verhoog de resterende inkoop"],
  },
  {
    slug: "voorraadbeheer", title: "Voorraadbeheer", company: "Technische Groothandel Ooievaar", sector: "Groothandel",
    summary: "Voorraadstanden, bestelniveaus, veiligheidsvoorraad, omloopsnelheid, voorraadwaarde en automatische bestelsignalering.",
    description: "Een voorraadmodel voor veertien artikelen. Het bestelniveau volgt uit verbruik, levertijd en een veiligheidsvoorraad op basis van de gewenste servicegraad. Artikelen onder het bestelniveau krijgen een bestelvoorstel, afgerond op de minimale bestelhoeveelheid. Een ABC-analyse laat zien waar het geld zit.",
    audience: "Inkopers, groothandels en logistieke afdelingen.",
    highlights: ["Veiligheidsvoorraad volgens servicegraad", "Bestelvoorstel op MOQ", "ABC-analyse", "Effect van langere levertijden"],
    tabs: ["Signalering", "Artikelen", "ABC-analyse", "Instellingen"],
    serviceSlug: "vba-power-query-automatisering",
    interactions: ["Kies een servicegraad", "Verleng de levertijd", "Filter op categorie"],
  },
  {
    slug: "consolidatie", title: "Consolidatie", company: "Kroonvast Holding B.V.", sector: "Holding met werkmaatschappijen",
    summary: "Vier entiteiten, intercompany-omzet, managementvergoedingen, huur en rente, met eliminaties en aansluitcontroles.",
    description: "Een geconsolideerde winst-en-verliesrekening voor een holding met drie dochters. Onderlinge leveringen, huur, managementvergoedingen en rente worden geëlimineerd. Een aansluiting van de intercompanyposities laat direct zien als de administraties van twee entiteiten niet overeenkomen.",
    audience: "Groepscontrollers en financieel managers van holdings.",
    highlights: ["Eliminaties per transactie", "Opgeteld versus geconsolideerd", "Aansluiting intercompanyposities", "Controle: eliminaties per saldo nul"],
    tabs: ["Groepsoverzicht", "Consolidatie W&V", "Eliminaties", "IC-aansluiting"],
    serviceSlug: "jaarrekening-en-consolidatiemodellen",
    interactions: ["Wissel tussen opgeteld en geconsolideerd", "Simuleer een IC-verschil"],
  },
  {
    slug: "investeringsmodel", title: "Investerings- en rendementsmodel", company: "Logistiek Centrum Heeghe", sector: "Logistiek",
    summary: "Kasstromen over tien jaar, netto contante waarde, IRR, terugverdientijd en een gevoeligheidsanalyse.",
    description: "Een investeringsanalyse voor de uitbreiding van een distributiecentrum. Volume, tarief, variabele en vaste kosten bepalen de jaarlijkse kasstroom. Het model berekent NCW, IRR en (verdisconteerde) terugverdientijd en toont in een gevoeligheidstabel wat er gebeurt bij minder volume of een hogere rendementseis.",
    audience: "Directie, CFO's en investeerders.",
    highlights: ["NCW, IRR en terugverdientijd", "Gevoeligheid volume × disconteringsvoet", "Indexatie van tarieven en kosten", "Excel-formules NPV en IRR"],
    tabs: ["Overzicht", "Kasstromen", "Gevoeligheid", "Aannames"],
    serviceSlug: "financiele-modellen",
    interactions: ["Verander de disconteringsvoet", "Pas volume en tarief aan", "Bewerk aannames in gele cellen"],
  },
];

export const modelBySlug = (slug: string) => demoModels.find((m) => m.slug === slug);
