const PropertyDetailsSkeleton = () => {
  return (
    <div className=" py-6">
      {/* Top short line */}
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-6" />

      {/* Main content: Left big box and right 4 boxes */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left big box */}
        <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />

        {/* Right 4 boxes in 2x2 grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Bottom 4 short lines */}
      <div className="grid grid-cols-4 gap-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default PropertyDetailsSkeleton;
