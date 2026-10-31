import { writeFileSync } from "node:fs";
import ExcelJS from "exceljs";
import { EXPORTS } from "../src/models/registry";
import { A1 } from "../src/lib/sheet/types";
async function main() {
  const expected: Record<string, Record<string, Record<string, number | string>>> = {};
  for (const [slug, fn] of Object.entries(EXPORTS)) {
    const wb = new ExcelJS.Workbook();
    expected[slug] = {};
    for (const s of fn()) {
      const ws = wb.addWorksheet(s.name.slice(0, 31));
      expected[slug][s.name] = {};
      s.rows.forEach((row, ri) => row.forEach((c, ci) => {
        if (!c) return;
        const x = ws.getCell(ri + 1, ci + 1);
        if (c.f) { x.value = { formula: c.f } as any; if (c.v !== null) expected[slug][s.name][A1(ci, ri + 1)] = c.v; }
        else x.value = c.v as any;
      }));
    }
    await wb.xlsx.writeFile(`/tmp/claude-0/verify/${slug}.xlsx`);
  }
  writeFileSync("/tmp/claude-0/verify/expected.json", JSON.stringify(expected));
}
main();
