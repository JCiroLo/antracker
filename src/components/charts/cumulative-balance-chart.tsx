import { useMemo } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { lineClasses, chartsAxisHighlightClasses, chartsTooltipClasses, LineChart } from "@mui/x-charts";
import ChartColorSwitch from "@/components/layout/chart-color-switch";
import useSharedAnalytics from "@/hooks/use-shared-analytics";
import CurrencyTools from "@/tools/currency-tools";

const seriesPresets = {
  expenses: { label: "Déficit", color: "error" as const },
  incomes: { label: "Superávit", color: "success" as const },
};

const CumulativeBalanceChart = () => {
  const theme = useTheme();
  const { balanceAccumulative } = useSharedAnalytics();

  const data = useMemo(
    () => ({
      xAxis: balanceAccumulative.map((item) => item.date),
      values: balanceAccumulative.map((item) => item.balance),
    }),
    [balanceAccumulative],
  );

  return (
    <LineChart
      series={[
        {
          data: data.values,
          curve: "bumpX",
          area: true,
          label: seriesPresets.expenses.label,
          valueFormatter: (value) => CurrencyTools.format(value || 0),
        },
      ]}
      xAxis={[
        {
          data: data.xAxis,
          position: "none",
          scaleType: "point",
          valueFormatter: (value: string) => value,
        },
      ]}
      yAxis={[{ position: "none" }]}
      margin={{ bottom: 0, top: 8, left: 0, right: 0 }}
      slotProps={{
        legend: { sx: { display: "none" } },
        tooltip: { sx: { [`.${chartsTooltipClasses.labelCell}`]: { display: "none" } } },
      }}
      sx={(theme) => ({
        [`& .${lineClasses.mark}`]: {
          display: "none",
        },
        [`& .${lineClasses.highlight}`]: {
          display: "none",
        },
        [`& .${lineClasses.area}`]: {
          fill: "url(#switch-color)",
          filter: "none",
        },
        [`& .${lineClasses.line}`]: {
          strokeWidth: 0,
        },
        [`& .${chartsAxisHighlightClasses.root}`]: {
          stroke: theme.palette.primary.main,
          strokeDasharray: "none",
          strokeWidth: 2,
        },
      })}
    >
      <ChartColorSwitch color1={theme.palette.success.main} color2={theme.palette.error.main} id="switch-color" threshold={0} />
    </LineChart>
  );
};

const CumulativeBalanceChartLegend: React.FC = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            width: 12,
            height: 12,
            borderRadius: 0.5,
            bgcolor: (theme) => theme.palette[seriesPresets.expenses.color].main,
          }}
        />
        <Typography variant="caption">{seriesPresets.expenses.label}</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            width: 12,
            height: 12,
            borderRadius: 0.5,
            bgcolor: (theme) => theme.palette[seriesPresets.incomes.color].main,
          }}
        />
        <Typography variant="caption">{seriesPresets.incomes.label}</Typography>
      </Stack>
    </Stack>
  );
};

export { CumulativeBalanceChartLegend };
export default CumulativeBalanceChart;
