import { create } from "zustand";
import { signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type SessionState = {
  isLoading: boolean;
  user: User | null;
  logout: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User | null) => void;
};

const useSessionStore = create<SessionState>()((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));

export default useSessionStore;
