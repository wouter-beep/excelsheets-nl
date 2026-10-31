import type { Cell } from "./types";
import { euro, euroCents, number, number1, percent } from "@/lib/format";

const n2 = new Intl.NumberFormat("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function displayCell(c: Cell): string {
  if (c.v === null || c.v === undefined) return "";
  if (typeof c.v === "string") return c.v;
  switch (c.fmt) {
    case "eur": return euro(c.v);
    case "eur2": return euroCents(c.v);
    case "pct": return percent(c.v);
    case "int": return number(c.v);
    case "num1": return number1(c.v);
    case "num2": return n2.format(c.v);
    case "x": return `${number1(c.v)}×`;
    default: return number(c.v);
  }
}

/** Excel-getalnotatie voor ExcelJS. */
export function excelNumFmt(fmt?: Cell["fmt"]) {
  switch (fmt) {
    case "eur": return '"€" #,##0;[Red]-"€" #,##0';
    case "eur2": return '"€" #,##0.00;[Red]-"€" #,##0.00';
    case "pct": return "0.0%";
    case "int": return "#,##0";
    case "num1": return "#,##0.0";
    case "num2": return "#,##0.00";
    case "x": return '0.0"×"';
    default: return undefined;
  }
}
