// One parent div containing three stacked images (Tailwind)
// value={localFilters?.location}
// onChange={(e) =>
//   setLocalFilters((prev) => ({
//     ...prev,
//     location: e.target.value,
//   }))
// }

<div className="relative flex justify-center items-start pt-10">
  <button
    className="flex items-center rounded-full px-7 py-4 bg-gray-100 shadow-md gap-2 hover:bg-gray-200 transition duration-200"
    onClick={() => setOpen(true)}
  >
    <span className="font-semibold text-gray-700">Where</span>
    <span className="text-gray-500">Search destinations</span>
  </button>
  {/* Dropdown */}
  <div
    className={`absolute left-1/2 top-20 -translate-x-1/2 z-20 transition-all duration-500
          ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
    style={{ minWidth: 350, maxWidth: 420 }}
  >
    <div className="bg-white rounded-3xl shadow-xl py-7 px-6">
      {/* Recent searches */}
      <div>
        <div className="text-gray-700 font-semibold mb-3">Recent searches</div>
        {recentSearches.map((item, i) => (
          <div key={i} className="flex items-center gap-4 py-2">
            <span className="text-2xl w-8">{item.icon}</span>
            <div>
              <div className="font-medium text-gray-800">{item.title}</div>
              <div className="text-gray-500 text-sm">{item.details}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Suggested destinations */}
      <div className="mt-4">
        <div className="text-gray-700 font-semibold mb-3">
          Suggested destinations
        </div>
        {suggestedDestinations.map((item, i) => (
          <div key={i} className="flex items-center gap-4 py-2">
            <span className="text-2xl w-8">{item.icon}</span>
            <div>
              <div className="font-medium text-gray-800">{item.title}</div>
              <div className="text-gray-500 text-sm">{item.details}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  {/* Overlay for closing dropdown */}
  {open && (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-transparent z-10"
      aria-label="Close search"
    ></div>
  )}
</div>;

{
  /* --- BIG NAV & SEARCH (default, hide on scroll/expand) --- */
}
<div
  className={`
              transition-all duration-500 absolute left-0 right-0 mx-auto w-full flex flex-col items-center
              ${
                scrollY <= 30 && !stickyExpand
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-8 pointer-events-none"
              }
            `}
></div>;

// expanded
{
  /* <div
            className={`
              absolute left-0 right-0 transition-all duration-500
              ${
                stickyExpand
                  ? "opacity-100 scale-100 pointer-events-auto z-20"
                  : "opacity-0 scale-95 pointer-events-none z-10"
              }
            `}
          >
            <ExpandedSearchComponent />
          </div> */
}

// scroll handler for compact/sticky switch
// +++++++from here
// useEffect(() => {
//   const onScroll = () => {
//     setScrollY(window.scrollY);
//     if (window.scrollY <= 30 && stickyExpand) setStickyExpand(false);
//   };
//   window.addEventListener("scroll", onScroll);
//   return () => window.removeEventListener("scroll", onScroll);
// }, [stickyExpand]);

// // click outside sticky expanded
// useEffect(() => {
//   if (!stickyExpand) return;
//   const onClick = (e) => {
//     if (expandRef.current && !expandRef.current.contains(e.target)) {
//       setStickyExpand(false);
//     }
//   };
//   document.addEventListener("mousedown", onClick);
//   return () => document.removeEventListener("mousedown", onClick);
// }, [stickyExpand]);
// +++++++to here

/***

window.location.search = "";
localStorage.clear();
sessionStorage.clear();

 * **/
