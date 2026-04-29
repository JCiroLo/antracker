import dayjs from "dayjs";

const DateTools = {
  get now() {
    return new Date();
  },
  get day() {
    return new Date().getDate();
  },
  get daysInMonth() {
    return dayjs().daysInMonth();
  },
  get month() {
    return new Date().getMonth();
  },
  get months() {
    return Array.from({ length: 12 }, (_, i) => ({
      name: dayjs().month(i).format("MMMM"),
      value: i,
    }));
  },
  get year() {
    return new Date().getFullYear();
  },
  get years() {
    const currentYear = this.year;
    // Generate a list of years where the range is from currentYear - 5 to currentYear + 5
    return Array.from({ length: 11 }, (_, i) => {
      const year = currentYear - 5 + i;
      return { name: year.toString(), value: year };
    });
  },
  format(date: Date | string, format: string) {
    return dayjs(date).format(format);
  },
  monthName(monthIndex: number = dayjs().month()) {
    return dayjs().month(monthIndex).format("MMMM");
  },
};

export default DateTools;
