import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/Redux/hooks";
import { selectFilters } from "@/Redux/Slices/globalSlice";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSearchTabs from "./hooks/useSearchTabs";
import NavTabs from "./NavTabs";
import TabDropdown from "./TabDropdown";

const BigSearchComponent = ({
  forceWhereDropdown = false,
  onCloseForceWhereDropdown,
  forcedTab = null,
}) => {
  const {
    hoverTab,
    setHoverTab,
    open,
    openCheckIn,
    openCheckOut,
    openWho,
    openTab,
    setOpenTab, // <--- use this!
    scrollY,
    stickyExpand,
    indicator,
    containerRef,
    whereBtnRef,
    checkinBtnRef,
    checkoutBtnRef,
    whoBtnRef,
    handleTabClick,
  } = useSearchTabs();

  const filters = useAppSelector(selectFilters);
  const navigate = useNavigate();

  useEffect(() => {
    if (forceWhereDropdown && forcedTab) {
      handleTabClick(forcedTab);
      setOpenTab(forcedTab);
    }
  }, [forceWhereDropdown, forcedTab]);

  useEffect(() => {
    if (forceWhereDropdown && openTab === null) {
      onCloseForceWhereDropdown?.();
    }
  }, [forceWhereDropdown, openTab, onCloseForceWhereDropdown]);

  const handleSearch = () => {
    // Use a default location if none is provided
    const location = filters.location || "Paris, France";
    const formatted = location.replace(", ", "--");

    const checkIn = filters.checkIn
      ? new Date(filters.checkIn).toISOString().split("T")[0]
      : "";
    const checkOut = filters.checkOut
      ? new Date(filters.checkOut).toISOString().split("T")[0]
      : "";
    const guestCount = filters.guestCount || 0;

    const params = new URLSearchParams();
    if (checkIn) params.append("checkIn", checkIn);
    if (checkOut) params.append("checkOut", checkOut);
    if (guestCount > 0) params.append("guestCount", guestCount);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    navigate(`/s/${encodeURIComponent(formatted)}/homes${queryString}`);
  };

  return (
    <div
      className={`
        transition-all duration-500 w-full flex flex-col items-center
        relative opacity-100 translate-y-0
      `}
    >
      <NavTabs />
      {/* SEARCH BAR TABS */}
      <div
        ref={containerRef}
        className={`${
          open || openCheckIn || openCheckOut || openWho
            ? "bg-hoverSearchButton"
            : ""
        } relative border border-borderOne shadow-lg max-h-[66px] w-[850px] mb-8 flex items-center rounded-full transition-all duration-500`}
      >
        {/* AIRBNB-LIKE SLIDER INDICATOR */}
        {(open || openCheckIn || openCheckOut || openWho) && (
          <div
            className="absolute bg-white rounded-full z-0 shadow transition-all"
            style={{
              width: indicator.width,
              left: indicator.left,
              top: 0,
              height: "100%",
              borderRadius: "9999px",
              transition:
                "left 420ms cubic-bezier(0.2,0.8,0.2,1), width 420ms cubic-bezier(0.2,0.8,0.2,1)",
              willChange: "left, width",
              pointerEvents: "none",
            }}
          />
        )}
        {/* Where */}
        <div
          className={` relative z-20 rounded-l-full flex items-center group searchbar-parent 
            ${open && hoverTab === "checkin" ? "bg-borderOne" : ""}`}
        >
          <button
            ref={whereBtnRef}
            onClick={() => handleTabClick("where")}
            onMouseEnter={() => setHoverTab("where")}
            onMouseLeave={() => setHoverTab("")}
            className={`hover:bg-borderOne cursor-pointer w-[278px] px-8  h-[64px] rounded-full relative z-10 transition-colors duration-300 ease-out ${
              open ? "bg-white" : ""
            } ${hoverTab === "checkin" && open ? "bg-borderOne" : ""} ${
              hoverTab === "where" && openCheckIn
                ? "hover:bg-borderOne rounded-r-none"
                : ""
            } ${open && "hover:bg-white"} `}
          >
            <h4 className="searchLevel font-semibold">Where</h4>
            <div className="flex items-center">
              <Input
                value={filters.location}
                readOnly
                placeholder="Search Destinations"
                className={`p-0 rounded-br-full shadow-none border-none bg-transparent truncate cursor-pointer ${
                  filters.location ? "text-gray-900 font-bold" : ""
                }`}
              />
            </div>
          </button>
          <TabDropdown
            open={open}
            setOpenTab={setOpenTab}
            handleTabClick={handleTabClick}
          />
        </div>
        {/* Divider */}
        <div
          className={`searchBtnBorder ${
            open || openCheckIn || openCheckOut ? "" : ""
          } ${
            (open && "hidden") ||
            (openCheckIn && "hidden") ||
            (openCheckOut && "hidden")
          }`}
        ></div>
        {/* Check in */}
        <div
          className={`z-60 relative flex items-center group searchbar-parent ${
            openCheckIn && hoverTab === "where"
              ? "bg-borderOne rounded-r-full"
              : ""
          } ${
            openCheckIn && hoverTab === "checkout"
              ? "bg-borderOne rounded-l-full"
              : ""
          } ${
            openCheckOut && hoverTab === "checkin"
              ? "bg-borderOne rounded-l-full"
              : ""
          }`}
        >
          <button
            ref={checkinBtnRef}
            onClick={() => handleTabClick("checkin")}
            onMouseEnter={() => setHoverTab("checkin")}
            onMouseLeave={() => setHoverTab("")}
            className={`hover:bg-borderOne cursor-pointer w-[139px] px-8 h-[64px] rounded-full relative z-10 ${
              open ? "rounded-l-none" : ""
            } ${openCheckIn ? "bg-white" : ""} ${
              hoverTab === "where" && openCheckIn ? "rounded-r-full" : ""
            } ${hoverTab === "checkin" && open ? "hover:bg-borderOne" : ""}  ${
              openCheckIn && "hover:bg-white"
            }`}
          >
            <h4 className="searchLevel font-semibold">Check in</h4>
            <div className="flex items-center">
              <p
                className={
                  filters.checkIn
                    ? "text-gray-900 text-sm font-bold"
                    : "text-sm text-muted-foreground"
                }
              >
                {filters.checkIn
                  ? new Date(filters.checkIn).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Add Dates"}
              </p>
            </div>
          </button>
          <TabDropdown
            openCheckIn={openCheckIn}
            setOpenTab={setOpenTab}
            handleTabClick={handleTabClick}
          />
        </div>
        {/* Divider */}
        <div
          className={`searchBtnBorder ${
            (openCheckIn && "hidden") ||
            (openCheckOut && "hidden") ||
            (hoverTab === "checkout" && "hidden")
          }`}
        ></div>
        {/* Check out */}
        <div
          className={`relative flex items-center group searchbar-parent ${
            openCheckIn && hoverTab === "checkout"
              ? "bg-borderOne rounded-r-full"
              : ""
          } ${
            openCheckOut && hoverTab === "checkin"
              ? "bg-borderOne rounded-r-full"
              : ""
          } ${
            openCheckOut && hoverTab === "who"
              ? "bg-borderOne rounded-l-full"
              : ""
          } ${
            openWho && hoverTab === "checkout"
              ? "hover:bg-borderOne rounded-l-full"
              : ""
          }`}
        >
          <button
            ref={checkoutBtnRef}
            onClick={() => handleTabClick("checkout")}
            onMouseEnter={() => setHoverTab("checkout")}
            onMouseLeave={() => setHoverTab("")}
            className={`hover:bg-borderOne cursor-pointer w-[139px] px-8 h-[64px] rounded-full relative z-10 transition-colors duration-300 ease-out ${
              openCheckIn ? "rounded-l-none" : ""
            } ${
              hoverTab === "checkin" && openCheckOut ? "rounded-r-full" : ""
            } ${openCheckOut ? "bg-white" : ""} ${
              hoverTab === "checkout" && openCheckOut
                ? "hover:bg-borderOne"
                : ""
            } ${openCheckOut ? "hover:bg-white" : ""}`}
          >
            <h4 className="searchLevel font-semibold">Check out</h4>
            <div className="flex items-center">
              <p
                className={
                  filters.checkOut
                    ? "text-gray-900 text-sm font-bold"
                    : "text-sm text-muted-foreground"
                }
              >
                {filters.checkOut
                  ? new Date(filters.checkOut).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Add Dates"}
              </p>
            </div>
          </button>
          <TabDropdown
            openCheckOut={openCheckOut}
            setOpenTab={setOpenTab}
            handleTabClick={handleTabClick}
          />
        </div>
        {/* Divider */}
        <div
          className={`searchBtnBorder ${
            (openCheckOut && "hidden") ||
            (openWho && "hidden") ||
            (hoverTab === "checkout" && "hidden")
          }`}
        ></div>
        {/* Who */}
        <div
          className={`relative flex items-center group searchbar-parent ${
            openCheckOut && hoverTab === "who"
              ? "bg-borderOne rounded-r-full"
              : ""
          } ${
            openWho && hoverTab === "checkout"
              ? "bg-borderOne rounded-r-full"
              : ""
          }`}
        >
          <div
            ref={whoBtnRef}
            onClick={() => handleTabClick("who")}
            onMouseEnter={() => setHoverTab("who")}
            onMouseLeave={() => setHoverTab("")}
            className={`hover:bg-borderOne flex-between cursor-pointer w-[288px] h-[64px] pl-8 pr-[9px] rounded-full relative z-10 transition-colors duration-300 ease-out ${
              openCheckOut ? "rounded-l-none" : ""
            } ${hoverTab === "checkout" && openWho ? "rounded-r-full" : ""} ${
              openWho ? "bg-white" : ""
            } ${hoverTab === "who" && openWho ? "hover:bg-borderOne" : ""}  ${
              openWho && "hover:bg-white"
            }`}
          >
            <div>
              <h4 className="searchLevel font-semibold">Who</h4>
              <div className="flex items-center">
                <p
                  className={
                    filters.guestCount > 0
                      ? "text-gray-900 text-sm font-bold"
                      : "text-sm text-muted-foreground"
                  }
                >
                  {filters.guestCount > 0
                    ? `${filters.guestCount} guest${
                        filters.guestCount > 1 ? "s" : ""
                      }`
                    : "Add Guests"}
                </p>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className={`bg-[#de1362] text-white rounded-full flex items-center justify-center h-12 transition-all duration-300 ${
                open || openCheckIn || openCheckOut || openWho
                  ? "w-28 px-4"
                  : "w-12"
              }`}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              {(open || openCheckIn || openCheckOut || openWho) && (
                <span className="ml-2 text-[14px] font-semibold">Search</span>
              )}
            </button>
          </div>
          <TabDropdown
            openWho={openWho}
            setOpenTab={setOpenTab}
            handleTabClick={handleTabClick}
          />
        </div>
      </div>
    </div>
  );
};

export default BigSearchComponent;
