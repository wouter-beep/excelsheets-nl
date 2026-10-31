import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({ children, className, tone = "paper", id, grid }: { children: ReactNode; className?: string; tone?: "paper" | "white" | "dark" | "mint"; id?: string; grid?: boolean }) {
  const tones = { paper: "bg-paper", white: "bg-white", dark: "bg-forest text-white", mint: "bg-mint-50" };
  return (
    <section id={id} className={cn("relative py-20 md:py-28", tones[tone], className)}>
      {grid && <div className={cn("pointer-events-none absolute inset-0 mask-radial", tone === "dark" ? "bg-grid-light" : "bg-grid")} aria-hidden />}
      <div className="container relative">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lead, tone = "light", align = "left", cell }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; tone?: "light" | "dark"; align?: "left" | "center"; cell?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn(tone === "dark" ? "eyebrow-light" : "eyebrow", "mb-4")}>
          {cell && <span className={cn("rounded border px-1.5 py-0.5 text-[10px]", tone === "dark" ? "border-emerald/40" : "border-excel/30")}>{cell}</span>}
          {eyebrow}
        </p>
      )}
      <h2 className={cn("h-section", tone === "dark" && "text-white")}>{title}</h2>
      {lead && <p className={cn("mt-5 text-lg leading-relaxed md:text-xl", tone === "dark" ? "text-mint/75" : "text-ink-500")}>{lead}</p>}
    </div>
  );
}
