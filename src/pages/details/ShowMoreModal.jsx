import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutSpaceModal({ onClose, spaceData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={onClose}
    >
      <div
        className={`relative overflow-auto bg-white rounded-3xl shadow-2xl pt-20 px-8 pb-4 transition-all duration-300
          max-h-[calc(100vh-80px)] scrollbar-hide
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-2xl bg-transparent border-none cursor-pointer"
        >
          <X className="w-[20px]" />
        </button>

        {/* Content */}
        <div className="max-w-3xl space-y-8 pb-4">
          {/* Title */}
          <h2 className="text-[26px] text-navText font-bold">
            About this space
          </h2>

          {/* Full Description */}
          <div className="text-base text-gray-700 leading-relaxed">
            {spaceData?.fullDescription}
          </div>

          {/* The Space Section */}
          {spaceData?.spaceDetails && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {spaceData?.spaceDetails?.title}
              </h3>
              <div className="space-y-2">
                {spaceData?.spaceDetails?.items?.map((item, index) => (
                  <p key={index} className="text-base text-gray-700">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Guest Access Section */}
          {spaceData?.guestAccess && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {spaceData?.guestAccess?.title}
              </h3>
              <div className="space-y-2 mb-4">
                {Array.isArray(spaceData?.guestAccess?.description) &&
                  spaceData.guestAccess.description.map((line, index) => (
                    <p key={index} className="text-base text-gray-700">
                      {line}
                    </p>
                  ))}
              </div>

              {spaceData?.guestAccess?.nearbyStations?.title && (
                <p className="text-base text-gray-700 mb-2">
                  {spaceData?.guestAccess?.nearbyStations?.title}
                </p>
              )}
              <div className="space-y-1 ml-4">
                {Array.isArray(
                  spaceData?.guestAccess?.nearbyStations?.stations
                ) &&
                  spaceData.guestAccess.nearbyStations.stations.map(
                    (station, index) => (
                      <p key={index} className="text-base text-gray-700">
                        - {station}
                      </p>
                    )
                  )}
              </div>

              {spaceData?.guestAccess?.byCar && (
                <p className="text-base text-gray-700 mt-4">
                  {spaceData?.guestAccess?.byCar}
                </p>
              )}
            </div>
          )}

          {/* Other Things to Note Section */}
          {spaceData?.otherNotes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {spaceData?.otherNotes?.title}
              </h3>
              <p className="text-base text-gray-700">
                {spaceData?.otherNotes?.content}
              </p>
            </div>
          )}

          {/* Registration Details Section */}
          {spaceData?.registrationDetails && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {spaceData?.registrationDetails?.title}
              </h3>
              <p className="text-base text-gray-700">
                {spaceData?.registrationDetails?.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
