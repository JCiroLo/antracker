import xior from "@/lib/xior";
import type { Analytics } from "@/types/analytics";

const $Analytics = {
  async get({ startDate, endDate }: { startDate: string; endDate: string }) {
    if (!startDate || !endDate) throw new Error("startDate and endDate are required");

    const { data } = await xior.get<Analytics>(`/analytics`, { params: { startDate, endDate } });

    return data;
  },
};

export default $Analytics;
