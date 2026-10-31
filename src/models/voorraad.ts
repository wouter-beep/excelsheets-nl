/**
 * Model 10 — Voorraadbeheer, Technische Groothandel Ooievaar (fictief).
 * Bestelniveau = verbruik × levertijd + veiligheidsvoorraad (z × σ × √levertijd).
 */
import { sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx, inp, type GridSheet } from "@/lib/sheet/types";

export const ITEMS = [
  { sku: "BV-1001", name: "Slotbout M10×80 verzinkt (doos 100)", cat: "Bevestiging", stock: 84, daily: 6.2, sd: 2.1, lead: 5, cost: 18.4, moq: 50 },
  { sku: "BV-1044", name: "Keilbout M12 RVS (doos 50)", cat: "Bevestiging", stock: 31, daily: 2.4, sd: 1.1, lead: 10, cost: 42.9, moq: 20 },
  { sku: "BV-1120", name: "Chemisch anker 300 ml", cat: "Bevestiging", stock: 146, daily: 3.1, sd: 1.4, lead: 7, cost: 11.75, moq: 48 },
  { sku: "EL-2010", name: "Installatiekabel YMvK 3×2,5 (100 m)", cat: "Elektra", stock: 22, daily: 1.8, sd: 0.9, lead: 12, cost: 128.0, moq: 10 },
  { sku: "EL-2035", name: "Aardlekautomaat 1P+N B16", cat: "Elektra", stock: 64, daily: 4.6, sd: 1.9, lead: 8, cost: 46.2, moq: 24 },
  { sku: "EL-2088", name: "LED-paneel 60×60 4000K", cat: "Elektra", stock: 410, daily: 3.2, sd: 1.6, lead: 21, cost: 31.5, moq: 40 },
  { sku: "SA-3002", name: "Persfitting koper 22 mm (zak 10)", cat: "Sanitair", stock: 58, daily: 7.9, sd: 2.8, lead: 6, cost: 24.6, moq: 30 },
  { sku: "SA-3015", name: "Thermostatische mengkraan", cat: "Sanitair", stock: 9, daily: 0.7, sd: 0.4, lead: 18, cost: 164.0, moq: 6 },
  { sku: "SA-3077", name: "Meerlagenbuis 16 mm (rol 50 m)", cat: "Sanitair", stock: 37, daily: 2.2, sd: 0.8, lead: 9, cost: 58.3, moq: 12 },
  { sku: "GR-4004", name: "Accuboormachine 18V body", cat: "Gereedschap", stock: 14, daily: 0.6, sd: 0.3, lead: 14, cost: 139.0, moq: 4 },
  { sku: "GR-4019", name: "Boorset SDS-plus 7-delig", cat: "Gereedschap", stock: 26, daily: 1.1, sd: 0.6, lead: 10, cost: 36.8, moq: 10 },
  { sku: "GR-4052", name: "Waterpas 120 cm", cat: "Gereedschap", stock: 48, daily: 0.4, sd: 0.2, lead: 12, cost: 27.9, moq: 6 },
  { sku: "EL-2140", name: "Kabelgoot PVC 40×60 (2 m)", cat: "Elektra", stock: 118, daily: 9.4, sd: 3.6, lead: 4, cost: 7.2, moq: 100 },
  { sku: "SA-3120", name: "Sifon PP 32 mm", cat: "Sanitair", stock: 190, daily: 2.9, sd: 1.0, lead: 6, cost: 6.4, moq: 50 },
];
export const SERVICE = { "90": 1.2816, "95": 1.6449, "98": 2.0537, "99": 2.3263 } as const;
export type ServiceLevel = keyof typeof SERVICE;

export type InvState = { service: ServiceLevel; extraLead: number; cat: "alle" | string; coverDays: number };
export const defaultInv: InvState = { service: "95", extraLead: 0, cat: "alle", coverDays: 30 };

export function computeInv(s: InvState) {
  const z = SERVICE[s.service];
  const rows = ITEMS.map((i) => {
    const lead = i.lead + s.extraLead;
    const safety = Math.ceil(z * i.sd * Math.sqrt(lead));
    const rop = Math.ceil(i.daily * lead + safety);
    const cover = i.stock / i.daily;
    const value = i.stock * i.cost;
    const annualCogs = i.daily * 250 * i.cost; // 250 werkdagen
    const turnover = value ? annualCogs / value : 0;
    const status = i.stock <= rop ? "Bestellen" : i.stock <= rop * 1.2 ? "Let op" : cover > 120 ? "Overvoorraad" : "OK";
    const target = rop + i.daily * s.coverDays;
    const orderQty = status === "Bestellen" ? Math.max(i.moq, Math.ceil((target - i.stock) / i.moq) * i.moq) : 0;
    return { ...i, lead, safety, rop, cover, value, annualCogs, turnover, status, orderQty, orderValue: orderQty * i.cost };
  });
  // ABC-analyse op jaarverbruik
  const sorted = [...rows].sort((a, b) => b.annualCogs - a.annualCogs);
  const total = sum(sorted.map((r) => r.annualCogs));
  let cum = 0;
  const abc: Record<string, "A" | "B" | "C"> = {};
  sorted.forEach((r) => { cum += r.annualCogs; abc[r.sku] = cum / total <= 0.7 ? "A" : cum / total <= 0.9 ? "B" : "C"; });
  const sel = s.cat === "alle" ? rows : rows.filter((r) => r.cat === s.cat);
  const stockValue = sum(sel.map((r) => r.value));
  return {
    rows: sel.map((r) => ({ ...r, abc: abc[r.sku] })), all: rows, stockValue, toOrder: sel.filter((r) => r.status === "Bestellen"),
    orderValue: sum(sel.map((r) => r.orderValue)), turnover: stockValue ? sum(sel.map((r) => r.annualCogs)) / stockValue : 0, cats: [...new Set(ITEMS.map((i) => i.cat))],
  };
}
export type InvResult = ReturnType<typeof computeInv>;
export const invChecks = (r: InvResult) => [
  { label: "Voorraadwaarde = Σ voorraad × kostprijs", ok: Math.abs(r.stockValue - sum(r.rows.map((x) => x.stock * x.cost))) < 0.01 },
  { label: "Geen artikelen onder bestelniveau", ok: r.toOrder.length === 0 },
];

export function invSheets(s: InvState, r: InvResult): GridSheet[] {
  const b = new SheetBuilder();
  b.row([t("Artikelen en bestelniveaus", "title", { span: 4 })]);
  b.row([t(`Servicegraad ${s.service}% (z = ${SERVICE[s.service].toFixed(2).replace(".", ",")}) · extra levertijd ${s.extraLead} dagen`, "subtitle", { span: 6 })]);
  b.blank();
  b.row([h("Artikel"), h("Omschrijving"), h("Voorraad"), h("Verbruik / dag"), h("σ / dag"), h("Levertijd"), h("Veiligheid"), h("Bestelniveau"), h("Dekking (dg)"), h("Status"), h("Advies bestellen"), h("Kostprijs"), h("Voorraadwaarde")]);
  const f0 = b.next;
  r.rows.forEach((x) => {
    const row = b.next;
    b.row([t(x.sku, "muted"), t(x.name), n(x.stock, "int"), n(x.daily, "num1"), n(x.sd, "num1", "muted"), n(x.lead, "int"),
      fx(x.safety, `ROUNDUP(Instellingen!$B$5*E${row}*SQRT(F${row}),0)`, "int", "calc", "z × σ × √levertijd"),
      fx(x.rop, `ROUNDUP(D${row}*F${row}+G${row},0)`, "int", "sub", "Verbruik × levertijd + veiligheidsvoorraad"),
      fx(x.cover, `IF(D${row}=0,0,C${row}/D${row})`, "num1"),
      { v: x.status, f: `IF(C${row}<=H${row},"Bestellen",IF(C${row}<=H${row}*1.2,"Let op",IF(I${row}>120,"Overvoorraad","OK")))`, fmt: "text", s: x.status === "Bestellen" ? "check-bad" : x.status === "Let op" ? "warn" : x.status === "Overvoorraad" ? "muted" : "check-ok" },
      x.orderQty ? n(x.orderQty, "int", "sub") : n(0, "int", "muted"), n(x.cost, "eur2"), fx(x.value, `C${row}*L${row}`, "eur")]);
  });
  const l = b.next - 1;
  b.row([t("Totaal", "total"), null, null, null, null, null, null, null, null, null, null, null, fx(r.stockValue, `SUM(M${f0}:M${l})`, "eur", "total")]);
  const artikelen = b.build("Artikelen", [76, 250, 74, 96, 66, 72, 76, 92, 86, 100, 110, 80, 110], 4);

  const a = new SheetBuilder();
  a.row([t("ABC-analyse op jaarverbruik", "title", { span: 4 })]);
  a.blank();
  a.row([h("Artikel"), h("Omschrijving"), h("Jaarverbruik (€)"), h("Klasse"), h("Omloopsnelheid")]);
  [...r.rows].sort((x, y) => y.annualCogs - x.annualCogs).forEach((x) => a.row([t(x.sku, "muted"), t(x.name), n(x.annualCogs), t(x.abc, x.abc === "A" ? "check-ok" : x.abc === "B" ? "warn" : "muted"), n(x.turnover, "x")]));
  a.row([t("A = 70% van het verbruik, B = volgende 20%, C = rest. Omloopsnelheid = jaarverbruik / voorraadwaarde.", "note", { span: 5 })]);
  const abc = a.build("ABC-analyse", [76, 250, 120, 70, 110], 3);

  const i = new SheetBuilder();
  i.row([t("Instellingen", "title", { span: 2 })]);
  i.row([t("Gele cellen zijn invoer.", "subtitle", { span: 2 })]);
  i.blank();
  i.row([t("Servicegraad"), t(`${s.service}%`, "input")]);
  i.row([t("Veiligheidsfactor z"), n(SERVICE[s.service], "num2", "calc", { note: "NORM.S.INV(servicegraad)" })]);
  i.row([t("Extra levertijd (dagen)"), inp(s.extraLead, "extraLead", "int", { min: 0, max: 30, step: 1 })]);
  i.row([t("Gewenste dekking na bestelling (dagen)"), inp(s.coverDays, "coverDays", "int", { min: 5, max: 120, step: 1 })]);
  const inst = i.build("Instellingen", [280, 120]);
  return [artikelen, abc, inst];
}
