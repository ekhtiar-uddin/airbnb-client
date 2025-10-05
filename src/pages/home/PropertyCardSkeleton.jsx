const PropertyCardSkeleton = () => {
  return (
    <div className="relative h-[279px] cursor-pointer overflow-hidden animate-pulse">
      {/* Badge skeleton */}
      <div className="absolute top-3 left-3 bg-gray-200 px-3 py-1 rounded-full h-6 w-24" />

      {/* Heart icon skeleton */}
      <div className="absolute top-3 right-3 z-10">
        <div className="h-6 w-6 bg-gray-200 rounded-full" />
      </div>

      {/* Image skeleton */}
      <div className="w-full rounded-xl xl:h-[235px] h-full  bg-gray-200" />

      {/* Details skeleton */}
      <div className="">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4 my-1" />

        {/* Price and rating skeleton */}
        <div className="flex items-center gap-2 ">
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
