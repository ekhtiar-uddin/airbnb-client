import { useState } from "react";
import { FOOTER_LINKS, FOOTER_TAB_DATA } from "./footerData";

const TAB_LIST = [
  { key: "travelTips", label: "Travel tips & inspiration" },
  { key: "airbnbApartments", label: "Airbnb-friendly apartments" },
];

export default function Footer() {
  const [activeTab, setActiveTab] = useState("travelTips");

  const SHOW_COUNT = 14;
  const [showAll, setShowAll] = useState(false);
  const apartments = FOOTER_TAB_DATA.airbnbApartments;
  const showApartments = showAll ? apartments : apartments.slice(0, SHOW_COUNT);

  return (
    <footer className="bg-white border-t text-gray-900 mt-12">
      <div className=" py-10 ">
        <h2 className="text-2xl font-semibold mb-6">
          Inspiration for future getaways
        </h2>
        <div className="flex border-b mb-6">
          {TAB_LIST.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 pb-2 font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-black text-black"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mb-12">
          {activeTab === "travelTips" && (
            <div className="grid grid-cols-6 gap-6">
              {FOOTER_TAB_DATA.travelTips.map((item, idx) => (
                <div key={idx} className="mb-4">
                  <a href={item.url} className="font-semibold hover:underline">
                    {item.title}
                  </a>
                  <div className="text-gray-500 text-sm">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "airbnbApartments" && (
            <div className="grid grid-cols-6 gap-6">
              {showApartments.map((item, idx) => (
                <div key={idx} className="mb-4">
                  <a href={item.url} className="font-semibold hover:underline">
                    {item.title}
                  </a>
                  <div className="text-gray-500 text-sm">
                    {item.description}
                  </div>
                </div>
              ))}
              {!showAll && apartments.length > SHOW_COUNT && (
                <button
                  className="col-span-1 text-left font-semibold text-gray-700 hover:underline flex items-center"
                  onClick={() => setShowAll(true)}
                >
                  Show more <span className="ml-1">&#9660;</span>
                </button>
              )}
            </div>
          )}
        </div>
        {/* Footer links */}
        <div className="grid grid-cols-3 gap-12 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            {FOOTER_LINKS.support.map((link, idx) => (
              <div className="mb-1" key={idx}>
                <a href="#" className="hover:underline">
                  {link}
                </a>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hosting</h3>
            {FOOTER_LINKS.hosting.map((link, idx) => (
              <div className="mb-1" key={idx}>
                <a href="#" className="hover:underline">
                  {link}
                </a>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Airbnb</h3>
            {FOOTER_LINKS.airbnb.map((link, idx) => (
              <div className="mb-1" key={idx}>
                <a href="#" className="hover:underline">
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between items-center border-t pt-4 text-sm text-gray-500">
          <div>
            © 2025{" "}
            <a href="#" className="text-blue-700 hover:underline">
              Airbnb, Inc.
            </a>{" "}
            · Terms · Sitemap · Privacy · Your Privacy Choices{" "}
            <span className="inline-block align-text-top ml-1">
              <svg className="inline h-4 w-4" viewBox="0 0 32 32">
                <rect fill="#0099ff" width="32" height="32" rx="4" />
                <text
                  x="16"
                  y="21"
                  fontSize="14"
                  fontFamily="Arial"
                  fill="#fff"
                  textAnchor="middle"
                >
                  ?
                </text>
              </svg>
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <span>🌐 English (US)</span>
            <span>$ USD</span>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
