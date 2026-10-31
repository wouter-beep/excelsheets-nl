import { describe, expect, it } from "vitest";
import { checkFile, safeName } from "@/lib/server/storage";

const zip = (extra = "[Content_Types].xml xl/workbook.xml") => Buffer.concat([Buffer.from([0x50, 0x4b, 0x03, 0x04]), Buffer.from(extra)]);
const ole = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, 1, 2, 3]);

describe("checkFile", () => {
  it("accepteert een echte xlsx-werkmap", () => expect(checkFile("model.xlsx", zip())).toMatchObject({ ok: true, ext: ".xlsx" }));
  it("accepteert xls met OLE-header", () => expect(checkFile("oud.XLS", ole)).toMatchObject({ ok: true, ext: ".xls" }));
  it("accepteert csv-tekst", () => expect(checkFile("data.csv", Buffer.from("a;b\n1;2\n"))).toMatchObject({ ok: true }));
  it("weigert onbekende extensies", () => expect(checkFile("script.exe", zip()).ok).toBe(false));
  it("weigert een dubbele extensie die op .exe eindigt", () => expect(checkFile("factuur.xlsx.exe", zip()).ok).toBe(false));
  it("weigert een lege upload", () => expect(checkFile("leeg.xlsx", Buffer.alloc(0)).ok).toBe(false));
  it("weigert een xlsx waarvan de inhoud geen zip is", () => expect(checkFile("nep.xlsx", Buffer.from("MZ\x90\x00 dit is geen werkmap")).ok).toBe(false));
  it("weigert een willekeurig zip-bestand met xlsx-extensie", () => expect(checkFile("archief.xlsx", zip("random.txt")).ok).toBe(false));
  it("weigert een xls zonder OLE-header", () => expect(checkFile("nep.xls", zip()).ok).toBe(false));
  it("weigert binaire inhoud als csv", () => expect(checkFile("data.csv", Buffer.from([0x41, 0x00, 0x42])).ok).toBe(false));
  it("weigert te grote bestanden", () => expect(checkFile("groot.csv", Buffer.alloc(30 * 1024 * 1024, 0x41)).ok).toBe(false));
});

describe("safeName", () => {
  it("haalt paden en stuurtekens weg", () => {
    expect(safeName("../../etc/passwd")).toBe("passwd");
    expect(safeName("C:\\temp\\begroting<2026>.xlsx")).not.toMatch(/[<>\\]/);
    expect(safeName("")).toBe("bestand");
  });
});
