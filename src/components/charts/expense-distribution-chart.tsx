import React, { useMemo } from "react";
import { useTheme } from "@mui/material";
import { legendClasses } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import useCategories from "@/hooks/use-categories";
import useTransactions from "@/hooks/use-transactions";
import useFilters from "@/hooks/use-filters";
import ColorTools from "@/tools/color-tools";
import dayjs from "dayjs";

const ExpenseDistributionChart = () => {
  const { filters } = useFilters();

  const theme = useTheme();
  const categories = useCategories();
  const transactions = useTransactions();

  const data = React.useMemo(() => {
    const chartData = categories.values.map((category) => ({ label: category.name, id: category.id, value: 0 }));
    const noCategoryItem = { label: "Sin categoría", id: "no-category", value: 0, color: theme.palette.action.disabled };

    chartData.push(noCategoryItem);

    const start = dayjs(filters.startDate).startOf("day");
    const end = dayjs(filters.endDate).endOf("day");

    transactions.records.forEach((record) => {
      const p = dayjs(record.paid_date);
      if (p.valueOf() >= start.valueOf() && p.valueOf() <= end.valueOf()) {
        const category = chartData.find((cat) => cat.id === record.category_id);

        if (category) {
          category.value += record.amount;
        } else {
          noCategoryItem.value += record.amount;
        }
      }
    });

    return chartData;
  }, [filters.startDate, filters.endDate, categories, transactions.records]);

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

export default ExpenseDistributionChart;
