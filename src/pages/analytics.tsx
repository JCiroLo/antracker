import { Paper, Stack, Typography, TextField } from "@mui/material";
import CumulativeBalanceChart, { CumulativeBalanceChartLegend } from "@/components/charts/cumulative-balance-chart";
import ExpenseDistributionChart from "@/components/charts/expense-distribution-chart";
import FinancialStressChart, { FinancialStressChartLegend } from "@/components/charts/financial-stress-chart";
import IncomeDistributionChart from "@/components/charts/income-distribution-chart";
import ProgressChart from "@/components/charts/progress-chart";
import useFilters from "@/hooks/use-filters";

const Analytics = () => {
  const { filters, updateFilters } = useFilters();
  return (
    <Stack height="100%" gap={{ xs: 1, sm: 2 }} mb={{ xs: 0, sm: 1 }} sx={{ overflowY: "auto" }}>
      <Stack direction="row" spacing={2} p={1} component={Paper} elevation={0} alignItems="center" justifyContent="space-between" width="100%">
        <Typography variant="body2" color="text.secondary">
          Rango:
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            type="date"
            size="small"
            value={filters.startDate}
            onChange={(e) => updateFilters({ startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            size="small"
            value={filters.endDate}
            onChange={(e) => updateFilters({ endDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Stack>
      <ProgressChart />
      <Stack component={Paper} elevation={0} flexShrink={0} gap={1} borderRadius={1} overflow="hidden" height={200}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" paddingX={2} paddingY={1}>
          <Typography variant="subtitle1">Estrés financiero</Typography>
          <FinancialStressChartLegend />
        </Stack>
        <FinancialStressChart />
      </Stack>
      <Stack component={Paper} elevation={0} flexShrink={0} gap={1} borderRadius={1} overflow="hidden" height={200}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" paddingX={2} paddingY={1}>
          <Typography variant="subtitle1">Balance</Typography>
          <CumulativeBalanceChartLegend />
        </Stack>
        <CumulativeBalanceChart />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2 }}>
        <Stack component={Paper} elevation={0} gap={1} borderRadius={1} overflow="hidden" width={{ xs: "100%", sm: "50%" }} height={200}>
          <Typography variant="subtitle1" paddingX={2} paddingY={1}>
            Distribución de gastos
          </Typography>
          <ExpenseDistributionChart />
        </Stack>
        <Stack component={Paper} elevation={0} gap={1} borderRadius={1} overflow="hidden" width={{ xs: "100%", sm: "50%" }} height={200}>
          <Typography variant="subtitle1" paddingX={2} paddingY={1}>
            Distribución de ingresos
          </Typography>
          <IncomeDistributionChart />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Analytics;
