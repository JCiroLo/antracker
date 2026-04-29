import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { areaElementClasses, LineChart, lineElementClasses, markElementClasses } from "@mui/x-charts/LineChart";
import { chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import CurrencyTools from "@/tools/currency-tools";
import useSharedAnalytics from "@/hooks/use-shared-analytics";

const seriesPresets = {
  expenses: { label: "Gastos", color: "error" as const },
  incomes: { label: "Ingresos", color: "success" as const },
};

const FinancialStressChart: React.FC = () => {
  const theme = useTheme();
  const { balance } = useSharedAnalytics();

  return (
    <LineChart
      series={[
        {
          label: seriesPresets.expenses.label,
          data: balance.data.expenses,
          color: theme.palette[seriesPresets.expenses.color].main,
          curve: "bumpX",
          area: true,

          valueFormatter: (value) => CurrencyTools.format(value || 0),
        },
        {
          label: seriesPresets.incomes.label,
          data: balance.data.incomes,
          color: theme.palette[seriesPresets.incomes.color].main,
          curve: "bumpX",
          area: true,
          valueFormatter: (value) => CurrencyTools.format(value || 0),
        },
      ]}
      yAxis={[
        {
          position: "none",
          domainLimit: (_, maxValue: number) => ({
            min: -maxValue / 6,
            max: maxValue,
          }),
        },
      ]}
      xAxis={[
        {
          position: "none",
          scaleType: "point",
          data: balance.xAxis,
          valueFormatter: (value: string) => value,
        },
      ]}
      margin={{ bottom: 0, top: 8, left: 0, right: 0 }}
      slotProps={{
        legend: { sx: { display: "none" } },
      }}
      sx={(theme) => ({
        [`& .${markElementClasses.root}`]: { display: "none" },
        [`& .${areaElementClasses.root}`]: { opacity: 0.1 },
        [`& .${lineElementClasses.root}`]: { strokeWidth: 2 },
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
      <Stack direction="row" spacing={1} alignItems="center">
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
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          component="span"
          sx={{
            width: 16,
            height: 2,
            borderRadius: 2,
            bgcolor: (theme) => theme.palette[seriesPresets.incomes.color].main,
          }}
        />
        <Typography variant="caption">{seriesPresets.incomes.label}</Typography>
      </Stack>
    </Stack>
  );
};

export { FinancialStressChartLegend };
export default FinancialStressChart;
