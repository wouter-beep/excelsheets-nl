/**
 * Bewaarbeleid uitvoeren. Plan dit dagelijks in (cron, systemd-timer of de scheduler van je host):
 *   npm run retention
 * Verwijdert:
 *  - uploads die nooit aan een aanvraag zijn gekoppeld (na orphanUploadHours)
 *  - bijlagen waarvan de bewaartermijn is verlopen (bestand + record)
 *  - aanvragen waarvan de bewaartermijn is verlopen (met notities, historie en bijlagen)
 *  - contacten zonder aanvragen
 *  - logboekregels ouder dan 13 maanden
 * Gewonnen en afgeronde aanvragen hebben geen verwijderdatum en blijven staan.
 */
import { unlink } from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const UPLOADS = path.join(path.resolve(process.env.STORAGE_DIR || path.join(process.cwd(), "storage", "private")), "uploads");
const dry = process.argv.includes("--dry-run");

async function removeFile(name: string) {
  if (dry || !/^[A-Za-z0-9_-]{16,64}\.[a-z]{3,4}$/.test(name)) return;
  try { await unlink(path.join(UPLOADS, name)); } catch (e) { if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e; }
}

async function main() {
  const now = new Date();
  const files = await db.attachment.findMany({ where: { OR: [{ deleteAfter: { lt: now } }, { request: { deleteAfter: { lt: now } } }] }, select: { id: true, storedName: true } });
  for (const f of files) await removeFile(f.storedName);
  const a = dry ? { count: files.length } : await db.attachment.deleteMany({ where: { id: { in: files.map((f) => f.id) } } });
  const r = dry ? { count: await db.request.count({ where: { deleteAfter: { lt: now } } }) } : await db.request.deleteMany({ where: { deleteAfter: { lt: now } } });
  const c = dry ? { count: 0 } : await db.contact.deleteMany({ where: { requests: { none: {} } } });
  const l = dry ? { count: 0 } : await db.auditLog.deleteMany({ where: { createdAt: { lt: new Date(now.getTime() - 395 * 864e5) } } });
  console.log(`${dry ? "[proef] " : ""}Bewaarbeleid: ${a.count} bijlagen, ${r.count} aanvragen, ${c.count} contacten, ${l.count} logregels verwijderd.`);
}
main().finally(() => db.$disconnect());
