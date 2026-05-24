import React, { useMemo } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { lineClasses, LineChart } from "@mui/x-charts/LineChart";
import { chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import CurrencyTools from "@/tools/currency-tools";
import useSharedAnalytics from "@/hooks/use-shared-analytics";
import type { NumberValue } from "@mui/x-charts";

const seriesPresets = {
  expenses: { label: "Gastos", color: "error" as const },
};

const FinancialStressChart: React.FC = () => {
  const theme = useTheme();
  const { financialStress } = useSharedAnalytics();

  const data = useMemo(
    () => ({
      xAxis: financialStress.map((item) => item.date),
      values: financialStress.map((item) => item.expense),
    }),
    [financialStress],
  );

  return (
    <LineChart
      series={[
        {
          label: seriesPresets.expenses.label,
          data: data.values,
          color: theme.palette[seriesPresets.expenses.color].main,
          curve: "bumpX",
          area: true,
          valueFormatter: (value) => CurrencyTools.format(value || 0),
        },
      ]}
      yAxis={[
        {
          position: "none",
          domainLimit: (_, maxValue: NumberValue) => ({
            min: -maxValue.valueOf() / 6,
            max: maxValue.valueOf(),
          }),
        },
      ]}
      xAxis={[
        {
          position: "none",
          scaleType: "point",
          data: data.xAxis,
          valueFormatter: (value: string) => value,
        },
      ]}
      margin={{ bottom: 0, top: 8, left: 0, right: 0 }}
      slotProps={{
        legend: { sx: { display: "none" } },
      }}
      sx={(theme) => ({
        [`& .${lineClasses.mark}`]: { display: "none" },
        [`& .${lineClasses.area}`]: { opacity: 0.1 },
        [`& .${lineClasses.line}`]: { strokeWidth: 2 },
        [`& .${chartsAxisHighlightClasses.root}`]: {
          stroke: theme.palette.primary.main,
          strokeDasharray: "none",
          strokeWidth: 2,
        },
      })}
    />
  );
};

const FinancialStressChartLegend: React.FC = () => {
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
            width: 16,
            height: 2,
            borderRadius: 2,
            bgcolor: (theme) => theme.palette[seriesPresets.expenses.color].main,
          }}
        />
        <Typography variant="caption">{seriesPresets.expenses.label}</Typography>
      </Stack>
    </Stack>
  );
};

export { FinancialStressChartLegend };
export default FinancialStressChart;
