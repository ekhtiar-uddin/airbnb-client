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
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

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

export function AmenitiesModal({ amenitiesData, onClose }) {
  const [visible, setVisible] = useState(false);

  console.log("amenitiesData", amenitiesData);

  useEffect(() => {
    setVisible(true);
  }, []);

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName] || Bed;
    return <Icon className="w-6 h-6" />;
  };

  const categories = Array.isArray(amenitiesData?.categories)
    ? amenitiesData.categories
    : [];

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={onClose}
    >
      <div
        className={`relative overflow-auto bg-white rounded-3xl shadow-2xl pt-20 px-8 pb-4 transition-all duration-300 w-full max-w-3xl
        max-h-[calc(100vh-80px)] scrollbar-hide
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-2xl bg-transparent border-none cursor-pointer"
        >
          <X className="w-[20px]" />
        </button>

        <h2 className="text-[26px] text-gray-900 font-bold mb-8">
          What this place offers
        </h2>

        {/* All Categories */}
        <div className="space-y-8 pb-4">
          {categories.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category?.title || "Untitled Category"}
              </h3>
              <div className="space-y-6">
                {Array.isArray(category?.items)
                  ? category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-4">
                        <div
                          className={
                            item?.unavailable
                              ? "text-gray-400"
                              : "text-gray-700"
                          }
                        >
                          {getIcon(item?.icon)}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-base ${
                              item?.unavailable
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {item?.name || "Unknown"}
                          </p>
                          {item?.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </p>
                          )}
                          {item?.note && (
                            <p className="text-sm text-gray-600 mt-1">
                              {item.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
