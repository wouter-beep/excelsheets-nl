/**
 * Model 4 — Jaarrekeningwerkboek, Hofstede Varenkamp B.V. (fictief), boekjaar 2025.
 * Proefbalans → mapping → balans en winst-en-verliesrekening, met specificaties en controles.
 * Let op: een voorbeeld ter illustratie; definitieve verslaggeving vraagt toetsing aan
 * de toepasselijke regelgeving en professionele beoordeling.
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, inp, check, type GridSheet } from "@/lib/sheet/types";

export type Account = { code: string; name: string; debit: number; credit: number; map: string | null };

export const RUBRICS = {
  balans: [
    { key: "MVA", name: "Materiële vaste activa", side: "A" },
    { key: "VRD", name: "Voorraden", side: "A" },
    { key: "VOR", name: "Vorderingen", side: "A" },
    { key: "LIQ", name: "Liquide middelen", side: "A" },
    { key: "EV", name: "Eigen vermogen", side: "P" },
    { key: "LLS", name: "Langlopende schulden", side: "P" },
    { key: "KLS", name: "Kortlopende schulden", side: "P" },
  ],
  wv: [
    { key: "OMZ", name: "Netto-omzet", sign: 1 },
    { key: "KPO", name: "Kostprijs van de omzet", sign: -1 },
    { key: "LON", name: "Lonen en salarissen", sign: -1 },
    { key: "SOC", name: "Sociale lasten", sign: -1 },
    { key: "PEN", name: "Pensioenlasten", sign: -1 },
    { key: "AFS", name: "Afschrijvingen", sign: -1 },
    { key: "OBK", name: "Overige bedrijfskosten", sign: -1 },
    { key: "FIN", name: "Financiële baten en lasten", sign: -1 },
    { key: "BEL", name: "Belastingen", sign: -1 },
  ],
} as const;

export type JrState = { extraDepreciation: number; unmapped: boolean };
export const defaultJr: JrState = { extraDepreciation: 0, unmapped: false };

/** Vennootschapsbelasting 2025: 19% tot en met € 200.000, 25,8% daarboven. */
export const vpb = (profit: number) => (profit <= 0 ? 0 : Math.round(Math.min(profit, 200_000) * 0.19 + Math.max(profit - 200_000, 0) * 0.258));

const A = (code: string, name: string, amount: number, map: string | null): Account =>
  ({ code, name, debit: amount > 0 ? amount : 0, credit: amount < 0 ? -amount : 0, map });

export function computeJr(s: JrState) {
  const expenses = [
    A("7000", "Kostprijs van de omzet", 1_782_000, "KPO"),
    A("4000", "Lonen en salarissen", 712_400, "LON"),
    A("4100", "Sociale lasten", 136_200, "SOC"),
    A("4150", "Pensioenlasten", 58_900, "PEN"),
    A("4300", "Huisvestingskosten", 84_600, "OBK"),
    A("4400", "Autokosten", 46_300, "OBK"),
    A("4500", "Kantoorkosten", 31_750, "OBK"),
    A("4600", "Verkoopkosten", 39_200, "OBK"),
    A("4800", "Afschrijvingen", 62_000 + s.extraDepreciation, "AFS"),
    A("4900", "Overige bedrijfskosten", 27_350 - (s.unmapped ? 2_500 : 0), "OBK"),
    ...(s.unmapped ? [A("4950", "Nog te rubriceren kosten", 2_500, null)] : []),
    A("8900", "Rentelasten", 14_800, "FIN"),
  ];
  const revenue = 3_240_000;
  const preTax = revenue - sum(expenses.map((e) => e.debit));
  const tax = vpb(preTax);
  const accounts: Account[] = [
    A("0200", "Bedrijfsgebouwen", 640_000, "MVA"),
    A("0210", "Cum. afschrijving bedrijfsgebouwen", -128_000, "MVA"),
    A("0300", "Inventaris", 185_000, "MVA"),
    A("0310", "Cum. afschrijving inventaris", -(92_500 + s.extraDepreciation), "MVA"),
    A("0400", "Vervoermiddelen", 96_000, "MVA"),
    A("0410", "Cum. afschrijving vervoermiddelen", -41_000, "MVA"),
    A("0500", "Geplaatst aandelenkapitaal", -18_000, "EV"),
    A("0510", "Overige reserves (begin boekjaar)", -512_300, "EV"),
    A("0700", "Hypothecaire lening", -280_000, "LLS"),
    A("1100", "Bank", 181_480, "LIQ"),
    A("1300", "Debiteuren", 386_200, "VOR"),
    A("1310", "Voorziening dubieuze debiteuren", -12_400, "VOR"),
    A("1500", "Overlopende activa", 23_450, "VOR"),
    A("1600", "Crediteuren", -198_640, "KLS"),
    A("1700", "Te betalen omzetbelasting", -64_210, "KLS"),
    A("1710", "Te betalen loonheffing", -41_380, "KLS"),
    A("1720", "Te betalen vennootschapsbelasting", -tax, "KLS"),
    A("1800", "Overlopende passiva", -37_900, "KLS"),
    A("3000", "Voorraad handelsgoederen", 158_700, "VRD"),
    A("8000", "Netto-omzet", -revenue, "OMZ"),
    ...expenses,
    A("9500", "Vennootschapsbelasting", tax, "BEL"),
  ].sort((a, b) => a.code.localeCompare(b.code));
  // De oorspronkelijke vpb (zonder extra afschrijving) is in het banksaldo verwerkt; verschil via te betalen vpb.
  const tbDebit = sum(accounts.map((a) => a.debit));
  const tbCredit = sum(accounts.map((a) => a.credit));
  const bal = (key: string) => sum(accounts.filter((a) => a.map === key).map((a) => a.debit - a.credit));
  const wvVal = (key: string) => -bal(key); // opbrengsten positief, kosten negatief
  const result = sum(RUBRICS.wv.map((r) => wvVal(r.key)));
  const equityOpening = -(bal("EV"));
  const assets = RUBRICS.balans.filter((r) => r.side === "A").map((r) => ({ ...r, value: bal(r.key) }));
  const liabilities = RUBRICS.balans.filter((r) => r.side === "P").map((r) => ({ ...r, value: r.key === "EV" ? equityOpening + result : -bal(r.key) }));
  const totalA = sum(assets.map((a) => a.value)), totalP = sum(liabilities.map((p) => p.value));
  const unmappedAccounts = accounts.filter((a) => !a.map);
  // Mutatieoverzicht materiële vaste activa
  const fixed = [
    { name: "Bedrijfsgebouwen", costOpen: 640_000, inv: 0, depOpen: 112_000, dep: 16_000 },
    { name: "Inventaris", costOpen: 152_000, inv: 33_000, depOpen: 61_500, dep: 31_000 + s.extraDepreciation },
    { name: "Vervoermiddelen", costOpen: 96_000, inv: 0, depOpen: 26_000, dep: 15_000 },
  ];
  return { accounts, tbDebit, tbCredit, assets, liabilities, totalA, totalP, result, preTax, tax, equityOpening, unmappedAccounts, wvVal, bal, fixed, revenue };
}
export type JrResult = ReturnType<typeof computeJr>;

export function jrChecks(r: JrResult) {
  const fixedClose = sum(r.fixed.map((f) => f.costOpen + f.inv - f.depOpen - f.dep));
  return [
    { label: "Proefbalans: debet = credit", ok: r.tbDebit === r.tbCredit },
    { label: "Alle grootboekrekeningen gemapt", ok: r.unmappedAccounts.length === 0 },
    { label: "Balans in evenwicht", ok: r.totalA === r.totalP },
    { label: "Resultaat W&V = mutatie eigen vermogen", ok: r.liabilities.find((l) => l.key === "EV")!.value - r.equityOpening === r.result },
    { label: "Mutatieoverzicht MVA sluit aan op balans", ok: fixedClose === r.assets.find((a) => a.key === "MVA")!.value },
  ];
}

export function jrSheets(s: JrState, r: JrResult): GridSheet[] {
  // Proefbalans
  const p = new SheetBuilder();
  p.row([t("Proefbalans per 31 december 2025", "title", { span: 4 })]);
  p.blank();
  p.row([h("Rekening"), h("Omschrijving"), h("Debet"), h("Credit"), h("Rubriek")]);
  const f0 = p.next;
  r.accounts.forEach((a) => p.row([t(a.code, "muted"), t(a.name), a.debit ? n(a.debit) : null, a.credit ? n(a.credit) : null, a.map ? t(a.map, "muted") : t("— ontbreekt", "check-bad")]));
  const f1 = p.next - 1;
  const tr = p.next;
  p.row([null, t("Totaal", "total"), fx(r.tbDebit, `SUM(C${f0}:C${f1})`, "eur", "total"), fx(r.tbCredit, `SUM(D${f0}:D${f1})`, "eur", "total"), null]);
  p.row([null, t("Verschil", "muted"), fx(r.tbDebit - r.tbCredit, `C${tr}-D${tr}`, "eur", r.tbDebit === r.tbCredit ? "check-ok" : "check-bad"), null, null]);
  const proefbalans = p.build("Proefbalans", [76, 260, 112, 112, 96], 3);

  // Mapping
  const m = new SheetBuilder();
  m.row([t("Mapping grootboek → rubriek", "title", { span: 3 })]);
  m.row([t("Nieuwe rekeningen zonder rubriek worden rood gemarkeerd en tellen niet mee in balans of W&V.", "subtitle", { span: 5 })]);
  m.blank();
  m.row([h("Rubriekcode"), h("Rubriek"), h("Overzicht"), h("Saldo")]);
  [...RUBRICS.balans.map((x) => ({ ...x, ov: "Balans" })), ...RUBRICS.wv.map((x) => ({ ...x, ov: "W&V" }))].forEach((x) => {
    const row = m.next;
    m.row([t(x.key, "muted"), t(x.name), t(x.ov, "muted"), fx(r.bal(x.key), `SUMIF(Proefbalans!$E:$E,A${row},Proefbalans!$C:$C)-SUMIF(Proefbalans!$E:$E,A${row},Proefbalans!$D:$D)`, "eur", "calc", "Debet minus credit van alle rekeningen met deze rubriek")]);
  });
  const mapping = m.build("Mapping", [96, 220, 90, 120], 4);

  // Balans
  const b = new SheetBuilder();
  b.row([t("Balans per 31 december 2025", "title", { span: 3 })]);
  b.row([t("Na resultaatbestemming: resultaat toegevoegd aan eigen vermogen", "subtitle", { span: 4 })]);
  b.blank();
  b.row([h("Activa"), h("€"), null, h("Passiva"), h("€")]);
  const rows = Math.max(r.assets.length, r.liabilities.length);
  const bf = b.next;
  for (let i = 0; i < rows; i++) {
    const a = r.assets[i], l = r.liabilities[i];
    b.row([a ? t(a.name) : null, a ? n(a.value) : null, null, l ? t(l.name) : null, l ? n(l.value, "eur", "calc", l.key === "EV" ? { note: "Begin eigen vermogen + resultaat boekjaar" } : {}) : null]);
  }
  const bl = b.next - 1;
  const bt = b.next;
  b.row([t("Totaal activa", "total"), fx(r.totalA, `SUM(B${bf}:B${bl})`, "eur", "total"), null, t("Totaal passiva", "total"), fx(r.totalP, `SUM(E${bf}:E${bl})`, "eur", "total")]);
  b.row([t("Controle activa − passiva", "muted"), fx(r.totalA - r.totalP, `B${bt}-E${bt}`, "eur", r.totalA === r.totalP ? "check-ok" : "check-bad")]);
  const balans = b.build("Balans", [210, 120, 24, 210, 120], 4);

  // W&V
  const w = new SheetBuilder();
  w.row([t("Winst-en-verliesrekening 2025", "title", { span: 3 })]);
  w.blank();
  w.row([h("Post"), h("€"), h("% omzet")]);
  const wf = w.next;
  const omzRow = wf;
  RUBRICS.wv.forEach((x) => {
    const row = w.next;
    const v = r.wvVal(x.key);
    w.row([t(x.name), n(v), fx(r.revenue ? v / r.revenue : 0, `IF($B$${omzRow}=0,0,B${row}/$B$${omzRow})`, "pct", "muted")]);
  });
  const wl = w.next - 1;
  w.row([t("Resultaat na belastingen", "total"), fx(r.result, `SUM(B${wf}:B${wl})`, "eur", "total"), fx(r.result / r.revenue, `IF($B$${omzRow}=0,0,B${wl + 1}/$B$${omzRow})`, "pct", "total")]);
  w.blank();
  w.row([t("Resultaat vóór belastingen", "muted"), n(r.preTax, "eur", "muted")]);
  w.row([t("Vennootschapsbelasting (19% / 25,8%)", "muted"), fx(-r.tax, `-(MIN(B${wl + 3},200000)*0.19+MAX(B${wl + 3}-200000,0)*0.258)`, "eur", "muted", "Tarieven 2025: 19% t/m € 200.000, 25,8% daarboven")]);
  const wenv = w.build("W&V", [260, 120, 90], 3);

  // Specificaties
  const sp = new SheetBuilder();
  sp.row([t("Specificaties", "title", { span: 3 })]);
  sp.blank();
  sp.row([h("Vorderingen"), h("€")]);
  const s1 = sp.next;
  sp.row([t("Debiteuren (bruto)"), n(386_200)]);
  sp.row([t("Af: voorziening dubieuze debiteuren"), n(-12_400)]);
  sp.row([t("Overlopende activa"), n(23_450)]);
  sp.row([t("Totaal vorderingen", "total"), fx(386_200 - 12_400 + 23_450, `SUM(B${s1}:B${s1 + 2})`, "eur", "total")]);
  sp.blank();
  sp.row([h("Kortlopende schulden"), h("€")]);
  const s2 = sp.next;
  sp.row([t("Crediteuren"), n(198_640)]);
  sp.row([t("Omzetbelasting"), n(64_210)]);
  sp.row([t("Loonheffing"), n(41_380)]);
  sp.row([t("Vennootschapsbelasting"), n(r.tax)]);
  sp.row([t("Overlopende passiva"), n(37_900)]);
  sp.row([t("Totaal kortlopende schulden", "total"), fx(198_640 + 64_210 + 41_380 + r.tax + 37_900, `SUM(B${s2}:B${s2 + 4})`, "eur", "total")]);
  const specificaties = sp.build("Specificaties", [280, 120]);

  // Mutatieoverzicht
  const mu = new SheetBuilder();
  mu.row([t("Mutatieoverzicht materiële vaste activa", "title", { span: 4 })]);
  mu.blank();
  mu.row([h("Categorie"), h("Aanschaf 1/1"), h("Investeringen"), h("Cum. afschr. 1/1"), h("Afschrijving"), h("Boekwaarde 31/12")]);
  const mf = mu.next;
  r.fixed.forEach((f) => { const row = mu.next; mu.row([t(f.name), n(f.costOpen), n(f.inv), n(-f.depOpen), n(-f.dep), fx(f.costOpen + f.inv - f.depOpen - f.dep, `SUM(B${row}:E${row})`, "eur", "sub")]); });
  const ml = mu.next - 1;
  mu.row([t("Totaal", "total"), ...["B", "C", "D", "E", "F"].map((c, i) => fx([sum(r.fixed.map((f) => f.costOpen)), sum(r.fixed.map((f) => f.inv)), -sum(r.fixed.map((f) => f.depOpen)), -sum(r.fixed.map((f) => f.dep)), sum(r.fixed.map((f) => f.costOpen + f.inv - f.depOpen - f.dep))][i], `SUM(${c}${mf}:${c}${ml})`, "eur", "total"))]);
  mu.blank();
  mu.row([t("Mutatieoverzicht eigen vermogen", "title", { span: 4 })]);
  mu.row([h("Post"), h("€")]);
  const e0 = mu.next;
  mu.row([t("Eigen vermogen 1 januari"), n(r.equityOpening)]);
  mu.row([t("Resultaat boekjaar"), n(r.result)]);
  mu.row([t("Dividenduitkering"), n(0)]);
  mu.row([t("Eigen vermogen 31 december", "total"), fx(r.equityOpening + r.result, `SUM(B${e0}:B${e0 + 2})`, "eur", "total")]);
  const mutaties = mu.build("Mutatieoverzicht", [220, 116, 116, 124, 116, 128]);

  // Controles
  const c = new SheetBuilder();
  c.row([t("Controles", "title", { span: 2 })]);
  c.row([t("Alle controles moeten OK zijn voordat de cijfers worden gedeeld.", "subtitle", { span: 3 })]);
  c.blank();
  c.row([h("Controle"), h("Status")]);
  jrChecks(r).forEach((x) => c.row([t(x.label), check(x.ok, "AFWIJKING")]));
  c.blank();
  c.row([t("Memoriaalboeking: extra afschrijving inventaris", "sub"), inp(s.extraDepreciation, "extraDepreciation", "eur", { min: 0, max: 100_000, note: "Debet 4800 Afschrijvingen / credit 0310 Cum. afschrijving inventaris" })]);
  c.row([t("Definitieve verslaggeving moet voldoen aan de toepasselijke regels en professionele controle.", "note", { span: 3 })]);
  const controles = c.build("Controles", [340, 130]);
  return [proefbalans, mapping, balans, wenv, specificaties, mutaties, controles];
}
