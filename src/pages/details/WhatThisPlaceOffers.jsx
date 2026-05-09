import {
  AlertCircle,
  Bed,
  Calendar,
  Car,
  CloudOff,
  Coffee,
  Laptop,
  MapPin,
  Microwave,
  PawPrint,
  Refrigerator,
  Shield,
  Shirt,
  ShowerHead,
  Sparkles,
  Thermometer,
  Tv,
  User,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
import { useState } from "react";
import { AmenitiesModal } from "./AmenitiesModal";

const iconMap = {
  Wifi,
  Tv,
  Car,
  UtensilsCrossed,
  Waves,
  Calendar,
  PawPrint,
  Refrigerator,
  Microwave,
  Coffee,
  Bed,
  Wind,
  Shield,
  Laptop,
  MapPin,
  Sparkles,
  User,
  ShowerHead,
  Shirt,
  Thermometer,
  AlertCircle,
  WashingMachine,
  CloudOff,
};

export default function WhatThisPlaceOffers({ amenitiesData }) {
  const [showModal, setShowModal] = useState(false);

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName] || Bed;
    return <Icon className="w-6 h-6" />;
  };

  const featuredAmenities = Array.isArray(amenitiesData?.featured)
    ? amenitiesData.featured
    : [];

  const categoriesAmenities = Array.isArray(amenitiesData?.categories)
    ? amenitiesData.categories
    : [];

  const totalAmenities =
    featuredAmenities.length +
    categoriesAmenities.reduce(
      (acc, cat) => acc + (Array.isArray(cat?.items) ? cat.items.length : 0),
      0,
    );

  return (
    <div className="w-full max-w-none mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        What this place offers
      </h2>

      {/* Grid of featured amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {featuredAmenities.map((amenity) => (
          <div
            key={amenity?.id}
            className={`flex items-center gap-4 py-3 ${
              amenity?.unavailable ? "text-gray-400" : "text-gray-900"
            }`}
          >
            {getIcon(amenity?.icon)}
            <span
              className={`text-base ${
                amenity?.unavailable ? "line-through" : ""
              }`}
            >
              {amenity?.name || "Unknown"}
            </span>
          </div>
        ))}
      </div>

      {/* Show all amenities button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 text-base flex items-center gap-1 text-gray-900 hover:text-gray-700 bg-navActionHoverBg hover:bg-[#ebebeb] transition-colors mt-5 h-[48px] font-bold rounded-xl flex-center cursor-pointer w-full sm:w-auto"
      >
        Show all {totalAmenities} amenities
      </button>

      {/* Modal */}
      {showModal && (
        <AmenitiesModal
          onClose={() => setShowModal(false)}
          amenitiesData={amenitiesData}
        />
      )}
    </div>
  );
}
