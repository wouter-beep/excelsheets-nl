export type ArticleSource = { title: string; url?: string };
export type ArticleContent = {
  number: number;
  slug: string;
  title: string;
  subjectYear: number;
  summary: string;
  /** Markdown-light: ## kop, ### subkop, - opsomming, **vet**, [tekst](url) */
  body: string;
  /** "Wat betekent dit voor jouw bedrijf?" */
  practice: string;
  sources: ArticleSource[];
  serviceLinks: string[];
  topics: string[];
  visual: "grid" | "query" | "array" | "ai" | "python" | "chart" | "lookup" | "collab" | "shield" | "text" | "script" | "forty";
  seoTitle?: string;
  metaDescription?: string;
  /** Interne opmerking voor de redactie: wat moet nog geverifieerd worden? */
  factNote?: string;
  /** REVIEW = feitelijk nog te verifiëren, wordt niet gepubliceerd tot de redactie akkoord geeft. */
  status: "PUBLISHED" | "REVIEW";
};

export const TOPICS = [
  { slug: "data-en-power-query", name: "Data en Power Query", description: "Gegevens ophalen, opschonen en koppelen." },
  { slug: "formules", name: "Moderne formules", description: "Van XLOOKUP en dynamische matrices tot LAMBDA." },
  { slug: "ai-en-copilot", name: "AI en Copilot", description: "Kunstmatige intelligentie in en rond Excel." },
  { slug: "python", name: "Python in Excel", description: "Analyses met Python binnen het werkboek." },
  { slug: "samenwerken", name: "Samenwerken en delen", description: "Co-authoring, Excel op het web en Microsoft 365." },
  { slug: "automatisering", name: "Automatisering", description: "VBA, Office Scripts en terugkerende processen." },
  { slug: "modelontwerp", name: "Modelontwerp en kwaliteit", description: "Structuur, controles, documentatie en onderhoud." },
  { slug: "rapportage", name: "Rapportage en dashboards", description: "Managementinformatie en visualisatie." },
  { slug: "finance", name: "Finance en planning", description: "Begroting, forecast, liquiditeit en scenario's." },
  { slug: "veiligheid", name: "Veiligheid en privacy", description: "Gegevensbescherming, AVG en beheer." },
] as const;

export const SERVICE_LINK_LABEL: Record<string, string> = {
  "excel-op-maat-laten-maken": "Excel op maat laten maken",
  "excel-bestand-verbeteren": "Excel-bestand laten verbeteren",
  "financiele-modellen": "Financiële modellen",
  "begroting-en-budgettering": "Begroting en budgettering",
  "dashboards-en-managementrapportages": "Dashboards en managementrapportages",
  "jaarrekening-en-consolidatiemodellen": "Jaarrekening- en consolidatiemodellen",
  "planning-en-operationele-tools": "Planning en operationele tools",
  "vba-power-query-automatisering": "VBA, Power Query en automatisering",
  "excel-controleren-en-herstellen": "Excel controleren en herstellen",
  "doorontwikkeling-en-onderhoud": "Doorontwikkeling en onderhoud",
};
