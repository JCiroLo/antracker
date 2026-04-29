import { useMemo } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import useFilters from "@/hooks/use-filters";
import useTransactions from "@/hooks/use-transactions";
import CurrencyTools from "@/tools/currency-tools";
import dayjs from "dayjs";

const ProgressChart = () => {
  const { templates, records } = useTransactions();
  const { filters } = useFilters();

  const totals = useMemo(() => {
    const start = dayjs(filters.startDate).startOf("day");
    const end = dayjs(filters.endDate).endOf("day");

    let paid = 0;
    records.forEach((record) => {
      const p = dayjs(record.paid_date);
      if (p.valueOf() >= start.valueOf() && p.valueOf() <= end.valueOf()) {
        paid += record.amount || 0;
      }
    });

    let pendingAmt = 0;
    templates.forEach(({ template }) => {
      const dueStr = template.start_date;
      if (dueStr) {
        const d = dayjs(dueStr);
        if (d.valueOf() >= start.valueOf() && d.valueOf() <= end.valueOf()) {
          pendingAmt += template.amount || 0;
        }
      } else {
        // If there's no date at all, we just count it as pending overall?
        // Let's assume it's immediately due for safety.
        pendingAmt += template.amount || 0;
      }
    });

    const expected = paid + pendingAmt;

    return {
      paid,
      expected,
      percentage: expected === 0 ? 100 : (paid / expected) * 100,
    };
  }, [filters.startDate, filters.endDate, records, templates]);

  return (
    <Grid
      display="grid"
      gridTemplateColumns={{ xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }}
      gridTemplateRows={{ xs: "repeat(2, 1fr)", sm: "1fr" }}
      alignItems="center"
      justifyItems="center"
      marginBottom={{ xs: 2, sm: 0 }}
    >
      <Stack order={0} gridArea="1 / 1 / 2 / 2" justifyContent="center" alignItems="center" width="33%" padding={1} borderRadius={1}>
        <Typography component="h5" variant="body2" color="textSecondary" textAlign="center">
          Avance
        </Typography>
        <Typography textAlign="center" fontSize="1.5rem">
          {CurrencyTools.format(totals.paid)}
        </Typography>
      </Stack>
      <Gauge
        value={totals.percentage}
        height={150}
        startAngle={-140}
        endAngle={140}
        cornerRadius="50%"
        text={({ value }) => `${value?.toFixed() || 0}%`}
        sx={{
          order: { xs: 2, sm: 1 },
          gridArea: { xs: "1 / 2 / 3 / 3", sm: "1 / 2 / 2 / 3" },
          "& .MuiGauge-valueText": {
            fontSize: "2rem",
          },
        }}
      />
      <Stack
        order={{ xs: 1, sm: 2 }}
        gridArea={{ xs: "2 / 1 / 3 / 2", sm: "1 / 3 / 2 / 4" }}
        justifyContent="center"
        alignItems="center"
        width="33%"
        padding={1}
        borderRadius={1}
      >
        <Typography component="h5" variant="body2" color="textSecondary" textAlign="center">
          Meta
        </Typography>
        <Typography textAlign="center" fontSize="1.5rem">
          {CurrencyTools.format(totals.expected)}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default ProgressChart;
