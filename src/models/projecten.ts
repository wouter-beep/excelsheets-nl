/**
 * Model 9 — Projecten en nacalculatie, Ravenstein Bouw & Renovatie (fictief). Stand per eind oktober 2026.
 * Voortgang op basis van kosten (cost-to-cost). OHW = verdiende opbrengst − gefactureerd.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, check, type GridSheet } from "@/lib/sheet/types";

export const HOURLY_COST = 58; // kostprijs per uur
export const PROJECTS = [
  { code: "P26-014", name: "Renovatie kantoorpand Lindelaan", client: "Zakelijke opdrachtgever", contract: 486_000, extra: 18_400, budgetH: 3_100, budgetBuy: 228_000, hours: 2_640, buy: 196_500, etcH: 520, etcBuy: 31_000, invoiced: 402_000 },
  { code: "P26-021", name: "Verduurzaming 24 woningen", client: "Woningcorporatie", contract: 742_000, extra: 0, budgetH: 4_600, budgetBuy: 371_000, hours: 2_150, buy: 162_300, etcH: 2_600, etcBuy: 214_000, invoiced: 310_000 },
  { code: "P26-027", name: "Uitbreiding bedrijfshal", client: "Productiebedrijf", contract: 318_000, extra: 9_600, budgetH: 1_750, budgetBuy: 151_000, hours: 1_920, buy: 149_800, etcH: 160, etcBuy: 6_500, invoiced: 318_000 },
  { code: "P26-033", name: "Herinrichting praktijkruimte", client: "Zorgaanbieder", contract: 128_500, extra: 4_200, budgetH: 760, budgetBuy: 58_000, hours: 410, buy: 31_200, etcH: 330, etcBuy: 25_400, invoiced: 64_000 },
  { code: "P26-038", name: "Dakrenovatie school", client: "Onderwijsinstelling", contract: 214_000, extra: 0, budgetH: 1_180, budgetBuy: 102_000, hours: 220, buy: 18_600, etcH: 980, etcBuy: 84_000, invoiced: 42_800 },
];

export type ProjState = { sel: number; extraH: number[]; buyChange: number[] };
export const defaultProj: ProjState = { sel: 0, extraH: PROJECTS.map(() => 0), buyChange: PROJECTS.map(() => 0) };

export function computeProj(s: ProjState) {
  const rows = PROJECTS.map((p, i) => {
    const etcH = p.etcH + s.extraH[i];
    const etcBuy = p.etcBuy * (1 + s.buyChange[i]);
    const revenue = p.contract + p.extra;
    const costToDate = p.hours * HOURLY_COST + p.buy;
    const etc = etcH * HOURLY_COST + etcBuy;
    const eac = costToDate + etc;
    const budget = p.budgetH * HOURLY_COST + p.budgetBuy;
    const progress = eac ? costToDate / eac : 0;
    const earned = progress * revenue;
    const wip = earned - p.invoiced;
    const result = revenue - eac;
    return { ...p, etcH, etcBuy, revenue, costToDate, etc, eac, budget, progress, earned, wip, result, margin: result / revenue, hoursVar: p.hours + etcH - p.budgetH, loss: result < 0 };
  });
  const tot = { revenue: sum(rows.map((r) => r.revenue)), eac: sum(rows.map((r) => r.eac)), result: sum(rows.map((r) => r.result)), wip: sum(rows.map((r) => r.wip)), invoiced: sum(rows.map((r) => r.invoiced)), costToDate: sum(rows.map((r) => r.costToDate)) };
  return { rows, tot };
}
export type ProjResult = ReturnType<typeof computeProj>;
export const projChecks = (r: ProjResult) => [
  { label: "Projectresultaten tellen op tot totaal", ok: Math.abs(sum(r.rows.map((x) => x.result)) - r.tot.result) < 1 },
  { label: "Geen verliesgevende projecten", ok: r.rows.every((x) => !x.loss) },
];

export function projSheets(s: ProjState, r: ProjResult): GridSheet[] {
  const b = new SheetBuilder();
  b.row([t("Projectoverzicht — stand eind oktober 2026", "title", { span: 5 })]);
  b.row([t(`Kostprijs per uur € ${HOURLY_COST} · voortgang op basis van kosten`, "subtitle", { span: 5 })]);
  b.blank();
  b.row([h("Project"), h("Omschrijving"), h("Opbrengst"), h("Kosten t/m nu"), h("Nog te maken"), h("Verwachte kosten"), h("Verwacht resultaat"), h("Marge"), h("Voortgang"), h("Gefactureerd"), h("OHW")]);
  const f0 = b.next;
  r.rows.forEach((p) => {
    const row = b.next;
    b.row([t(p.code, "muted"), t(p.name), n(p.revenue, "eur", "calc", { note: "Aanneemsom + meerwerk" }), n(p.costToDate), n(p.etc), fx(p.eac, `D${row}+E${row}`), fx(p.result, `C${row}-F${row}`, "eur", p.result < 0 ? "neg" : "pos"),
      fx(p.margin, `IF(C${row}=0,0,G${row}/C${row})`, "pct"), fx(p.progress, `IF(F${row}=0,0,D${row}/F${row})`, "pct"), n(p.invoiced),
      fx(p.wip, `I${row}*C${row}-J${row}`, "eur", p.wip < 0 ? "warn" : "calc", "Positief: nog te factureren · negatief: vooruitgefactureerd")]);
  });
  const l = b.next - 1;
  b.row([t("Totaal", "total"), null, ...["C", "D", "E", "F", "G"].map((c, i) => fx([r.tot.revenue, r.tot.costToDate, r.tot.eac - r.tot.costToDate, r.tot.eac, r.tot.result][i], `SUM(${c}${f0}:${c}${l})`, "eur", "total")), fx(r.tot.result / r.tot.revenue, `IF(C${l + 1}=0,0,G${l + 1}/C${l + 1})`, "pct", "total"), null, fx(r.tot.invoiced, `SUM(J${f0}:J${l})`, "eur", "total"), fx(r.tot.wip, `SUM(K${f0}:K${l})`, "eur", "total")]);
  b.row([t("Bij een verwacht verlies moet direct een voorziening worden overwogen.", "note", { span: 6 })]);
  const overzicht = b.build("Projectoverzicht", [76, 230, 104, 104, 104, 112, 116, 70, 80, 104, 100], 4);

  const u = new SheetBuilder();
  u.row([t("Uren en inkoop versus budget", "title", { span: 4 })]);
  u.blank();
  u.row([h("Project"), h("Budget uren"), h("Gemaakt"), h("Nog te maken"), h("Verwacht totaal"), h("Verschil uren"), h("Budget inkoop"), h("Inkoop t/m nu"), h("Nog te maken"), h("Verschil inkoop")]);
  r.rows.forEach((p) => {
    const row = u.next;
    u.row([t(p.code), n(p.budgetH, "int"), n(p.hours, "int"), n(p.etcH, "int"), fx(p.hours + p.etcH, `C${row}+D${row}`, "int"), fx(p.hoursVar, `E${row}-B${row}`, "int", p.hoursVar > 0 ? "neg" : "pos"),
      n(p.budgetBuy), n(p.buy), n(p.etcBuy), fx(p.buy + p.etcBuy - p.budgetBuy, `H${row}+I${row}-G${row}`, "eur", p.buy + p.etcBuy - p.budgetBuy > 0 ? "neg" : "pos")]);
  });
  u.blank();
  u.row([h("Controle"), h("Status")]);
  projChecks(r).forEach((c) => u.row([t(c.label), check(c.ok, "Let op")]));
  const uren = u.build("Uren & inkoop", [230, 96, 86, 100, 110, 100, 104, 104, 104, 110], 3);
  return [overzicht, uren];
}
