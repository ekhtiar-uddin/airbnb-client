import { useAppSelector } from "@/Redux/hooks";
import { useGetAllPropertiesQuery } from "@/Redux/property/propertyManagement.api";
import { selectGlobalParams } from "@/Redux/Slices/globalSlice";
import { ChevronRight, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import AnimatedSearchBar from "./AnimatedSearchBar";
import BecomeHost from "./BecomeHost";
import Footer from "./footer/Footer";
import useSearchTabs from "./hooks/useSearchTabs";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import logo from "/src/assets/nav/logo.png";

const Home = () => {
  const { scrollY, stickyExpand, setStickyExpand, setStickyTab, setOpenTab } =
    useSearchTabs();
  const items = Array.from({ length: 20 }, (_, i) => `Title ${i + 1}`);
  const globalParams = useAppSelector(selectGlobalParams);
  // const globalParams = [{ name: "location", value: "Paris" }];
  // const {
  //   data: properties,
  //   isLoading,
  //   isFetching,
  // } = useGetAllPropertiesQuery(globalParams);

  const [searchParams] = useSearchParams();

  const params = [];
  for (const [key, value] of searchParams.entries()) {
    params.push({ name: key, value: value });
  }

  const { data: properties, isLoading } = useGetAllPropertiesQuery(params);

  const popularParisProperties = properties?.data?.filter(
    (property) => property?.location?.city === "Paris",
  );

  console.log("properties sdfsdf", properties);

  const popularLondonProperties = properties?.data?.filter(
    (property) => property?.location?.city === "London",
  );
  const popularSeoulProperties = properties?.data?.filter(
    (property) => property?.location?.city === "São Paulo",
  );

  return (
    <section className="bg-[#fcfcfc]">
      <div className="customWidth">
        {/* --- SINGLE FIXED NAVBAR --- */}
        <div className="fixed bg-gray-50 pt-3 sm:pt-7 left-0 w-full z-40 bg-whited md:border-b border-none  transition-all duration-300">
          <div className="customWidth">
            {/* Desktop navbar */}
            <div className="hidden lg:flex items-start justify-between gap-4">
              <Link to={`/`}>
                <div
                  className={`${
                    scrollY <= 30 && !stickyExpand ? "pb-5" : "pb-5"
                  } h-[56px] w-[102px] flex items-center flex-shrink-0`}
                >
                  <img src={logo} alt="logo" />
                </div>
              </Link>
              <div className="-mr-32 flex-1 pt-1">
                <AnimatedSearchBar
                  // setOpenTab={setOpenTab}
                  scrollY={scrollY}
                  stickyExpand={stickyExpand}
                  setStickyExpand={setStickyExpand}
                  setStickyTab={setStickyTab}
                />
              </div>
              <div className="pt-1">
                <BecomeHost />
              </div>
            </div>

            {/* Mobile/tablet navbar */}
            <div className="lg:hidden pt-3  flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Link to={`/`}>
                  <div
                    className={`${
                      scrollY <= 30 && !stickyExpand ? "pb-2" : "pb-2"
                    } h-[48px] w-[96px] flex items-center flex-shrink-0`}
                  >
                    <img src={logo} alt="logo" />
                  </div>
                </Link>
                <div>
                  <BecomeHost />
                </div>
              </div>
              <button
                type="button"
                className="searchShadow flex w-full items-center gap-2 rounded-full border border-[#dddddd] bg-white px-4 py-3 text-left mb-4"
                aria-label="Start your search"
              >
                <Search className="h-4 w-4 text-[#6a6a6a]" />
                <span className="text-sm font-medium text-[#222222] truncate">
                  Start your search
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Content below navbar, animate padding and opacity */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            scrollY <= 30 && !stickyExpand ? "pt-[140px]" : "pt-[140px]"
          }`}
        >
          {/* Continue section - visible before scroll */}
          {/* <div className="hidden lg:block">
            <Continue />
          </div>
          <div
            className={`lg:hidden transition-opacity duration-500 ${
              scrollY > 30 && !stickyExpand
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          >
            <Continue />
          </div> */}

          {/* Content grid */}

          {/*   */}
          <section className="  mt-4 lg:mt-32 md:mt-10">
            {/*   Popular homes in Paris*/}
            <h3 className="flex text-lg font-bold mb-3  gap-2 items-center">
              Popular homes in Paris <ChevronRight />{" "}
            </h3>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-[11px]  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
                {Array.from({ length: 7 }).map((item, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-[11px]  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
                {popularParisProperties?.map((property) => (
                  <PropertyCard key={property?._id} property={property} />
                ))}
              </div>
            )}
            {/*   Stay in London*/}
            <h3 className="flex text-lg mt-8 font-bold mb-3  gap-2 items-center">
              Stay in London <ChevronRight />{" "}
            </h3>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-[11px]  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
                {Array.from({ length: 7 }).map((item, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-[11px]  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
                {popularLondonProperties?.map((property) => (
                  <PropertyCard key={property?._id} property={property} />
                ))}
              </div>
            )}
            {/*   Places to stay in Seoul*/}
            <h3 className="flex text-lg mt-8 font-bold mb-3  gap-2 items-center">
              Places to stay in Seoul <ChevronRight />{" "}
            </h3>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-[11px]  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
                {Array.from({ length: 7 }).map((item, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-[11px]  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
                {popularSeoulProperties?.map((property) => (
                  <PropertyCard key={property?._id} property={property} />
                ))}
              </div>
            )}
          </section>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Home;
