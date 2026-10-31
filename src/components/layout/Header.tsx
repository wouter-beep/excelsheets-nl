"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { serviceNav } from "@/content/services";

const NAV = [
  { href: "/voorbeelden", label: "Voorbeelden" },
  { href: "/werkwijze", label: "Werkwijze" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/excel-door-de-jaren", label: "Excel door de jaren" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setMega(false); setMobile(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setMobile(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { document.body.style.overflow = mobile ? "hidden" : ""; }, [mobile]);

  const open = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMega(true); };
  const close = () => { closeTimer.current = setTimeout(() => setMega(false), 120); };
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={cn("sticky top-0 z-50 transition-all duration-300", scrolled ? "border-b border-ink/[0.07] bg-paper/85 backdrop-blur-xl" : "bg-transparent")}>
      <a href="#inhoud" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-white">Naar de inhoud</a>
      <div className="container flex h-[72px] items-center gap-6">
        <Link href="/" aria-label="ExcelSheets.nl — naar de homepage" className="shrink-0"><Logo /></Link>
        <nav aria-label="Hoofdnavigatie" className="hidden flex-1 items-center gap-1 lg:flex">
          <div className="relative" onMouseEnter={open} onMouseLeave={close}>
            <button aria-expanded={mega} aria-controls="mega-oplossingen" onClick={() => setMega((m) => !m)}
              className={cn("inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition hover:bg-ink/[0.04]", (active("/diensten") || active("/oplossingen")) ? "text-excel" : "text-ink-700")}>
              Oplossingen <ChevronDown className={cn("h-4 w-4 transition", mega && "rotate-180")} aria-hidden />
            </button>
            <AnimatePresence>
              {mega && (
                <motion.div id="mega-oplossingen" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full mt-2 w-[min(760px,90vw)] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lift">
                  <div className="grid grid-cols-[1fr_240px]">
                    <ul className="grid grid-cols-2 gap-1 p-3">
                      {serviceNav.map((s, i) => (
                        <li key={s.slug}>
                          <Link href={s.href} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-mint-50">
                            <span className="cellref w-7 shrink-0 text-ink-300 group-hover:text-excel">{String.fromCharCode(65 + (i % 2))}{Math.floor(i / 2) + 1}</span>
                            <span className="text-[14px] font-medium text-ink">{s.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col justify-between bg-forest p-5 text-white">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-300">Niet zeker wat je nodig hebt?</p>
                        <p className="mt-2 font-display text-lg font-bold leading-snug">Beschrijf je vraagstuk in je eigen woorden. Wij vertalen het naar een oplossing.</p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Link href="/oplossingen" className="flex items-center gap-1 text-sm text-mint hover:text-white">Alle oplossingen <ArrowRight className="h-4 w-4" aria-hidden /></Link>
                        <Link href="/verzoekwijzer" className="btn-primary w-full !py-2.5 text-sm">Start de Verzoekwijzer</Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={cn("rounded-full px-3.5 py-2 text-[14.5px] font-medium transition hover:bg-ink/[0.04]", active(n.href) ? "text-excel" : "text-ink-700")}>{n.label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/zoeken" aria-label="Zoeken" className="grid h-10 w-10 place-items-center rounded-full text-ink-700 transition hover:bg-ink/[0.05]"><Search className="h-[18px] w-[18px]" aria-hidden /></Link>
          <Link href="/verzoekwijzer" className="btn-dark hidden !py-2.5 text-[14px] sm:inline-flex">Bespreek je vraagstuk</Link>
          <button className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden" aria-label={mobile ? "Menu sluiten" : "Menu openen"} aria-expanded={mobile} aria-controls="mobiel-menu" onClick={() => setMobile((m) => !m)}>
            {mobile ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.nav id="mobiel-menu" aria-label="Mobiele navigatie" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-paper lg:hidden">
            <div className="container space-y-6 py-6">
              <div>
                <p className="eyebrow mb-3">Oplossingen</p>
                <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {serviceNav.map((s) => <li key={s.slug}><Link href={s.href} className="block rounded-xl px-3 py-3 text-[16px] font-medium hover:bg-white">{s.title}</Link></li>)}
                  <li><Link href="/oplossingen" className="block rounded-xl px-3 py-3 text-[16px] font-semibold text-excel">Alle oplossingen →</Link></li>
                </ul>
              </div>
              <ul className="space-y-1 border-t border-ink/10 pt-4">
                {NAV.map((n) => <li key={n.href}><Link href={n.href} className="block rounded-xl px-3 py-3 font-display text-xl font-bold">{n.label}</Link></li>)}
                <li><Link href="/health-check" className="block rounded-xl px-3 py-3 font-display text-xl font-bold">Excel Health Check</Link></li>
              </ul>
              <Link href="/verzoekwijzer" className="btn-primary w-full">Bespreek je Excel-vraagstuk</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
