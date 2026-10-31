/**
 * Centrale configuratie voor ExcelSheets.nl.
 *
 * Gegevens die nog niet bekend zijn (rechtspersoon, KvK, adres, telefoon, team)
 * staan bewust op `null`. De website toont deze onderdelen pas zodra ze zijn
 * ingevuld — via omgevingsvariabelen of in het beheer onder Instellingen.
 * Vul hier NOOIT verzonnen bedrijfsgegevens in.
 */
export const siteConfig = {
  brand: "ExcelSheets.nl",
  domain: "www.excelsheets.nl",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Wij maken Excel slimmer. En jouw bedrijf sterker.",
  description:
    "Excel op maat laten maken? ExcelSheets.nl bouwt, verbetert en automatiseert Excel-oplossingen voor bedrijven: financiële dashboards, begrotingen, forecasts, planningen en rapportages.",
  locale: "nl_NL",
};

/** Bedrijfsgegevens: standaardwaarden, te overschrijven via beheer > Instellingen. */
export type CompanySettings = {
  legalName: string | null;
  kvk: string | null;
  vat: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  responseTime: string;
  openingHours: string | null;
  linkedin: string | null;
};

export const defaultCompany: CompanySettings = {
  legalName: process.env.COMPANY_LEGAL_NAME || null,
  kvk: process.env.COMPANY_KVK || null,
  vat: process.env.COMPANY_VAT || null,
  email: process.env.CONTACT_EMAIL || null,
  phone: process.env.CONTACT_PHONE || null,
  address: process.env.COMPANY_ADDRESS || null,
  responseTime: "We reageren doorgaans binnen één werkdag.",
  openingHours: null,
  linkedin: null,
};

/** Bewaarbeleid (dagen). Te wijzigen in beheer > Instellingen. */
export const defaultRetention = {
  /** Geüploade bestanden van aanvragen die niet tot een opdracht leiden. */
  attachmentDays: Number(process.env.RETENTION_ATTACHMENT_DAYS || 90),
  /** Aanvragen (incl. contactgegevens) die niet tot een opdracht leiden. */
  requestDays: Number(process.env.RETENTION_REQUEST_DAYS || 365),
  /** Uploads die nooit aan een aanvraag zijn gekoppeld. */
  orphanUploadHours: 24,
};

export const uploadPolicy = {
  maxFileBytes: Number(process.env.UPLOAD_MAX_MB || 15) * 1024 * 1024,
  maxFiles: 5,
  extensions: [".xlsx", ".xlsm", ".xls", ".xlsb", ".csv"],
};
