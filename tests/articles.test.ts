import { describe, expect, it } from "vitest";
import { allArticles, SERVICE_LINK_LABEL, TOPICS } from "@/content/articles";
import { demoModels } from "@/content/models";
import { timeline } from "@/content/timeline";

const words = (s: string) => s.split(/\s+/).filter((x) => /[\p{L}\d]/u.test(x)).length;

describe("Excel door de jaren", () => {
  it("bevat precies artikelen 1 tot en met 100", () => expect(allArticles.map((a) => a.number)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1)));
  it("heeft tien artikelen per jaar, 2017–2026", () => {
    for (const t of timeline) expect(allArticles.filter((a) => a.subjectYear === t.year)).toHaveLength(10);
  });
  it("heeft unieke slugs", () => expect(new Set(allArticles.map((a) => a.slug)).size).toBe(100));
  it("heeft 400–800 woorden per artikel", () => {
    const off = allArticles.map((a) => [a.number, words(`${a.summary} ${a.body} ${a.practice}`)] as const).filter(([, n]) => n < 400 || n > 800);
    expect(off).toEqual([]);
  });
  it("heeft bronnen, thema's en dienstlinks die bestaan", () => {
    const topics = new Set<string>(TOPICS.map((t) => t.slug)), svc = new Set(Object.keys(SERVICE_LINK_LABEL));
    for (const a of allArticles) {
      expect(a.sources.length, `#${a.number} bronnen`).toBeGreaterThan(0);
      a.topics.forEach((t) => expect(topics.has(t), `#${a.number} thema ${t}`).toBe(true));
      a.serviceLinks.forEach((s) => expect(svc.has(s), `#${a.number} dienst ${s}`).toBe(true));
    }
  });
  it("heeft alleen interne links die bestaan", () => {
    const svc = new Set(Object.keys(SERVICE_LINK_LABEL)), models = new Set(demoModels.map((m) => m.slug));
    const bySlug = new Map(allArticles.map((a) => [a.slug, a.subjectYear]));
    const bad: string[] = [];
    for (const a of allArticles) for (const [, href] of a.body.matchAll(/\]\((\/[^)]*)\)/g)) {
      let m: RegExpExecArray | null;
      if ((m = /^\/diensten\/(.+)$/.exec(href)) && !svc.has(m[1])) bad.push(`${a.number} ${href}`);
      if ((m = /^\/voorbeelden\/(.+)$/.exec(href)) && !models.has(m[1])) bad.push(`${a.number} ${href}`);
      if ((m = /^\/excel-door-de-jaren\/(\d{4})\/(.+)$/.exec(href)) && bySlug.get(m[2]) !== Number(m[1])) bad.push(`${a.number} ${href}`);
    }
    expect(bad).toEqual([]);
  });
  it("markeert artikelen over 2025 en 2026 voor redactiecontrole, met notitie", () => {
    for (const a of allArticles.filter((x) => x.subjectYear >= 2025)) {
      expect(a.status, `#${a.number}`).toBe("REVIEW");
      expect(a.factNote, `#${a.number}`).toBeTruthy();
    }
  });
});
