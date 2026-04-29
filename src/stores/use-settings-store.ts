import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AccentColor } from "@/types/global";

type SettingsState = {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
};

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      accentColor: "ant",

      setAccentColor: (color) => set({ accentColor: color }),
    }),
    {
      name: "settings-storage",
      version: 0.4,
    }
  )
);

export default useSettingsStore;
