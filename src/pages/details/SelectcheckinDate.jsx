import { Calendar } from "@/components/ui/calendar";
import { Goal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { staticPlace } from "../home/utils/global";

const SelectcheckinDate = () => {
  const place = staticPlace;
  // States
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  // Use undefined for calendar compatibility
  const [dateRange, setDateRange] = React.useState({
    from: undefined,
    to: undefined,
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  // For calendar focus management
  const [calendarFocus, setCalendarFocus] = useState("from"); // "from" | "to"

  const calendarRef = useRef(null);
  const guestPickerRef = useRef(null);

  // Helper: convert unavailableDates (yyyy-mm-dd) to Date objects
  const unavailableDateObjs = (place.unavailableDates || []).map((d) => {
    const [y, m, day] = d.split("-");
    return new Date(Number(y), Number(m) - 1, Number(day));
  });

  // Helper: is date unavailable?
  const isDateUnavailable = (date) => {
    // Compare y-m-d only (ignore time)
    return unavailableDateObjs.some(
      (unavailable) =>
        date.getFullYear() === unavailable.getFullYear() &&
        date.getMonth() === unavailable.getMonth() &&
        date.getDate() === unavailable.getDate()
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
        setCalendarFocus("from");
      }
      if (
        guestPickerRef.current &&
        !guestPickerRef.current.contains(event.target)
      )
        setShowGuestPicker(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate nights
  const numberOfNights =
    dateRange?.from && dateRange?.to
      ? Math.ceil((dateRange?.to - dateRange?.from) / (1000 * 60 * 60 * 24))
      : 0;

  // Calculate pricing (use values from place object)
  const basePrice = numberOfNights * (place.price || 0);
  const totalGuests = adults + children;
  const guestFeePerNight = place.guestFeePerNight ?? 20;
  const guestFee =
    totalGuests > 2 ? (totalGuests - 2) * guestFeePerNight * numberOfNights : 0;
  const totalPrice = basePrice + guestFee;

  // Date formatting util
  const formatDate = (date) =>
    date
      ? date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  // For date input display in calendar summary
  const formatDateInput = (date) =>
    date
      ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      : "MM/DD/YYYY";

  // Guest summary
  const formatGuestText = () => {
    const parts = [];
    if (totalGuests === 1) parts.push("1 guest");
    else if (totalGuests > 1) parts.push(`${totalGuests} guests`);
    if (infants > 0) parts.push(`${infants} infant${infants > 1 ? "s" : ""}`);
    if (pets > 0) parts.push(`${pets} pet${pets > 1 ? "s" : ""}`);
    return parts.join(", ") || "1 guest";
  };

  // --- Calendar selection logic, Airbnb style ---
  // This version:
  // - after selecting check-in, focuses on check-out (no blur/opacity/disable effect)
  // - clicking either header button (check-in or check-out) moves focus, but does not make the other one faded
  // - double-clicking date input or header does not cause error or reload, only toggles calendar open/close
  // - rounded button style improved for calendar header
  // - disables unavailable dates
  // - aborts range selection if any date in range is unavailable (with alert)

  // Calendar date selection handler (with unavailable logic and correct focus)

  //  DATE SELECTION ENGINEERING START
  const unavailableDates =
    place?.unavailableDates?.map((dateStr) => new Date(dateStr)) || [];

  // Function to get the next unavailable date after a given date
  const getNextUnavailableDate = (fromDate) => {
    if (!fromDate) return null;

    const sortedUnavailable = unavailableDates
      .map((d) => d.getTime())
      .sort((a, b) => a - b);

    const fromTime = fromDate.getTime();
    return sortedUnavailable.find((time) => time > fromTime);
  };

  // Function to get the previous unavailable date before a given date
  const getPreviousUnavailableDate = (fromDate) => {
    if (!fromDate) return null;

    const sortedUnavailable = unavailableDates
      .map((d) => d.getTime())
      .sort((a, b) => b - a);

    const fromTime = fromDate.getTime();
    return sortedUnavailable.find((time) => time < fromTime);
  };

  // Dynamic disabled dates based on selection
  const getDisabledDates = () => {
    if (!dateRange?.from) {
      // No selection yet, only disable unavailable dates
      return unavailableDates;
    }

    // User has selected a start date
    const nextUnavailable = getNextUnavailableDate(dateRange?.from);
    const previousUnavailable = getPreviousUnavailableDate(dateRange?.from);

    const disabled = [...unavailableDates];

    // Disable all dates after the next unavailable date
    if (nextUnavailable) {
      disabled.push({
        after: new Date(nextUnavailable),
      });
    }

    // Disable all dates before the previous unavailable date
    if (previousUnavailable) {
      disabled.push({
        before: new Date(previousUnavailable),
      });
    }

    return disabled;
  };

  //  DATE SELECTION ENGINEERING END

  // Booking POST logic placeholder
  const handleBookingSubmit = async () => {
    // connect to your backend API as needed
    alert("Booking submitted! Connect this to your backend.");
  };

  // Calendar default month logic - show today if nothing selected, else show from date
  const getDefaultMonth = () => {
    if (dateRange?.from) return dateRange?.from;
    return new Date();
  };

  // Handle calendar open: do not reload, toggle open/close only, no blur
  const handleCalendarOpen = () => {
    setShowCalendar((prev) => {
      if (!prev)
        setCalendarFocus(dateRange?.from && !dateRange?.to ? "to" : "from");
      return true;
    });
    setShowGuestPicker(false);
  };

  // Calendar header button style: fully rounded, Airbnb look
  const calendarHeaderBtn =
    "transition-all px-3 py-2 rounded-full border font-semibold text-sm flex items-center gap-2 focus:outline-none";
  const calendarHeaderBtnActive =
    "border-black shadow-[0_2px_6px_rgba(0,0,0,0.06)] bg-white";
  const calendarHeaderBtnInactive =
    "border-gray-300 bg-gray-50 hover:border-black";
  return (
    <div ref={calendarRef} className="w-full bg-transparent px-0 pt-0">
      {/* Title and selected dates */}
      <div className="mb-2">
        <div className="font-bold text-2xl mb-0">2 nights in Paris</div>
        <div className="text-sm text-gray-500 mt-1">
          {dateRange?.from && dateRange?.to
            ? `${formatDateInput(dateRange.from)} - ${formatDateInput(
                dateRange.to
              )}`
            : ""}
        </div>
      </div>

      {/* Calendar */}
      <div className="w-full mb-6">
        <Calendar
          mode="range"
          defaultMonth={getDefaultMonth()}
          selected={dateRange}
          onSelect={setDateRange}
          disabled={getDisabledDates()}
          numberOfMonths={2}
          className=" bg-gray-50 [--cell-size:--spacing(11)] md:[--cell-size:--spacing(10)] "
        />
      </div>

      {/* Actions + calendar icon */}
      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
        <button
          type="button"
          aria-label="Open calendar"
          className="flex items-center px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md"
          // You can set your icon here, just use an inline SVG for demo
          style={{ fontSize: "20px" }}
        >
          <Goal />
        </button>
        <button
          onClick={() => {
            setDateRange({ from: undefined, to: undefined });
            setCalendarFocus("from");
          }}
          className="text-sm font-semibold underline hover:bg-gray-50 px-0 py-2 rounded-lg"
        >
          Clear dates
        </button>
      </div>
    </div>
  );
};

export default SelectcheckinDate;
