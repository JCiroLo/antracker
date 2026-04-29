import React from "react";
import { CategoryContext } from "@/providers/category-provider";

const useCategories = () => {
  return React.useContext(CategoryContext);
};

export default useCategories;
