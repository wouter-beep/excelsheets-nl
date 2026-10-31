import { describe, expect, it } from "vitest";
import { requestSchema, visibleQuestions } from "@/lib/intake";

const valid = {
  goal: "nieuw", categories: ["planning"], story: "We willen een personeelsplanning per week.",
  situation: { users: "2-5", frequency: "wekelijks", sources: ["handmatig"], platforms: ["windows"] },
  summary: "Personeelsplanning per week voor een klein team.",
  summaryData: { oplossing: "Planning", situatie: "", doelen: "", onderdelen: "", koppelingen: "", planning: "" },
  contact: { name: "Test Persoon", company: "Testbedrijf", email: "TEST@Example.nl", phone: "+31 6 1234 5678", preferred: "email" },
  consent: true, uploads: [], website: "", startedAt: Date.now() - 60_000,
};

describe("requestSchema", () => {
  it("accepteert een geldige aanvraag en normaliseert e-mail", () => {
    const r = requestSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.contact.email).toBe("test@example.nl");
  });
  it("weigert als het honeypotveld is ingevuld", () => expect(requestSchema.safeParse({ ...valid, website: "http://spam" }).success).toBe(false));
  it("weigert zonder toestemming", () => expect(requestSchema.safeParse({ ...valid, consent: false }).success).toBe(false));
  it("weigert onbekende doelen en onderwerpen", () => {
    expect(requestSchema.safeParse({ ...valid, goal: "hack" }).success).toBe(false);
    expect(requestSchema.safeParse({ ...valid, categories: ["<script>"] }).success).toBe(false);
  });
  it("weigert ongeldige uploadtokens", () => expect(requestSchema.safeParse({ ...valid, uploads: ["../../etc/passwd"] }).success).toBe(false));
  it("weigert een te lange omschrijving", () => expect(requestSchema.safeParse({ ...valid, story: "x".repeat(4001) }).success).toBe(false));
  it("weigert telefoonnummers met vreemde tekens", () => expect(requestSchema.safeParse({ ...valid, contact: { ...valid.contact, phone: "06<script>" } }).success).toBe(false));
});

describe("visibleQuestions", () => {
  it("toont koppelingsvragen alleen bij systeembronnen", () => {
    expect(visibleQuestions("nieuw", { sources: ["handmatig"] }).integration).toBe(false);
    expect(visibleQuestions("nieuw", { sources: ["boekhouding"] }).integration).toBe(true);
    expect(visibleQuestions("nieuw", { sources: ["erp"], integration: "ja" }).integrationWith).toBe(true);
  });
  it("slaat de vraag 'bestaand bestand' over bij verbeteren", () => expect(visibleQuestions("verbeteren", {}).hasFile).toBe(false));
});
