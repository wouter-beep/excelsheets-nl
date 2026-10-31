import { describe, expect, it } from "vitest";
import { EXPORTS } from "@/models/registry";
import { buildWorkbook } from "@/lib/xlsx";
import { computeNoordbrug, defaultNoordbrug, noordbrugChecks } from "@/models/noordbrug";
import { computeMeridiaan, defaultMeridiaan, meridiaanChecks } from "@/models/meridiaan";
import { computeLiq, defaultLiq, liqChecks } from "@/models/liquiditeit";
import { computeJr, defaultJr, jrChecks } from "@/models/jaarrekening";
import { computePlan, defaultPlan, planChecks } from "@/models/personeel";
import { computeHoreca, defaultHoreca, horecaChecks } from "@/models/horeca";
import { computeProd, defaultProd, prodChecks } from "@/models/productie";
import { computeKp, defaultKp, kpChecks } from "@/models/kostprijs";
import { computeProj, defaultProj, projChecks } from "@/models/projecten";
import { computeInv, defaultInv, invChecks } from "@/models/voorraad";
import { computeCons, defaultCons, consChecks } from "@/models/consolidatie";
import { computeInvest, defaultInvest, investChecks } from "@/models/investering";
import { demoModels } from "@/content/models";

type Check = { ok: boolean; label?: string };
const allOk = (cs: Check[]) => cs.filter((c) => !c.ok).map((c) => c.label ?? JSON.stringify(c));

describe("demomodellen: interne controles kloppen met standaardinvoer", () => {
  it("managementdashboard", () => expect(allOk(noordbrugChecks(computeNoordbrug(defaultNoordbrug)))).toEqual([]));
  it("begroting en rolling forecast", () => { const m = computeMeridiaan(defaultMeridiaan); expect(allOk(meridiaanChecks(m, defaultMeridiaan))).toEqual([]); });
  it("liquiditeitsprognose", () => { const l = computeLiq(defaultLiq); expect(allOk(liqChecks(l, defaultLiq))).toEqual([]); });
  it("jaarrekeningwerkboek", () => expect(allOk(jrChecks(computeJr(defaultJr)))).toEqual([]));
  it("jaarrekening signaleert ongemapte rekeningen", () => expect(jrChecks(computeJr({ ...defaultJr, unmapped: true })).some((c) => !c.ok)).toBe(true));
  // De demo's voor personeel en voorraad tonen bewust signaleringen (onderbezetting, bestellen);
  // de rekenkundige controles moeten wel kloppen.
  it("personeelsplanning", () => expect(allOk(planChecks(computePlan(defaultPlan)))).toEqual(["Alle diensten voldoende bezet", "Geen signaleringen per medewerker"]));
  it("horeca-omzetanalyse", () => expect(allOk(horecaChecks(computeHoreca(defaultHoreca)))).toEqual([]));
  it("productie-efficiency", () => expect(allOk(prodChecks(computeProd(defaultProd)))).toEqual([]));
  it("kostprijsberekening", () => { const k = computeKp(defaultKp); expect(allOk(kpChecks(k, defaultKp))).toEqual([]); });
  it("projecten en nacalculatie", () => expect(allOk(projChecks(computeProj(defaultProj)))).toEqual([]));
  it("voorraadbeheer", () => expect(allOk(invChecks(computeInv(defaultInv)))).toEqual(["Geen artikelen onder bestelniveau"]));
  it("consolidatie", () => expect(allOk(consChecks(computeCons(defaultCons)))).toEqual([]));
  it("investeringsmodel", () => { const i = computeInvest(defaultInvest); expect(allOk(investChecks(i, defaultInvest))).toEqual([]); });
  it("liquiditeit wordt slechter bij betalingsvertraging", () => expect(computeLiq({ ...defaultLiq, delayWeeks: 6, delayShare: 1 }).min).toBeLessThan(computeLiq(defaultLiq).min));
});

describe("xlsx-export", () => {
  it("heeft een export voor elk demomodel", () => expect(Object.keys(EXPORTS).sort()).toEqual(demoModels.map((m) => m.slug).sort()));
  for (const [slug, sheets] of Object.entries(EXPORTS)) {
    it(`bouwt een geldige werkmap voor ${slug}`, async () => {
      const buf = await buildWorkbook({ title: slug, company: "Test", description: "Test", sheets: sheets() });
      const b = Buffer.from(buf as ArrayBuffer);
      expect(b.subarray(0, 2).toString()).toBe("PK");
      expect(b.length).toBeGreaterThan(4000);
    });
  }
});
