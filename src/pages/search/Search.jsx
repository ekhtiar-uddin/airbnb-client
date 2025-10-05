import { useAppSelector } from "@/Redux/hooks";
import { useGetAllPropertiesQuery } from "@/Redux/property/propertyManagement.api";
import { selectFilters } from "@/Redux/Slices/globalSlice";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import AnimatedSearchBar from "../home/AnimatedSearchBar";
import BecomeHost from "../home/BecomeHost";
import useSearchTabs from "../home/hooks/useSearchTabs";
import PropertyCard from "../home/PropertyCard";
import PropertyCardSkeleton from "../home/PropertyCardSkeleton";
import Map from "./Map";
import logo from "/src/assets/nav/logo.png";

const Search = () => {
  const {
    scrollY,
    stickyExpand,
    setStickyExpand,
    handleTabClick,
    setStickyTab,
    openTab,
  } = useSearchTabs();
  const { location } = useParams();
  const [searchParams] = useSearchParams();
  const filters = useAppSelector(selectFilters);
  const city = location?.split("--")[0];

  const params = [{ name: "location", value: city }];

  const checkIn =
    searchParams.get("checkIn") ||
    (filters.checkIn
      ? new Date(filters.checkIn).toISOString().split("T")[0]
      : null);
  const checkOut =
    searchParams.get("checkOut") ||
    (filters.checkOut
      ? new Date(filters.checkOut).toISOString().split("T")[0]
      : null);
  const guestCount =
    searchParams.get("guestCount") || filters.guestCount || null;

  if (checkIn) params.push({ name: "checkIn", value: checkIn });
  if (checkOut) params.push({ name: "checkOut", value: checkOut });
  if (guestCount && guestCount > 0)
    params.push({ name: "guestCount", value: guestCount });

  // Handle other search params
  for (const [key, value] of searchParams.entries()) {
    if (
      key !== "location" &&
      key !== "checkIn" &&
      key !== "checkOut" &&
      key !== "guestCount"
    ) {
      params.push({ name: key, value: value });
    }
  }

  const cityName = location?.split("--")[0];
  const dateDisplay =
    checkIn && checkOut
      ? `${new Date(checkIn).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${new Date(checkOut).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`
      : "Anytime";

  const guestDisplay =
    guestCount > 0
      ? `${guestCount}+ guest${guestCount > 1 ? "s" : ""}`
      : "Add guests";

  const { data: properties, isLoading } = useGetAllPropertiesQuery(params);
  const [isMenuToggled, setIsMenuToggled] = useState(true);
  return (
    <section className=" min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <div className="sticky top-0 left-0 w-full  bg-gray-50 border-b transition-all duration-300 px-12 z-100">
        <div className="pt-7">
          <div className="flex items-start justify-between gap-4">
            {/* Logo */}
            <Link to={`/`}>
              <div className="pb-5 h-[56px] w-[102px] flex items-center flex-shrink-0">
                <img src={logo} alt="logo" />
              </div>
            </Link>
            <div className="flex flex-1 justify-center items-center min-w-0">
              <AnimatedSearchBar
                cityName={`${cityName}`}
                dateRange={dateDisplay}
                guests={guestDisplay}
                scrollY={scrollY}
                stickyExpand={stickyExpand}
                setStickyExpand={setStickyExpand}
                setStickyTab={setStickyTab}
                handleTabClick={handleTabClick}
              />
            </div>
            {/* Right */}
            <div className="flex-shrink-0">
              <BecomeHost />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - No separate scroll container */}
      <div className="px-12">
        <div className="flex gap-6">
          {/* Left Side - Property Cards (Scrollable with page) */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between my-8">
              <h3 className="text-sm font-bold">Over 1,000 homes</h3>
              <p className="text-sm font-bold text-gray-900">
                Prices include all fees
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-3 gap-[11px] pb-12">
                {Array.from({ length: 9 }).map((item, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-[11px] pb-12">
                {properties?.data?.map((property) => (
                  <PropertyCard key={property?._id} property={property} />
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Sticky Map */}
          <div className="w-[767px] flex-shrink-0">
            <div className="sticky top-[120px] h-[calc(100vh-140px)]">
              <Map properties={properties?.data} />
            </div>
          </div>
        </div>

        {stickyExpand && (
          <div className="fixed inset-0 bg-black/50 z-40 pointer-events-none" />
        )}
      </div>
    </section>
  );
};

export default Search;
