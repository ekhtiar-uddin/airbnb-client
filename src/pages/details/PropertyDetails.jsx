import { useGetPropertyByIdQuery } from "@/Redux/property/propertyManagement.api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedSearchBar from "../home/AnimatedSearchBar";
import BecomeHost from "../home/BecomeHost";
import useSearchTabs from "../home/hooks/useSearchTabs";
import AirbnbListingCard from "./AirbnbListingCard";
import { BookingWidget } from "./BookingWidget";
import DetailsFooter from "./footer/DetailsFooter";
import GuestFavoriteBadge from "./GuestFavoriteBadge";
import useRightOffset from "./hooks/useRightOffset";
import PlaceGallery from "./PlaceGallery";
import PropertyDetailsSkeleton from "./PropertyDetailsSkeleton";
import RareFindBadge from "./RareFindBadge";
import ReviewsModal from "./ReviewsModal";
import SelectcheckinDate from "./SelectcheckinDate";
import WhatThisPlaceOffers from "./WhatThisPlaceOffers";
import { WhereYouWillSleep } from "./WhereYouWillSleep";
import logo from "/src/assets/nav/logo.png";

const PropertyDetails = () => {
  const { id } = useParams();
  const {
    data: propertyData,
    isLoading,
    isFetching,
  } = useGetPropertyByIdQuery(id);

  const place = propertyData?.data;

  const rightOffset = useRightOffset(1120);
  const { scrollY, stickyExpand, setStickyExpand, setStickyTab } =
    useSearchTabs();
  const [showModal, setShowModal] = useState(false);
  // Only sticky between 700 and 1000 px scroll
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    setIsSticky(scrollY > 700 && scrollY < 1500);
  }, [scrollY]);

  if (isLoading || isFetching || !propertyData?.data) {
    return (
      <div className="h-[100vh] customDetailsWidth">
        <div className=" pt-7 left-0 w-full z-40 bg-whited border-b transition-all duration-300">
          <div className="flex items-start justify-between gap-4">
            {/* Logo */}
            <Link to={`/`}>
              <div
                className={`pb-5 h-[56px] w-[102px] flex items-center flex-shrink-0`}
              >
                <img src={logo} alt="logo" />
              </div>
            </Link>
            <div className="flex flex-1 justify-center items-center min-w-0">
              <AnimatedSearchBar
                scrollY={scrollY}
                stickyExpand={stickyExpand}
                setStickyExpand={setStickyExpand}
                setStickyTab={setStickyTab}
              />
            </div>
            {/* Right */}
            <div className="flex-shrink-0">
              <BecomeHost />
            </div>
          </div>
        </div>
        <PropertyDetailsSkeleton />
      </div>
    );
  }

  console.log(place?.reviewsData);

  return (
    <div className=" bg-gray-50 z-0">
      <div className="customDetailsWidth">
        <div className=" pt-7 left-0 w-full z-40 bg-whited border-b transition-all duration-300">
          <div className="flex items-start justify-between gap-4">
            {/* Logo */}
            <Link to={`/`}>
              <div
                className={`pb-5 h-[56px] w-[102px] flex items-center flex-shrink-0`}
              >
                <img src={logo} alt="logo" />
              </div>
            </Link>
            <div className="flex flex-1 justify-center items-center min-w-0">
              <AnimatedSearchBar
                scrollY={scrollY}
                stickyExpand={stickyExpand}
                setStickyExpand={setStickyExpand}
                setStickyTab={setStickyTab}
              />
            </div>
            {/* Right */}
            <div className="flex-shrink-0">
              <BecomeHost />
            </div>
          </div>
        </div>

        <div className="mt-4  min-h-screen">
          <h1 className="text-2xl font-bold mb-7">{place?.title}</h1>
          {/* <AddressLink>{place.address}</AddressLink> */}
          <PlaceGallery place={place} />
          <div className=" mt-[33px] mb-8 grid gap-[93px] grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
              <div>
                <h2 className="font-semibold text-2xl">{place?.subTitle}</h2>
                {place?.accommodationType}
              </div>

              <div
                className="cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <GuestFavoriteBadge data={place?.reviewsData} />
              </div>

              {showModal && (
                <ReviewsModal
                  data={place?.reviewsData}
                  onClose={() => setShowModal(false)}
                />
              )}

              <AirbnbListingCard
                aboutSpace={place?.aboutSpace}
                badges={place?.badges}
                host={place?.host}
              />

              <WhereYouWillSleep
                sleepingArrangementsData={place?.sleepingArrangementsData}
              />
              <WhatThisPlaceOffers amenitiesData={place?.amenitiesData} />

              <SelectcheckinDate />
            </div>
            <div
              className={`transition-all  duration-300 max-w-max ${
                isSticky ? "fixed top-10 -mr-2 z-50" : "relative ml-auto"
              }`}
              style={isSticky ? { right: `${rightOffset}px` } : {}}
            >
              <RareFindBadge />
              <BookingWidget place={place} />
            </div>
          </div>
          <div className="bg-white px-8 py-8 border-t">
            <div>
              <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {place?.extraInfo}
            </div>
          </div>
        </div>
      </div>

      <DetailsFooter />
    </div>
  );
};

export default PropertyDetails;
