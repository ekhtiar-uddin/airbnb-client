import favOne from "/src/assets/favorite-1.png";
import favTwo from "/src/assets/favorite-2.png";

const GuestFavoriteBadge = ({ data }) => {
  return (
    <div className="mt-8 bg-white w-[653px] h-[89px] flex-center border border-gray-300 rounded-xl px-6 shadow-sm">
      <div className="flex items-center justify-between gap-6">
        {/* Left Section - Guest Favorite */}
        <div className="flex items-center gap-3">
          <img className="w-[23px]" src={favOne} alt="" />
          <div>
            <div className="font-semibold leading-[20px] text-lg text-gray-900">
              Guest
            </div>
            <div className="font-semibold leading-[20px] text-lg text-gray-900">
              favorite
            </div>
          </div>
          <img className="w-[23px]" src={favTwo} alt="" />
        </div>

        {/* Middle Section - Description */}
        <div className="flex-1">
          <p className="font-bold text-gray-900 leading-snug">
            One of the most loved homes on Airbnb, according to guests
          </p>
        </div>

        {/* Right Section - Rating */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {data?.overallRating}
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xs">
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="h-8 w-px bg-gray-300"></div>

          <div className="text-center">
            <p className="text-[22px] font-semibold text-gray-900">
              {data?.reviews?.length}
            </p>
            <p className="text-xs text-gray-600">Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestFavoriteBadge;
