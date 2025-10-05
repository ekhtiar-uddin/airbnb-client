import { useAppSelector } from "@/Redux/hooks";
import { useGetAllPropertiesQuery } from "@/Redux/property/propertyManagement.api";
import { selectGlobalParams } from "@/Redux/Slices/globalSlice";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import AnimatedSearchBar from "./AnimatedSearchBar";
import BecomeHost from "./BecomeHost";
import Continue from "./continue/Continue";
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
    (property) => property?.location?.city === "Paris"
  );

  const popularLondonProperties = properties?.data?.filter(
    (property) => property?.location?.city === "London"
  );
  const popularSeoulProperties = properties?.data?.filter(
    (property) => property?.location?.city === "São Paulo"
  );

  return (
    <div className="bg-[#fcfcfc] ">
      {/* --- SINGLE FIXED NAVBAR --- */}
      <div className="fixed  bg-gray-50  pt-7 left-0 w-full z-40 bg-whited border-b transition-all duration-300">
        <div className={`px-12 flex items-start justify-between gap-4 `}>
          {/* Logo */}
          <div
            className={`${
              scrollY <= 30 && !stickyExpand ? "pb-5" : "pb-5"
            } h-[56px]  w-[102px] flex items-center flex-shrink-0`}
          >
            <img src={logo} alt="logo" />
          </div>

          <div
            className={`flex  ${stickyExpand ? "gap-[491px]" : "gap-[254px]"} `}
          >
            <div className="flex  flex-1 justify-center items-center">
              {/* Reusable, animated search bar */}
              <AnimatedSearchBar
                // setOpenTab={setOpenTab}
                scrollY={scrollY}
                stickyExpand={stickyExpand}
                setStickyExpand={setStickyExpand}
                setStickyTab={setStickyTab}
              />
            </div>
            {/* Right */}
            {/* flex-shrink-0 */}
            <div className="">
              <BecomeHost />
            </div>
          </div>
        </div>
      </div>
      {/* Content below navbar, animate padding and opacity */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          scrollY <= 30 && !stickyExpand ? "pt-[219px]" : "pt-[140px]"
        }`}
      >
        {/* Continue section - visible before scroll */}
        <div
          className={`transition-opacity duration-500 ${
            scrollY > 30 && !stickyExpand
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          <Continue />
        </div>

        {/* Content grid */}

        {/*   */}
        <section className="  px-12 mt-8">
          {/*   Popular homes in Paris*/}
          <h3 className="flex text-lg font-bold mb-3  gap-2 items-center">
            Popular homes in Paris <ChevronRight />{" "}
          </h3>

          {isLoading ? (
            <div className="grid grid-cols-7 gap-[11px]">
              {Array.from({ length: 7 }).map((item, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-[11px]">
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
            <div className="grid grid-cols-7 gap-[11px]">
              {Array.from({ length: 7 }).map((item, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-[11px]">
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
            <div className="grid grid-cols-7 gap-[11px]">
              {Array.from({ length: 7 }).map((item, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-[11px]">
              {popularSeoulProperties?.map((property) => (
                <PropertyCard key={property?._id} property={property} />
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
