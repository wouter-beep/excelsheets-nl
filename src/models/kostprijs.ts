/**
 * Model 8 — Kostprijsberekening, Vlasblom Meubelmakers (fictief).
 * Product: eikenhouten tafel 220 × 100 cm.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, inp, type GridSheet } from "@/lib/sheet/types";

export const MATERIALS = [
  { key: "blad", name: "Eiken lamellen blad 40 mm", unit: "m²", qty: 2.2, price: 148 },
  { key: "poot", name: "Eiken poten 90 × 90 mm", unit: "st", qty: 4, price: 46.5 },
  { key: "reg", name: "Regels en verbindingen", unit: "set", qty: 1, price: 38 },
  { key: "olie", name: "Hardwax-olie", unit: "liter", qty: 0.45, price: 42 },
  { key: "bev", name: "Bevestigingsmateriaal", unit: "set", qty: 1, price: 12.4 },
  { key: "verp", name: "Verpakking en bescherming", unit: "st", qty: 1, price: 18.9 },
];

export type KpState = {
  qty: Record<string, number>; price: Record<string, number>; waste: number;
  laborH: number; laborRate: number; machineH: number; machineRate: number; setupH: number; batch: number;
  overhead: number; margin: number;
};
export const defaultKp: KpState = {
  qty: Object.fromEntries(MATERIALS.map((m) => [m.key, m.qty])), price: Object.fromEntries(MATERIALS.map((m) => [m.key, m.price])), waste: 0.08,
  laborH: 9.5, laborRate: 52, machineH: 2.25, machineRate: 68, setupH: 3, batch: 6, overhead: 0.18, margin: 0.35,
};

export function computeKp(s: KpState) {
  const lines = MATERIALS.map((m) => ({ ...m, qty: s.qty[m.key], price: s.price[m.key], total: s.qty[m.key] * s.price[m.key] }));
  const matNet = sum(lines.map((l) => l.total));
  const material = matNet * (1 + s.waste);
  const labor = s.laborH * s.laborRate;
  const machine = s.machineH * s.machineRate + (s.setupH * s.machineRate) / Math.max(1, s.batch);
  const direct = material + labor + machine;
  const overhead = direct * s.overhead;
  const cost = direct + overhead;
  const price = cost / (1 - s.margin);
  const vat = price * 0.21;
  const curve = [1, 2, 3, 4, 6, 8, 10, 12, 16, 20].map((b) => ({ b, cost: (material + labor + s.machineH * s.machineRate + (s.setupH * s.machineRate) / b) * (1 + s.overhead) }));
  return { lines, matNet, material, labor, machine, direct, overhead, cost, price, vat, priceIncl: price + vat, unitMargin: price - cost, markup: price / cost - 1, batchMargin: (price - cost) * s.batch, curve };
}
export type KpResult = ReturnType<typeof computeKp>;

export const kpChecks = (r: KpResult, s: KpState) => [
  { label: "Kostprijs = directe kosten + opslag", ok: Math.abs(r.cost - (r.direct + r.overhead)) < 0.005 },
  { label: "Marge op verkoopprijs klopt", ok: Math.abs((r.price - r.cost) / r.price - s.margin) < 1e-9 },
];

export function kpSheets(s: KpState, r: KpResult): GridSheet[] {
  // Stuklijst
  const b = new SheetBuilder();
  b.row([t("Stuklijst — eikenhouten tafel 220 × 100", "title", { span: 4 })]);
  b.row([t("Gele cellen zijn invoer: wijzig hoeveelheden en prijzen.", "subtitle", { span: 4 })]);
  b.blank();
  b.row([h("Materiaal"), h("Eenheid"), h("Aantal"), h("Prijs / eenheid"), h("Bedrag")]);
  const f0 = b.next;
  r.lines.forEach((l) => { const row = b.next; b.row([t(l.name), t(l.unit, "muted"), inp(l.qty, `qty.${l.key}`, "num2", { min: 0, max: 100 }), inp(l.price, `price.${l.key}`, "eur2", { min: 0, max: 10_000 }), fx(l.total, `C${row}*D${row}`, "eur2")]); });
  const l = b.next - 1;
  const st = b.next;
  b.row([t("Subtotaal materiaal", "sub"), null, null, null, fx(r.matNet, `SUM(E${f0}:E${l})`, "eur2", "sub")]);
  b.row([t("Snijverlies en afval"), null, inp(s.waste, "waste", "pct", { min: 0, max: 0.5 }), null, fx(r.matNet * s.waste, `E${st}*C${st + 1}`, "eur2")]);
  b.row([t("Materiaalkosten per stuk", "total"), null, null, null, fx(r.material, `E${st}+E${st + 1}`, "eur2", "total")]);
  const stuklijst = b.build("Stuklijst", [230, 70, 80, 110, 110], 4);

  // Calculatie
  const c = new SheetBuilder();
  c.row([t("Kostprijscalculatie per stuk", "title", { span: 3 })]);
  c.row([t("Integrale kostprijs en verkoopprijs", "subtitle", { span: 3 })]);
  c.blank();
  c.row([h("Kostensoort"), h("Hoeveelheid"), h("Tarief"), h("Per stuk")]);
  const m = c.next;
  c.row([t("Materiaal (incl. afval)"), null, null, fx(r.material, "Stuklijst!E13", "eur2", "calc", "Uit het tabblad Stuklijst")]);
  const lr = c.next;
  c.row([t("Arbeid (uren)"), inp(s.laborH, "laborH", "num2", { min: 0, max: 100 }), inp(s.laborRate, "laborRate", "eur2", { min: 0, max: 250 }), fx(r.labor, `B${lr}*C${lr}`, "eur2")]);
  const mr = c.next;
  c.row([t("Machine (uren)"), inp(s.machineH, "machineH", "num2", { min: 0, max: 100 }), inp(s.machineRate, "machineRate", "eur2", { min: 0, max: 500 }), fx(s.machineH * s.machineRate, `B${mr}*C${mr}`, "eur2")]);
  const sr = c.next;
  c.row([t("Insteltijd per serie (uren)"), inp(s.setupH, "setupH", "num2", { min: 0, max: 40 }), fx(s.machineRate, `C${mr}`, "eur2", "muted"), fx((s.setupH * s.machineRate) / s.batch, `B${sr}*C${sr}/B${sr + 1}`, "eur2", "calc", "Insteltijd verdeeld over de seriegrootte")]);
  c.row([t("Seriegrootte (stuks)"), inp(s.batch, "batch", "int", { min: 1, max: 500, step: 1 }), null, null]);
  const dr = c.next;
  c.row([t("Directe kosten", "sub"), null, null, fx(r.direct, `SUM(D${m}:D${sr})`, "eur2", "sub")]);
  c.row([t("Opslag indirecte kosten"), inp(s.overhead, "overhead", "pct", { min: 0, max: 1 }), null, fx(r.overhead, `D${dr}*B${dr + 1}`, "eur2")]);
  const kr = c.next;
  c.row([t("Integrale kostprijs", "total"), null, null, fx(r.cost, `D${dr}+D${dr + 1}`, "eur2", "total")]);
  c.blank();
  const pr = c.next + 1;
  c.row([t("Marge op verkoopprijs"), inp(s.margin, "margin", "pct", { min: 0, max: 0.9, note: "Marge als percentage van de verkoopprijs, niet als opslag op de kostprijs" }), null, null]);
  c.row([t("Verkoopprijs excl. btw", "total"), null, null, fx(r.price, `D${kr}/(1-B${pr - 1})`, "eur2", "total", "Kostprijs / (1 − marge)")]);
  c.row([t("Btw 21%"), null, null, fx(r.vat, `D${pr}*21%`, "eur2")]);
  c.row([t("Verkoopprijs incl. btw", "sub"), null, null, fx(r.priceIncl, `D${pr}+D${pr + 1}`, "eur2", "sub")]);
  c.blank();
  c.row([t("Brutomarge per stuk"), null, null, fx(r.unitMargin, `D${pr}-D${kr}`, "eur2", "pos")]);
  c.row([t("Opslag op kostprijs (ter vergelijking)"), null, null, fx(r.markup, `D${pr}/D${kr}-1`, "pct", "muted")]);
  c.row([t("Brutomarge per serie"), null, null, fx(r.batchMargin, `D${pr + 4}*B${sr + 1}`, "eur", "pos")]);
  const calculatie = c.build("Calculatie", [250, 110, 110, 120], 4);
  return [calculatie, stuklijst];
}
