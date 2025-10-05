import { Calendar } from "@/components/ui/calendar";
import React, { useEffect, useRef, useState } from "react";

/**
 * Example individual place object document for pricing/statistics logic:
 * See staticPlace example at the bottom for `unavailableDates`.
 */

export const BookingWidget = ({ place }) => {
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
    <>
      <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-2xl sticky top-24 min-w-[330px]  transition-all">
        {/* Price or Prompt Header */}
        <div className="text-lg font-semibold mb-6 text-center">
          {numberOfNights > 0 ? (
            <>
              <span className="text-2xl font-bold underline">
                ${totalPrice}
              </span>{" "}
              for {numberOfNights} night{numberOfNights > 1 ? "s" : ""}
            </>
          ) : (
            <>Add dates for prices</>
          )}
        </div>

        {/* Booking Form */}
        <div className="border border-gray-400 rounded-xl relative overflow-visible">
          {/* Date Inputs */}
          <div className="grid grid-cols-2 border-b border-gray-400">
            <div
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 rounded-tl-xl focus:outline-none"
              onClick={handleCalendarOpen}
              tabIndex={0}
              aria-label="Choose check-in date"
            >
              <label className="text-[10px] font-bold uppercase tracking-wide block mb-1">
                Check-in
              </label>
              <div className="text-sm text-gray-700 min-h-[20px] font-medium">
                {dateRange?.from ? formatDate(dateRange?.from) : "Add date"}
              </div>
            </div>
            <div
              className="py-3 px-4 cursor-pointer hover:bg-gray-50 rounded-tr-xl focus:outline-none"
              onClick={handleCalendarOpen}
              tabIndex={0}
              aria-label="Choose check-out date"
            >
              <label className="text-[10px] font-bold uppercase tracking-wide block mb-1">
                Checkout
              </label>
              <div className="text-sm text-gray-700 min-h-[20px] font-medium">
                {dateRange?.to ? formatDate(dateRange?.to) : "Add date"}
              </div>
            </div>
          </div>

          {/* Guest Input */}
          <div
            className="py-3 px-4 cursor-pointer hover:bg-gray-50 rounded-b-xl flex items-center justify-between"
            style={{ borderTop: "1px solid #ccc" }}
            onClick={() => {
              setShowGuestPicker((v) => !v);
              setShowCalendar(false);
            }}
          >
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wide block mb-1">
                Guests
              </label>
              <div className="text-sm text-gray-700">{formatGuestText()}</div>
            </div>
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${
                showGuestPicker ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div
              ref={calendarRef}
              className="absolute -top-8 -right-10 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 z-50   transition-all"
              style={{ boxShadow: "0 6px 40px rgba(0,0,0,0.13)" }}
            >
              <div className="mb-2">
                <div className="text-lg font-semibold  text-left">
                  {numberOfNights > 0 ? (
                    <>
                      {numberOfNights} night{numberOfNights > 1 ? "s" : ""}
                    </>
                  ) : (
                    <>Add dates for prices</>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mb-2">
                {/* Date summary above calendar */}
                <div className="flex gap-2">
                  {/* Check-in input */}
                  <span className="ml-2 text-sm font-medium">
                    {dateRange?.from
                      ? formatDateInput(dateRange?.from)
                      : "Minimum stay: 30 nights"}
                  </span>
                  <span className="ml-2 font-medium">
                    {dateRange?.to ? formatDateInput(dateRange?.to) : ""}
                  </span>
                </div>
              </div>
              <Calendar
                mode="range"
                defaultMonth={getDefaultMonth()}
                selected={dateRange}
                onSelect={setDateRange}
                disabled={getDisabledDates()}
                numberOfMonths={2}
                className="  [--cell-size:--spacing(11)] -p-6 md:[--cell-size:--spacing(9)]"
              />
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setDateRange({ from: undefined, to: undefined });
                    setCalendarFocus("from");
                  }}
                  className="text-sm font-semibold underline hover:bg-gray-50 px-4 py-2 rounded-lg"
                >
                  Clear dates
                </button>
                <button
                  onClick={() => {
                    setShowCalendar(false);
                    setCalendarFocus("from");
                  }}
                  className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-900"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Guest Picker Dropdown */}
          {showGuestPicker && (
            <div
              ref={guestPickerRef}
              className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl p-6 z-50"
            >
              {/* Adults */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div>
                  <div className="font-semibold">Adults</div>
                  <div className="text-sm text-gray-600">Age 13+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                    className={`w-8 h-8 rounded-full border ${
                      adults <= 1
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-400 text-gray-600 hover:border-gray-800"
                    } flex items-center justify-center`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-medium">{adults}</span>
                  <button
                    onClick={() =>
                      setAdults(Math.min(place.maxGuests || 16, adults + 1))
                    }
                    disabled={totalGuests >= (place.maxGuests || 16)}
                    className={`w-8 h-8 rounded-full border ${
                      totalGuests >= (place.maxGuests || 16)
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-400 text-gray-600 hover:border-gray-800"
                    } flex items-center justify-center`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Children */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div>
                  <div className="font-semibold">Children</div>
                  <div className="text-sm text-gray-600">Ages 2–12</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                    className={`w-8 h-8 rounded-full border ${
                      children <= 0
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-400 text-gray-600 hover:border-gray-800"
                    } flex items-center justify-center`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-medium">
                    {children}
                  </span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    disabled={totalGuests >= (place.maxGuests || 16)}
                    className={`w-8 h-8 rounded-full border ${
                      totalGuests >= (place.maxGuests || 16)
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-400 text-gray-600 hover:border-gray-800"
                    } flex items-center justify-center`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Infants */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div>
                  <div className="font-semibold">Infants</div>
                  <div className="text-sm text-gray-600">Under 2</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setInfants(Math.max(0, infants - 1))}
                    disabled={infants <= 0}
                    className={`w-8 h-8 rounded-full border ${
                      infants <= 0
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-400 text-gray-600 hover:border-gray-800"
                    } flex items-center justify-center`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-medium">{infants}</span>
                  <button
                    onClick={() =>
                      setInfants(Math.min(place.maxInfants || 5, infants + 1))
                    }
                    className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 hover:border-gray-800 flex items-center justify-center"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Pets */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="font-semibold">Pets</div>
                  <div className="text-sm text-gray-600 underline cursor-pointer">
                    Bringing a service animal?
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPets(Math.max(0, pets - 1))}
                    disabled={pets <= 0}
                    className={`w-8 h-8 rounded-full border ${
                      pets <= 0
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-400 text-gray-600 hover:border-gray-800"
                    } flex items-center justify-center`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-medium">{pets}</span>
                  <button
                    onClick={() =>
                      setPets(Math.min(place.maxPets || 5, pets + 1))
                    }
                    className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 hover:border-gray-800 flex items-center justify-center"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Guest Limit Message */}
              <div className="text-xs text-gray-600 mt-2">
                This place has a maximum of {place.maxGuests || 6} guests, not
                including infants. If you're bringing more than 2 pets, please
                let your host know.
              </div>
              {/* Close Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowGuestPicker(false)}
                  className="text-sm font-semibold underline hover:bg-gray-50 px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reserve / Check Availability Button */}
        <button
          className="w-full mt-6 py-4 rounded-full font-semibold text-base transition-all
          text-white
          bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700
          shadow-lg"
          disabled={!dateRange?.from || !dateRange?.to}
          style={{
            opacity: dateRange?.from && dateRange?.to ? 1 : 0.7,
            cursor:
              dateRange?.from && dateRange?.to ? "pointer" : "not-allowed",
          }}
          onClick={handleBookingSubmit}
        >
          {numberOfNights > 0 ? "Reserve" : "Check availability"}
        </button>

        {/* Optional: below button note */}
        <div className="text-center text-sm text-gray-600 mt-3">
          You won't be charged yet
        </div>

        {/* Report Link (bottom, like your images) */}
        <div className="mt-6 text-center">
          <button className="text-sm text-gray-600 underline hover:text-gray-900 flex items-center justify-center gap-1 mx-auto">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Report this listing</span>
          </button>
        </div>
      </div>
    </>
  );
};
