import ListSelector from "@/components/ui/list-selector";
import dayjs from "dayjs";
import DateTools from "@/tools/date-tools";
import useFilters from "@/hooks/use-filters";

const DateSelector = () => {
  const { filters, updateFilters } = useFilters();

  const currentMonth = dayjs(filters.startDate).month();
  const currentYear = dayjs(filters.startDate).year();

  function handleMonthChange(newMonth: string | number) {
    const d = dayjs(filters.startDate).month(Number(newMonth));
    updateFilters({
      startDate: d.startOf("month").format("YYYY-MM-DD"),
      endDate: d.endOf("month").format("YYYY-MM-DD"),
    });
  }

  function handleYearChange(newYear: string | number) {
    const d = dayjs(filters.startDate).year(Number(newYear));
    updateFilters({
      startDate: d.startOf("month").format("YYYY-MM-DD"),
      endDate: d.endOf("month").format("YYYY-MM-DD"),
    });
  }

  return (
    <>
      <ListSelector value={currentMonth} options={DateTools.months} highlightValue={dayjs().month()} onChange={handleMonthChange} />
      <ListSelector value={currentYear} options={DateTools.years} highlightValue={dayjs().year()} onChange={handleYearChange} />
    </>
  );
};

export default DateSelector;
