/**
 * Afgeschermde opslag voor geüploade klantbestanden.
 * - Bestanden staan buiten /public in STORAGE_DIR (standaard ./storage/private) en zijn
 *   alleen via de beheeromgeving (met sessie + rol) te downloaden.
 * - Opgeslagen onder een willekeurige naam; de originele naam staat alleen in de database.
 * - Controle op extensie, grootte en "magic bytes" (inhoud moet bij het type passen).
 * - Virusscan via ClamAV (clamd INSTREAM) als CLAMAV_HOST is ingesteld.
 *   Met MALWARE_SCAN_REQUIRED=true wordt een upload geweigerd als scannen niet lukt.
 */
import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { uploadPolicy } from "@/config/site";

const ROOT = path.resolve(process.env.STORAGE_DIR || path.join(process.cwd(), "storage", "private"));
const UPLOADS = path.join(ROOT, "uploads");

export const randomToken = (bytes = 24) => randomBytes(bytes).toString("base64url");
export const sha256 = (buf: Buffer) => createHash("sha256").update(buf).digest("hex");

const MIME: Record<string, string> = {
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xlsm": "application/vnd.ms-excel.sheet.macroEnabled.12",
  ".xlsb": "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  ".xls": "application/vnd.ms-excel",
  ".csv": "text/csv",
};

export type FileCheck = { ok: true; ext: string; mime: string } | { ok: false; error: string };

/** Valideert naam, grootte en inhoud. Vertrouwt nooit op het door de browser opgegeven type. */
export function checkFile(name: string, buf: Buffer): FileCheck {
  const ext = path.extname(name).toLowerCase();
  if (!uploadPolicy.extensions.includes(ext)) return { ok: false, error: "Dit bestandstype wordt niet ondersteund. Gebruik .xlsx, .xlsm, .xls, .xlsb of .csv." };
  if (buf.length === 0) return { ok: false, error: "Het bestand is leeg." };
  if (buf.length > uploadPolicy.maxFileBytes) return { ok: false, error: `Het bestand is groter dan ${Math.round(uploadPolicy.maxFileBytes / 1048576)} MB.` };
  const zip = buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04;
  const ole = buf.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  if ((ext === ".xlsx" || ext === ".xlsm" || ext === ".xlsb") && !zip) return { ok: false, error: "De inhoud van het bestand past niet bij een Excel-werkmap." };
  if (ext === ".xls" && !ole) return { ok: false, error: "De inhoud van het bestand past niet bij een .xls-werkmap." };
  if (ext === ".csv" && buf.subarray(0, 8192).includes(0)) return { ok: false, error: "Dit lijkt geen tekstbestand (.csv) te zijn." };
  if (zip && ext !== ".csv") {
    // Een echte OOXML-werkmap bevat [Content_Types].xml en een xl/-map
    const head = buf.subarray(0, Math.min(buf.length, 512 * 1024)).toString("latin1");
    if (!head.includes("[Content_Types].xml") && !head.includes("xl/")) return { ok: false, error: "Dit zip-bestand lijkt geen Excel-werkmap te zijn." };
  }
  return { ok: true, ext, mime: MIME[ext] };
}

/** Veilige weergavenaam: geen paden, geen stuurtekens. */
export const safeName = (name: string) => path.basename(name).replace(/[\u0000-\u001f\u007f<>:"/\\|?*]+/g, "_").slice(0, 180) || "bestand";

export async function storeFile(buf: Buffer, ext: string) {
  await mkdir(UPLOADS, { recursive: true, mode: 0o700 });
  const storedName = `${randomToken(18)}${ext}`;
  await writeFile(path.join(UPLOADS, storedName), buf, { mode: 0o600, flag: "wx" });
  return storedName;
}

function resolveStored(storedName: string) {
  if (!/^[A-Za-z0-9_-]{16,64}\.[a-z]{3,4}$/.test(storedName)) throw new Error("Ongeldige bestandsnaam");
  return path.join(UPLOADS, storedName);
}
export const readStored = (storedName: string) => readFile(resolveStored(storedName));
export async function deleteStored(storedName: string) {
  try { await unlink(resolveStored(storedName)); } catch (e) { if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e; }
}

export type ScanResult = { status: "CLEAN" | "INFECTED" | "NOT_SCANNED" | "ERROR"; detail?: string };

/** Scant via clamd (TCP, INSTREAM-protocol). */
export async function scanBuffer(buf: Buffer): Promise<ScanResult> {
  const host = process.env.CLAMAV_HOST;
  if (!host) return { status: "NOT_SCANNED", detail: "Geen virusscanner ingesteld (CLAMAV_HOST)" };
  const port = Number(process.env.CLAMAV_PORT || 3310);
  return new Promise((resolve) => {
    const sock = net.createConnection({ host, port });
    let out = "";
    const done = (r: ScanResult) => { sock.destroy(); resolve(r); };
    sock.setTimeout(Number(process.env.CLAMAV_TIMEOUT_MS || 20000), () => done({ status: "ERROR", detail: "Time-out van de virusscanner" }));
    sock.on("error", (e) => done({ status: "ERROR", detail: `Virusscanner niet bereikbaar: ${e.message}` }));
    sock.on("data", (d) => { out += d.toString(); });
    sock.on("end", () => {
      const r = out.replace(/\0/g, "").trim();
      if (/OK$/.test(r)) done({ status: "CLEAN" });
      else if (/FOUND$/.test(r)) done({ status: "INFECTED", detail: r.replace(/^stream:\s*/, "") });
      else done({ status: "ERROR", detail: r || "Onbekend antwoord" });
    });
    sock.on("connect", () => {
      sock.write("zINSTREAM\0");
      const CHUNK = 64 * 1024;
      for (let i = 0; i < buf.length; i += CHUNK) {
        const part = buf.subarray(i, i + CHUNK);
        const len = Buffer.alloc(4); len.writeUInt32BE(part.length);
        sock.write(len); sock.write(part);
      }
      sock.write(Buffer.alloc(4));
    });
  });
}

export const scanRequired = () => process.env.MALWARE_SCAN_REQUIRED === "true" || (process.env.NODE_ENV === "production" && process.env.MALWARE_SCAN_REQUIRED !== "false");
