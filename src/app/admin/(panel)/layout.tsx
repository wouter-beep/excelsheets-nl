import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { can, requireUser } from "@/lib/server/auth";
import { emailMode } from "@/lib/server/email";
import { AdminNav } from "@/components/admin/AdminNav";
import { logout } from "./actions";

export const metadata: Metadata = { title: { default: "Beheer · ExcelSheets.nl", template: "%s · Beheer" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const ROLE = { OWNER: "Eigenaar", ADMIN: "Beheerder", EDITOR: "Redacteur", SALES: "Sales" } as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const items = [
    { href: "/admin", label: "Overzicht", show: true },
    { href: "/admin/aanvragen", label: "Aanvragen", show: can(user.role, "requests.read") },
    { href: "/admin/contacten", label: "Contacten", show: can(user.role, "requests.read") },
    { href: "/admin/artikelen", label: "Artikelen", show: can(user.role, "content.write") },
    { href: "/admin/diensten", label: "Diensten", show: can(user.role, "content.write") },
    { href: "/admin/voorbeelden", label: "Voorbeelden", show: can(user.role, "content.write") },
    { href: "/admin/inhoud", label: "Team, FAQ & cases", show: can(user.role, "content.write") },
    { href: "/admin/instellingen", label: "Instellingen", show: can(user.role, "settings.write") },
    { href: "/admin/gebruikers", label: "Gebruikers", show: can(user.role, "users.manage") },
  ].filter((i) => i.show);
  const warnings = [
    emailMode() === "demo" && "E-mail staat in demomodus (geen SMTP_HOST): bevestigingen worden niet verstuurd.",
    !process.env.CLAMAV_HOST && "Er is geen virusscanner ingesteld (CLAMAV_HOST).",
    process.env.DATABASE_URL?.startsWith("file:") && "Lokale SQLite-database in gebruik. Gebruik PostgreSQL in productie.",
  ].filter(Boolean) as string[];
  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-white/10 bg-forest text-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0">
        <div className="flex items-center gap-2.5 px-5 py-5"><LogoMark className="h-8 w-8" /><span className="font-display font-bold">Beheer</span></div>
        <AdminNav items={items} />
        <div className="hidden px-5 py-5 text-[13px] text-mint/70 lg:absolute lg:bottom-0 lg:block lg:w-full">
          <p className="truncate font-semibold text-white">{user.name}</p>
          <p>{ROLE[user.role]}</p>
          <div className="mt-3 flex gap-3"><Link href="/" className="underline">Website</Link><form action={logout}><button className="underline">Uitloggen</button></form></div>
        </div>
      </aside>
      <div className="min-w-0">
        {warnings.length > 0 && <div className="border-b border-amber/30 bg-amber/10 px-6 py-2 text-[13px] text-ink-700">{warnings.map((w) => <p key={w}>⚠ {w}</p>)}</div>}
        <main className="px-5 py-8 md:px-10">{children}</main>
        <form action={logout} className="px-5 pb-8 lg:hidden"><button className="btn-ghost">Uitloggen</button></form>
      </div>
    </div>
  );
}
