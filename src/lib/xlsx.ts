import ExcelJS from "exceljs";
import type { GridSheet, Cell } from "@/lib/sheet/types";
import { excelNumFmt } from "@/lib/sheet/display";

const FILL = (argb: string): ExcelJS.Fill => ({ type: "pattern", pattern: "solid", fgColor: { argb } });
const hex = (c: string) => "FF" + c.replace("#", "").toUpperCase();

function styleCell(x: ExcelJS.Cell, c: Cell) {
  const font: Partial<ExcelJS.Font> = { name: "Calibri", size: 10, color: { argb: "FF14231C" } };
  switch (c.s) {
    case "title": Object.assign(font, { size: 14, bold: true, color: { argb: "FF073B2A" } }); break;
    case "subtitle": case "note": Object.assign(font, { italic: true, color: { argb: "FF7A8A81" } }); break;
    case "header": Object.assign(font, { bold: true, color: { argb: "FFFFFFFF" } }); x.fill = FILL("FF147D52"); break;
    case "input": Object.assign(font, { bold: true, color: { argb: "FF2F6FED" } }); x.fill = FILL("FFFDF1D8"); break;
    case "sub": font.bold = true; x.border = { top: { style: "thin", color: { argb: "FFA9B5AE" } } }; break;
    case "total": Object.assign(font, { bold: true, color: { argb: "FF073B2A" } }); x.fill = FILL("FFE6FBEF"); x.border = { top: { style: "medium", color: { argb: "FF073B2A" } } }; break;
    case "pos": font.color = { argb: "FF147D52" }; break;
    case "neg": font.color = { argb: "FFE2574C" }; break;
    case "muted": font.color = { argb: "FF7A8A81" }; break;
    case "check-ok": Object.assign(font, { bold: true, color: { argb: "FF073B2A" } }); x.fill = FILL("FFCBF8E0"); break;
    case "check-bad": Object.assign(font, { bold: true, color: { argb: "FFE2574C" } }); x.fill = FILL("FFFBE3E1"); break;
    case "warn": Object.assign(font, { bold: true, color: { argb: "FFD99A24" } }); x.fill = FILL("FFFDF1D8"); break;
    case "shift": font.bold = true; x.alignment = { horizontal: "center" }; break;
  }
  if (c.bg && c.bg.startsWith("#")) x.fill = FILL(hex(c.bg));
  x.font = font;
  if (typeof c.v === "number") { const f = excelNumFmt(c.fmt); if (f) x.numFmt = f; }
  if (c.note) x.note = c.note;
}

export async function buildWorkbook(opts: { title: string; company: string; description: string; sheets: GridSheet[] }) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "ExcelSheets.nl";
  wb.created = new Date();
  wb.calcProperties.fullCalcOnLoad = true;

  // Voorblad
  const info = wb.addWorksheet("Over dit model", { properties: { tabColor: { argb: "FF073B2A" } }, views: [{ showGridLines: false }] });
  info.columns = [{ width: 4 }, { width: 28 }, { width: 80 }];
  const rows: [string, string][] = [
    ["Model", opts.title], ["Voorbeeldbedrijf", `${opts.company} (fictief)`], ["Omschrijving", opts.description],
    ["Let op", "Demonstratiemodel met fictieve gegevens, gemaakt door ExcelSheets.nl. Geen klantproject en geen advies."],
    ["Kleuren", "Gele cellen met blauwe tekst zijn invoer. Groene balken zijn kopjes. Lichtgroene rijen zijn totalen."],
    ["Website", "www.excelsheets.nl"],
  ];
  info.getCell("B2").value = "ExcelSheets.nl";
  info.getCell("B2").font = { bold: true, size: 18, color: { argb: "FF073B2A" } };
  rows.forEach(([k, v], i) => {
    const r = info.getRow(4 + i);
    r.getCell(2).value = k; r.getCell(2).font = { bold: true, color: { argb: "FF55665D" } };
    r.getCell(3).value = v; r.getCell(3).alignment = { wrapText: true, vertical: "top" };
  });

  for (const s of opts.sheets) {
    const ws = wb.addWorksheet(s.name.slice(0, 31), { views: [{ state: s.freezeRows ? "frozen" : "normal", ySplit: s.freezeRows ?? 0, xSplit: 1, showGridLines: true }], properties: { tabColor: { argb: "FF18B979" } } });
    ws.columns = s.cols.map((w) => ({ width: Math.max(6, Math.round(w / 7)) }));
    s.rows.forEach((row, ri) => {
      row.forEach((c, ci) => {
        if (!c) return;
        const x = ws.getCell(ri + 1, ci + 1);
        if (c.f) x.value = { formula: c.f, result: c.v ?? undefined } as ExcelJS.CellFormulaValue;
        else x.value = c.v as ExcelJS.CellValue;
        styleCell(x, c);
        if (c.span && c.span > 1 && (c.s === "title" || c.s === "subtitle" || c.s === "note")) {
          try { ws.mergeCells(ri + 1, ci + 1, ri + 1, ci + c.span); } catch { /* overlappende merge negeren */ }
        }
      });
    });
  }
  return wb.xlsx.writeBuffer();
}
