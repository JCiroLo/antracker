import type { FrequencyUnit } from "@/types/transaction";

export const frequenciesPlurality: Record<FrequencyUnit, { singular: string; plural: string }> = {
  days: { singular: "día", plural: "días" },
  weeks: { singular: "semana", plural: "semanas" },
  months: { singular: "mes", plural: "meses" },
  years: { singular: "año", plural: "años" },
};
