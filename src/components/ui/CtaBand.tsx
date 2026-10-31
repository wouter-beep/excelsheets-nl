import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Contextuele CTA-band, te gebruiken onderaan diensten, voorbeelden en artikelen. */
export function CtaBand({ title, text, cta = "Vertel ons wat je nodig hebt", href = "/verzoekwijzer", secondary }: { title: string; text?: string; cta?: string; href?: string; secondary?: { href: string; label: string } }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-10 text-white md:px-12 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-70" aria-hidden />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald/25 blur-3xl" aria-hidden />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold leading-tight md:text-4xl">{title}</h2>
          {text && <p className="mt-3 text-mint/75 md:text-lg">{text}</p>}
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href={href} className="btn-primary">{cta}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
          {secondary && <Link href={secondary.href} className="btn-ghost-light">{secondary.label}</Link>}
        </div>
      </div>
    </div>
  );
}
