/**
 * Model 11 — Consolidatie, Kroonvast Holding B.V. met drie 100%-dochters (fictief). Boekjaar 2025.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, inp, check, colLetter, type GridSheet } from "@/lib/sheet/types";

export const ENTITIES = ["Holding", "Bouw", "Techniek", "Vastgoed"] as const;
type E = (typeof ENTITIES)[number];
type Vec = Record<E, number>;
const v = (holding: number, bouw: number, techniek: number, vastgoed: number): Vec => ({ Holding: holding, Bouw: bouw, Techniek: techniek, Vastgoed: vastgoed });

export const PL_LINES = [
  { key: "omz", name: "Netto-omzet", values: v(240_000, 6_850_000, 3_120_000, 412_000) },
  { key: "kpo", name: "Kostprijs van de omzet", values: v(0, -4_310_000, -1_640_000, 0) },
  { key: "pers", name: "Personeelskosten", values: v(-168_000, -1_420_000, -880_000, -36_000) },
  { key: "huur", name: "Huisvesting en huur", values: v(-12_000, -236_000, -128_000, -48_000) },
  { key: "mgmt", name: "Managementvergoedingen", values: v(0, -120_000, -90_000, -30_000) },
  { key: "ovk", name: "Overige bedrijfskosten", values: v(-46_000, -214_000, -132_000, -41_000) },
  { key: "afs", name: "Afschrijvingen", values: v(0, -96_000, -61_000, -118_000) },
  { key: "fin", name: "Financiële baten en lasten", values: v(25_500, -18_000, -4_000, -61_500) },
] as const;

/** Intercompany-transacties: [verkoper/ontvanger, koper/betaler, omschrijving, bedrag, regel opbrengst, regel kosten] */
export const IC_TX = [
  { from: "Techniek", to: "Bouw", name: "Installatiewerk voor Bouw", amount: 420_000, rev: "omz", cost: "kpo" },
  { from: "Vastgoed", to: "Bouw", name: "Huur bedrijfspand Bouw", amount: 180_000, rev: "omz", cost: "huur" },
  { from: "Vastgoed", to: "Techniek", name: "Huur werkplaats Techniek", amount: 96_000, rev: "omz", cost: "huur" },
  { from: "Holding", to: "Bouw", name: "Managementvergoeding", amount: 120_000, rev: "omz", cost: "mgmt" },
  { from: "Holding", to: "Techniek", name: "Managementvergoeding", amount: 90_000, rev: "omz", cost: "mgmt" },
  { from: "Holding", to: "Vastgoed", name: "Managementvergoeding", amount: 30_000, rev: "omz", cost: "mgmt" },
  { from: "Holding", to: "Vastgoed", name: "Rente lening o/g", amount: 25_500, rev: "fin", cost: "fin" },
] as const;

export type ConsState = { bouwPayable: number; showElim: boolean };
export const defaultCons: ConsState = { bouwPayable: 64_500, showElim: true };

export function computeCons(s: ConsState) {
  const elim: Record<string, number> = Object.fromEntries(PL_LINES.map((l) => [l.key, 0]));
  IC_TX.forEach((x) => { elim[x.rev] -= x.amount; elim[x.cost] += x.amount; });
  const lines = PL_LINES.map((l) => {
    const total = sum(ENTITIES.map((e) => l.values[e]));
    return { ...l, total, elim: elim[l.key], cons: total + elim[l.key] };
  });
  const result = (k: "total" | "cons" | E) => sum(lines.map((l) => (k === "total" || k === "cons" ? l[k] : l.values[k])));
  const ic = [
    { pair: "Techniek ↔ Bouw", receivable: 64_500, payable: s.bouwPayable },
    { pair: "Holding ↔ Vastgoed (lening)", receivable: 850_000, payable: 850_000 },
    { pair: "Holding ↔ Bouw (rekening-courant)", receivable: 142_300, payable: 142_300 },
  ].map((x) => ({ ...x, diff: x.receivable - x.payable }));
  return { lines, elimTotal: sum(Object.values(elim)), result, ic, icRevenue: sum(IC_TX.filter((x) => x.rev === "omz").map((x) => x.amount)) };
}
export type ConsResult = ReturnType<typeof computeCons>;
export const consChecks = (r: ConsResult) => [
  { label: "Eliminaties hebben geen effect op het resultaat", ok: r.elimTotal === 0 },
  { label: "Intercompanyposities sluiten aan", ok: r.ic.every((x) => x.diff === 0) },
  { label: "Groepsresultaat = som entiteiten", ok: r.result("cons") === r.result("Holding") + r.result("Bouw") + r.result("Techniek") + r.result("Vastgoed") },
];

export function consSheets(s: ConsState, r: ConsResult): GridSheet[] {
  const b = new SheetBuilder();
  b.row([t("Geconsolideerde winst-en-verliesrekening 2025", "title", { span: 5 })]);
  b.row([t("Kroonvast Holding B.V. en 100%-deelnemingen · bedragen in euro's", "subtitle", { span: 6 })]);
  b.blank();
  b.row([h("Post"), ...ENTITIES.map(h), h("Totaal"), h("Eliminaties"), h("Geconsolideerd")]);
  const f0 = b.next;
  r.lines.forEach((l) => {
    const row = b.next;
    b.row([t(l.name), ...ENTITIES.map((e) => n(l.values[e])), fx(l.total, `SUM(B${row}:E${row})`, "eur", "sub"), fx(l.elim, `SUMIF(Eliminaties!$G:$G,"${l.key}",Eliminaties!$E:$E)-SUMIF(Eliminaties!$F:$F,"${l.key}",Eliminaties!$E:$E)`, "eur", l.elim ? "warn" : "muted", "Uit het tabblad Eliminaties"), fx(l.cons, `F${row}+G${row}`, "eur", "sub")]);
  });
  const l = b.next - 1;
  b.row([t("Resultaat vóór belastingen", "total"), ...ENTITIES.map((e, i) => fx(r.result(e), `SUM(${colLetter(i + 1)}${f0}:${colLetter(i + 1)}${l})`, "eur", "total")), fx(r.result("total"), `SUM(F${f0}:F${l})`, "eur", "total"), fx(r.elimTotal, `SUM(G${f0}:G${l})`, "eur", "total"), fx(r.result("cons"), `SUM(H${f0}:H${l})`, "eur", "total")]);
  const wv = b.build("Consolidatie W&V", [210, 104, 110, 104, 104, 112, 104, 120], 4);

  const e = new SheetBuilder();
  e.row([t("Eliminaties intercompany", "title", { span: 4 })]);
  e.row([t("Opbrengst bij de ene entiteit = kosten bij de andere. Per saldo nul effect op het groepsresultaat.", "subtitle", { span: 7 })]);
  e.blank();
  e.row([h("Van"), h("Aan"), h("Omschrijving"), null, h("Bedrag"), h("Regel opbrengst"), h("Regel kosten")]);
  IC_TX.forEach((x) => e.row([t(x.from), t(x.to), t(x.name), null, n(x.amount), t(x.rev, "muted"), t(x.cost, "muted")]));
  e.blank();
  e.row([t("Eliminatie van opbrengsten (negatief) en kosten (positief) tellen op tot nul.", "note", { span: 6 })]);
  const el = e.build("Eliminaties", [96, 96, 220, 20, 110, 120, 110], 4);

  const ic = new SheetBuilder();
  ic.row([t("Aansluiting intercompanyposities per 31-12-2025", "title", { span: 4 })]);
  ic.blank();
  ic.row([h("Relatie"), h("Vordering"), h("Schuld"), h("Verschil"), h("Status")]);
  r.ic.forEach((x, i) => {
    const row = ic.next;
    ic.row([t(x.pair), n(x.receivable), i === 0 ? inp(x.payable, "bouwPayable", "eur", { min: 0, max: 1_000_000, note: "Schuld volgens de administratie van Bouw — wijzig om een verschil te simuleren" }) : n(x.payable), fx(x.diff, `B${row}-C${row}`, "eur", x.diff ? "check-bad" : "check-ok"),
      { v: x.diff ? "Uitzoeken" : "OK", f: `IF(D${row}=0,"OK","Uitzoeken")`, s: x.diff ? "check-bad" : "check-ok", fmt: "text" }]);
  });
  ic.blank();
  ic.row([h("Controle"), h("Status")]);
  consChecks(r).forEach((c) => ic.row([t(c.label), check(c.ok, "AFWIJKING")]));
  const icSheet = ic.build("IC-aansluiting", [290, 110, 110, 100, 100], 3);
  return [wv, el, icSheet];
}
