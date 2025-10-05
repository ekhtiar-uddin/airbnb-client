import { Search } from "lucide-react";
import { useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import BigSearchComponent from "./BigSearchComponent ";
import navOne from "/src/assets/nav/nav-1.png";

export default function AnimatedSearchBar({
  cityName,
  dateRange,
  guests,
  scrollY,
  stickyExpand,
  setStickyExpand,
  setStickyTab,
  handleTabClick,
  // setOpenTab,
}) {
  const [expandFromCompact, setExpandFromCompact] = useState(false);
  const [forcedTab, setForcedTab] = useState(null);
  const location = useLocation();
  const { id } = useParams();

  console.log("cityName", cityName);
  // ------ FIX: Add expandFromCompact to the height logic! ------
  const isBigSearch =
    (!location.pathname.startsWith("/s/") &&
      location.pathname !== `/details/${id}` &&
      scrollY <= 0 &&
      !stickyExpand) ||
    expandFromCompact;

  return (
    <div className="  ">
      <div
        className={`
        w-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isBigSearch ? "h-[190px] py-6" : "h-[64px] py-2"}
        bg-transparent
      `}
      >
        <div className=" flex-1 flex justify-center items-center">
          <div className="relative flex items-center justify-center w-full transition-all duration-500">
            {/* Big state - scroll to top OR expanding from compact */}
            <div
              //  absolute left-0 right-0
              className={`
             transition-all duration-500
              ${
                isBigSearch
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }
            `}
            >
              <BigSearchComponent
                forceWhereDropdown={expandFromCompact}
                // onCloseForceWhereDropdown={() => setExpandFromCompact(false)}
                onCloseForceWhereDropdown={() => {
                  setExpandFromCompact(false);
                  setForcedTab(null); // Reset
                }}
                forcedTab={forcedTab}
              />
            </div>
            {/* Compact state */}
            <div
              className={`
              absolute flex-general pb-6 transition-all duration-500
              ${
                !isBigSearch && !stickyExpand
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }
            `}
            >
              <div className="flex items-center justify-evenly rounded-full shadow-md h-12 border bg-white cursor-pointer max-w-md pr-2">
                <button
                  onClick={() => {
                    setExpandFromCompact(true);
                    setForcedTab("where");
                    setStickyTab("where");
                  }}
                  className="cursor-pointer border-r-2 border-gray-100 px-4 text-sm  font-semibold flex items-center gap-2"
                >
                  <img src={navOne} alt="" className="w-6 h-6" />
                  {cityName ? `Homes in ${cityName}` : "Anywhere"}
                </button>
                <button
                  onClick={() => {
                    setExpandFromCompact(true);
                    setForcedTab("checkin");
                    setStickyTab("checkin");
                  }}
                  className="font-semibold cursor-pointer border-r-2 border-gray-100 px-4 text-sm"
                >
                  {dateRange ? `${dateRange}` : "Anytime"}
                </button>
                <button
                  onClick={() => {
                    setExpandFromCompact(true);
                    setForcedTab("who");
                    setStickyTab("who");
                  }}
                  className="font-semibold cursor-pointer border-gray-100 px-4 text-sm "
                >
                  {guests ? `${guests}` : "Add guests"}
                </button>
                <button
                  className="bg-p1 text-white rounded-full flex items-center justify-center h-8 w-8"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Expanded state (for stickyExpand mode, e.g. from calendar click) */}
            <div
              className={`
              absolute left-0 right-0 transition-all duration-500
              ${
                stickyExpand && !expandFromCompact
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }
            `}
            >
              <BigSearchComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
