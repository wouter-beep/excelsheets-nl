/**
 * De Excel Verzoekwijzer — keuzes en vragen. Gedeeld door de browser (wizard),
 * de server (validatie) en de classificatie.
 */
import { z } from "zod";

export const GOALS = [
  { key: "nieuw", title: "Ik wil een nieuwe Excel-oplossing laten bouwen", short: "Nieuwe oplossing", text: "Van idee of schets naar een werkend model." },
  { key: "verbeteren", title: "Ik wil een bestaande spreadsheet verbeteren", short: "Bestaande sheet verbeteren", text: "Sneller, overzichtelijker of betrouwbaarder maken." },
  { key: "rapportage", title: "Ik wil een rapportage, dashboard of financieel model", short: "Rapportage of model", text: "Inzicht in cijfers, scenario's en resultaten." },
  { key: "anders", title: "Ik heb een andere Excel-uitdaging", short: "Andere uitdaging", text: "Controle, automatisering, advies of iets anders." },
] as const;
export type GoalKey = (typeof GOALS)[number]["key"];

export const CATEGORIES = [
  { key: "finance", label: "Finance" }, { key: "rapportage", label: "Rapportage" }, { key: "begroting", label: "Begroting" },
  { key: "administratie", label: "Administratie" }, { key: "jaarrekening", label: "Jaarrekening" }, { key: "planning", label: "Planning" },
  { key: "personeel", label: "Personeel" }, { key: "omzet", label: "Omzet" }, { key: "kostprijs", label: "Kostprijs" },
  { key: "voorraad", label: "Voorraad" }, { key: "productie", label: "Productie" }, { key: "projectmanagement", label: "Projectmanagement" },
  { key: "verkoop", label: "Verkoop" }, { key: "automatisering", label: "Automatisering" }, { key: "data-import", label: "Data-import" },
  { key: "overig", label: "Overig" },
] as const;
export type CategoryKey = (typeof CATEGORIES)[number]["key"];

/** Volgorde en aanbevolen categorieën per doel (stap 2 past zich aan op stap 1). */
export const CATEGORY_FOCUS: Record<GoalKey, CategoryKey[]> = {
  nieuw: ["planning", "kostprijs", "begroting", "personeel", "voorraad", "projectmanagement"],
  verbeteren: ["rapportage", "automatisering", "data-import", "finance", "administratie", "begroting"],
  rapportage: ["rapportage", "finance", "begroting", "omzet", "jaarrekening", "verkoop"],
  anders: ["automatisering", "data-import", "administratie", "overig", "finance", "planning"],
};

export const STORY_SUGGESTIONS = [
  "Ik wil iedere maand automatisch onze omzet rapporteren.",
  "Onze begroting bestaat uit veel losse bestanden.",
  "Ik wil onze personeelsplanning vereenvoudigen.",
  "Ik heb een bestaande sheet die regelmatig fouten geeft.",
];

export const USERS = [
  { key: "1", label: "Alleen ik" }, { key: "2-5", label: "2 tot 5" }, { key: "6-20", label: "6 tot 20" }, { key: "20+", label: "Meer dan 20" },
] as const;
export const FREQUENCY = [
  { key: "dagelijks", label: "Dagelijks" }, { key: "wekelijks", label: "Wekelijks" }, { key: "maandelijks", label: "Maandelijks" },
  { key: "periodiek", label: "Per kwartaal of jaar" }, { key: "eenmalig", label: "Eenmalig" },
] as const;
export const SOURCES = [
  { key: "handmatig", label: "Handmatige invoer" }, { key: "boekhouding", label: "Export uit boekhoudpakket" },
  { key: "erp", label: "ERP, CRM of ander systeem" }, { key: "excel", label: "Andere Excel-bestanden" },
  { key: "database", label: "Database" }, { key: "onbekend", label: "Weet ik nog niet" },
] as const;
export const INTEGRATION = [
  { key: "ja", label: "Ja, graag" }, { key: "misschien", label: "Misschien" }, { key: "nee", label: "Nee" },
] as const;
export const PLATFORMS = [
  { key: "windows", label: "Excel voor Windows" }, { key: "mac", label: "Excel voor Mac" },
  { key: "m365", label: "Microsoft 365 / web" }, { key: "onbekend", label: "Weet ik niet" },
] as const;
export const URGENCY = [
  { key: "asap", label: "Zo snel mogelijk" }, { key: "maand", label: "Binnen een maand" },
  { key: "kwartaal", label: "Binnen drie maanden" }, { key: "geen-haast", label: "Geen haast" },
] as const;
export const BUDGET = [
  { key: "<500", label: "Minder dan € 500" }, { key: "500-1500", label: "€ 500 tot € 1.500" },
  { key: "1500-5000", label: "€ 1.500 tot € 5.000" }, { key: ">5000", label: "Meer dan € 5.000" }, { key: "onbekend", label: "Nog geen idee" },
] as const;

const keys = <T extends readonly { key: string }[]>(a: T) => a.map((x) => x.key) as [T[number]["key"], ...T[number]["key"][]];

export const situationSchema = z.object({
  hasFile: z.enum(["ja", "nee"]).optional(),
  users: z.enum(keys(USERS)).optional(),
  frequency: z.enum(keys(FREQUENCY)).optional(),
  sources: z.array(z.enum(keys(SOURCES))).max(6).default([]),
  integration: z.enum(keys(INTEGRATION)).optional(),
  integrationWith: z.string().trim().max(120).optional(),
  platforms: z.array(z.enum(keys(PLATFORMS))).max(4).default([]),
});
export type Situation = z.infer<typeof situationSchema>;

export const summaryDataSchema = z.object({
  oplossing: z.string().trim().max(600),
  situatie: z.string().trim().max(600),
  doelen: z.string().trim().max(600),
  onderdelen: z.string().trim().max(600),
  koppelingen: z.string().trim().max(400),
  planning: z.string().trim().max(300),
});
export type SummaryData = z.infer<typeof summaryDataSchema>;

export const requestSchema = z.object({
  goal: z.enum(keys(GOALS)),
  categories: z.array(z.enum(keys(CATEGORIES))).min(1, "Kies minstens één onderwerp").max(16),
  story: z.string().trim().min(10, "Vertel in een paar woorden wat je zoekt (minimaal 10 tekens)").max(4000),
  situation: situationSchema,
  urgency: z.enum(keys(URGENCY)).optional(),
  budget: z.enum(keys(BUDGET)).optional(),
  summary: z.string().trim().min(10).max(2000),
  summaryData: summaryDataSchema,
  contact: z.object({
    name: z.string().trim().min(2, "Vul je naam in").max(120),
    company: z.string().trim().min(1, "Vul je bedrijfsnaam in").max(160),
    email: z.string().trim().toLowerCase().email("Vul een geldig e-mailadres in").max(200),
    phone: z.string().trim().max(40).regex(/^[0-9+()\-\s]*$/, "Gebruik alleen cijfers, spaties en + ( ) -").optional().or(z.literal("")),
    preferred: z.enum(["email", "telefoon"]),
  }),
  consent: z.literal(true, { errorMap: () => ({ message: "Geef aan dat je de privacyverklaring hebt gelezen" }) }),
  uploads: z.array(z.string().regex(/^[a-zA-Z0-9_-]{16,64}$/)).max(5).default([]),
  source: z.string().max(200).optional(),
  // Botbescherming
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().max(4096).optional(),
});
export type RequestInput = z.infer<typeof requestSchema>;

export const labelOf = <T extends readonly { key: string; label?: string; title?: string; short?: string }[]>(arr: T, key?: string) => {
  const f = arr.find((x) => x.key === key);
  return f ? (f.label ?? f.short ?? f.title ?? key) : undefined;
};

/** Welke situatievragen zijn relevant? (Niet-relevante vragen worden overgeslagen.) */
export function visibleQuestions(goal: GoalKey | undefined, s: Partial<Situation>) {
  const sources = s.sources ?? [];
  const linked = sources.some((x) => x === "boekhouding" || x === "erp" || x === "database");
  return {
    hasFile: goal !== "verbeteren",
    users: true,
    frequency: true,
    sources: true,
    integration: linked,
    integrationWith: linked && (s.integration === "ja" || s.integration === "misschien"),
    platforms: true,
  };
}
