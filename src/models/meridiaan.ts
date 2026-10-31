/**
 * Model 2 — Jaarbegroting en rolling forecast, Meridiaan Services B.V. (fictief)
 * Facilitaire dienstverlener met vier afdelingen + staf. Realisatie t/m peilmaand.
 */
import { MONTHS, sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, inp, check, colLetter, type GridSheet } from "@/lib/sheet/types";

export const LEDGER = [
  { code: "8000", name: "Netto-omzet", kind: "rev" },
  { code: "7000", name: "Inkoop en uitbesteed werk", kind: "var" },
  { code: "4000", name: "Personeelskosten", kind: "pers" },
  { code: "4300", name: "Huisvesting", kind: "fix" },
  { code: "4500", name: "Auto en transport", kind: "fix" },
  { code: "4700", name: "Kantoor en ICT", kind: "fix" },
  { code: "4800", name: "Verkoop en marketing", kind: "fix" },
] as const;
type Code = (typeof LEDGER)[number]["code"];

export const UNITS = [
  { key: "sch", name: "Schoonmaak", rev: 4_800_000, var: 0.06, pers: 0.72, persVar: 0.8, fix: { "4300": 40_000, "4500": 120_000, "4700": 30_000, "4800": 20_000 }, dev: [0.01, -0.02, 0.02, 0.03, 0.01, 0.04, 0.02, 0.03, 0.05] },
  { key: "fac", name: "Facilitair beheer", rev: 2_900_000, var: 0.38, pers: 0.34, persVar: 0.5, fix: { "4300": 30_000, "4500": 60_000, "4700": 42_000, "4800": 35_000 }, dev: [-0.03, -0.05, -0.02, -0.04, -0.06, -0.03, -0.05, -0.04, -0.06] },
  { key: "bev", name: "Beveiliging", rev: 2_100_000, var: 0.04, pers: 0.68, persVar: 0.8, fix: { "4300": 24_000, "4500": 85_000, "4700": 26_000, "4800": 15_000 }, dev: [0.02, 0.01, 0.0, 0.02, 0.03, 0.01, 0.06, 0.04, 0.02] },
  { key: "prj", name: "Projecten", rev: 1_400_000, var: 0.45, pers: 0.22, persVar: 0.3, fix: { "4300": 12_000, "4500": 30_000, "4700": 18_000, "4800": 40_000 }, dev: [-0.1, 0.05, 0.08, -0.04, 0.12, 0.02, -0.15, 0.06, 0.09] },
  { key: "stf", name: "Staf", rev: 0, var: 0, pers: 0, persVar: 0, persFix: 780_000, fix: { "4300": 210_000, "4500": 40_000, "4700": 160_000, "4800": 90_000 }, dev: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
] as const;
export type UnitKey = (typeof UNITS)[number]["key"];

const SEASON = [0.08, 0.08, 0.085, 0.083, 0.084, 0.083, 0.074, 0.072, 0.086, 0.088, 0.085, 0.08];
const SEASON_PRJ = [0.06, 0.07, 0.085, 0.09, 0.095, 0.095, 0.06, 0.055, 0.095, 0.1, 0.1, 0.095];
export const LAST_ACTUAL = 9;

export type MeridiaanState = { peil: number; unit: "alle" | UnitKey; growth: number; indexation: number };
export const defaultMeridiaan: MeridiaanState = { peil: 9, unit: "alle", growth: 0, indexation: 0.0 };

const r0 = Math.round;
type Line = Record<Code, number>;
const zero = (): Line => ({ "8000": 0, "7000": 0, "4000": 0, "4300": 0, "4500": 0, "4700": 0, "4800": 0 });

export function computeMeridiaan(s: MeridiaanState) {
  const units = UNITS.map((u) => {
    const season = u.key === "prj" ? SEASON_PRJ : SEASON;
    const persAnnual = "persFix" in u ? u.persFix : u.rev * u.pers;
    const ytdDev = s.peil ? sum(u.dev.slice(0, s.peil)) / s.peil : 0;
    const months = season.map((w, m) => {
      const b = zero();
      b["8000"] = r0(u.rev * w);
      b["7000"] = r0(b["8000"] * u.var);
      b["4000"] = r0(persAnnual / 12);
      (Object.keys(u.fix) as (keyof typeof u.fix)[]).forEach((c) => (b[c as Code] = r0((u.fix as Record<string, number>)[c] / 12)));
      let a: Line | null = null;
      if (m < s.peil) {
        a = zero();
        const d = u.dev[m];
        a["8000"] = r0(b["8000"] * (1 + d));
        a["7000"] = r0(a["8000"] * u.var * (1 + (m % 2 ? 0.02 : -0.01)));
        a["4000"] = r0(b["4000"] * (1 + d * u.persVar + (m >= 6 ? 0.012 : 0)));
        (["4300", "4500", "4700", "4800"] as Code[]).forEach((c, i) => (a![c] = r0(b[c] * (1 + [0.01, 0.05, -0.03, 0.08][i] * (m % 3 === 1 ? 1 : 0.4)))));
      }
      // Prognose: budget × (1 + trend + groei); variabele kosten en het variabele deel van personeel bewegen mee.
      const f = zero();
      const chg = ytdDev + s.growth;
      f["8000"] = r0(b["8000"] * (1 + chg));
      f["7000"] = r0(f["8000"] * u.var);
      f["4000"] = r0(b["4000"] * (1 + chg * u.persVar) * (1 + s.indexation));
      (["4300", "4500", "4700", "4800"] as Code[]).forEach((c) => (f[c] = b[c]));
      return { b, a, f, fc: a ?? f };
    });
    return { unit: u, months };
  });
  const sel = s.unit === "alle" ? units : units.filter((u) => u.unit.key === s.unit);
  const total = (pick: (m: (typeof units)[number]["months"][number]) => Line | null, from = 0, to = 12): Line => {
    const out = zero();
    sel.forEach((u) => u.months.slice(from, to).forEach((m) => { const l = pick(m); if (l) (Object.keys(out) as Code[]).forEach((c) => (out[c] += l[c])); }));
    return out;
  };
  const ebitda = (l: Line) => l["8000"] - l["7000"] - l["4000"] - l["4300"] - l["4500"] - l["4700"] - l["4800"];
  const gross = (l: Line) => l["8000"] - l["7000"];
  const budgetYear = total((m) => m.b);
  const budgetYtd = total((m) => m.b, 0, s.peil);
  const actualYtd = total((m) => m.a, 0, s.peil);
  const forecastRest = total((m) => m.f, s.peil, 12);
  const forecastYear = zero();
  (Object.keys(forecastYear) as Code[]).forEach((c) => (forecastYear[c] = actualYtd[c] + forecastRest[c]));
  const monthly = Array.from({ length: 12 }, (_, m) => {
    const b = total((x) => x.b, m, m + 1), fc = total((x) => x.fc, m, m + 1);
    return { m, b, fc, isActual: m < s.peil, ebitdaB: ebitda(b), ebitdaF: ebitda(fc) };
  });
  const byUnit = units.map((u) => {
    const a = zero(), f = zero(), b = zero();
    u.months.forEach((m, i) => (Object.keys(a) as Code[]).forEach((c) => { b[c] += m.b[c]; f[c] += m.fc[c]; if (i < s.peil) a[c] += m.a![c]; }));
    return { key: u.unit.key, name: u.unit.name, budget: b, forecast: f, ebitdaB: ebitda(b), ebitdaF: ebitda(f) };
  });
  return { units, budgetYear, budgetYtd, actualYtd, forecastRest, forecastYear, monthly, byUnit, ebitda, gross };
}
export type MeridiaanResult = ReturnType<typeof computeMeridiaan>;

export function meridiaanChecks(r: MeridiaanResult, s: MeridiaanState) {
  const fy = r.forecastYear, sumMonths = sum(r.monthly.map((m) => m.ebitdaF));
  return [
    { label: "Forecast = realisatie + prognose", ok: Math.abs(r.ebitda(fy) - sumMonths) < 2 },
    { label: "Afdelingen tellen op tot totaal", ok: s.unit !== "alle" || Math.abs(sum(r.byUnit.map((u) => u.ebitdaF)) - r.ebitda(fy)) < 2 },
    { label: "Budgetmaanden tellen op tot jaarbudget", ok: Math.abs(sum(r.monthly.map((m) => m.ebitdaB)) - r.ebitda(r.budgetYear)) < 2 },
  ];
}

export function meridiaanSheets(s: MeridiaanState, r: MeridiaanResult): GridSheet[] {
  const unitName = s.unit === "alle" ? "Totaal onderneming" : UNITS.find((u) => u.key === s.unit)!.name;
  const sel = s.unit === "alle" ? r.units : r.units.filter((u) => u.unit.key === s.unit);
  // Begroting: grootboek × maanden
  const b = new SheetBuilder();
  b.row([t(`Begroting 2026 — ${unitName}`, "title", { span: 5 })]);
  b.blank();
  b.row([h("Grootboek"), h("Omschrijving"), ...MONTHS.map((m) => h(m)), h("Totaal")]);
  const first = b.next;
  LEDGER.forEach((g) => {
    const row = b.next;
    const vals = Array.from({ length: 12 }, (_, m) => sum(sel.map((u) => u.months[m].b[g.code])));
    b.row([t(g.code, "muted"), t(g.name), ...vals.map((v) => n(v)), fx(sum(vals), `SUM(C${row}:N${row})`, "eur", "sub")]);
  });
  const er = b.next;
  b.row([t("", "total"), t("EBITDA", "total"), ...Array.from({ length: 13 }, (_, i) => {
    const c = colLetter(i + 2);
    const v = i < 12 ? r.monthly[i].ebitdaB : r.ebitda(r.budgetYear);
    return fx(v, `${c}${first}-SUM(${c}${first + 1}:${c}${first + 6})`, "eur", "total");
  })]);
  b.row([null, t("EBITDA-marge", "muted"), ...Array.from({ length: 13 }, (_, i) => {
    const c = colLetter(i + 2);
    const rev = i < 12 ? r.monthly[i].b["8000"] : r.budgetYear["8000"];
    const e = i < 12 ? r.monthly[i].ebitdaB : r.ebitda(r.budgetYear);
    return fx(rev ? e / rev : 0, `IF(${c}${first}=0,0,${c}${er}/${c}${first})`, "pct", "muted");
  })]);
  const begroting = b.build("Begroting", [70, 190, ...Array(12).fill(92), 108], 3);

  // Realisatie vs budget t/m peilmaand
  const v = new SheetBuilder();
  v.row([t(`Realisatie versus budget t/m ${MONTHS[s.peil - 1]} — ${unitName}`, "title", { span: 5 })]);
  v.blank();
  v.row([h("Grootboek"), h("Omschrijving"), h("Realisatie"), h("Budget"), h("Verschil"), h("Verschil %")]);
  const vf = v.next;
  LEDGER.forEach((g) => {
    const row = v.next;
    const a = r.actualYtd[g.code], bb = r.budgetYtd[g.code];
    const fav = g.kind === "rev" ? a - bb >= 0 : a - bb <= 0;
    v.row([t(g.code, "muted"), t(g.name), n(a), n(bb, "eur", "muted"), fx(a - bb, `C${row}-D${row}`, "eur", fav ? "pos" : "neg", g.kind === "rev" ? "Positief = meer omzet dan begroot" : "Positief = hogere kosten dan begroot"),
      fx(bb ? (a - bb) / bb : 0, `IF(D${row}=0,0,E${row}/D${row})`, "pct", fav ? "pos" : "neg")]);
  });
  const ve = v.next;
  v.row([t("", "total"), t("EBITDA", "total"), fx(r.ebitda(r.actualYtd), `C${vf}-SUM(C${vf + 1}:C${vf + 6})`, "eur", "total"), fx(r.ebitda(r.budgetYtd), `D${vf}-SUM(D${vf + 1}:D${vf + 6})`, "eur", "total"),
    fx(r.ebitda(r.actualYtd) - r.ebitda(r.budgetYtd), `C${ve}-D${ve}`, "eur", "total"), fx(r.ebitda(r.budgetYtd) ? (r.ebitda(r.actualYtd) - r.ebitda(r.budgetYtd)) / Math.abs(r.ebitda(r.budgetYtd)) : 0, `IF(D${ve}=0,0,E${ve}/ABS(D${ve}))`, "pct", "total")]);
  v.row([null, t("Brutoresultaat", "sub"), fx(r.gross(r.actualYtd), `C${vf}-C${vf + 1}`, "eur", "sub"), fx(r.gross(r.budgetYtd), `D${vf}-D${vf + 1}`, "eur", "sub")]);
  const realisatie = v.build("Realisatie vs budget", [70, 200, 116, 116, 110, 90], 3);

  // Forecast
  const f = new SheetBuilder();
  f.row([t(`Rolling forecast 2026 — ${unitName}`, "title", { span: 5 })]);
  f.row([t(`Realisatie t/m ${MONTHS[s.peil - 1]} + prognose ${s.peil < 12 ? MONTHS[s.peil] + "–dec" : "—"}`, "subtitle", { span: 6 })]);
  f.blank();
  f.row([h("Grootboek"), h("Omschrijving"), h("Realisatie YTD"), h("Prognose rest"), h("Forecast jaar"), h("Budget jaar"), h("Verschil")]);
  const ff = f.next;
  LEDGER.forEach((g) => {
    const row = f.next;
    const fy = r.forecastYear[g.code], by = r.budgetYear[g.code];
    const fav = g.kind === "rev" ? fy - by >= 0 : fy - by <= 0;
    f.row([t(g.code, "muted"), t(g.name), n(r.actualYtd[g.code]), n(r.forecastRest[g.code], "eur", "calc", { note: "Budget × (1 + trend + groei-aanname); variabele kosten bewegen mee" }),
      fx(fy, `C${row}+D${row}`, "eur", "sub"), n(by, "eur", "muted"), fx(fy - by, `E${row}-F${row}`, "eur", fav ? "pos" : "neg")]);
  });
  const fe = f.next;
  f.row([t("", "total"), t("EBITDA", "total"), ...["C", "D", "E", "F"].map((c, i) => {
    const vals = [r.ebitda(r.actualYtd), r.ebitda(r.forecastRest), r.ebitda(r.forecastYear), r.ebitda(r.budgetYear)];
    return fx(vals[i], `${c}${ff}-SUM(${c}${ff + 1}:${c}${ff + 6})`, "eur", "total");
  }), fx(r.ebitda(r.forecastYear) - r.ebitda(r.budgetYear), `E${fe}-F${fe}`, "eur", "total")]);
  const forecast = f.build("Forecast", [70, 200, 116, 116, 116, 116, 110], 4);

  // Aannames
  const a = new SheetBuilder();
  a.row([t("Aannames", "title", { span: 3 })]);
  a.row([t("Gele cellen zijn invoer. De prognose rekent direct opnieuw.", "subtitle", { span: 4 })]);
  a.blank();
  a.row([t("Peilmaand (1–9)"), inp(s.peil, "peil", "int", { min: 1, max: LAST_ACTUAL, step: 1 })]);
  a.row([t("Omzetgroei prognose t.o.v. trend"), inp(s.growth, "growth", "pct", { min: -0.3, max: 0.3, note: "Werkt door in omzet, inkoop en variabel personeel" })]);
  a.row([t("Loonindexatie resterende maanden"), inp(s.indexation, "indexation", "pct", { min: 0, max: 0.1 })]);
  a.blank();
  a.row([h("Afdeling"), h("Jaaromzet budget"), h("Inkoop % omzet"), h("Personeel % omzet"), h("Variabel deel personeel")]);
  UNITS.filter((u) => u.rev > 0).forEach((u) => a.row([t(u.name), n(u.rev), n(u.var, "pct"), n(u.pers, "pct"), n(u.persVar, "pct")]));
  a.blank();
  a.row([h("Controle"), h("Status")]);
  meridiaanChecks(r, s).forEach((c) => a.row([t(c.label), check(c.ok, "Controleren")]));
  const aannames = a.build("Aannames", [260, 130, 120, 130, 150]);
  return [begroting, realisatie, forecast, aannames];
}
