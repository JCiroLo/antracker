import { useMemo } from "react";
import { Typography, useTheme } from "@mui/material";
import { legendClasses } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import useSharedAnalytics from "@/hooks/use-shared-analytics";
import ColorTools from "@/tools/color-tools";
import CurrencyTools from "@/tools/currency-tools";

const ExpenseDistributionChart = () => {
  const theme = useTheme();
  const { expenseDistribution } = useSharedAnalytics();

  const data = useMemo(
    () =>
      expenseDistribution.map((item) => ({
        label: item.category,
        value: item.total,
      })),
    [expenseDistribution],
  );

  const palette = useMemo(() => ColorTools.palette(theme.palette.primary.main, data.length), [data.length, theme.palette.primary.main]);

  return (
    <PieChart
      height={120}
      width={120}
      colors={palette}
      series={[
        {
          data,
          innerRadius: 24,
          paddingAngle: 2,
          cornerRadius: 4,
        },
      ]}
      sx={{
        [`& .${legendClasses.root}`]: {
          gap: 1,
        },
      }}
    />
  );
};

const ExpenseDistributionChartLegend: React.FC = () => {
  const { totals } = useSharedAnalytics();

  const total = useMemo(() => CurrencyTools.format(totals.expenses), [totals.expenses]);

  return <Typography sx={{ fontWeight: 600, fontSize: 20 }}>{total}</Typography>;
};

export { ExpenseDistributionChartLegend };
export default ExpenseDistributionChart;
