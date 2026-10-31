/** Gedeelde typen voor werkbladen: gebruikt door de browserweergave én de .xlsx-export. */
export type CellFormat = "eur" | "eur2" | "pct" | "int" | "num1" | "num2" | "text" | "x";
export type CellStyle =
  | "title" | "subtitle" | "header" | "label" | "input" | "calc" | "sub" | "total"
  | "pos" | "neg" | "muted" | "check-ok" | "check-bad" | "note" | "warn" | "shift";

export type Cell = {
  v: string | number | null;
  /** Excel-formule (zonder =) zoals die in het gedownloade bestand staat. */
  f?: string;
  fmt?: CellFormat;
  s?: CellStyle;
  /** Korte uitleg die in de formulebalk verschijnt. */
  note?: string;
  /** Achtergrondkleur (bijv. dienstkleur in een rooster). */
  bg?: string;
  /** Bewerkbare invoercel in de browser. */
  edit?: { key: string; min?: number; max?: number; step?: number };
  span?: number;
};

export type GridSheet = {
  name: string;
  kind: "grid";
  cols: number[]; // breedtes in px (kolom A = eerste)
  rows: (Cell | null)[][];
  freezeRows?: number;
};

export const colLetter = (i: number): string => {
  let s = "";
  let n = i + 1;
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
};
export const A1 = (col: number, row: number) => `${colLetter(col)}${row}`;

/**
 * Hulpklasse om rijen op te bouwen met correcte celadressen.
 * row() geeft het Excel-rijnummer (1-based) van de toegevoegde rij terug.
 */
export class SheetBuilder {
  rows: (Cell | null)[][] = [];
  get next() { return this.rows.length + 1; }
  row(cells: (Cell | null)[]) { this.rows.push(cells); return this.rows.length; }
  blank() { this.rows.push([]); return this.rows.length; }
  build(name: string, cols: number[], freezeRows?: number): GridSheet {
    return { name, kind: "grid", cols, rows: this.rows, freezeRows };
  }
}

// Celfabrieken
export const t = (v: string, s: CellStyle = "label", extra: Partial<Cell> = {}): Cell => ({ v, s, fmt: "text", ...extra });
export const h = (v: string): Cell => ({ v, s: "header", fmt: "text" });
export const n = (v: number, fmt: CellFormat = "eur", s: CellStyle = "calc", extra: Partial<Cell> = {}): Cell => ({ v, fmt, s, ...extra });
export const fx = (v: number, f: string, fmt: CellFormat = "eur", s: CellStyle = "calc", note?: string): Cell => ({ v, f, fmt, s, note });
export const inp = (v: number, key: string, fmt: CellFormat = "eur", opts: { min?: number; max?: number; step?: number; note?: string } = {}): Cell => ({
  v, fmt, s: "input", edit: { key, min: opts.min, max: opts.max, step: opts.step }, note: opts.note,
});
export const check = (ok: boolean, label: string, f?: string): Cell => ({ v: ok ? "OK" : label, f, s: ok ? "check-ok" : "check-bad", fmt: "text" });
