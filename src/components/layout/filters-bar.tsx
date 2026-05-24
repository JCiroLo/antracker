import { useMemo, type ChangeEvent } from "react";
import { MenuItem, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import useFilters from "@/hooks/use-filters";
import { dateRanges } from "@/lib/constants";
import type { DateRangeKey } from "@/types/global";

const FILTERS_OPTIONS = Object.entries(dateRanges).filter(([, { enabled }]) => enabled);

const FiltersBar = () => {
  const { filters, updateFilters } = useFilters();

  const displayDateRange = useMemo(() => {
    const startYear = dayjs(filters.startDate).year();
    const endYear = dayjs(filters.endDate).year();
    const startFormatting = startYear === endYear ? "DD MMM" : "DD MMM YYYY";
    const endFormatting = "DD MMM YYYY";

    return `${dayjs(filters.startDate).format(startFormatting)} - ${dayjs(filters.endDate).format(endFormatting)}`;
  }, [filters]);

  function handleDateRangeChange(event: ChangeEvent<HTMLInputElement>) {
    const dateRange = event.target.value as DateRangeKey;

    if (dateRange === "custom") return;

    const startDate = dateRanges[dateRange].date;
    const endDate = dayjs().format("YYYY-MM-DD");

    updateFilters({ dateRange, startDate, endDate });
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        padding: 1,
        marginTop: 1,
      }}
    >
      <TextField
        size="small"
        label={displayDateRange}
        value={filters.dateRange}
        sx={{
          minWidth: "20ch",
        }}
        select
        onChange={handleDateRangeChange}
      >
        {FILTERS_OPTIONS.map(([key, { label }]) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default FiltersBar;
