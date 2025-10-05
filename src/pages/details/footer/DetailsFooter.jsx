const DetailsFooter = () => (
  <footer className="bg-[#fff]  customDetailsWidth border-t border-[#ededed] mt-0 text-[15px] leading-relaxed">
    {/* Things to know */}
    <div className=" mx-auto px-4 md:px-8 pt-10 pb-8 border-b border-[#ededed]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* House rules */}
        <div>
          <div className="font-semibold mb-2 text-gray-900 text-[16px]">
            Things to know
          </div>
          <ul className="space-y-1 text-[14px] text-black">
            <li>
              <span className="font-medium">House rules</span>
              <ul className="ml-0 mt-1 space-y-0 text-gray-700">
                <li>Check-in after 3:00PM</li>
                <li>Checkout before 11:00AM</li>
                <li>4 guests maximum</li>
              </ul>
              <a
                href="#"
                className="inline-block mt-1 text-[15px] text-black font-medium hover:underline"
              >
                Show more <span aria-hidden="true">&gt;</span>
              </a>
            </li>
          </ul>
        </div>
        {/* Safety & property */}
        <div>
          <ul className="space-y-1 text-[14px] text-black">
            <li>
              <span className="font-medium">Safety & property</span>
              <ul className="ml-0 mt-1 space-y-0 text-gray-700">
                <li>Exterior security cameras on property</li>
                <li>Carbon monoxide alarm</li>
                <li>Smoke alarm</li>
              </ul>
              <a
                href="#"
                className="inline-block mt-1 text-[15px] text-black font-medium hover:underline"
              >
                Show more <span aria-hidden="true">&gt;</span>
              </a>
            </li>
          </ul>
        </div>
        {/* Cancellation policy */}
        <div>
          <ul className="space-y-1 text-[14px] text-black">
            <li>
              <span className="font-medium">Cancellation policy</span>
              <ul className="ml-0 mt-1 space-y-0 text-gray-700">
                <li>
                  Free cancellation for 48 hours. After that, the first 30
                  nights are non-refundable.
                </li>
                <li>Review this Host’s full policy for details.</li>
              </ul>
              <a
                href="#"
                className="inline-block mt-1 text-[15px] text-black font-medium hover:underline"
              >
                Show more <span aria-hidden="true">&gt;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Breadcrumb */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-2">
      <nav className="flex flex-wrap items-center gap-2 text-gray-600 text-[13px]">
        <a href="#" className="hover:underline">
          Airbnb
        </a>
        <span>&gt;</span>
        <a href="#" className="hover:underline">
          South Korea
        </a>
        <span>&gt;</span>
        <a href="#" className="hover:underline">
          Seoul
        </a>
        <span>&gt;</span>
        <span className="font-normal">Seoul</span>
      </nav>
    </div>

    {/* Main content */}
    <div className="w-full border-t border-[#ededed] bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Top grid: Explore & Other Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
          {/* Explore other options */}
          <div>
            <div className="font-semibold mb-2 text-gray-900 text-[16px]">
              Explore other options in and around Mapo-gu
            </div>
            <div className="grid grid-cols-3 gap-y-2 gap-x-6 text-gray-700 text-[15px]">
              {[
                ["Busan", "Vacation rentals"],
                ["Jeju-do", "Vacation rentals"],
                ["Incheon", "Vacation rentals"],
                ["Seogwipo-si", "Vacation rentals"],
                ["Gyeongju-si", "Vacation rentals"],
                ["Gangneung-si", "Vacation rentals"],
                ["Sokcho-si", "Vacation rentals"],
                ["Yeosu-si", "Vacation rentals"],
                ["Gapyeong-gun", "Vacation rentals"],
              ].map(([city, type]) => (
                <div key={city} className="mb-2">
                  <a
                    href="#"
                    className="hover:underline font-medium text-black"
                  >
                    {city}
                  </a>
                  <div className="text-xs text-gray-500">{type}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Other types of stays */}
          <div className="flex flex-col mt-8 lg:mt-0">
            <div className="font-semibold mb-2 text-gray-900 text-[16px]">
              Other types of stays on Airbnb
            </div>
            <div className="grid grid-cols-3 gap-x-2 text-gray-700 text-[15px]">
              <div>
                <a href="#" className="hover:underline font-medium text-black">
                  Seoul vacation rentals
                </a>
              </div>
              <div>
                <a href="#" className="hover:underline font-medium text-black">
                  Seoul monthly stays
                </a>
              </div>
              <div>
                <a href="#" className="hover:underline font-medium text-black">
                  Apartment vacation rentals in Seoul
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom grid: Support / Hosting / Airbnb */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-2 text-[15px]">
          <div>
            <div className="font-semibold text-gray-900 mb-2">Support</div>
            <ul className="space-y-2 text-[15px] text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Get help with a safety issue
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  AirCover
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Anti-discrimination
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Disability support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cancellation options
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Report neighborhood concern
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-2">Hosting</div>
            <ul className="space-y-2 text-[15px] text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  Airbnb your home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Airbnb your experience
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Airbnb your service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  AirCover for Hosts
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hosting resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Community forum
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hosting responsibly
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Airbnb-friendly apartments
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Join a free Hosting class
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Find a co-host
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-2">Airbnb</div>
            <ul className="space-y-2 text-[15px] text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  2025 Summer Release
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gift cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Airbnb.org emergency stays
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 border-t border-[#ededed] flex flex-col md:flex-row items-center justify-between gap-2 text-gray-600 text-xs">
      <div className="flex flex-wrap gap-2 items-center">
        <span>&copy; 2025 Airbnb, Inc.</span>
        <span>·</span>
        <a href="#" className="hover:underline">
          Terms
        </a>
        <span>·</span>
        <a href="#" className="hover:underline">
          Sitemap
        </a>
        <span>·</span>
        <a href="#" className="hover:underline">
          Privacy
        </a>
        <span>·</span>
        <a href="#" className="hover:underline">
          Your Privacy Choices
        </a>
      </div>
      <div className="flex items-center gap-3 mt-2 md:mt-0">
        <button className="flex items-center gap-1 hover:underline">
          <span role="img" aria-label="globe">
            🌐
          </span>
          English (US)
        </button>
        <button className="flex items-center gap-1 hover:underline">
          $ USD
        </button>
        <a href="#" className="hover:underline ml-2" title="Accessibility">
          🦽
        </a>
        <a href="#" className="hover:underline" title="Settings">
          ⚙️
        </a>
        <a href="#" className="hover:underline" title="Instagram">
          📷
        </a>
      </div>
    </div>
  </footer>
);

export default DetailsFooter;
