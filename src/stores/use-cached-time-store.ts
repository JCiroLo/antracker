import { create } from "zustand";
import Logger from "@/lib/logger";

const MAX_CACHE_TIME = {
  transactionRecords: 1 * 60 * 1000, // 1 minute
  analytics: 5 * 60 * 1000, // 5 minutes
};

type CacheKey = keyof typeof MAX_CACHE_TIME;

type CachedTimeStore = {
  cacheTimes: Record<CacheKey, number>;
  canFetch: (key: CacheKey) => boolean;
};

const useCachedTimeStore = create<CachedTimeStore>()((set, get) => ({
  cacheTimes: {
    transactionRecords: 0,
    analytics: 0,
  },

  canFetch(key) {
    const now = Date.now();
    const lastFetchTime = get().cacheTimes[key];
    const shouldFetch = now - lastFetchTime >= MAX_CACHE_TIME[key];

    Logger.log(shouldFetch ? "can fetch" : "cannot fetch", key);

    if (shouldFetch) {
      set((state) => ({ cacheTimes: { ...state.cacheTimes, [key]: now } }));
    }

    return shouldFetch;
  },
}));

export default useCachedTimeStore;
