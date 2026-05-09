import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/details/${property?._id}`}>
      <div className="relative cursor-pointer overflow-hidden">
        {/* Badge */}
        {property?.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white bg-opacity-95 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow">
            Guest favorite
          </div>
        )}
        {/* Heart icon */}
        <div className="absolute top-3 right-3 z-10">
          <Heart size={22} className="stroke-gray-400" />
        </div>
        {/* Image */}
        <img
          src={property.cardImage}
          alt={property.cardTitle}
          className="w-full rounded-xl xl:h-[235px]  object-cover"
        />
        {/* Details */}
        <div>
          <div className="font-bold text-sm text-[#333333] my-1 break-words">
            {property.cardTitle}
          </div>
          <div className="text-xs -mt-2 text-gray-500 flex items-center gap-2">
            ${property.monthlyBill} monthly
            <span className="text-lg text-gray-400 mx-1">•</span>
            <span className="font-semibold text-gray-700">
              ★ {property.ratings?.toFixed(1) || property.rating?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
