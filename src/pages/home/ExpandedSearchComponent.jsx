import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useSearchTabs from "./hooks/useSearchTabs";
import NavTabs from "./NavTabs";
import TabDropdown from "./TabDropdown";
const ExpandedSearchComponent = () => {
  const {
    stickyTab,

    expandRef,

    handleStickyTabClick,
  } = useSearchTabs();
  return (
    <div className="fixed top-0 left-0 w-full z-50  transition-all duration-500">
      <div
        className="px-12 flex items-start justify-between"
        style={{ minHeight: 80 }}
      >
        {/* Left */}

        {/* Middle: Expanded sticky search */}

        <div className="flex flex-col items-center flex-1 justify-center">
          <NavTabs />
          <div
            ref={expandRef}
            className="relative border border-borderOne shadow-lg max-h-[66px] w-[850px] mt-2 flex items-center rounded-full bg-white"
          >
            {/* Where */}
            <div className="relative rounded-l-full flex items-center group searchbar-parent">
              <button
                onClick={() => handleStickyTabClick("where")}
                className="bg-white cursor-pointer w-[278px] px-8 h-[64px] rounded-full relative z-10"
              >
                <h4 className="searchLevel font-semibold">Where</h4>
                <div className="flex items-center">
                  <Input
                    placeholder="Search Destinations"
                    className="p-0 rounded-br-full shadow-none border-none bg-transparent"
                  />
                </div>
              </button>
              <TabDropdown open={stickyTab === "where"} />
            </div>
            <div className="searchBtnBorder"></div>

            {/* Check in */}
            <div className="z-60 relative flex items-center group searchbar-parent">
              <button
                onClick={() => handleStickyTabClick("checkin")}
                className="bg-white cursor-pointer w-[139px] px-8 h-[64px] rounded-full relative z-10"
              >
                <h4 className="searchLevel font-semibold ">Check in</h4>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">Add Dates</p>
                </div>
              </button>
              <TabDropdown open={stickyTab === "checkin"} />
            </div>
            <div className="searchBtnBorder"></div>

            {/* Check out */}
            <div className="relative flex items-center group searchbar-parent">
              <button
                onClick={() => handleStickyTabClick("checkout")}
                className="bg-white cursor-pointer w-[139px] px-8 h-[64px] rounded-full relative z-10"
              >
                <h4 className="searchLevel font-semibold">Check out</h4>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">Add Dates</p>
                </div>
              </button>
              <TabDropdown open={stickyTab === "checkout"} />
            </div>
            <div className="searchBtnBorder"></div>

            {/* Who */}
            <div className="relative flex items-center group searchbar-parent">
              <div
                onClick={() => handleStickyTabClick("who")}
                className="flex-between cursor-pointer w-[288px] h-[64px] pl-8 pr-[9px] rounded-full relative z-10"
              >
                <div>
                  <h4 className="searchLevel font-semibold">Who</h4>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">Add Guests</p>
                  </div>
                </div>
                <button
                  className="bg-p1 text-white rounded-full flex items-center justify-center h-12 w-28 px-4 transition-all duration-300"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                  <span className="ml-2 text-[14px] font-semibold">Search</span>
                </button>
              </div>
              <TabDropdown open={stickyTab === "who"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedSearchComponent;
