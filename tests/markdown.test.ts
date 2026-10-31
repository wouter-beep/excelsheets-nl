import { describe, expect, it } from "vitest";
import { headings, readingMinutes, slugify } from "@/lib/markdown";

describe("markdown helpers", () => {
  it("maakt veilige ankers van koppen", () => {
    expect(slugify("Wat is er nieuw in Excel 2024?")).toBe("wat-is-er-nieuw-in-excel-2024");
    expect(slugify("Kopiëren & plakken")).toBe("kopieren-plakken");
  });
  it("haalt alleen ##-koppen op", () => expect(headings("## Een\n\n### Sub\n\n## Twee").map((h) => h.text)).toEqual(["Een", "Twee"]));
  it("schat leestijd", () => expect(readingMinutes("woord ".repeat(660))).toBe(3));
});
