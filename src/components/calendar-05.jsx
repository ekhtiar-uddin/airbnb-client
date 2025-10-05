"use client";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export default function Calendar05() {
  const [dateRange, setDateRange] = React.useState({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  });

  return (
    //  className="rounded-lg border shadow-sm"
    <Calendar
      className="bg-transparent p-0 [--cell-size:--spacing(10.5)]"
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
    />
  );
}
