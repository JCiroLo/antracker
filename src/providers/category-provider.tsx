import React from "react";
import { useQuery } from "@tanstack/react-query";
import $Category from "@/services/category";
import useSessionStore from "@/stores/use-session-store";
import queryClient from "@/lib/query-client";
import Logger from "@/lib/logger";
import type { Category } from "@/types/category";

type CategoryContextType = {
  values: Category[];
  isLoading: boolean;
  query: ReturnType<typeof useQuery>;
  refresh: () => Promise<void>;
};

type CategoryProviderProps = {
  children: React.ReactNode;
};

const CategoryContext = React.createContext<CategoryContextType>(null!);

const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const user = useSessionStore((state) => state.user);

  const categories = useQuery({
    queryKey: ["fetch-categories", user?.uid],
    queryFn: async () => {
      if (!user) {
        return [];
      }

      const data = await $Category.getAll();

      Logger.log("fetched categories", data);

      return data;
    },
  });

  async function refreshCategories() {
    await queryClient.invalidateQueries({ queryKey: ["fetch-categories", user?.uid] });
  }

  return (
    <CategoryContext.Provider
      value={{
        values: categories.data || [],
        isLoading: categories.isLoading,
        query: categories,
        refresh: refreshCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext };
export default CategoryProvider;
