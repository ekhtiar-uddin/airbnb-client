import {
  CheckCircle,
  ChevronDown,
  KeyRound,
  MapPin,
  MessageSquare,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import favOne from "/src/assets/favorite-1.png";
import favTwo from "/src/assets/favorite-2.png";
// Reviews data structure for backend
// const reviewsData = {
//   overallRating: 4.95,
//   totalReviews: 37,
//   isGuestFavorite: true,
//   topPercentage: 10,

//   ratings: [
//     { stars: 5, count: 450 },
//     { stars: 4, count: 50 },
//     { stars: 3, count: 10 },
//     { stars: 2, count: 5 },
//     { stars: 1, count: 2 },
//   ],

//   categories: [
//     { name: "Cleanliness", score: 5.0, icon: "Sparkles" },
//     { name: "Accuracy", score: 5.0, icon: "CheckCircle" },
//     { name: "Check-in", score: 5.0, icon: "KeyRound" },
//     { name: "Communication", score: 5.0, icon: "MessageSquare" },
//     { name: "Location", score: 5.0, icon: "MapPin" },
//     { name: "Value", score: 4.8, icon: "Tag" },
//   ],

//   reviews: [
//     {
//       id: 1,
//       userName: "Etty",
//       userLocation: null,
//       userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Etty",
//       yearsOnAirbnb: 9,
//       date: "August 2025",
//       rating: 5,
//       comment:
//         "The room matched the photos exactly and was definitely worth the price. The amenities provided were very complete and met all of our needs during the stay. The host was also very responsive and quick to reply to any messages, which made the whole experience even smoother. Overall, a great value for money and a comfortable place to stay.",
//     },
//     {
//       id: 2,
//       userName: "Jon",
//       userLocation: "Boston, Massachusetts",
//       userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jon",
//       yearsOnAirbnb: null,
//       date: "June 2025",
//       rating: 5,
//       comment:
//         "Great stay. The place is very spacious and great for 2 people. Washer/dryer unit was nice to have. The place is walking distance to the subway and trains. Also close enough to Hongdae to be able to enjoy the area, but far enough away that you don't feel overwhelmed by tourists or hustle and bustle of that area.",
//     },
//     {
//       id: 3,
//       userName: "Sue",
//       userLocation: "Bogotá, Colombia",
//       userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sue",
//       yearsOnAirbnb: null,
//       date: "June 2025",
//       rating: 5,
//       comment:
//         "This was a great place to stay, walkable to many places and near Hongik Station. There's lots of things to do nearby and it's easy to get to many areas of the city quickly. The room was comfortable, quiet and everything worked as expected. Harry & Yon gave us recommendations of nearby places that were very useful. I'd stay here again.",
//     },
//   ],
// };

const iconMap = {
  Sparkles,
  CheckCircle,
  KeyRound,
  MessageSquare,
  MapPin,
  Tag,
};

const ReviewsModal = ({ onClose, data }) => {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most relevant");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName] || CheckCircle;
    return <Icon className="w-6 h-6" />;
  };

  const maxRatingCount = Math.max(...data?.ratings.map((r) => r.count));
  const sortOptions = [
    "Most relevant",
    "Most recent",
    "Highest rated",
    "Lowest rated",
  ];

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-xl pt-8 px-10 pb-6 w-full max-w-5xl flex flex-row"
        style={{ maxHeight: "calc(100vh - 60px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-2xl bg-transparent border-none cursor-pointer hover:bg-gray-100 rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: Ratings Summary */}
        <div className="flex-1 pr-8">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-4">
              <img src={favOne} alt="" className="w-10 h-10" />
              <span className="text-6xl font-bold tracking-tight">
                {data?.overallRating}
              </span>
              <img src={favTwo} alt="" className="w-10 h-10" />
            </div>
          </div>
          <div className="flex flex-col items-center mb-6">
            <h3 className="text-lg font-semibold mb-1">Guest favorite</h3>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              This home is in the top {data?.topPercentage}% of eligible
              listings based on ratings, reviews, and reliability
            </p>
          </div>
          <div className="mb-8">
            <h4 className="font-semibold mb-3">Overall rating</h4>
            <div className="space-y-2">
              {data?.ratings.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-2">
                  <span className="text-sm w-4">{rating.stars}</span>
                  <div className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="bg-gray-900 h-full"
                      style={{
                        width: `${(rating.count / maxRatingCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {data?.categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {getIcon(category.icon)}
                  <span className="text-base">{category.name}</span>
                </div>
                <span className="font-semibold">
                  {category.score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Reviews (SCROLLABLE COLUMN) */}
        <div
          className="flex-1 flex flex-col pl-8"
          style={{
            maxHeight: "calc(100vh - 60px)",
            overflowY: "auto",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">
              {data?.totalReviews} reviews
            </h2>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 font-semibold shadow-none text-sm"
              >
                {sortBy}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showSortDropdown && (
                <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setShowSortDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <a
            href="#"
            className="text-sm underline text-gray-700 mb-5 inline-block"
          >
            Learn how reviews work
          </a>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search all reviews"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-base"
            />
          </div>
          {/* Reviews List */}
          <div className="space-y-8">
            {data?.reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-8 last:border-0"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-base">
                      {review.userName}
                    </span>
                    {review.userLocation && (
                      <span className="text-sm text-gray-600">
                        {review.userLocation}
                      </span>
                    )}
                    {review.yearsOnAirbnb && (
                      <span className="text-sm text-gray-600">
                        {review.yearsOnAirbnb} years on Airbnb
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2 ml-16">
                  <div className="flex text-lg text-black leading-tight">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">· {review.date}</span>
                </div>
                <p className="text-base text-gray-900 leading-relaxed ml-16">
                  {review.comment}
                </p>
                {/* Add translation section if exists */}
                {review.translation && (
                  <div className="ml-16 text-xs text-gray-700 mt-2">
                    {review.translation}{" "}
                    <span className="underline cursor-pointer">
                      Show original
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
