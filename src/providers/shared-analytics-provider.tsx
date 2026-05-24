import React from "react";
import useFilters from "@/hooks/use-filters";
import useSessionStore from "@/stores/use-session-store";
import $Analytics from "@/services/analytics";
import Logger from "@/lib/logger";
import type {
  Analytics,
  BalanceAccumulative,
  ExpenseDistribution,
  FinancialStress,
  IncomeDistribution,
  Range,
  Totals,
} from "@/types/analytics";
import useSimpleQuery from "@/hooks/use-simple-query";

type SharedAnalyticsContextType = {
  balanceAccumulative: BalanceAccumulative[];
  expenseDistribution: ExpenseDistribution[];
  financialStress: FinancialStress[];
  incomeDistribution: IncomeDistribution[];
  query: ReturnType<typeof useSimpleQuery<Analytics>>;
  range: Range;
  totals: Totals;
};

type SharedAnalyticsProviderProps = {
  children: React.ReactNode;
};

const defaultAnalytics: Analytics & { loaded: boolean } = {
  loaded: false,
  balance_accumulative: [],
  expense_distribution: [],
  financial_stress: [],
  income_distribution: [],
  range: { start: "", end: "" },
  totals: { balance: 0, expenses: 0, income: 0 },
};

const SharedAnalyticsContext = React.createContext<SharedAnalyticsContextType>(null!);

const SharedAnalyticsProvider: React.FC<SharedAnalyticsProviderProps> = ({ children }) => {
  const user = useSessionStore((state) => state.user);
  const { filters } = useFilters();

  const analytics = useSimpleQuery({
    enabled: filters.hasChanged,
    queryKey: [user?.uid, filters.startDate, filters.endDate],
    queryFn: async () => {
      if (!user) {
        return defaultAnalytics;
      }

      const data = await $Analytics.get({
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      Logger.log("fetched analytics", {
        startDate: filters.startDate,
        endDate: filters.endDate,
        data,
      });

      return data;
    },
  });

  const data = analytics.data || defaultAnalytics;

  return (
    <SharedAnalyticsContext.Provider
      value={{
        balanceAccumulative: data.balance_accumulative,
        expenseDistribution: data.expense_distribution,
        financialStress: data.financial_stress,
        incomeDistribution: data.income_distribution,
        range: data.range,
        totals: data.totals,
        query: analytics,
      }}
    >
      {children}
    </SharedAnalyticsContext.Provider>
  );
};

export { SharedAnalyticsContext };
export default SharedAnalyticsProvider;
