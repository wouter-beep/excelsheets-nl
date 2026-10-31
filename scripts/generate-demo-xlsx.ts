/**
 * Schrijft alle demonstratiewerkboeken naar een map (standaard ./storage/demo-xlsx) om ze te controleren.
 * De website genereert de bestanden zelf on-the-fly via /api/voorbeelden/[slug]/xlsx.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { EXPORTS } from "../src/models/registry";
import { demoModels } from "../src/content/models";
import { buildWorkbook } from "../src/lib/xlsx";

async function main() {
  const out = process.argv[2] || path.join(process.cwd(), "storage", "demo-xlsx");
  mkdirSync(out, { recursive: true });
  for (const m of demoModels) {
    const buf = await buildWorkbook({ title: m.title, company: m.company, description: m.description, sheets: EXPORTS[m.slug]() });
    writeFileSync(path.join(out, `${m.slug}.xlsx`), Buffer.from(buf as ArrayBuffer));
    console.log("✓", m.slug);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
