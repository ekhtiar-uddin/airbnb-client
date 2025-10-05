export const WhereYouWillSleep = ({ sleepingArrangementsData }) => {
  return (
    <div className="max-w-[653px] px-6 py-12">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Where you'll sleep
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(sleepingArrangementsData) &&
          sleepingArrangementsData.map((room) => (
            <div
              key={room?.id}
              className="border border-gray-300 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              {/* Image */}
              {room?.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room?.title || "Room image"}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {room?.title || "No title"}
                </h3>
                <p className="text-sm text-gray-600">
                  {room?.description || "No description"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
