import xior from "@/lib/xior";
import type { Category } from "@/types/category";

type GetAllOptions = {
  limit?: number;
  offset?: number;
};

const $Category = {
  async get(id: string) {
    const { data } = await xior.get<Category>(`/categories/${id}`);

    return data;
  },
  async getAll({ limit, offset }: GetAllOptions = {}) {
    const { data } = await xior.get<Category[]>("/categories", { params: { limit, offset } });

    return data;
  },
  async create(category: Omit<Category, "id">) {
    const { data } = await xior.post<Category>("/categories", category);

    return data;
  },
  async update(id: string, category: Partial<Omit<Category, "id" | "userId">>) {
    const { data } = await xior.put<Category>(`/categories/${id}`, category);

    return data;
  },
  async delete(id: string) {
    await xior.delete(`/categories/${id}`);

    return { id };
  },
};

export default $Category;
