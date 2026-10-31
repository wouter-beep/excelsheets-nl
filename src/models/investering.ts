/**
 * Model 12 — Investerings- en rendementsmodel, uitbreiding distributiecentrum Logistiek Centrum Heeghe (fictief).
 * Kasstromen vóór belastingen en financiering. Jaar 0 = investering.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, inp, colLetter, type GridSheet } from "@/lib/sheet/types";

export type InvestState = { investment: number; volume: number; growth: number; tariff: number; varCost: number; fixed: number; indexation: number; residual: number; rate: number; years: number; volumeShock: number };
export const defaultInvest: InvestState = { investment: 2_400_000, volume: 48_000, growth: 0.04, tariff: 38, varCost: 21, fixed: 520_000, indexation: 0.02, residual: 400_000, rate: 0.08, years: 10, volumeShock: 0 };

export function cashflows(s: InvestState) {
  const rows = Array.from({ length: s.years }, (_, i) => {
    const y = i + 1;
    const vol = s.volume * (1 + s.volumeShock) * (1 + s.growth) ** i;
    const tariff = s.tariff * (1 + s.indexation) ** i;
    const varCost = s.varCost * (1 + s.indexation) ** i;
    const revenue = vol * tariff;
    const variable = vol * varCost;
    const fixed = s.fixed * (1 + 0.025) ** i;
    const residual = y === s.years ? s.residual : 0;
    const cf = revenue - variable - fixed + residual;
    return { y, vol, tariff, revenue, variable, fixed, residual, cf, df: 1 / (1 + s.rate) ** y };
  });
  return rows;
}
export const npv = (rate: number, cfs: number[], initial: number) => -initial + sum(cfs.map((c, i) => c / (1 + rate) ** (i + 1)));
export function irr(cfs: number[], initial: number) {
  let lo = -0.99, hi = 1.5;
  if (npv(lo, cfs, initial) * npv(hi, cfs, initial) > 0) return null;
  for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; if (npv(mid, cfs, initial) > 0) lo = mid; else hi = mid; }
  return (lo + hi) / 2;
}
export function payback(cfs: number[], initial: number, rate?: number) {
  let cum = -initial;
  for (let i = 0; i < cfs.length; i++) {
    const c = rate === undefined ? cfs[i] : cfs[i] / (1 + rate) ** (i + 1);
    if (cum + c >= 0) return i + (-cum) / c;
    cum += c;
  }
  return null;
}
export function computeInvest(s: InvestState) {
  const rows = cashflows(s);
  const cfs = rows.map((r) => r.cf);
  const NPV = npv(s.rate, cfs, s.investment);
  const IRR = irr(cfs, s.investment);
  const pb = payback(cfs, s.investment);
  const dpb = payback(cfs, s.investment, s.rate);
  let cum = -s.investment;
  const cumulative = [cum, ...cfs.map((c) => (cum += c))];
  const shocks = [-0.2, -0.1, 0, 0.1, 0.2];
  const rates = [0.06, 0.07, 0.08, 0.09, 0.1];
  const sensitivity = shocks.map((sh) => rates.map((r) => npv(r, cashflows({ ...s, volumeShock: sh }).map((x) => x.cf), s.investment)));
  return { rows, cfs, NPV, IRR, pb, dpb, cumulative, shocks, rates, sensitivity };
}
export type InvestResult = ReturnType<typeof computeInvest>;
export const investChecks = (r: InvestResult, s: InvestState) => [
  { label: "NCW bij IRR is nul", ok: r.IRR === null || Math.abs(npv(r.IRR, r.cfs, s.investment)) < 1 },
  { label: "Som verdisconteerde kasstromen − investering = NCW", ok: Math.abs(sum(r.rows.map((x) => x.cf * x.df)) - s.investment - r.NPV) < 0.01 },
];

export function investSheets(s: InvestState, r: InvestResult): GridSheet[] {
  const a = new SheetBuilder();
  a.row([t("Aannames", "title", { span: 2 })]);
  a.row([t("Gele cellen zijn invoer. Bedragen vóór belastingen en financiering.", "subtitle", { span: 3 })]);
  a.blank();
  const items: [string, keyof InvestState, "eur" | "int" | "pct" | "eur2", number, number][] = [
    ["Initiële investering", "investment", "eur", 0, 20_000_000], ["Volume jaar 1 (pallets)", "volume", "int", 0, 1_000_000], ["Volumegroei per jaar", "growth", "pct", -0.1, 0.2],
    ["Tarief per pallet (jaar 1)", "tariff", "eur2", 0, 500], ["Variabele kosten per pallet", "varCost", "eur2", 0, 500], ["Vaste kosten per jaar (jaar 1)", "fixed", "eur", 0, 10_000_000],
    ["Indexatie tarief en variabele kosten", "indexation", "pct", -0.05, 0.1], ["Restwaarde einde looptijd", "residual", "eur", 0, 20_000_000], ["Disconteringsvoet", "rate", "pct", 0, 0.3],
  ];
  items.forEach(([label, key, fmt, min, max]) => a.row([t(label), inp(s[key] as number, key, fmt, { min, max })]));
  a.row([t("Looptijd (jaren)"), n(s.years, "int", "muted")]);
  a.row([t("Indexatie vaste kosten", "muted"), n(0.025, "pct", "muted")]);
  const aannames = a.build("Aannames", [280, 130]);

  const k = new SheetBuilder();
  k.row([t("Kasstromen en rendement", "title", { span: 4 })]);
  k.blank();
  const C = (i: number) => colLetter(i + 1); // B = jaar 0
  k.row([h("Jaar"), n(0, "int", "header"), ...r.rows.map((x) => n(x.y, "int", "header"))]);
  const rv = k.next;
  k.row([t("Volume (pallets)"), null, ...r.rows.map((x, i) => fx(x.vol, i === 0 ? "Aannames!$B$5" : `${C(i)}${rv}*(1+Aannames!$B$6)`, "int"))]);
  k.row([t("Tarief per pallet"), null, ...r.rows.map((x, i) => fx(x.tariff, i === 0 ? "Aannames!$B$7" : `${C(i)}${rv + 1}*(1+Aannames!$B$10)`, "eur2"))]);
  k.row([t("Omzet"), null, ...r.rows.map((x, i) => fx(x.revenue, `${C(i + 1)}${rv}*${C(i + 1)}${rv + 1}`))]);
  k.row([t("Variabele kosten"), null, ...r.rows.map((x, i) => fx(-x.variable, `-${C(i + 1)}${rv}*Aannames!$B$8*(1+Aannames!$B$10)^${i}`))]);
  k.row([t("Vaste kosten"), null, ...r.rows.map((x, i) => fx(-x.fixed, `-Aannames!$B$9*(1+Aannames!$B$14)^${i}`))]);
  k.row([t("Restwaarde"), null, ...r.rows.map((x, i) => (x.residual ? fx(x.residual, "Aannames!$B$11") : n(0, "eur", "muted")))]);
  const cfr = k.next;
  k.row([t("Kasstroom", "total"), fx(-s.investment, "-Aannames!$B$4", "eur", "total"), ...r.rows.map((x, i) => fx(x.cf, `SUM(${C(i + 1)}${rv + 2}:${C(i + 1)}${rv + 5})`, "eur", "total"))]);
  k.row([t("Cumulatief"), fx(r.cumulative[0], `B${cfr}`, "eur", "muted"), ...r.rows.map((x, i) => fx(r.cumulative[i + 1], `${C(i)}${cfr + 1}+${C(i + 1)}${cfr}`, "eur", r.cumulative[i + 1] < 0 ? "neg" : "pos"))]);
  k.row([t("Disconteringsfactor"), n(1, "num2", "muted"), ...r.rows.map((x) => fx(x.df, `1/(1+Aannames!$B$12)^${C(x.y)}$3`, "num2", "muted"))]);
  k.blank();
  const lastC = C(s.years);
  k.row([t("Netto contante waarde", "total"), fx(r.NPV, `NPV(Aannames!$B$12,C${cfr}:${lastC}${cfr})+B${cfr}`, "eur", "total", "NPV() verdisconteert vanaf jaar 1; de investering in jaar 0 wordt apart opgeteld")]);
  k.row([t("Interne rentabiliteit (IRR)", "sub"), fx(r.IRR ?? 0, `IRR(B${cfr}:${lastC}${cfr})`, "pct", "sub")]);
  k.row([t("Terugverdientijd (jaren)"), n(r.pb ?? 0, "num1", "calc", { note: "Lineair geïnterpoleerd binnen het jaar" })]);
  k.row([t("Verdisconteerde terugverdientijd"), n(r.dpb ?? 0, "num1")]);
  const kas = k.build("Kasstromen", [200, 104, ...Array(s.years).fill(98)], 3);

  const g = new SheetBuilder();
  g.row([t("Gevoeligheidsanalyse: NCW bij volume en disconteringsvoet", "title", { span: 5 })]);
  g.blank();
  g.row([h("Volume ↓ / voet →"), ...r.rates.map((x) => h(`${Math.round(x * 100)}%`))]);
  r.shocks.forEach((sh, i) => g.row([t(`${sh > 0 ? "+" : ""}${Math.round(sh * 100)}%`, sh === 0 ? "sub" : "label"), ...r.sensitivity[i].map((v) => n(v, "eur", v < 0 ? "neg" : sh === 0 ? "sub" : "calc"))]));
  g.row([t("Negatieve NCW betekent dat het project bij die aannames minder oplevert dan de vereiste rendementseis.", "note", { span: 6 })]);
  const gev = g.build("Gevoeligheid", [150, 110, 110, 110, 110, 110], 3);
  return [kas, gev, aannames];
}
