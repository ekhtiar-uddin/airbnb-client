import { Award, Key, MapPin } from "lucide-react";
import { useState } from "react";
import ShowMoreModal from "./ShowMoreModal";

const iconMap = {
  award: Award,
  key: Key,
  location: MapPin,
};

const AirbnbListingCard = ({ host, badges, aboutSpace }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Host Section */}
      <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
        <div className="relative">
          <img
            src={host?.avatar}
            alt={host?.name}
            className="w-14 h-14 rounded-full"
          />
          {host?.isSuperhost && (
            <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-1">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Hosted by {host?.name}
          </h2>
          <p className="text-sm text-gray-600">
            {host?.isSuperhost ? "Superhost · " : ""}
            {host?.yearsHosting} {host?.yearsHosting > 1 ? "years" : "year"}{" "}
            hosting
          </p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="py-6 space-y-6 border-b border-gray-200">
        {badges?.map((badge, idx) => {
          const IconComponent = iconMap[badge.icon];
          return (
            <div key={idx} className="flex items-start gap-4">
              {IconComponent && (
                <IconComponent className="w-6 h-6 text-gray-700 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Translation Notice */}
      <div className="mt-6 mb-6 bg-gray-50 px-4 py-3 rounded-lg">
        <p className="text-sm text-gray-700">
          Some info has been automatically translated.{" "}
          <button className="font-semibold underline hover:text-gray-900">
            Show original
          </button>
        </p>
      </div>

      {/* Host Bio & Description */}
      <div className="space-y-4">
        <p className="text-base text-gray-700 leading-relaxed">{host?.bio}</p>
        <p className="text-base text-gray-700 leading-relaxed">
          Location: {host?.location}
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          Rating: {host?.rating} ({host?.reviewCount} reviews)
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          Response rate: {host?.responseRate}% · {host?.responseTime}
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 text-gray-900 hover:text-gray-700 bg-navActionHoverBg hover:bg-[#ebebeb] transition-colors mt-5 w-[132px] h-[48px] font-bold rounded-xl flex-center cursor-pointer"
        >
          Show More
        </button>

        {showModal && (
          <ShowMoreModal
            spaceData={aboutSpace}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AirbnbListingCard;
