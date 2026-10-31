"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function AdminNav({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <nav aria-label="Beheer" className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-0">
      {items.map((i) => {
        const active = i.href === "/admin" ? path === "/admin" : path.startsWith(i.href);
        return <Link key={i.href} href={i.href} aria-current={active ? "page" : undefined} className={cn("shrink-0 rounded-lg px-3 py-2 text-[14px] transition", active ? "bg-white/10 font-semibold text-white" : "text-mint/75 hover:bg-white/5 hover:text-white")}>{i.label}</Link>;
      })}
    </nav>
  );
}
