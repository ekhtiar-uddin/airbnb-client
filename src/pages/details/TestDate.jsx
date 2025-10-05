import { Calendar } from "@/components/ui/calendar";
import * as React from "react";

export function TestDate() {
  const [dateRange, setDateRange] = React.useState({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  });

  const disabledDates = [
    { from: new Date(2025, 5, 20), to: new Date(2025, 5, 25) },
    { from: new Date(2025, 6, 5), to: new Date(2025, 6, 10) },
  ];

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      disabled={disabledDates}
      className="rounded-lg border shadow-sm"
    />
  );
}
