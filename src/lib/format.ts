// Nederlandse getal-, valuta- en datumnotatie, consistent op de hele site.
const eur0 = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0, minimumFractionDigits: 0 });
const eur2 = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 2, minimumFractionDigits: 2 });
const num0 = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 });
const num1 = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const pct1 = new Intl.NumberFormat("nl-NL", { style: "percent", maximumFractionDigits: 1, minimumFractionDigits: 1 });

/** Hele euro's: € 1.234.567 (negatief: -€ 1.234) */
export const euro = (v: number) => eur0.format(Math.round(v) === 0 ? 0 : v);
export const euroCents = (v: number) => eur2.format(v);
/** Compact: € 1,2 mln / € 845k */
export function euroCompact(v: number) {
  const a = Math.abs(v);
  const s = v < 0 ? "-" : "";
  if (a >= 1_000_000) return `${s}€ ${num1.format(a / 1_000_000)} mln`;
  if (a >= 10_000) return `${s}€ ${num0.format(a / 1000)}k`;
  return euro(v);
}
export const number = (v: number) => num0.format(v);
export const number1 = (v: number) => num1.format(v);
export const percent = (v: number) => pct1.format(v);
/** Afwijking met teken: +3,4% / -1,2% */
export const signedPercent = (v: number) => (v > 0 ? "+" : "") + pct1.format(v);
export const signedEuro = (v: number) => (v > 0 ? "+" : "") + euro(v);

const dateLong = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Amsterdam" });
const dateShort = new Intl.DateTimeFormat("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Amsterdam" });
const dateTime = new Intl.DateTimeFormat("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Amsterdam" });
export const formatDate = (d: Date | string) => dateLong.format(new Date(d));
export const formatDateShort = (d: Date | string) => dateShort.format(new Date(d));
export const formatDateTime = (d: Date | string) => dateTime.format(new Date(d));

export const MONTHS = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
export const MONTHS_LONG = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

export function fileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${num1.format(bytes / 1024)} kB`;
  return `${num1.format(bytes / (1024 * 1024))} MB`;
}

export const round = (v: number, d = 0) => { const f = 10 ** d; return Math.round(v * f) / f; };
export const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
