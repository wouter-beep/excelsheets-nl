"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const LINES = ["Wat kunnen wij voor jou bouwen?", "Heb je al een Excel-bestand?", "Vertel ons jouw idee.", "Laat zien waar je vastloopt.", "Een vraag? Wij denken mee."];

/** Kleine, wegklikbare CTA op mobiel. Verschijnt pas na wat scrollen en nooit in de aanvraagflow of het beheer. */
export function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const hidden = pathname.startsWith("/verzoekwijzer") || pathname.startsWith("/admin") || pathname.startsWith("/aanvraag-ontvangen") || pathname.startsWith("/contact");
  const line = LINES[(pathname.length + 3) % LINES.length];
  useEffect(() => {
    try { if (sessionStorage.getItem("es-cta-dismissed")) setDismissed(true); } catch {}
    const on = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (hidden || dismissed) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-2xl border border-white/10 bg-forest p-2 pl-4 text-white shadow-lift md:hidden">
          <Link href="/verzoekwijzer" className="flex flex-1 items-center justify-between gap-2 py-1.5 text-[14px] font-semibold">
            {line}<span className="grid h-8 w-8 place-items-center rounded-full bg-emerald text-forest-900"><ArrowRight className="h-4 w-4" aria-hidden /></span>
          </Link>
          <button aria-label="Verberg deze melding" className="grid h-8 w-8 place-items-center rounded-full text-mint/60 hover:text-white"
            onClick={() => { setDismissed(true); try { sessionStorage.setItem("es-cta-dismissed", "1"); } catch {} }}>
            <X className="h-4 w-4" aria-hidden />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
