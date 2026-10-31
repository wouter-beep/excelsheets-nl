/**
 * Transparante, regelgebaseerde classificatie en samenvatting van aanvragen.
 * Geen AI: elke uitkomst is te herleiden tot de regels hieronder.
 * Bezoekers zien alleen de samenvatting, nooit prijzen of zekerheden.
 */
import { CATEGORIES, FREQUENCY, SOURCES, URGENCY, labelOf, type CategoryKey, type GoalKey, type Situation, type SummaryData } from "./intake";

type Input = { goal: GoalKey; categories: CategoryKey[]; story: string; situation: Situation; urgency?: string; budget?: string; uploadCount?: number };

const has = (cats: CategoryKey[], ...k: CategoryKey[]) => k.some((x) => cats.includes(x));
const storyHas = (story: string, ...words: string[]) => { const s = story.toLowerCase(); return words.some((w) => s.includes(w)); };

/** Herkent bekende pakketten in de tekst of het koppelingenveld. */
export function detectSystems(text: string) {
  const known = ["Exact Online", "AFAS", "Twinfield", "SnelStart", "Moneybird", "e-Boekhouden", "Visma", "SAP", "Microsoft Dynamics", "Power BI", "SharePoint", "Salesforce", "HubSpot", "Nmbrs", "Loket", "Yuki", "King"];
  const t = text.toLowerCase();
  return known.filter((k) => t.includes(k.toLowerCase()));
}

export function classify(i: Input) {
  const s = i.situation;
  const rules: string[] = [];
  // Type opdracht
  let type = "Nieuw maatwerkmodel";
  if (i.goal === "verbeteren") type = storyHas(i.story, "fout", "klopt niet", "error", "#verw", "#n/b", "controle") ? "Controle en herstel" : "Verbetering bestaand bestand";
  else if (i.goal === "rapportage") type = has(i.categories, "finance", "begroting", "jaarrekening") && !has(i.categories, "rapportage") ? "Financieel model" : "Rapportage of dashboard";
  else if (i.goal === "anders") type = has(i.categories, "automatisering", "data-import") ? "Automatisering" : "Advies of overige vraag";
  else if (has(i.categories, "planning", "personeel", "productie")) type = "Planningstool";
  rules.push(`type: doel "${i.goal}" + onderwerpen`);

  // Complexiteit (punten)
  let score = 0;
  const add = (pts: number, why: string) => { score += pts; rules.push(`+${pts} ${why}`); };
  if (i.categories.length >= 4) add(1, "4 of meer onderwerpen");
  if (s.users === "6-20") add(1, "6–20 gebruikers");
  if (s.users === "20+") add(2, "meer dan 20 gebruikers");
  if (s.integration === "ja") add(2, "koppeling gewenst");
  if (s.integration === "misschien") add(1, "koppeling misschien");
  if (s.frequency === "dagelijks") add(1, "dagelijks gebruik");
  if ((s.sources ?? []).some((x) => x === "database" || x === "erp")) add(1, "bron: database/ERP");
  if (has(i.categories, "jaarrekening") && has(i.categories, "finance", "rapportage")) add(1, "jaarrekening/consolidatie");
  if (storyHas(i.story, "consolid", "holding", "werkmaatschappij")) add(1, "consolidatie genoemd");
  if (storyHas(i.story, "vba", "macro")) add(1, "VBA/macro's genoemd");
  if (i.story.length > 900) add(1, "uitgebreide omschrijving");
  const complexity = score <= 2 ? "Laag" : score <= 4 ? "Gemiddeld" : "Hoog";

  // Expertise
  const expertise = new Set<string>();
  if (has(i.categories, "finance", "begroting", "jaarrekening")) expertise.add("Financieel modelleren");
  if (has(i.categories, "rapportage", "omzet", "verkoop")) expertise.add("Rapportage en dashboards");
  if (has(i.categories, "planning", "personeel", "productie", "projectmanagement")) expertise.add("Planning en operations");
  if (has(i.categories, "kostprijs", "voorraad")) expertise.add("Calculatie en logistiek");
  if (has(i.categories, "automatisering", "data-import") || s.integration === "ja" || storyHas(i.story, "power query", "import", "koppel")) expertise.add("Power Query en automatisering");
  if (storyHas(i.story, "vba", "macro")) expertise.add("VBA");
  if (storyHas(i.story, "python")) expertise.add("Python in Excel");
  if (storyHas(i.story, "power bi")) expertise.add("Power BI-afweging");
  if (expertise.size === 0) expertise.add("Excel-maatwerk algemeen");

  // Urgentie
  const urgency = i.urgency === "asap" ? "Hoog" : i.urgency === "maand" ? "Normaal" : i.urgency ? "Laag" : "Onbekend";
  const priority = (urgency === "Hoog" ? 2 : urgency === "Normaal" ? 1 : 0) + (complexity === "Hoog" ? 1 : 0);

  // Vervolgvragen voor de intake
  const followUps: string[] = [];
  const systems = detectSystems(`${i.story} ${s.integrationWith ?? ""}`);
  if (i.goal === "verbeteren" && !i.uploadCount) followUps.push("Kan het huidige bestand (eventueel geanonimiseerd) worden gedeeld?");
  if (s.hasFile === "ja" && !i.uploadCount) followUps.push("Er is een bestaand bestand: vragen of dat gedeeld kan worden.");
  if (s.integration === "ja" || s.integration === "misschien") followUps.push(systems.length ? `Welke licentie/versie van ${systems.join(", ")} en is API-toegang of een export beschikbaar?` : "Met welk systeem moet worden gekoppeld en hoe komen de gegevens er nu uit?");
  if (s.users === "6-20" || s.users === "20+") followUps.push("Moeten gebruikers tegelijk werken, en wie mag wat wijzigen?");
  if ((s.platforms ?? []).includes("mac") && storyHas(i.story, "vba", "macro")) followUps.push("VBA op Mac en in Excel voor het web heeft beperkingen: platform afstemmen.");
  if ((s.platforms ?? []).includes("m365") && storyHas(i.story, "vba", "macro")) followUps.push("Macro's werken niet in Excel voor het web: Office Scripts als alternatief bespreken.");
  if (!s.frequency) followUps.push("Hoe vaak wordt de oplossing gebruikt?");
  if (has(i.categories, "jaarrekening")) followUps.push("Welke verslaggevingseisen gelden en wie is de accountant?");
  if (i.budget === "onbekend" || !i.budget) followUps.push("Verwachtingen over omvang en investering bespreken.");
  if (s.users === "20+" || (s.sources ?? []).includes("database")) followUps.push("Afweging: is Excel hier de beste oplossing, of past een database/BI-tool beter?");

  return { type, complexity, score, expertise: [...expertise], urgency, priority, followUps, systems, rules };
}
export type Classification = ReturnType<typeof classify>;

/** Bouwt de samenvatting "Dit begrijpen wij van jouw vraagstuk". */
export function buildSummary(i: Input): { text: string; data: SummaryData } {
  const s = i.situation;
  const catLabels = i.categories.map((c) => labelOf(CATEGORIES, c)!.toLowerCase());
  const systems = detectSystems(`${i.story} ${s.integrationWith ?? ""}`);
  const freq = s.frequency && s.frequency !== "eenmalig" ? labelOf(FREQUENCY, s.frequency)!.toLowerCase().replace("per kwartaal of jaar", "periodiek") : null;

  const object = (() => {
    if (i.goal === "verbeteren") return "een verbeterde versie van je bestaande Excel-bestand";
    if (has(i.categories, "planning", "personeel")) return has(i.categories, "personeel") ? "een personeels- of capaciteitsplanning" : "een planningstool";
    if (has(i.categories, "begroting")) return "een begrotings- en forecastmodel";
    if (has(i.categories, "jaarrekening")) return "een jaarrekening- of rapportagewerkboek";
    if (has(i.categories, "kostprijs")) return "een kostprijs- of calculatiemodel";
    if (has(i.categories, "voorraad")) return "een voorraad- en inkoopmodel";
    if (has(i.categories, "projectmanagement")) return "een projectadministratie met nacalculatie";
    if (i.goal === "rapportage" || has(i.categories, "rapportage", "finance", "omzet")) return has(i.categories, "finance", "begroting") ? "een financiële rapportagetool" : "een rapportage of dashboard";
    if (has(i.categories, "automatisering", "data-import")) return "een automatisering van terugkerend Excel-werk";
    return "een Excel-oplossing op maat";
  })();

  const clauses: string[] = [];
  const src = systems.length ? `vanuit ${systems.join(" en ")}` : (s.sources ?? []).includes("boekhouding") ? "vanuit je boekhoudpakket" : (s.sources ?? []).includes("excel") ? "uit andere Excel-bestanden" : null;
  if (src) clauses.push(`${freq ? `${freq} ` : ""}gegevens ${src} kunt inlezen`);
  if (has(i.categories, "begroting", "finance") && i.goal !== "verbeteren") clauses.push("budget en realisatie vergelijkt");
  if (has(i.categories, "planning", "personeel")) clauses.push("bezetting en uren overzichtelijk plant");
  if (has(i.categories, "kostprijs")) clauses.push("kostprijzen en marges onderbouwd berekent");
  if (has(i.categories, "voorraad")) clauses.push("tijdig ziet wat er besteld moet worden");
  if (has(i.categories, "rapportage") || i.goal === "rapportage") clauses.push(src ? "automatisch een managementdashboard bijwerkt" : "in één overzicht ziet hoe je ervoor staat");
  if (i.goal === "verbeteren") clauses.push("weer kunt vertrouwen op de uitkomsten");
  if (has(i.categories, "automatisering", "data-import") && !src) clauses.push("terugkerend handwerk automatiseert");
  const list = clauses.length > 1 ? `${clauses.slice(0, -1).join(", ")} en ${clauses[clauses.length - 1]}` : clauses[0];
  const text = list ? `Je zoekt ${object} waarmee je ${list}.` : `Je zoekt ${object} voor ${catLabels.join(", ")}.`;

  const users = s.users === "1" ? "jij alleen" : s.users ? `${s.users.replace("-", " tot ").replace("20+", "meer dan 20")} mensen` : null;
  const situatie = [
    s.hasFile === "ja" || i.goal === "verbeteren" ? "Er is al een Excel-bestand" : s.hasFile === "nee" ? "Er is nog geen bestand" : null,
    users ? `gebruikt door ${users}` : null,
    s.frequency ? `gebruik: ${labelOf(FREQUENCY, s.frequency)!.toLowerCase()}` : null,
    (s.sources ?? []).length ? `gegevens uit: ${(s.sources ?? []).map((x) => labelOf(SOURCES, x)!.toLowerCase()).join(", ")}` : null,
  ].filter(Boolean).join("; ");
  const doelen = [
    i.goal === "verbeteren" ? "betrouwbaarheid en overzicht verbeteren" : null,
    has(i.categories, "rapportage", "finance", "omzet") ? "sneller en beter inzicht" : null,
    has(i.categories, "automatisering", "data-import") || src ? "minder handmatig werk" : null,
    has(i.categories, "planning", "personeel", "productie") ? "grip op planning en capaciteit" : null,
    has(i.categories, "begroting") ? "sturen op budget en prognose" : null,
    has(i.categories, "kostprijs") ? "onderbouwde prijzen en marges" : null,
  ].filter(Boolean).join(", ") || "een werkende oplossing voor jouw vraagstuk";
  const onderdelen = [
    "invoerbladen met validatie",
    has(i.categories, "rapportage", "finance", "omzet", "begroting") || i.goal === "rapportage" ? "dashboard met grafieken" : null,
    src || has(i.categories, "data-import") ? "Power Query-import" : null,
    has(i.categories, "begroting") ? "budget/realisatie/forecast" : null,
    has(i.categories, "planning", "personeel") ? "planningsweergave met signaleringen" : null,
    storyHas(i.story, "vba", "macro") ? "VBA of Office Scripts" : null,
    "automatische controles",
  ].filter(Boolean).join(", ");
  const koppelingen = systems.length ? systems.join(", ") : s.integration === "ja" ? (s.integrationWith || "Gewenst, nog te bepalen") : s.integration === "misschien" ? "Misschien, te onderzoeken" : "Geen koppeling nodig";
  const planning = i.urgency ? labelOf(URGENCY, i.urgency)! : "Nog niet aangegeven";
  return { text, data: { oplossing: text, situatie: situatie || "Nog niet aangegeven", doelen, onderdelen, koppelingen, planning } };
}
