import type { Category } from "@/types/category";
import type { KeysToCamelCase } from "@/types/utils";

export type CategoryFormObject = KeysToCamelCase<Omit<Category, "id" | "user_id">>;

const CategoryForm = {
  formKeys: {
    color: "category-color",
    name: "category-name",
  },
  toObject(formData: FormData): CategoryFormObject {
    return {
      color: (formData.get(this.formKeys.color) as string) || "#000000",
      name: formData.get(this.formKeys.name) as string,
    };
  },
};

export default CategoryForm;
