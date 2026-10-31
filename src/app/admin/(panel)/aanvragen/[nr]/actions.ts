"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { RequestStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { audit, requireUser } from "@/lib/server/auth";
import { STATUS_LABELS } from "@/lib/server/requests";
import { getRetention } from "@/lib/settings";

export async function setStatus(nr: string, fd: FormData) {
  const user = await requireUser("requests.write");
  const status = String(fd.get("status"));
  if (!(status in STATUS_LABELS)) return;
  const r = await db.request.findUnique({ where: { number: nr }, select: { id: true, status: true } });
  if (!r || r.status === status) return;
  // Gewonnen of afgerond: gegevens vallen onder de opdracht en worden niet automatisch opgeschoond.
  const retention = await getRetention();
  const keep = status === "GEWONNEN" || status === "AFGEROND";
  const deleteAfter = keep ? null : new Date(Date.now() + retention.requestDays * 864e5);
  await db.$transaction([
    db.request.update({ where: { id: r.id }, data: { status: status as RequestStatus, deleteAfter } }),
    db.attachment.updateMany({ where: { requestId: r.id }, data: { deleteAfter: keep ? null : new Date(Date.now() + retention.attachmentDays * 864e5) } }),
    db.statusEvent.create({ data: { requestId: r.id, fromState: r.status, toState: status, actor: user.name } }),
  ]);
  await audit(user.id, "aanvraag.status", `${nr}:${status}`);
  revalidatePath(`/admin/aanvragen/${nr}`);
}

export async function addNote(nr: string, fd: FormData) {
  const user = await requireUser("requests.write");
  const body = z.string().trim().min(1).max(5000).safeParse(fd.get("body"));
  if (!body.success) return;
  const r = await db.request.findUnique({ where: { number: nr }, select: { id: true } });
  if (!r) return;
  await db.note.create({ data: { requestId: r.id, authorId: user.id, body: body.data } });
  revalidatePath(`/admin/aanvragen/${nr}`);
}

export async function updateContactNotes(contactId: string, nr: string, fd: FormData) {
  await requireUser("requests.write");
  await db.contact.update({ where: { id: contactId }, data: { internalNotes: String(fd.get("internalNotes") ?? "").slice(0, 5000) } });
  revalidatePath(`/admin/aanvragen/${nr}`);
}
