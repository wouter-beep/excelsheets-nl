import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogoMark } from "@/components/brand/Logo";
import { currentUser } from "@/lib/server/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Inloggen beheer", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  if (await currentUser().catch(() => null)) redirect("/admin");
  return (
    <main className="grid min-h-screen place-items-center bg-forest px-5">
      <div className="pointer-events-none fixed inset-0 bg-grid-light" aria-hidden />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-lift">
        <div className="flex items-center gap-3"><LogoMark className="h-9 w-9" /><div><p className="font-display font-bold">ExcelSheets.nl</p><p className="text-[13px] text-ink-400">Beheeromgeving</p></div></div>
        <h1 className="mt-8 font-display text-2xl font-bold">Inloggen</h1>
        <LoginForm />
      </div>
    </main>
  );
}
