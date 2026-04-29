import React from "react";
import { FiltersContext } from "@/providers/filters-provider";

const useFilters = () => {
  return React.useContext(FiltersContext);
};

export default useFilters;
