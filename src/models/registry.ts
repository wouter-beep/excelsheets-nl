import type { GridSheet } from "@/lib/sheet/types";
import { computeNoordbrug, defaultNoordbrug, noordbrugSheets } from "./noordbrug";
import { computeMeridiaan, defaultMeridiaan, meridiaanSheets } from "./meridiaan";
import { computeLiq, defaultLiq, liqSheets } from "./liquiditeit";
import { computeJr, defaultJr, jrSheets } from "./jaarrekening";
import { computePlan, defaultPlan, planSheets, EMPLOYEES, DAYS, SHIFTS } from "./personeel";
import { computeHoreca, defaultHoreca, horecaSheets } from "./horeca";
import { computeProd, defaultProd, prodSheets } from "./productie";
import { computeKp, defaultKp, kpSheets } from "./kostprijs";
import { computeProj, defaultProj, projSheets } from "./projecten";
import { computeInv, defaultInv, invSheets } from "./voorraad";
import { computeCons, defaultCons, consSheets } from "./consolidatie";
import { computeInvest, defaultInvest, investSheets } from "./investering";
import { SheetBuilder, h, t } from "@/lib/sheet/types";

function rosterSheet(): GridSheet {
  const b = new SheetBuilder();
  b.row([t("Weekrooster week 46", "title", { span: 3 })]);
  b.blank();
  b.row([h("Medewerker"), h("Functie"), ...DAYS.map(h)]);
  EMPLOYEES.forEach((e, i) => b.row([t(e.name), t(e.role, "muted"), ...defaultPlan.roster[i].map((c) => ({ v: c, s: "shift" as const, bg: SHIFTS[c].color === "transparent" ? undefined : SHIFTS[c].color, fmt: "text" as const }))]));
  return b.build("Rooster", [110, 150, ...Array(7).fill(78)], 3);
}

/** Werkbladen per model met standaardinstellingen — voor de .xlsx-download. */
export const EXPORTS: Record<string, () => GridSheet[]> = {
  managementdashboard: () => noordbrugSheets(defaultNoordbrug, computeNoordbrug(defaultNoordbrug)),
  "begroting-rolling-forecast": () => meridiaanSheets(defaultMeridiaan, computeMeridiaan(defaultMeridiaan)),
  liquiditeitsprognose: () => liqSheets(defaultLiq, computeLiq(defaultLiq)),
  jaarrekeningwerkboek: () => jrSheets(defaultJr, computeJr(defaultJr)),
  personeelsplanning: () => [rosterSheet(), ...planSheets(defaultPlan, computePlan(defaultPlan))],
  "horeca-omzetanalyse": () => horecaSheets(defaultHoreca, computeHoreca(defaultHoreca)),
  "productie-efficiency": () => prodSheets(defaultProd, computeProd(defaultProd)),
  kostprijsberekening: () => kpSheets(defaultKp, computeKp(defaultKp)),
  "projecten-nacalculatie": () => projSheets(defaultProj, computeProj(defaultProj)),
  voorraadbeheer: () => invSheets(defaultInv, computeInv(defaultInv)),
  consolidatie: () => consSheets(defaultCons, computeCons(defaultCons)),
  investeringsmodel: () => investSheets(defaultInvest, computeInvest(defaultInvest)),
};
