import dayjs from "dayjs";
import type { DateRange, DateRangeKey } from "@/types/global";
import type { FrequencyUnit } from "@/types/transaction";

export const frequenciesPlurality: Record<FrequencyUnit, { singular: string; plural: string }> = {
  days: { singular: "día", plural: "días" },
  weeks: { singular: "semana", plural: "semanas" },
  months: { singular: "mes", plural: "meses" },
  years: { singular: "año", plural: "años" },
};

export const dateRanges: Record<DateRangeKey, DateRange> = {
  "this-month": {
    label: "El mes actual",
    date: dayjs().startOf("month").format("YYYY-MM-DD"),
    enabled: true,
  },
  "last-7-days": {
    label: "Últimos 7 días",
    date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    enabled: true,
  },
  "last-30-days": {
    label: "Últimos 30 dias",
    date: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    enabled: true,
  },
  "last-90-days": {
    label: "Últimos 90 dias",
    date: dayjs().subtract(90, "day").format("YYYY-MM-DD"),
    enabled: true,
  },
  "last-5-years": {
    label: "Últimos 5 años",
    date: dayjs().subtract(5, "year").format("YYYY-MM-DD"),
    enabled: true,
  },
  custom: {
    label: "Personalizado",
    date: dayjs().format("YYYY-MM-DD"),
    enabled: false,
  },
};
