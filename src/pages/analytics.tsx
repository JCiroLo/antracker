import { useEffect } from "react";
import { Paper, Stack, Typography, Box, type StackProps } from "@mui/material";
import CumulativeBalanceChart, {
  CumulativeBalanceChartLegend,
} from "@/components/charts/cumulative-balance-chart";
import ExpenseDistributionChart, {
  ExpenseDistributionChartLegend,
} from "@/components/charts/expense-distribution-chart";
import FinancialStressChart, {
  FinancialStressChartLegend,
} from "@/components/charts/financial-stress-chart";
import IncomeDistributionChart, {
  IncomeDistributionChartLegend,
} from "@/components/charts/income-distribution-chart";
import FiltersBar from "@/components/layout/filters-bar";
import useSharedAnalytics from "@/hooks/use-shared-analytics";
import useCachedTimeStore from "@/stores/use-cached-time-store";

type AnalyticsFrameProps = {
  title: string;
  children: React.ReactNode;
  legend?: React.ReactNode;
  slotProps?: {
    root: StackProps;
  };
};

const AnalyticsFrame: React.FC<AnalyticsFrameProps> = ({ title, legend, children, slotProps }) => {
  return (
    <Stack
      {...slotProps?.root}
      component={Paper}
      elevation={0}
      sx={{
        gap: 1,
        borderRadius: 1,
        overflow: "hidden",
        ...slotProps?.root?.sx,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <Typography variant="subtitle1">{title}</Typography>
        {legend}
      </Stack>
      {children}
    </Stack>
  );
};

const Analytics = () => {
  const analytics = useSharedAnalytics();
  const { canFetch } = useCachedTimeStore();

  useEffect(() => {
    if (canFetch("analytics")) analytics.query.fetch();
  }, []);

  return (
    <>
      <FiltersBar />
      {analytics.query.isLoading || !analytics.query.hasLoaded ? (
        <Box
          sx={{
            height: "100%",
          }}
        />
      ) : (
        <Stack
          sx={{
            height: "100%",
            gap: 1,
            marginBottom: { xs: 0, sm: 1 },
            overflowY: "auto",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <AnalyticsFrame
              title="Gastos"
              legend={<ExpenseDistributionChartLegend />}
              slotProps={{
                root: {
                  sx: {
                    width: { xs: "100%", sm: "50%" },
                    height: 200,
                  },
                },
              }}
            >
              <ExpenseDistributionChart />
            </AnalyticsFrame>
            <AnalyticsFrame
              title="Ingresos"
              legend={<IncomeDistributionChartLegend />}
              slotProps={{
                root: {
                  sx: {
                    width: { xs: "100%", sm: "50%" },
                    height: 200,
                  },
                },
              }}
            >
              <IncomeDistributionChart />
            </AnalyticsFrame>
          </Stack>
          <AnalyticsFrame
            title="Estrés financiero"
            legend={<FinancialStressChartLegend />}
            slotProps={{
              root: {
                sx: {
                  flexShrink: 0,
                  height: 200,
                },
              },
            }}
          >
            <FinancialStressChart />
          </AnalyticsFrame>
          <AnalyticsFrame
            title="Balance acumulado"
            legend={<CumulativeBalanceChartLegend />}
            slotProps={{
              root: {
                sx: {
                  flexShrink: 0,
                  height: 200,
                },
              },
            }}
          >
            <CumulativeBalanceChart />
          </AnalyticsFrame>
        </Stack>
      )}
    </>
  );
};

export default Analytics;
