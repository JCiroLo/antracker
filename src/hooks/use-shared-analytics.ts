import { useContext } from "react";
import { SharedAnalyticsContext } from "@/providers/shared-analytics-provider";

const useSharedAnalytics = () => {
  return useContext(SharedAnalyticsContext);
};

export default useSharedAnalytics;
