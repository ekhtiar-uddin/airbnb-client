import { Calendar } from "@/components/ui/calendar";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { selectFilters, setFilters } from "@/Redux/Slices/globalSlice";
import { useEffect, useState } from "react";
import { suggestedDestinations } from "./utils/global";

const TabDropdown = ({
  open,
  openCheckIn,
  openCheckOut,
  openWho,
  setOpenTab,
  handleTabClick,
  zClass = "",
}) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const normalizeDate = (value) => (value ? new Date(value) : undefined);

  const [dateRange, setDateRange] = useState({
    from: normalizeDate(filters.checkIn),
    to: normalizeDate(filters.checkOut),
  });

  useEffect(() => {
    setDateRange({
      from: normalizeDate(filters.checkIn),
      to: normalizeDate(filters.checkOut),
    });
  }, [filters.checkIn, filters.checkOut]);

  const [guestCounts, setGuestCounts] = useState(filters.guests);

  const handleDateSelect = (range) => {
    if (range?.from) {
      setDateRange(range);

      const isSingleDate =
        range.to && range.from.getTime() === range.to.getTime();

      dispatch(
        setFilters({
          checkIn: range.from,
          checkOut: isSingleDate ? null : range.to || null,
        }),
      );

      if (!range.to || isSingleDate) {
        handleTabClick("checkout");
      }
    }
  };

  const updateGuestCount = (type, increment) => {
    const currentTotal = guestCounts.adults + guestCounts.children;
    const newValue = Math.max(0, guestCounts[type] + (increment ? 1 : -1));

    if (increment) {
      if ((type === "adults" || type === "children") && currentTotal >= 16) {
        return;
      }

      if ((type === "infants" || type === "pets") && guestCounts[type] >= 5) {
        return;
      }
    }

    if ((type === "infants" || type === "pets") && guestCounts[type] >= 5) {
      return;
    }

    const newCounts = { ...guestCounts, [type]: newValue };
    setGuestCounts(newCounts);
    dispatch(setFilters({ guests: newCounts }));
  };

  const handleLocationClick = (fullTitle) => {
    dispatch(setFilters({ location: fullTitle }));

    handleTabClick("checkin");
  };

  // console.log("dateRange", dateRange);

  // Where Tab Content
  if (open) {
    return (
      <div
        className={`w-[425px] z-auto   h-[540px] overflow-auto absolute top-20 ${zClass} transition-all duration-500 rounded-3xl shadow-lg searchShadow origin-top bg-white
        ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-20 pointer-events-none"
        }`}
      >
        <div className="py-7 px-6">
          <div className="mt-4">
            <div className="text-gray-700 font-semibold mb-3">
              Suggested destinations
            </div>
            {suggestedDestinations.map((item, i) => (
              <div
                onClick={() => handleLocationClick(item.title)}
                key={i}
                className="cursor-pointer pl-4 rounded-xl hover:bg-[#f4f4f4] flex items-center gap-4 py-2"
              >
                <span className="text-2xl w-8">{item.icon}</span>
                <div>
                  <div className="font-medium text-gray-800">{item.title}</div>
                  <div className="text-gray-500 text-sm">{item.details}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Check-in Tab Content
  if (openCheckIn) {
    return (
      <div
        className={`w-[850px] h-[600px] z-120 -left-[280px] absolute top-20 ${zClass} transition-all duration-300 rounded-4xl shadow-lg searchShadow origin-top bg-white ${
          openCheckIn
            ? "opacity-100 scale-100"
            : "opacity-0 scale-20 pointer-events-none"
        }`}
      >
        <div className="flex justify-center mb-6">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            className="[--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
          />
        </div>
      </div>
    );
  }

  // Check-out Tab Content
  if (openCheckOut) {
    return (
      <div
        className={`w-[850px] h-[600px] z-100  -right-[289.58px] absolute top-20 ${zClass} transition-all duration-300 rounded-4xl shadow-lg searchShadow origin-top bg-white ${
          openCheckOut
            ? "opacity-100 scale-100"
            : "opacity-0 scale-20 pointer-events-none"
        }`}
      >
        <div className="flex justify-center mb-6">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            className="[--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
          />
        </div>
      </div>
    );
  }

  // Who Tab Content
  if (openWho) {
    return (
      <div
        className={`w-[425px] z-100 absolute top-20 right-0 ${zClass} transition-all duration-300 rounded-3xl shadow-lg searchShadow origin-top bg-white
        ${
          openWho
            ? "opacity-100 scale-100"
            : "opacity-0 scale-20 pointer-events-none"
        }`}
      >
        <div className="py-7 px-6">
          <div className="space-y-6">
            {/* Adults */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <div className="font-semibold text-gray-800">Adults</div>
                <div className="text-sm text-gray-500">Age 13+</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateGuestCount("adults", false)}
                  disabled={guestCounts.adults === 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">−</span>
                </button>
                <span className="w-8 text-center font-medium">
                  {guestCounts.adults}
                </span>
                <button
                  onClick={() => updateGuestCount("adults", true)}
                  disabled={guestCounts.adults + guestCounts.children >= 16}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">+</span>
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <div className="font-semibold text-gray-800">Children</div>
                <div className="text-sm text-gray-500">Ages 2–12</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateGuestCount("children", false)}
                  disabled={guestCounts.children === 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">−</span>
                </button>
                <span className="w-8 text-center font-medium">
                  {guestCounts.children}
                </span>
                <button
                  onClick={() => updateGuestCount("children", true)}
                  disabled={guestCounts.adults + guestCounts.children >= 16}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">+</span>
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <div className="font-semibold text-gray-800">Infants</div>
                <div className="text-sm text-gray-500">Under 2</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateGuestCount("infants", false)}
                  disabled={guestCounts.infants === 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">−</span>
                </button>
                <span className="w-8 text-center font-medium">
                  {guestCounts.infants}
                </span>
                <button
                  onClick={() => updateGuestCount("infants", true)}
                  disabled={guestCounts.infants >= 5}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">+</span>
                </button>
              </div>
            </div>

            {/* Pets */}
            <div className="flex items-center justify-between py-4">
              <div>
                <div className="font-semibold text-gray-800">Pets</div>
                <div className="text-sm text-gray-500 underline cursor-pointer">
                  Bringing a service animal?
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateGuestCount("pets", false)}
                  disabled={guestCounts.pets === 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">−</span>
                </button>
                <span className="w-8 text-center font-medium">
                  {guestCounts.pets}
                </span>
                <button
                  onClick={() => updateGuestCount("pets", true)}
                  disabled={guestCounts.pets >= 5}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Optional: Close button or summary */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              {Object.values(guestCounts).reduce((a, b) => a + b, 0) > 0
                ? `${Object.values(guestCounts).reduce(
                    (a, b) => a + b,
                    0,
                  )} guest${
                    Object.values(guestCounts).reduce((a, b) => a + b, 0) > 1
                      ? "s"
                      : ""
                  } selected`
                : "Add guests to start planning your trip"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TabDropdown;
