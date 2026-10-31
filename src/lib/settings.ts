import { cache } from "react";
import { db } from "@/lib/db";
import { defaultCompany, defaultRetention, type CompanySettings } from "@/config/site";

export type RetentionSettings = typeof defaultRetention;
export type NotificationSettings = { adminRecipients: string[]; fromName: string };

async function read<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await db.setting.findUnique({ where: { key } });
    if (!row) return fallback;
    return { ...fallback, ...(row.value as object) } as T;
  } catch {
    return fallback;
  }
}

export const getCompany = cache(() => read<CompanySettings>("company", defaultCompany));
export const getRetention = cache(() => read<RetentionSettings>("retention", defaultRetention));
export const getNotifications = cache(() =>
  read<NotificationSettings>("notifications", {
    adminRecipients: (process.env.ADMIN_NOTIFY_EMAILS || "").split(",").map((s) => s.trim()).filter(Boolean),
    fromName: "ExcelSheets.nl",
  })
);

export async function saveSetting(key: string, value: unknown) {
  await db.setting.upsert({ where: { key }, create: { key, value: value as object }, update: { value: value as object } });
}
