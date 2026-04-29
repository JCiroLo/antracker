import React from "react";
import ArrayTools from "@/tools/array-tools";

type SharedAnalyticsContextType = {
  balance: {
    data: {
      expenses: number[];
      incomes: number[];
    };
    xAxis: string[];
  };
  cumulativeBalance: {
    xAxis: string[];
    data: number[];
  };
};

type SharedAnalyticsProviderProps = {
  children: React.ReactNode;
};

const SharedAnalyticsContext = React.createContext<SharedAnalyticsContextType>(null!);

const SharedAnalyticsProvider: React.FC<SharedAnalyticsProviderProps> = ({ children }) => {
  const balanceDistribution = React.useMemo(() => {
    const data: { expenses: number[]; incomes: number[] } = { expenses: [], incomes: [] };
    const xAxis: string[] = [];

    // const start = dayjs(filters.startDate).startOf("day");
    // const end = dayjs(filters.endDate).endOf("day");

    // const diff = end.diff(start, "day") + 1;
    // const clampedDiff = Math.min(Math.max(diff, 1), 366); // Hard limit to display max 1 year of days for performance

    // const days = Array.from({ length: clampedDiff }, () => 0);
    // data = { expenses: Array.from(days), incomes: Array.from(days) };
    // xAxis = Array.from({ length: clampedDiff }).map((_, i) => start.add(i, "day").format("DD/MM"));

    // expenses.records.all.forEach((record) => {
    //   const p = dayjs(record.paid_date);
    //   if (p.valueOf() >= start.valueOf() && p.valueOf() <= end.valueOf()) {
    //     const index = p.startOf("day").diff(start, "day");
    //     if (index >= 0 && index < clampedDiff) {
    //       data.expenses[index] += record.amount || 0;
    //     }
    //   }
    // });

    // incomes.records.all.forEach((record) => {
    //   const p = dayjs(record.paid_date);
    //   if (p.valueOf() >= start.valueOf() && p.valueOf() <= end.valueOf()) {
    //     const index = p.startOf("day").diff(start, "day");
    //     if (index >= 0 && index < clampedDiff) {
    //       data.incomes[index] += record.amount || 0;
    //     }
    //   }
    // });

    return { data, xAxis };
  }, []);

  const cumulativeBalance = React.useMemo(() => {
    const xAxis = balanceDistribution.xAxis;

    return {
      xAxis,
      data: ArrayTools.cumulativeSum(
        xAxis.map((_, index) => -balanceDistribution.data.expenses[index] + balanceDistribution.data.incomes[index]),
        (item) => item,
      ),
    };
  }, [balanceDistribution]);

  return (
    <SharedAnalyticsContext.Provider value={{ cumulativeBalance, balance: balanceDistribution }}>
      {children}
    </SharedAnalyticsContext.Provider>
  );
};

export { SharedAnalyticsContext };
export default SharedAnalyticsProvider;
