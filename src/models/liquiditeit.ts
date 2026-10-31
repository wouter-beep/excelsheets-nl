/**
 * Model 3 — Dertienwekelijkse liquiditeitsprognose, Kwartelaar Installatietechniek B.V. (fictief)
 * Week 0 begint maandag 2 november 2026.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, inp, check, colLetter, type GridSheet } from "@/lib/sheet/types";

export const WEEKS = 13;
const START = Date.UTC(2026, 10, 2); // ma 2 nov 2026
const DAY = 86_400_000;
export const weekStart = (w: number) => new Date(START + w * 7 * DAY);
export function isoWeek(d: Date) {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay() || 7;
  x.setUTCDate(x.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(x.getUTCFullYear(), 0, 1));
  return Math.ceil(((x.getTime() - y0.getTime()) / DAY + 1) / 7);
}
/** Index van de week waarin een datum valt (of -1 buiten de horizon). */
const weekOf = (y: number, m: number, d: number) => { const i = Math.floor((Date.UTC(y, m, d) - START) / (7 * DAY)); return i >= 0 && i < WEEKS ? i : -1; };
export const weekLabels = Array.from({ length: WEEKS }, (_, w) => `wk ${isoWeek(weekStart(w))}`);

/** Gefactureerde omzet (incl. btw) per week, index -12 t/m 12. Lagere facturatie rond de feestdagen. */
const INVOICED: Record<number, number> = {};
[-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1].forEach((w, i) => (INVOICED[w] = [148, 152, 139, 161, 157, 144, 166, 151, 149, 158, 163, 155][i] * 1000));
[146, 159, 162, 154, 170, 165, 158, 98, 64, 121, 150, 156, 161].forEach((v, w) => (INVOICED[w] = v * 1000));
const PAY_TERM = 5; // weken

export type LiqState = { delayWeeks: number; delayShare: number; startBalance: number; creditLimit: number; investment: number };
export const defaultLiq: LiqState = { delayWeeks: 2, delayShare: 0.25, startBalance: 412_000, creditLimit: 250_000, investment: 68_000 };

export const CATS = [
  { key: "rec", name: "Ontvangsten debiteuren", sign: 1 },
  { key: "sup", name: "Betalingen crediteuren", sign: -1 },
  { key: "sal", name: "Nettosalarissen", sign: -1 },
  { key: "lh", name: "Loonheffing", sign: -1 },
  { key: "vat", name: "Omzetbelasting (Q4)", sign: -1 },
  { key: "rent", name: "Huur bedrijfspand", sign: -1 },
  { key: "opex", name: "Overige uitgaven", sign: -1 },
  { key: "inv", name: "Investering bedrijfswagen", sign: -1 },
  { key: "loan", name: "Aflossing en rente lening", sign: -1 },
] as const;
export type CatKey = (typeof CATS)[number]["key"];

export function computeLiq(s: LiqState) {
  const flows: Record<CatKey, number[]> = Object.fromEntries(CATS.map((c) => [c.key, Array(WEEKS).fill(0)])) as Record<CatKey, number[]>;
  const inv = (w: number) => INVOICED[w] ?? 150_000;
  for (let w = 0; w < WEEKS; w++) {
    const normal = inv(w - PAY_TERM);
    // De vertraging gaat nu in: het vertraagde deel van een ontvangst schuift d weken op.
    const late = w - s.delayWeeks >= 0 ? inv(w - PAY_TERM - s.delayWeeks) : 0;
    flows.rec[w] = Math.round((1 - s.delayShare) * normal + s.delayShare * late);
    flows.sup[w] = -Math.round(inv(w - 4) * 0.55);
    flows.opex[w] = -12_000;
  }
  const put = (k: CatKey, i: number, v: number) => { if (i >= 0) flows[k][i] += v; };
  put("sal", weekOf(2026, 10, 25), -168_000);
  put("sal", weekOf(2026, 11, 22), -168_000);
  put("sal", weekOf(2027, 0, 25), -171_000);
  put("lh", weekOf(2026, 10, 30), -96_400);
  put("lh", weekOf(2026, 11, 31), -98_200);
  put("vat", weekOf(2027, 0, 29), -186_500); // aangifte Q4, uiterlijk 31 januari
  put("rent", weekOf(2026, 11, 1), -18_500);
  put("rent", weekOf(2027, 0, 1), -18_500);
  put("inv", weekOf(2026, 11, 7), -s.investment);
  put("loan", weekOf(2026, 11, 1), -14_600);
  put("loan", weekOf(2027, 0, 1), -14_550);

  const net = Array.from({ length: WEEKS }, (_, w) => sum(CATS.map((c) => flows[c.key][w])));
  const opening: number[] = [], closing: number[] = [];
  let bal = s.startBalance;
  for (let w = 0; w < WEEKS; w++) { opening.push(bal); bal += net[w]; closing.push(bal); }
  const min = Math.min(...closing);
  const minWeek = closing.indexOf(min);
  const inflow = flows.rec;
  const outflow = net.map((x, w) => x - flows.rec[w]);
  const breach = closing.map((c) => c < -s.creditLimit);
  const negative = closing.map((c) => c < 0);
  const invoicedHorizon = Array.from({ length: WEEKS }, (_, w) => inv(w));
  const arEnd = sum(Array.from({ length: PAY_TERM + s.delayWeeks }, (_, k) => inv(WEEKS - 1 - k))); // indicatief
  return { flows, net, opening, closing, min, minWeek, inflow, outflow, breach, negative, invoicedHorizon, headroom: min + s.creditLimit, arEnd };
}
export type LiqResult = ReturnType<typeof computeLiq>;

export function liqChecks(r: LiqResult, s: LiqState) {
  return [
    { label: "Eindsaldo = beginsaldo + netto kasstroom", ok: Math.abs(r.closing[WEEKS - 1] - (s.startBalance + sum(r.net))) < 1 },
    { label: "Saldo blijft binnen kredietlimiet", ok: !r.breach.some(Boolean) },
  ];
}

export function liqSheets(s: LiqState, r: LiqResult): GridSheet[] {
  const b = new SheetBuilder();
  const L = (i: number) => colLetter(i + 1); // kolom B = week 0
  b.row([t("Liquiditeitsprognose 13 weken", "title", { span: 4 })]);
  b.row([t("Bedragen in euro's · ontvangsten positief, uitgaven negatief", "subtitle", { span: 6 })]);
  b.blank();
  b.row([h("Week"), ...weekLabels.map(h), h("Totaal")]);
  b.row([t("Week vanaf", "muted"), ...Array.from({ length: WEEKS }, (_, w) => t(weekStart(w).toLocaleDateString("nl-NL", { day: "numeric", month: "short", timeZone: "UTC" }), "muted")), null]);
  const openRow = b.next;
  b.row([t("Beginsaldo bank", "sub"), ...r.opening.map((v, w) => (w === 0 ? fx(v, "Aannames!B4", "eur", "sub", "Beginsaldo uit Aannames") : fx(v, `${L(w - 1)}${openRow + CATS.length + 2}`, "eur", "sub", "Eindsaldo vorige week"))), null]);
  const firstCat = b.next;
  CATS.forEach((c) => {
    const row = b.next;
    b.row([t(c.name), ...r.flows[c.key].map((v) => n(v, "eur", v < 0 ? "calc" : v > 0 ? "pos" : "muted")), fx(sum(r.flows[c.key]), `SUM(B${row}:${L(WEEKS - 1)}${row})`, "eur", "sub")]);
  });
  const lastCat = b.next - 1;
  const netRow = b.next;
  b.row([t("Netto kasstroom", "sub"), ...r.net.map((v, w) => fx(v, `SUM(${L(w)}${firstCat}:${L(w)}${lastCat})`, "eur", "sub")), fx(sum(r.net), `SUM(B${netRow}:${L(WEEKS - 1)}${netRow})`, "eur", "sub")]);
  const closeRow = b.next;
  b.row([t("Eindsaldo bank", "total"), ...r.closing.map((v, w) => fx(v, `${L(w)}${openRow}+${L(w)}${netRow}`, "eur", v < 0 ? "neg" : "total")), null]);
  b.row([t("Ruimte binnen kredietlimiet", "muted"), ...r.closing.map((v, w) => fx(v + s.creditLimit, `${L(w)}${closeRow}+Aannames!$B$5`, "eur", v + s.creditLimit < 0 ? "check-bad" : "muted")), null]);
  b.row([t("Signalering", "muted"), ...r.closing.map((v, w) => {
    const status = v < -s.creditLimit ? "LIMIET" : v < 0 ? "Krediet" : "OK";
    return { v: status, f: `IF(${L(w)}${closeRow}<-Aannames!$B$5,"LIMIET",IF(${L(w)}${closeRow}<0,"Krediet","OK"))`, s: status === "OK" ? "check-ok" : status === "Krediet" ? "warn" : "check-bad", fmt: "text" } as const;
  }), null]);
  const kasstroom = b.build("Kasstroom", [200, ...Array(WEEKS).fill(92), 104], 4);

  const d = new SheetBuilder();
  d.row([t("Debiteuren: facturatie en verwachte ontvangsten", "title", { span: 5 })]);
  d.row([t(`Betaaltermijn ${PAY_TERM} weken · ${Math.round(s.delayShare * 100)}% van de debiteuren betaalt ${s.delayWeeks} week/weken later`, "subtitle", { span: 8 })]);
  d.blank();
  d.row([h("Week"), h("Gefactureerd"), h("Ontvangst normaal"), h("Ontvangst vertraagd"), h("Verwachte ontvangst"), h("Verschil")]);
  for (let w = 0; w < WEEKS; w++) {
    const row = d.next;
    const normal = INVOICED[w - PAY_TERM] ?? 150_000;
    const late = w - s.delayWeeks >= 0 ? (INVOICED[w - PAY_TERM - s.delayWeeks] ?? 150_000) : 0;
    d.row([t(weekLabels[w]), n(r.invoicedHorizon[w]), n(normal, "eur", "muted"), n(late, "eur", "muted"),
      fx(r.flows.rec[w], `ROUND((1-Aannames!$B$7)*C${row}+Aannames!$B$7*D${row},0)`, "eur", "calc", "Gewogen: deel betaalt op tijd, deel vertraagd"), fx(r.flows.rec[w] - normal, `E${row}-C${row}`, "eur", r.flows.rec[w] - normal < 0 ? "neg" : "pos")]);
  }
  const debiteuren = d.build("Debiteuren", [90, 116, 128, 132, 132, 104], 4);

  const a = new SheetBuilder();
  a.row([t("Aannames", "title", { span: 2 })]);
  a.row([t("Gele cellen zijn invoer.", "subtitle", { span: 3 })]);
  a.blank();
  a.row([t("Beginsaldo bank (2 nov 2026)"), inp(s.startBalance, "startBalance", "eur", { min: -500_000, max: 2_000_000 })]);
  a.row([t("Kredietlimiet rekening-courant"), inp(s.creditLimit, "creditLimit", "eur", { min: 0, max: 1_000_000 })]);
  a.row([t("Vertraging debiteuren (weken)"), inp(s.delayWeeks, "delayWeeks", "int", { min: 0, max: 6, step: 1 })]);
  a.row([t("Deel debiteuren dat vertraagt"), inp(s.delayShare, "delayShare", "pct", { min: 0, max: 1 })]);
  a.row([t("Investering bedrijfswagen"), inp(s.investment, "investment", "eur", { min: 0, max: 500_000 })]);
  a.blank();
  a.row([h("Controle"), h("Status")]);
  liqChecks(r, s).forEach((c) => a.row([t(c.label), check(c.ok, "Let op")]));
  const aannames = a.build("Aannames", [260, 140]);
  return [kasstroom, debiteuren, aannames];
}
