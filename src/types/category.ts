export type Category = {
  color: string;
  id: string;
  name: string;
  user_id: string;
};

export type NewCategory = Omit<Category, "id">;

export type UpdateCategory = Partial<NewCategory>;
