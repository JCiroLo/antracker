import React from "react";
import dayjs from "dayjs";

type Filters = {
  startDate: string;
  endDate: string;
  search: string;
  type: "all" | "expense" | "income";
  categoryId: string | "all";
  singlePayment: "all" | "single" | "recurring";
};

type FiltersContextType = {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
};

type FiltersProviderProps = {
  children: React.ReactNode;
};

const FiltersContext = React.createContext<FiltersContextType>(null!);

const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const [filters, setFilters] = React.useState<Filters>({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
    search: "",
    type: "all",
    categoryId: "all",
    singlePayment: "all",
  });

  function updateFilters(newFilters: Partial<Filters>) {
    setFilters((prev) => ({ ...prev, ...newFilters }));
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
