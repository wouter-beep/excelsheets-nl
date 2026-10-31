import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deleteStored } from "@/lib/server/storage";

export const runtime = "nodejs";

/** Bezoeker verwijdert een eigen upload vóór het versturen (alleen nog niet gekoppelde bestanden). */
export async function DELETE(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return NextResponse.json({ error: "Ongeldig" }, { status: 400 });
  const a = await db.attachment.findUnique({ where: { uploadToken: token } });
  if (!a || a.requestId) return NextResponse.json({ ok: true });
  await deleteStored(a.storedName);
  await db.attachment.delete({ where: { id: a.id } });
  return NextResponse.json({ ok: true });
}
