import { cn } from "@/lib/cn";

/**
 * Beeldmerk "Stijgend raster": een 3×3 spreadsheetraster waarin de cellen
 * trapsgewijs oplichten van linksonder naar rechtsboven — vooruitgang, cel voor cel.
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const bg = tone === "dark" ? "#073B2A" : "#FFFFFF";
  const off = tone === "dark" ? "rgba(203,248,224,0.14)" : "rgba(7,59,42,0.10)";
  // [kolom, rij] → vulkleur. Rij 0 = boven.
  const lit: Record<string, string> = {
    "0-2": "#147D52",
    "1-2": "#169062",
    "2-2": "#18B979",
    "1-1": "#18B979",
    "2-1": "#3FCB91",
    "2-0": "#CBF8E0",
  };
  const pos = [5, 16, 27];
  return (
    <svg viewBox="0 0 40 40" className={cn("shrink-0", className)} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill={bg} />
      {pos.map((y, r) =>
        pos.map((x, c) => (
          <rect key={`${c}-${r}`} x={x} y={y} width="8" height="8" rx="2" fill={lit[`${c}-${r}`] ?? off} />
        ))
      )}
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const text = tone === "dark" ? "text-ink" : "text-white";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" tone={tone === "dark" ? "dark" : "dark"} />
      <span className={cn("font-display text-[19px] leading-none tracking-[-0.03em]", text)}>
        <span className="font-extrabold">Excel</span>
        <span className="font-medium">Sheets</span>
        <span className="font-mono text-[14px] font-medium text-emerald">.nl</span>
      </span>
    </span>
  );
}
