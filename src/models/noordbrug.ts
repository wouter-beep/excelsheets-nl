/**
 * Model 1 — Managementdashboard Noordbrug Groep B.V. (fictief)
 * Technisch dienstverlener met drie afdelingen. Boekjaar 2026, realisatie t/m september.
 */
import { MONTHS, sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, inp, check, A1, type GridSheet } from "@/lib/sheet/types";

export const DEPTS = [
  { key: "inst", name: "Installatie", revenue: 6_200_000, cogs: 0.52, pers: 1_560_000, other: 310_000, fte: 24, py: 0.93,
    dev: [-0.04, -0.02, 0.03, 0.05, 0.02, -0.01, 0.06, 0.04, 0.03], cogsDev: [0.01, 0.015, 0.008, 0.02, 0.012, 0.018, 0.022, 0.015, 0.019], persDev: [1, 1.01, 1.02, 1.03, 1.03, 1.04, 1.02, 1.01, 1.04] },
  { key: "ond", name: "Onderhoud", revenue: 3_800_000, cogs: 0.38, pers: 1_260_000, other: 190_000, fte: 19, py: 0.97,
    dev: [0.02, 0.03, 0.01, -0.02, 0, 0.04, 0.05, 0.02, 0.06], cogsDev: [-0.005, 0, 0.004, -0.008, 0, -0.004, 0.003, -0.006, -0.01], persDev: [1, 0.99, 1, 1.01, 1, 1.02, 0.99, 0.98, 1] },
  { key: "adv", name: "Advies", revenue: 1_600_000, cogs: 0.12, pers: 840_000, other: 120_000, fte: 8, py: 0.95,
    dev: [-0.08, -0.05, -0.03, 0.02, 0.04, -0.06, -0.1, 0.03, 0.01], cogsDev: [0, 0.01, 0, 0, -0.01, 0, 0.01, 0, 0], persDev: [0.98, 0.98, 0.99, 0.98, 0.97, 0.99, 0.98, 0.98, 0.99] },
] as const;
export type DeptKey = (typeof DEPTS)[number]["key"];

export const SEASON = [0.07, 0.074, 0.082, 0.083, 0.085, 0.086, 0.072, 0.064, 0.088, 0.093, 0.096, 0.107];
const PY_PATTERN = [0.01, -0.02, 0.0, 0.015, -0.01, 0.02, -0.015, 0.01, 0.0, 0.01, -0.01, 0.02];
const STAFF_COST = 640_000;
export const LAST_ACTUAL = 9; // september

export type NoordbrugState = { peil: number; dept: "alle" | DeptKey; scenario: number; threshold: number };
export const defaultNoordbrug: NoordbrugState = { peil: 9, dept: "alle", scenario: 0, threshold: 0.03 };

const r0 = (v: number) => Math.round(v);
/** Personeelskosten per maand: vakantiegeld (8%) wordt in mei betaald. */
const persMonth = (annual: number, m: number) => { const base = annual / 12.96; return m === 4 ? base * 1.96 : base; };

export type MonthLine = { rev: number; cogs: number; pers: number; other: number };
export type DeptMonth = { b: MonthLine; a: MonthLine | null; py: MonthLine; f: MonthLine };

export function computeNoordbrug(s: NoordbrugState) {
  const data = DEPTS.map((d) => {
    const ytdDev = sum(d.dev.slice(0, s.peil)) / s.peil;
    return {
      dept: d,
      months: SEASON.map((w, m): DeptMonth => {
        const bRev = r0(d.revenue * w);
        const b: MonthLine = { rev: bRev, cogs: r0(bRev * d.cogs), pers: r0(persMonth(d.pers, m)), other: r0(d.other / 12) };
        const hasA = m < s.peil && m < LAST_ACTUAL;
        const a: MonthLine | null = hasA
          ? (() => { const rev = r0(bRev * (1 + d.dev[m])); return { rev, cogs: r0(rev * (d.cogs + d.cogsDev[m])), pers: r0(b.pers * d.persDev[m]), other: r0(b.other * (1 + (m % 3 === 0 ? 0.06 : -0.02))) }; })()
          : null;
        const pyRev = r0(bRev * d.py * (1 + PY_PATTERN[m]));
        const py: MonthLine = { rev: pyRev, cogs: r0(pyRev * (d.cogs - 0.01)), pers: r0(b.pers * 0.95), other: r0(b.other * 0.97) };
        const fRev = r0(bRev * (1 + ytdDev + s.scenario));
        const f: MonthLine = a ?? { rev: fRev, cogs: r0(fRev * (d.cogs + sum(d.cogsDev.slice(0, s.peil)) / s.peil)), pers: b.pers, other: b.other };
        return { b, a, py, f };
      }),
    };
  });
  const staff = SEASON.map((_, m) => ({ b: r0(STAFF_COST / 12), a: m < s.peil ? r0((STAFF_COST / 12) * (1 + [0.02, -0.01, 0.04, 0, 0.03, 0.05, -0.02, 0.01, 0.02][m])) : null }));

  const sel = s.dept === "alle" ? data : data.filter((d) => d.dept.key === s.dept);
  const withStaff = s.dept === "alle";
  const agg = (pick: (dm: DeptMonth) => MonthLine | null, m: number): MonthLine => {
    const lines = sel.map((d) => pick(d.months[m])).filter(Boolean) as MonthLine[];
    return { rev: sum(lines.map((l) => l.rev)), cogs: sum(lines.map((l) => l.cogs)), pers: sum(lines.map((l) => l.pers)), other: sum(lines.map((l) => l.other)) };
  };
  const months = SEASON.map((_, m) => ({
    m,
    b: agg((x) => x.b, m),
    a: m < s.peil ? agg((x) => x.a, m) : null,
    py: agg((x) => x.py, m),
    f: agg((x) => x.f, m),
    staffB: withStaff ? staff[m].b : 0,
    staffA: withStaff ? (staff[m].a ?? staff[m].b) : 0,
  }));
  const ytd = months.slice(0, s.peil);
  const tot = (k: keyof MonthLine, v: "a" | "b" | "py") => sum(ytd.map((x) => (x[v] as MonthLine)[k]));
  const pl = (v: "a" | "b" | "py") => {
    const rev = tot("rev", v), cogs = tot("cogs", v), pers = tot("pers", v), other = tot("other", v);
    const staffC = v === "a" ? sum(ytd.map((x) => x.staffA)) : sum(ytd.map((x) => x.staffB)) * (v === "py" ? 0.96 : 1);
    const gm = rev - cogs;
    const ebitda = gm - pers - other - r0(staffC);
    return { rev, cogs, gm, gmPct: rev ? gm / rev : 0, pers, other, staff: r0(staffC), ebitda, ebitdaPct: rev ? ebitda / rev : 0 };
  };
  const A = pl("a"), B = pl("b"), PY = pl("py");
  const fy = {
    rev: sum(months.map((x) => (x.a ?? x.f).rev)),
    ebitda: sum(months.map((x) => { const l = x.a ?? x.f; return l.rev - l.cogs - l.pers - l.other - (x.a ? x.staffA : x.staffB); })),
    budgetRev: sum(months.map((x) => x.b.rev)),
    budgetEbitda: sum(months.map((x) => x.b.rev - x.b.cogs - x.b.pers - x.b.other - x.staffB)),
  };
  const fte = sum(sel.map((d) => d.dept.fte));
  const waterfall = [
    { label: "Budget", value: B.ebitda, total: true },
    { label: "Omzet", value: r0((A.rev - B.rev) * B.gmPct) },
    { label: "Marge", value: r0(A.rev * (A.gmPct - B.gmPct)) },
    { label: "Personeel", value: -(A.pers - B.pers) },
    { label: "Overig", value: -(A.other - B.other) - (A.staff - B.staff) },
    { label: "Realisatie", value: A.ebitda, total: true },
  ];
  const deptTable = data.map((d) => {
    const a = d.months.slice(0, s.peil).map((x) => x.a!);
    const b = d.months.slice(0, s.peil).map((x) => x.b);
    const rev = sum(a.map((l) => l.rev)), revB = sum(b.map((l) => l.rev));
    const gm = rev - sum(a.map((l) => l.cogs));
    const contrib = gm - sum(a.map((l) => l.pers)) - sum(a.map((l) => l.other));
    return { key: d.dept.key, name: d.dept.name, rev, revB, gmPct: rev ? gm / rev : 0, contrib, fte: d.dept.fte };
  });
  return { months, ytd: { A, B, PY }, fy, fte, waterfall, deptTable, data, staff };
}

export type NoordbrugResult = ReturnType<typeof computeNoordbrug>;

/** Controles die in de statusbalk en op het blad Controles verschijnen. */
export function noordbrugChecks(r: NoordbrugResult) {
  const wfEnd = r.waterfall.slice(0, 5).reduce((s, x) => s + x.value, 0);
  return [
    { label: "Waterval budget → realisatie sluit aan", ok: Math.abs(wfEnd - r.ytd.A.ebitda) <= 2 },
    { label: "Brutomarge = omzet − kostprijs", ok: r.ytd.A.gm === r.ytd.A.rev - r.ytd.A.cogs },
    { label: "Afdelingsomzet = totaalomzet", ok: Math.abs(sum(r.deptTable.map((d) => d.rev)) - sum(r.data.flatMap((d) => d.months.filter((x) => x.a).map((x) => x.a!.rev)))) < 1 },
  ];
}

export function noordbrugSheets(s: NoordbrugState, r: NoordbrugResult): GridSheet[] {
  const deptName = s.dept === "alle" ? "Alle afdelingen" : DEPTS.find((d) => d.key === s.dept)!.name;
  // --- Omzet
  const o = new SheetBuilder();
  o.row([t("Omzet per maand — " + deptName, "title", { span: 4 })]);
  o.row([t(`Boekjaar 2026 · realisatie t/m ${MONTHS[s.peil - 1]} · bedragen in euro's`, "subtitle", { span: 6 })]);
  o.blank();
  o.row([h("Maand"), h("Budget"), h("Realisatie"), h("Verschil"), h("Verschil %"), h("Vorig jaar"), h("Groei t.o.v. VJ")]);
  const first = o.next;
  r.months.slice(0, s.peil).forEach((x) => {
    const row = o.next;
    const diff = x.a!.rev - x.b.rev;
    const pct = x.b.rev ? diff / x.b.rev : 0;
    o.row([
      t(MONTHS[x.m]), n(x.b.rev), n(x.a!.rev),
      fx(diff, `C${row}-B${row}`, "eur", diff >= 0 ? "pos" : "neg"),
      { ...fx(pct, `IF(B${row}=0,0,D${row}/B${row})`, "pct", Math.abs(pct) >= s.threshold ? (pct >= 0 ? "pos" : "neg") : "calc"), note: `Gemarkeerd bij afwijking ≥ ${(s.threshold * 100).toFixed(1).replace(".", ",")}%` },
      n(x.py.rev, "eur", "muted"),
      fx(x.py.rev ? x.a!.rev / x.py.rev - 1 : 0, `IF(F${row}=0,0,C${row}/F${row}-1)`, "pct"),
    ]);
  });
  const last = o.next - 1;
  const tr = o.next;
  const A = r.ytd.A, B = r.ytd.B, PY = r.ytd.PY;
  o.row([t("Totaal t/m peilmaand", "total"), fx(B.rev, `SUM(B${first}:B${last})`, "eur", "total"), fx(A.rev, `SUM(C${first}:C${last})`, "eur", "total"),
    fx(A.rev - B.rev, `SUM(D${first}:D${last})`, "eur", "total"), fx(B.rev ? (A.rev - B.rev) / B.rev : 0, `IF(B${tr}=0,0,D${tr}/B${tr})`, "pct", "total"),
    fx(PY.rev, `SUM(F${first}:F${last})`, "eur", "total"), fx(PY.rev ? A.rev / PY.rev - 1 : 0, `IF(F${tr}=0,0,C${tr}/F${tr}-1)`, "pct", "total")]);
  const omzet = o.build("Omzet", [120, 112, 112, 104, 92, 112, 112], 4);

  // --- Kosten
  const k = new SheetBuilder();
  k.row([t("Kosten per maand — " + deptName, "title", { span: 4 })]);
  k.row([t("Realisatie versus budget", "subtitle", { span: 4 })]);
  k.blank();
  k.row([h("Maand"), h("Kostprijs omzet"), h("Personeel"), h("Overig"), h("Staf"), h("Totaal realisatie"), h("Totaal budget"), h("Verschil")]);
  const kf = k.next;
  r.months.slice(0, s.peil).forEach((x) => {
    const row = k.next;
    const totA = x.a!.cogs + x.a!.pers + x.a!.other + x.staffA;
    const totB = x.b.cogs + x.b.pers + x.b.other + x.staffB;
    k.row([t(MONTHS[x.m]), n(x.a!.cogs), n(x.a!.pers), n(x.a!.other), n(x.staffA), fx(totA, `SUM(B${row}:E${row})`), n(totB, "eur", "muted"),
      fx(totA - totB, `F${row}-G${row}`, "eur", totA - totB > 0 ? "neg" : "pos", "Positief = hogere kosten dan begroot")]);
  });
  const kl = k.next - 1;
  k.row([t("Totaal", "total"), ...["B", "C", "D", "E", "F", "G", "H"].map((c, i) => {
    const vals = [A.cogs, A.pers, A.other, A.staff, A.cogs + A.pers + A.other + A.staff, B.cogs + B.pers + B.other + B.staff, (A.cogs + A.pers + A.other + A.staff) - (B.cogs + B.pers + B.other + B.staff)];
    return fx(vals[i], `SUM(${c}${kf}:${c}${kl})`, "eur", "total");
  })]);
  const kosten = k.build("Kosten", [110, 116, 104, 96, 90, 120, 116, 100], 4);

  // --- Resultaat
  const p = new SheetBuilder();
  p.row([t("Resultatenoverzicht t/m " + MONTHS[s.peil - 1] + " 2026 — " + deptName, "title", { span: 5 })]);
  p.blank();
  p.row([h("Post"), h("Realisatie"), h("Budget"), h("Verschil"), h("Vorig jaar")]);
  const R = (label: string, a: number, b: number, py: number, style: "calc" | "sub" | "total" = "calc", fa?: (c: string) => string) => {
    const row = p.next;
    const cell = (c: string, v: number) => (fa ? fx(v, fa(c), "eur", style) : n(v, "eur", style));
    p.row([t(label, style === "calc" ? "label" : style), cell("B", a), cell("C", b), fx(a - b, `B${row}-C${row}`, "eur", style === "total" ? "total" : a - b >= 0 ? "pos" : "neg"), cell("E", py)]);
    return row;
  };
  const rRev = R("Netto-omzet", A.rev, B.rev, PY.rev);
  const rCogs = R("Kostprijs van de omzet", -A.cogs, -B.cogs, -PY.cogs);
  const rGm = R("Brutomarge", A.gm, B.gm, PY.gm, "sub", (c) => `${c}${rRev}+${c}${rCogs}`);
  const gmRow = p.next;
  p.row([t("Brutomarge %", "muted"), fx(A.gmPct, `IF(B${rRev}=0,0,B${rGm}/B${rRev})`, "pct", "muted"), fx(B.gmPct, `IF(C${rRev}=0,0,C${rGm}/C${rRev})`, "pct", "muted"), fx(A.gmPct - B.gmPct, `B${gmRow}-C${gmRow}`, "pct", "muted"), fx(PY.gmPct, `IF(E${rRev}=0,0,E${rGm}/E${rRev})`, "pct", "muted")]);
  const rPers = R("Personeelskosten", -A.pers, -B.pers, -PY.pers);
  const rOth = R("Overige bedrijfskosten", -A.other, -B.other, -PY.other);
  const rStaff = R("Staf en huisvesting", -A.staff, -B.staff, -PY.staff);
  const rE = R("EBITDA", A.ebitda, B.ebitda, PY.ebitda, "total", (c) => `${c}${rGm}+${c}${rPers}+${c}${rOth}+${c}${rStaff}`);
  p.row([t("EBITDA-marge", "muted"), fx(A.ebitdaPct, `IF(B${rRev}=0,0,B${rE}/B${rRev})`, "pct", "muted"), fx(B.ebitdaPct, `IF(C${rRev}=0,0,C${rE}/C${rRev})`, "pct", "muted"), null, fx(PY.ebitdaPct, `IF(E${rRev}=0,0,E${rE}/E${rRev})`, "pct", "muted")]);
  p.blank();
  p.row([t("Kosten zijn negatief weergegeven, zodat het resultaat een optelling is.", "note", { span: 5 })]);
  const resultaat = p.build("Resultaat", [210, 120, 120, 110, 120], 3);

  // --- KPI's
  const q = new SheetBuilder();
  q.row([t("Kengetallen", "title", { span: 3 })]);
  q.blank();
  q.row([h("KPI"), h("Realisatie"), h("Budget"), h("Definitie")]);
  q.row([t("Brutomarge %"), n(A.gmPct, "pct"), n(B.gmPct, "pct", "muted"), t("(Omzet − kostprijs omzet) / omzet", "note")]);
  q.row([t("Personeelskosten % omzet"), n(A.rev ? A.pers / A.rev : 0, "pct"), n(B.rev ? B.pers / B.rev : 0, "pct", "muted"), t("Personeelskosten / omzet", "note")]);
  q.row([t("EBITDA-marge"), n(A.ebitdaPct, "pct"), n(B.ebitdaPct, "pct", "muted"), t("EBITDA / omzet", "note")]);
  q.row([t("Omzet per FTE (t/m peilmaand)"), n(A.rev / r.fte), n(B.rev / r.fte, "eur", "muted"), t(`Omzet / ${r.fte} FTE`, "note")]);
  q.row([t("Budgetrealisatie omzet"), n(B.rev ? A.rev / B.rev : 0, "pct"), n(1, "pct", "muted"), t("Realisatie / budget", "note")]);
  q.row([t("Forecast omzet boekjaar"), n(r.fy.rev), n(r.fy.budgetRev, "eur", "muted"), t("Realisatie + prognose resterende maanden", "note")]);
  const kpis = q.build("KPI's", [220, 120, 120, 280], 3);

  // --- Brondata
  const bd = new SheetBuilder();
  bd.row([h("Periode"), h("Afdeling"), h("Categorie"), h("Versie"), h("Bedrag")]);
  const cats: [keyof MonthLine, string][] = [["rev", "Omzet"], ["cogs", "Kostprijs omzet"], ["pers", "Personeelskosten"], ["other", "Overige kosten"]];
  r.data.forEach((d) => {
    if (s.dept !== "alle" && d.dept.key !== s.dept) return;
    d.months.slice(0, s.peil).forEach((x, m) => {
      cats.forEach(([c, label]) => {
        bd.row([t(`2026-${String(m + 1).padStart(2, "0")}`), t(d.dept.name), t(label), t("Realisatie"), n(x.a![c])]);
        bd.row([t(`2026-${String(m + 1).padStart(2, "0")}`, "muted"), t(d.dept.name, "muted"), t(label, "muted"), t("Budget", "muted"), n(x.b[c], "eur", "muted")]);
      });
    });
  });
  const brondata = bd.build("Brondata", [90, 110, 150, 90, 110], 1);

  // --- Instellingen
  const st = new SheetBuilder();
  st.row([t("Instellingen", "title", { span: 3 })]);
  st.row([t("Gele cellen zijn invoer. Wijzig ze en bekijk het effect op de andere tabbladen.", "subtitle", { span: 4 })]);
  st.blank();
  st.row([t("Boekjaar"), n(2026, "int", "muted")]);
  st.row([t("Peilmaand (1–9)"), inp(s.peil, "peil", "int", { min: 1, max: LAST_ACTUAL, step: 1, note: "Laatste maand met realisatie" })]);
  st.row([t("Signaleringsdrempel afwijking"), inp(s.threshold, "threshold", "pct", { min: 0, max: 0.25, note: "Afwijkingen vanaf dit percentage krijgen een kleur" })]);
  st.row([t("Scenario prognose (t.o.v. trend)"), inp(s.scenario, "scenario", "pct", { min: -0.2, max: 0.2, note: "Extra groei voor de maanden na de peilmaand" })]);
  st.blank();
  st.row([h("Controle"), h("Status")]);
  noordbrugChecks(r).forEach((c) => st.row([t(c.label), check(c.ok, "Controleren")]));
  const instellingen = st.build("Instellingen", [260, 130, 120]);

  return [omzet, kosten, resultaat, kpis, brondata, instellingen];
}

export { A1 };
