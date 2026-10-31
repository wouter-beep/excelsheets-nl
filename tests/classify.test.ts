import { describe, expect, it } from "vitest";
import { buildSummary, classify, detectSystems } from "@/lib/classify";
import type { CategoryKey } from "@/lib/intake";

const base = { categories: ["finance"] as CategoryKey[], story: "Begroting voor volgend jaar", situation: { sources: [], platforms: [] } };

describe("classify", () => {
  it("herkent controle en herstel bij foutmeldingen", () => {
    expect(classify({ ...base, categories: ["rapportage"], goal: "verbeteren", story: "Het rapport klopt niet meer en geeft #N/B" }).type).toBe("Controle en herstel");
  });
  it("herkent een planningstool", () => expect(classify({ ...base, goal: "nieuw", categories: ["planning"] }).type).toBe("Planningstool"));
  it("verhoogt de complexiteit bij koppelingen, veel gebruikers en consolidatie", () => {
    const c = classify({ goal: "rapportage", categories: ["finance", "jaarrekening", "rapportage", "begroting"], story: "Consolidatie van een holding met drie werkmaatschappijen via Exact Online",
      situation: { users: "20+", integration: "ja", frequency: "dagelijks", sources: ["erp"], platforms: [] } });
    expect(c.complexity).toBe("Hoog");
    expect(c.systems).toContain("Exact Online");
    expect(c.rules.length).toBeGreaterThan(3);
  });
  it("is laag bij een eenvoudige vraag", () => expect(classify({ ...base, goal: "nieuw" }).complexity).toBe("Laag"));
  it("stelt een vervolgvraag over Office Scripts bij macro's op het web", () => {
    const c = classify({ ...base, goal: "verbeteren", story: "Onze VBA macro werkt niet in de browser", situation: { sources: [], platforms: ["m365"] } });
    expect(c.followUps.some((f) => f.includes("Office Scripts"))).toBe(true);
  });
});

describe("detectSystems", () => {
  it("vindt bekende pakketten ongeacht hoofdletters", () => expect(detectSystems("we gebruiken afas en power bi")).toEqual(["AFAS", "Power BI"]));
});

describe("buildSummary", () => {
  it("geeft een tekst en gestructureerde velden", () => {
    const s = buildSummary({ ...base, goal: "rapportage", categories: ["finance"] });
    expect(s.text.length).toBeGreaterThan(20);
    expect(s.data).toHaveProperty("oplossing");
  });
});
