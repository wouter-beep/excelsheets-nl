/**
 * Model 5 — Personeelsplanning, Lindewaard Zorg & Welzijn, locatie Oost (fictief).
 * Weekrooster met diensten, bezetting versus behoefte, contracturen en loonkosten.
 * Toeslagpercentages zijn voorbeeldwaarden, geen cao-advies.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, check, colLetter, type GridSheet } from "@/lib/sheet/types";

export const SHIFTS = {
  V: { name: "Vroeg", time: "07:00–15:00", hours: 7.5, color: "#CBF8E0", ort: 0 },
  D: { name: "Dag", time: "09:00–17:30", hours: 8, color: "#E2EBFD", ort: 0 },
  L: { name: "Laat", time: "15:00–23:00", hours: 7.5, color: "#FDF1D8", ort: 0.22 },
  N: { name: "Nacht", time: "23:00–07:30", hours: 8, color: "#E4DCFD", ort: 0.44 },
  VK: { name: "Vakantie", time: "", hours: 0, color: "#EEF2EC", ort: 0 },
  Z: { name: "Ziek", time: "", hours: 0, color: "#FBE3E1", ort: 0 },
  "": { name: "Vrij", time: "", hours: 0, color: "transparent", ort: 0 },
} as const;
export type ShiftCode = keyof typeof SHIFTS;
export const CYCLE: ShiftCode[] = ["", "V", "D", "L", "N", "VK", "Z"];
export const DAYS = ["ma 9/11", "di 10/11", "wo 11/11", "do 12/11", "vr 13/11", "za 14/11", "zo 15/11"];
const DAY_ORT = [0, 0, 0, 0, 0, 0.38, 0.6];

export const EMPLOYEES = [
  { name: "Anouk B.", role: "Verpleegkundige", contract: 32, wage: 27.4 },
  { name: "Sem de V.", role: "Verzorgende IG", contract: 36, wage: 23.9 },
  { name: "Fatima E.", role: "Verzorgende IG", contract: 28, wage: 23.9 },
  { name: "Jeroen K.", role: "Verpleegkundige", contract: 36, wage: 28.1 },
  { name: "Lotte M.", role: "Verzorgende IG", contract: 24, wage: 22.6 },
  { name: "Daan P.", role: "Helpende", contract: 32, wage: 19.8 },
  { name: "Esra Y.", role: "Verzorgende IG", contract: 32, wage: 23.2 },
  { name: "Ruben H.", role: "Helpende", contract: 20, wage: 19.2 },
  { name: "Mila S.", role: "Verzorgende IG", contract: 36, wage: 24.5 },
  { name: "Thijs v.D.", role: "Leerling-verzorgende", contract: 24, wage: 15.9 },
];

export const DEFAULT_ROSTER: ShiftCode[][] = [
  ["V", "V", "", "N", "N", "", ""],
  ["L", "L", "", "", "V", "N", "N"],
  ["V", "", "V", "L", "", "", "L"],
  ["N", "N", "N", "", "", "V", "V"],
  ["", "V", "L", "V", "", "", ""],
  ["D", "D", "V", "D", "", "", ""],
  ["L", "L", "L", "", "L", "", "V"],
  ["", "", "", "L", "D", "V", ""],
  ["VK", "VK", "VK", "VK", "VK", "", ""],
  ["", "", "D", "V", "V", "L", ""],
];

export const DEMAND: Record<"V" | "D" | "L" | "N", number[]> = {
  V: [2, 2, 2, 2, 2, 2, 2],
  D: [1, 1, 1, 1, 1, 0, 0],
  L: [2, 2, 2, 2, 2, 1, 1],
  N: [1, 1, 1, 1, 1, 1, 1],
};

export type PlanState = { roster: ShiftCode[][]; burden: number };
export const defaultPlan: PlanState = { roster: DEFAULT_ROSTER, burden: 0.32 };

export function computePlan(s: PlanState) {
  const perEmployee = EMPLOYEES.map((e, i) => {
    const row = s.roster[i];
    const hours = sum(row.map((c) => SHIFTS[c].hours));
    const leave = row.filter((c) => c === "VK" || c === "Z").length;
    const cost = sum(row.map((c, d) => SHIFTS[c].hours * e.wage * (1 + Math.max(SHIFTS[c].ort, SHIFTS[c].hours ? DAY_ORT[d] : 0)))) * (1 + s.burden);
    const target = e.contract - leave * (e.contract / 5);
    const restIssue = row.some((c, d) => c === "N" && (row[d + 1] === "V" || row[d + 1] === "D"));
    const signal = restIssue ? "Rusttijd na nachtdienst" : hours > target + 4 ? "Boven contract" : hours < target - 8 ? "Onder contract" : null;
    return { ...e, hours, target, cost, signal };
  });
  const coverage = (Object.keys(DEMAND) as (keyof typeof DEMAND)[]).map((k) => ({
    code: k,
    planned: DAYS.map((_, d) => s.roster.filter((r) => r[d] === k).length),
    needed: DEMAND[k],
  }));
  const gaps = coverage.flatMap((c) => c.planned.map((p, d) => ({ code: c.code, day: d, diff: p - c.needed[d] }))).filter((g) => g.diff < 0);
  const totalHours = sum(perEmployee.map((e) => e.hours));
  const totalCost = sum(perEmployee.map((e) => e.cost));
  const dayCost = DAYS.map((_, d) => sum(EMPLOYEES.map((e, i) => { const c = s.roster[i][d]; return SHIFTS[c].hours * e.wage * (1 + Math.max(SHIFTS[c].ort, SHIFTS[c].hours ? DAY_ORT[d] : 0)) * (1 + s.burden); })));
  return { perEmployee, coverage, gaps, totalHours, totalCost, dayCost };
}
export type PlanResult = ReturnType<typeof computePlan>;

export const planChecks = (r: PlanResult) => [
  { label: "Alle diensten voldoende bezet", ok: r.gaps.length === 0 },
  { label: "Geen signaleringen per medewerker", ok: r.perEmployee.every((e) => !e.signal) },
  { label: "Loonkosten per dag tellen op tot weektotaal", ok: Math.abs(sum(r.dayCost) - r.totalCost) < 0.5 },
];

export function planSheets(s: PlanState, r: PlanResult): GridSheet[] {
  const b = new SheetBuilder();
  b.row([t("Bezetting versus behoefte — week 46", "title", { span: 4 })]);
  b.blank();
  b.row([h("Dienst"), h("Regel"), ...DAYS.map(h)]);
  r.coverage.forEach((c) => {
    b.row([t(`${c.code} · ${SHIFTS[c.code].name}`), t("Gepland", "muted"), ...c.planned.map((v) => n(v, "int"))]);
    b.row([null, t("Behoefte", "muted"), ...c.needed.map((v) => n(v, "int", "muted"))]);
    const row = b.next;
    b.row([null, t("Verschil", "sub"), ...c.planned.map((v, d) => fx(v - c.needed[d], `${colLetter(d + 2)}${row - 2}-${colLetter(d + 2)}${row - 1}`, "int", v - c.needed[d] < 0 ? "check-bad" : "check-ok"))]);
  });
  const bezetting = b.build("Bezetting", [120, 90, ...Array(7).fill(78)], 3);

  const u = new SheetBuilder();
  u.row([t("Uren en loonkosten per medewerker", "title", { span: 4 })]);
  u.row([t(`Werkgeverslasten ${Math.round(s.burden * 100)}% · toeslagen zijn voorbeeldpercentages`, "subtitle", { span: 6 })]);
  u.blank();
  u.row([h("Medewerker"), h("Functie"), h("Contract"), h("Norm week"), h("Gepland"), h("Verschil"), h("Uurloon"), h("Loonkosten"), h("Signalering")]);
  const f0 = u.next;
  r.perEmployee.forEach((e) => {
    const row = u.next;
    u.row([t(e.name), t(e.role, "muted"), n(e.contract, "num1"), n(e.target, "num1", "muted", { note: "Contracturen minus verlof/ziekte (contract / 5 per dag)" }), n(e.hours, "num1"),
      fx(e.hours - e.target, `E${row}-D${row}`, "num1", e.hours - e.target < -8 || e.hours - e.target > 4 ? "warn" : "calc"), n(e.wage, "eur2"), n(e.cost, "eur", "calc", { note: "Uren × uurloon × (1 + toeslag) × (1 + werkgeverslasten)" }),
      e.signal ? t(e.signal, "warn") : t("OK", "check-ok")]);
  });
  const l = u.next - 1;
  u.row([t("Totaal", "total"), null, fx(sum(EMPLOYEES.map((e) => e.contract)), `SUM(C${f0}:C${l})`, "num1", "total"), null, fx(r.totalHours, `SUM(E${f0}:E${l})`, "num1", "total"), null, null, fx(r.totalCost, `SUM(H${f0}:H${l})`, "eur", "total"), null]);
  const uren = u.build("Uren & loonkosten", [110, 150, 74, 84, 74, 74, 80, 104, 170], 4);

  const m = new SheetBuilder();
  m.row([t("Diensten en toeslagen", "title", { span: 3 })]);
  m.blank();
  m.row([h("Code"), h("Dienst"), h("Tijden"), h("Uren"), h("Toeslag")]);
  (Object.keys(SHIFTS) as ShiftCode[]).filter((c) => c).forEach((c) => m.row([{ v: c, s: "shift", bg: SHIFTS[c].color, fmt: "text" }, t(SHIFTS[c].name), t(SHIFTS[c].time, "muted"), n(SHIFTS[c].hours, "num1"), n(SHIFTS[c].ort, "pct")]));
  m.row([t("za", "muted"), t("Zaterdagtoeslag"), null, null, n(0.38, "pct")]);
  m.row([t("zo", "muted"), t("Zondagtoeslag"), null, null, n(0.6, "pct")]);
  m.row([t("De hoogste toeslag per dienst telt. Voorbeeldwaarden; stem af op de geldende cao.", "note", { span: 5 })]);
  const diensten = m.build("Diensten", [60, 110, 110, 70, 80]);
  return [bezetting, uren, diensten];
}
