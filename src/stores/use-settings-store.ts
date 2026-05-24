import { create } from "zustand";
import { persist } from "zustand/middleware";
import dayjs from "dayjs";
import type { AccentColor } from "@/types/global";

type AlertsKeys = "expiringSoon";

type SettingsState = {
  accentColor: AccentColor;
  alerts: Record<AlertsKeys, number>;

  closeAlert: (key: AlertsKeys) => void;
  setAccentColor: (color: AccentColor) => void;
  isAlertOpen: (key: AlertsKeys) => boolean;
};

const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      accentColor: "ant",
      alerts: {
        expiringSoon: 0,
      },

      setAccentColor: (color) => set({ accentColor: color }),
      closeAlert: (key: AlertsKeys) =>
        set((state) => ({
          alerts: { ...state.alerts, [key]: dayjs().unix() },
        })),
      isAlertOpen: (key: AlertsKeys) => dayjs().subtract(1, "day").unix() > get().alerts[key],
    }),
    {
      name: "settings-storage",
      version: 0.5,
    },
  ),
);

export default useSettingsStore;
