import xior from "@/lib/xior";
import type { User } from "@/types/global";

const $User = {
  get: async (id: string) => {
    const { data } = await xior.get<User[]>(`/users/${id}`);

    return data;
  },
  create: async (user: Omit<User, "created_at">) => {
    const { data } = await xior.post<User>("/users", user);

    return data;
  },
};

export default $User;
