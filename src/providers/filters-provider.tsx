import React from "react";
import dayjs from "dayjs";
import { dateRanges } from "@/lib/constants";
import type { DateRangeKey } from "@/types/global";

type Filters = {
  categoryId: string | "all";
  dateRange: DateRangeKey;
  endDate: string;
  hasChanged: boolean;
  search: string;
  singlePayment: "single" | "recurring" | "all";
  startDate: string;
  type: "expense" | "income" | "all";
};

type FiltersContextType = {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
};

type FiltersProviderProps = {
  children: React.ReactNode;
};

const defaultDateRange = "this-month";

const FiltersContext = React.createContext<FiltersContextType>(null!);

const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const [filters, setFilters] = React.useState<Filters>({
    dateRange: defaultDateRange,
    startDate: dateRanges[defaultDateRange].date,
    endDate: dayjs().format("YYYY-MM-DD"),
    search: "",
    type: "all",
    categoryId: "all",
    singlePayment: "all",
    hasChanged: false,
  });

  function updateFilters(newFilters: Partial<Filters>) {
    setFilters((prev) => ({ ...prev, ...newFilters }));

    if (!newFilters.hasChanged) {
      setFilters((prev) => ({ ...prev, hasChanged: true }));
    }
  }

  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersContext };
export default FiltersProvider;
