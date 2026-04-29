import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { Toaster } from "sileo";
import EnvChip from "@/components/layout/env-chip";
import Maintenance from "@/pages/maintenance";
import SessionManager from "@/components/layout/session-manager";
import CategoryProvider from "@/providers/category-provider";
import DialogProvider from "@/providers/dialog-provider";
import FiltersProvider from "@/providers/filters-provider";
import HighlightProvider from "@/providers/highlight-provider";
import SharedAnalyticsProvider from "@/providers/shared-analytics-provider";
import TransactionProvider from "@/providers/transaction-provider";
import ThemeProvider from "@/providers/theme-provider";
import { initDayjs } from "@/lib/dayjs";
import router from "@/router";
import Env from "@/lib/env";
import queryClient from "@/lib/query-client";
import "@/assets/default.css";

initDayjs();

const isMaintenanceMode = Env.MAINTENANCE_MODE;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EnvChip />
    <Toaster
      position="top-center"
      theme="dark"
      options={{
        fill: "black",
        styles: {
          title: "text-white!",
          description: "text-white/75!",
        },
      }}
    />
    <ThemeProvider defaultTheme="dark">
      <CssBaseline />
      {isMaintenanceMode ? (
        <Maintenance />
      ) : (
        <SessionManager>
          <QueryClientProvider client={queryClient}>
            <HighlightProvider>
              <FiltersProvider>
                <DialogProvider>
                  <CategoryProvider>
                    <TransactionProvider>
                      <SharedAnalyticsProvider>
                        <RouterProvider router={router} />
                      </SharedAnalyticsProvider>
                    </TransactionProvider>
                  </CategoryProvider>
                </DialogProvider>
              </FiltersProvider>
            </HighlightProvider>
          </QueryClientProvider>
        </SessionManager>
      )}
    </ThemeProvider>
  </StrictMode>,
);
