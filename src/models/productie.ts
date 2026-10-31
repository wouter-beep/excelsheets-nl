/**
 * Model 7 — Productie- en efficiëntiedashboard, Molenbeek Precisietechniek B.V. (fictief).
 * Twaalf weken (wk 33–44, 2026) voor vier processtappen.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, check, type GridSheet } from "@/lib/sheet/types";

export const WEEK_LABELS = Array.from({ length: 12 }, (_, i) => `wk ${33 + i}`);
export const PROCESSES = [
  { key: "zag", name: "Zagen", norm: 6.0, matKg: 1.85, machineCap: 76, base: 2600, pattern: [1, 1.02, 0.98, 1.05, 1.04, 0.92, 1.01, 1.06, 1.03, 0.99, 1.07, 1.05], scrap: [1.2, 1.1, 1.4, 1.0, 1.3, 1.6, 1.2, 1.0, 0.9, 1.1, 1.0, 0.9] },
  { key: "fre", name: "CNC-frezen", norm: 2.4, matKg: 0.0, machineCap: 152, base: 1850, pattern: [1, 1.01, 0.97, 1.03, 1.06, 0.88, 0.95, 1.04, 1.08, 1.02, 1.05, 1.09], scrap: [2.6, 2.4, 3.1, 2.2, 2.0, 3.8, 3.2, 2.1, 1.9, 2.0, 1.8, 1.7] },
  { key: "dra", name: "Draaien", norm: 3.1, matKg: 0.0, machineCap: 114, base: 2100, pattern: [0.98, 1.03, 1.0, 1.02, 0.97, 0.9, 1.04, 1.05, 1.01, 1.06, 1.02, 1.04], scrap: [1.8, 1.6, 1.7, 1.9, 2.2, 2.6, 1.7, 1.5, 1.6, 1.4, 1.5, 1.3] },
  { key: "ass", name: "Assemblage", norm: 1.6, matKg: 0.42, machineCap: 0, base: 1500, pattern: [1, 1.04, 0.99, 1.02, 1.05, 0.86, 0.97, 1.03, 1.06, 1.04, 1.08, 1.06], scrap: [0.8, 0.7, 0.9, 0.6, 0.7, 1.2, 0.9, 0.6, 0.5, 0.6, 0.5, 0.5] },
] as const;
export type ProcKey = (typeof PROCESSES)[number]["key"];
const ON_TIME = [91.2, 92.5, 89.8, 93.1, 94.0, 86.4, 88.9, 93.6, 95.2, 94.4, 95.8, 96.1];
const ORDERS = [148, 152, 139, 155, 158, 131, 142, 156, 161, 157, 163, 166];

export type ProdState = { proc: "alle" | ProcKey; weeks: 4 | 8 | 12 };
export const defaultProd: ProdState = { proc: "alle", weeks: 12 };

export function computeProd(s: ProdState) {
  const rows = PROCESSES.map((p) => ({
    p,
    weeks: p.pattern.map((k, w) => {
      const produced = Math.round(p.base * k);
      const rejected = Math.round((produced * p.scrap[w]) / 100);
      const laborH = Math.round((produced / p.norm) * (1 + (p.scrap[w] - 1.2) / 25) * 10) / 10;
      const machineUsed = p.machineCap ? Math.round(p.machineCap * Math.min(0.97, 0.7 + (k - 0.86) * 1.1) * 10) / 10 : 0;
      const matNorm = p.matKg * produced;
      const matActual = Math.round(matNorm * (1 + p.scrap[w] / 100 + 0.006) );
      return { produced, rejected, good: produced - rejected, laborH, machineUsed, machineCap: p.machineCap, matNorm: Math.round(matNorm), matActual };
    }),
  }));
  const from = 12 - s.weeks;
  const sel = s.proc === "alle" ? rows : rows.filter((r) => r.p.key === s.proc);
  const wk = (i: number) => {
    const ws = sel.map((r) => r.weeks[i]);
    return { produced: sum(ws.map((w) => w.produced)), rejected: sum(ws.map((w) => w.rejected)), good: sum(ws.map((w) => w.good)), laborH: sum(ws.map((w) => w.laborH)), machineUsed: sum(ws.map((w) => w.machineUsed)), machineCap: sum(ws.map((w) => w.machineCap)), matNorm: sum(ws.map((w) => w.matNorm)), matActual: sum(ws.map((w) => w.matActual)) };
  };
  const series = Array.from({ length: 12 }, (_, i) => wk(i)).slice(from);
  const tot = series.reduce((a, w) => ({ produced: a.produced + w.produced, rejected: a.rejected + w.rejected, good: a.good + w.good, laborH: a.laborH + w.laborH, machineUsed: a.machineUsed + w.machineUsed, machineCap: a.machineCap + w.machineCap, matNorm: a.matNorm + w.matNorm, matActual: a.matActual + w.matActual }));
  const onTime = ON_TIME.slice(from), orders = ORDERS.slice(from);
  const delivered = sum(orders.map((o, i) => Math.round((o * onTime[i]) / 100)));
  const byProc = rows.map((r) => {
    const ws = r.weeks.slice(from);
    const prod = sum(ws.map((w) => w.produced)), rej = sum(ws.map((w) => w.rejected));
    return { key: r.p.key, name: r.p.name, produced: prod, scrapPct: rej / prod, productivity: sum(ws.map((w) => w.good)) / sum(ws.map((w) => w.laborH)), occupancy: r.p.machineCap ? sum(ws.map((w) => w.machineUsed)) / (r.p.machineCap * ws.length) : null };
  });
  return {
    rows, series, labels: WEEK_LABELS.slice(from), tot, byProc,
    scrapPct: tot.rejected / tot.produced, productivity: tot.good / tot.laborH, materialVar: tot.matNorm ? tot.matActual / tot.matNorm - 1 : 0,
    occupancy: tot.machineCap ? tot.machineUsed / tot.machineCap : 0, onTime: delivered / sum(orders), orders: sum(orders), delivered, onTimeSeries: onTime,
  };
}
export type ProdResult = ReturnType<typeof computeProd>;

export const prodChecks = (r: ProdResult) => [
  { label: "Goed + afgekeurd = geproduceerd", ok: r.tot.good + r.tot.rejected === r.tot.produced },
  { label: "Machine-uren binnen capaciteit", ok: r.series.every((w) => w.machineUsed <= w.machineCap || w.machineCap === 0) },
];

export function prodSheets(s: ProdState, r: ProdResult): GridSheet[] {
  const name = s.proc === "alle" ? "Alle processen" : PROCESSES.find((p) => p.key === s.proc)!.name;
  const b = new SheetBuilder();
  b.row([t(`Productie per week — ${name}`, "title", { span: 4 })]);
  b.blank();
  b.row([h("Week"), h("Geproduceerd"), h("Afgekeurd"), h("Uitval %"), h("Goed"), h("Arbeidsuren"), h("Stuks / uur"), h("Materiaal norm (kg)"), h("Materiaal werkelijk (kg)"), h("Afwijking")]);
  const f0 = b.next;
  r.series.forEach((w, i) => {
    const row = b.next;
    const sp = w.rejected / w.produced;
    b.row([t(r.labels[i]), n(w.produced, "int"), n(w.rejected, "int"), fx(sp, `IF(B${row}=0,0,C${row}/B${row})`, "pct", sp > 0.025 ? "warn" : "calc"), fx(w.good, `B${row}-C${row}`, "int"), n(w.laborH, "num1"),
      fx(w.good / w.laborH, `IF(F${row}=0,0,E${row}/F${row})`, "num2"), n(w.matNorm, "int", "muted"), n(w.matActual, "int"), fx(w.matNorm ? w.matActual / w.matNorm - 1 : 0, `IF(H${row}=0,0,I${row}/H${row}-1)`, "pct")]);
  });
  const l = b.next - 1, tr = b.next;
  b.row([t("Totaal", "total"), fx(r.tot.produced, `SUM(B${f0}:B${l})`, "int", "total"), fx(r.tot.rejected, `SUM(C${f0}:C${l})`, "int", "total"), fx(r.scrapPct, `IF(B${tr}=0,0,C${tr}/B${tr})`, "pct", "total"),
    fx(r.tot.good, `SUM(E${f0}:E${l})`, "int", "total"), fx(r.tot.laborH, `SUM(F${f0}:F${l})`, "num1", "total"), fx(r.productivity, `IF(F${tr}=0,0,E${tr}/F${tr})`, "num2", "total"),
    fx(r.tot.matNorm, `SUM(H${f0}:H${l})`, "int", "total"), fx(r.tot.matActual, `SUM(I${f0}:I${l})`, "int", "total"), fx(r.materialVar, `IF(H${tr}=0,0,I${tr}/H${tr}-1)`, "pct", "total")]);
  b.row([t("Uitval boven 2,5% krijgt een signaalkleur.", "note", { span: 5 })]);
  const productie = b.build("Productie", [70, 104, 90, 80, 90, 96, 90, 128, 150, 86], 3);

  const m = new SheetBuilder();
  m.row([t("Machinecapaciteit per proces", "title", { span: 4 })]);
  m.blank();
  m.row([h("Proces"), h("Capaciteit / week (u)"), h("Gebruikt (u)"), h("Bezetting"), h("Uitval %"), h("Stuks / uur")]);
  r.byProc.forEach((p) => {
    const cap = PROCESSES.find((x) => x.key === p.key)!.machineCap * r.series.length;
    const row = m.next;
    m.row([t(p.name), cap ? n(cap / r.series.length, "num1") : t("n.v.t.", "muted"), cap ? n((p.occupancy ?? 0) * cap, "num1") : null, cap ? fx(p.occupancy ?? 0, `IF(B${row}=0,0,C${row}/(B${row}*${r.series.length}))`, "pct", (p.occupancy ?? 0) > 0.9 ? "warn" : "calc") : null, n(p.scrapPct, "pct"), n(p.productivity, "num2")]);
  });
  m.blank();
  m.row([h("Levering"), h("Waarde")]);
  m.row([t("Orders in periode"), n(r.orders, "int")]);
  m.row([t("Op tijd geleverd"), n(r.delivered, "int")]);
  m.row([t("Leverbetrouwbaarheid", "total"), fx(r.onTime, `IF(B${m.next - 2}=0,0,B${m.next - 1}/B${m.next - 2})`, "pct", "total")]);
  m.blank();
  m.row([h("Controle"), h("Status")]);
  prodChecks(r).forEach((c) => m.row([t(c.label), check(c.ok, "Controleren")]));
  const machines = m.build("Machines & levering", [180, 150, 110, 96, 90, 90]);
  return [productie, machines];
}
