/**
 * Model 6 — Horeca-omzetanalyse, Grachtzicht Horeca Groep (fictief). Gemiddelde week oktober 2026.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, check, colLetter, type GridSheet } from "@/lib/sheet/types";

export const WEEKDAYS = ["ma", "di", "wo", "do", "vr", "za", "zo"];
export const HOURS = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
/** Verdeling van gasten over de uren: lunchpiek en dinerpiek. */
const HOUR_PROFILE = [0.03, 0.11, 0.1, 0.05, 0.03, 0.04, 0.08, 0.17, 0.18, 0.12, 0.06, 0.03];

export const LOCATIONS = [
  { key: "centrum", name: "Centrum", covers: [118, 104, 126, 162, 248, 296, 214], lunchShare: 0.38, food: { lunch: 16.5, diner: 34.0 }, drinks: 13.8, foodCost: 0.29, drinkCost: 0.23, staffHours: [62, 58, 62, 74, 98, 112, 90], openHours: [11, 11, 11, 12, 12, 12, 11], rent: 7_400 },
  { key: "haven", name: "Haven", covers: [72, 64, 88, 112, 196, 264, 236], lunchShare: 0.45, food: { lunch: 18.0, diner: 38.5 }, drinks: 16.2, foodCost: 0.31, drinkCost: 0.24, staffHours: [46, 44, 52, 62, 86, 104, 96], openHours: [10, 10, 11, 11, 12, 12, 11], rent: 5_900 },
  { key: "station", name: "Station", covers: [206, 198, 212, 220, 238, 176, 142], lunchShare: 0.62, food: { lunch: 13.5, diner: 26.0 }, drinks: 8.9, foodCost: 0.3, drinkCost: 0.25, staffHours: [70, 70, 72, 74, 80, 66, 58], openHours: [12, 12, 12, 12, 12, 11, 10], rent: 9_200 },
] as const;
export type LocKey = (typeof LOCATIONS)[number]["key"];
export const STAFF_RATE = 31.5; // integrale kosten per uur incl. werkgeverslasten

export type HorecaState = { loc: "alle" | LocKey; priceChange: number; staffChange: number };
export const defaultHoreca: HorecaState = { loc: "centrum", priceChange: 0, staffChange: 0 };

export function computeHoreca(s: HorecaState) {
  const per = LOCATIONS.map((l) => {
    const k = 1 + s.priceChange;
    const days = l.covers.map((c, d) => {
      const lunch = c * l.lunchShare, diner = c - lunch;
      const food = (lunch * l.food.lunch + diner * l.food.diner) * k;
      const drinks = c * l.drinks * k;
      const staffH = l.staffHours[d] * (1 + s.staffChange);
      return { covers: c, food, drinks, revenue: food + drinks, cogs: food * (l.foodCost / k) + drinks * (l.drinkCost / k), staffH, staff: staffH * STAFF_RATE, open: l.openHours[d] };
    });
    const revenue = sum(days.map((d) => d.revenue));
    const covers = sum(days.map((d) => d.covers));
    const cogs = sum(days.map((d) => d.cogs));
    const staff = sum(days.map((d) => d.staff));
    const open = sum(days.map((d) => d.open));
    const food = sum(days.map((d) => d.food)), drinks = sum(days.map((d) => d.drinks));
    const heat = days.map((d) => HOURS.map((_, hi) => d.revenue * HOUR_PROFILE[hi]));
    return { key: l.key, name: l.name, days, revenue, covers, cogs, staff, open, food, drinks, avgSpend: revenue / covers, gm: (revenue - cogs) / revenue, staffPct: staff / revenue, perOpenHour: revenue / open, rent: l.rent / 4.33, heat, staffHours: sum(days.map((d) => d.staffH)) };
  });
  const sel = s.loc === "alle" ? per : per.filter((p) => p.key === s.loc);
  const agg = {
    revenue: sum(sel.map((p) => p.revenue)), covers: sum(sel.map((p) => p.covers)), cogs: sum(sel.map((p) => p.cogs)), staff: sum(sel.map((p) => p.staff)),
    open: sum(sel.map((p) => p.open)), food: sum(sel.map((p) => p.food)), drinks: sum(sel.map((p) => p.drinks)), rent: sum(sel.map((p) => p.rent)),
    days: WEEKDAYS.map((_, d) => sum(sel.map((p) => p.days[d].revenue))),
    heat: WEEKDAYS.map((_, d) => HOURS.map((_, hi) => sum(sel.map((p) => p.heat[d][hi])))),
    staffHours: sum(sel.map((p) => p.staffHours)),
  };
  const gm = agg.revenue - agg.cogs;
  const contribution = gm - agg.staff - agg.rent;
  return { per, agg, gm, gmPct: gm / agg.revenue, staffPct: agg.staff / agg.revenue, avgSpend: agg.revenue / agg.covers, contribution, revPerStaffHour: agg.revenue / agg.staffHours };
}
export type HorecaResult = ReturnType<typeof computeHoreca>;

export const horecaChecks = (r: HorecaResult) => [
  { label: "Dagomzetten tellen op tot weekomzet", ok: Math.abs(sum(r.agg.days) - r.agg.revenue) < 0.5 },
  { label: "Keuken + dranken = totale omzet", ok: Math.abs(r.agg.food + r.agg.drinks - r.agg.revenue) < 0.5 },
  { label: "Uurverdeling sluit aan op dagomzet", ok: Math.abs(sum(r.agg.heat.flat()) - r.agg.revenue) < 1 },
];

export function horecaSheets(s: HorecaState, r: HorecaResult): GridSheet[] {
  const name = s.loc === "alle" ? "Alle vestigingen" : LOCATIONS.find((l) => l.key === s.loc)!.name;
  const sel = s.loc === "alle" ? r.per : r.per.filter((p) => p.key === s.loc);
  const o = new SheetBuilder();
  o.row([t(`Omzet per dag — ${name}`, "title", { span: 4 })]);
  o.row([t("Gemiddelde week oktober 2026 · bedragen excl. btw", "subtitle", { span: 5 })]);
  o.blank();
  o.row([h("Dag"), h("Gasten"), h("Keuken"), h("Dranken"), h("Omzet"), h("Gem. besteding"), h("Personeelsuren"), h("Omzet / uur personeel")]);
  const f0 = o.next;
  WEEKDAYS.forEach((d, i) => {
    const row = o.next;
    const covers = sum(sel.map((p) => p.days[i].covers)), food = sum(sel.map((p) => p.days[i].food)), drinks = sum(sel.map((p) => p.days[i].drinks)), sh = sum(sel.map((p) => p.days[i].staffH));
    o.row([t(d), n(covers, "int"), n(food), n(drinks), fx(food + drinks, `C${row}+D${row}`), fx((food + drinks) / covers, `IF(B${row}=0,0,E${row}/B${row})`, "eur2"), n(sh, "num1"), fx((food + drinks) / sh, `IF(G${row}=0,0,E${row}/G${row})`, "eur2")]);
  });
  const l = o.next - 1, tr = o.next;
  o.row([t("Week", "total"), ...["B", "C", "D", "E"].map((c, i) => fx([r.agg.covers, r.agg.food, r.agg.drinks, r.agg.revenue][i], `SUM(${c}${f0}:${c}${l})`, i === 0 ? "int" : "eur", "total")),
    fx(r.avgSpend, `IF(B${tr}=0,0,E${tr}/B${tr})`, "eur2", "total"), fx(r.agg.staffHours, `SUM(G${f0}:G${l})`, "num1", "total"), fx(r.revPerStaffHour, `IF(G${tr}=0,0,E${tr}/G${tr})`, "eur2", "total")]);
  const omzet = o.build("Omzet per dag", [70, 80, 104, 104, 110, 110, 116, 140], 4);

  const u = new SheetBuilder();
  u.row([t(`Omzet per uur — ${name}`, "title", { span: 4 })]);
  u.blank();
  u.row([h("Uur"), ...WEEKDAYS.map(h), h("Totaal")]);
  const u0 = u.next;
  HOURS.forEach((hr, hi) => {
    const row = u.next;
    const vals = WEEKDAYS.map((_, d) => r.agg.heat[d][hi]);
    const max = Math.max(...r.agg.heat.flat());
    u.row([t(`${hr}:00`), ...vals.map((v) => ({ v, fmt: "eur" as const, s: "calc" as const, bg: `rgba(24,185,121,${(0.08 + (v / max) * 0.6).toFixed(2)})` })), fx(sum(vals), `SUM(B${row}:H${row})`, "eur", "sub")]);
  });
  u.row([t("Totaal", "total"), ...WEEKDAYS.map((_, d) => fx(r.agg.days[d], `SUM(${colLetter(d + 1)}${u0}:${colLetter(d + 1)}${u.next - 1})`, "eur", "total")), fx(r.agg.revenue, `SUM(I${u0}:I${u.next - 1})`, "eur", "total")]);
  const uur = u.build("Omzet per uur", [64, ...Array(7).fill(84), 100], 3);

  const v = new SheetBuilder();
  v.row([t("Vestigingen vergelijken", "title", { span: 4 })]);
  v.blank();
  v.row([h("Kengetal"), ...r.per.map((p) => h(p.name)), h("Groep")]);
  const tot = { rev: sum(r.per.map((p) => p.revenue)), cov: sum(r.per.map((p) => p.covers)), cogs: sum(r.per.map((p) => p.cogs)), staff: sum(r.per.map((p) => p.staff)) };
  const rr = v.next;
  v.row([t("Omzet per week"), ...r.per.map((p) => n(p.revenue)), fx(tot.rev, `SUM(B${rr}:D${rr})`, "eur", "sub")]);
  v.row([t("Gasten per week"), ...r.per.map((p) => n(p.covers, "int")), fx(tot.cov, `SUM(B${rr + 1}:D${rr + 1})`, "int", "sub")]);
  v.row([t("Gemiddelde besteding"), ...r.per.map((p, i) => fx(p.avgSpend, `${colLetter(i + 1)}${rr}/${colLetter(i + 1)}${rr + 1}`, "eur2")), fx(tot.rev / tot.cov, `E${rr}/E${rr + 1}`, "eur2", "sub")]);
  v.row([t("Brutomarge %"), ...r.per.map((p) => n(p.gm, "pct")), n((tot.rev - tot.cogs) / tot.rev, "pct", "sub")]);
  v.row([t("Personeelskosten %"), ...r.per.map((p) => n(p.staffPct, "pct", p.staffPct > 0.36 ? "warn" : "calc")), n(tot.staff / tot.rev, "pct", "sub")]);
  v.row([t("Omzet per openingsuur"), ...r.per.map((p) => n(p.perOpenHour)), null]);
  v.row([t("Personeelskosten > 36% krijgen een signaalkleur.", "note", { span: 4 })]);
  v.blank();
  v.row([h("Controle"), h("Status")]);
  horecaChecks(r).forEach((c) => v.row([t(c.label), check(c.ok, "Controleren")]));
  const vergelijk = v.build("Vestigingen", [200, 110, 110, 110, 110]);
  return [omzet, uur, vergelijk];
}
