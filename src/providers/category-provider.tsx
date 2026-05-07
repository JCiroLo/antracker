import React from "react";
import { useQuery } from "@tanstack/react-query";
import $Category from "@/services/category";
import useSessionStore from "@/stores/use-session-store";
import queryClient from "@/lib/query-client";
import Logger from "@/lib/logger";
import type { Category, NewCategory } from "@/types/category";

type CategoryContextType = {
  actions: {
    create: (category: NewCategory) => Promise<Category | undefined>;
    delete: (id: string) => Promise<void>;
    update: (id: string, category: Category) => Promise<void>;
  };
  values: Category[];
  isLoading: boolean;
  query: ReturnType<typeof useQuery>;
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

  async function create(category: NewCategory) {
    const newCategory = await $Category.create(category);

    Logger.log("created category", newCategory);

    if (!newCategory) {
      return;
    }

    queryClient.setQueryData(["fetch-categories", user?.uid], (oldData: Category[]) => {
      if (!oldData) return oldData;

      return [newCategory, ...oldData] as Category[];
    });

    return newCategory;
  }

  async function update(id: string, category: Category) {
    const updatedCategory = await $Category.update(id, category);

    Logger.log("updated category", updatedCategory);

    if (!updatedCategory) {
      return;
    }

    queryClient.setQueryData(["fetch-categories", user?.uid], (oldData: Category[]) => {
      if (!oldData) return oldData;

      return oldData.map((category) => (category.id === id ? updatedCategory : category)) as Category[];
    });
  }

  async function remove(id: string) {
    await $Category.delete(id);

    Logger.log("deleted category", id);

    queryClient.setQueryData(["fetch-categories", user?.uid], (oldData: Category[]) => {
      if (!oldData) return oldData;

      return oldData.filter((category) => category.id !== id) as Category[];
    });
  }

  return (
    <CategoryContext.Provider
      value={{
        values: categories.data || [],
        isLoading: categories.isLoading,
        query: categories,
        actions: { create, update, delete: remove },
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext };
export default CategoryProvider;
