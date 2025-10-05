import { X } from "lucide-react";
import { useEffect, useState } from "react";
import navOne from "/src/assets/nav/nav-1.png";
import navTwo from "/src/assets/nav/nav-2.avif";
import navThree from "/src/assets/nav/nav-3.avif";
const modalOptions = [
  {
    label: "Home",
    img: navOne,
  },
  {
    label: "Experience",
    img: navTwo,
  },
  {
    label: "Service",
    img: navThree,
  },
];

// function HostModalTrigger() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button
//         onMouseEnter={() => setShowModal(true)}
//         className="absolute top-6 right-10 bg-transparent border-none font-medium text-base cursor-pointer"
//       >
//         Become a host
//       </button>
//       {showModal && <HostModal onClose={() => setShowModal(false)} />}
//     </>
//   );
// }

export default function HostModal({ onClose }) {
  const [visible, setVisible] = useState(false);
  const [isFocusCard, setIsFocusCard] = useState("");
  const [isEnable, setIsEnable] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleFocus = (opt) => {
    setIsFocusCard(opt.label);
    setIsEnable(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.25)] "
      onClick={onClose}
    >
      <div
        className={`relative overflow-auto bg-white rounded-3xl shadow-2xl pt-20 px-8 pb-4 transition-all duration-300
    max-h-[calc(100vh-80px)] scrollbar-hide
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
  `}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-2xl bg-transparent border-none cursor-pointer"
        >
          <X className="w-[20px]" />
        </button>
        <h2 className="text-[26px] text-navText text-center mb-16 font-bold">
          What would you like to host?
        </h2>
        <div className="grid grid-cols-3 gap-4  justify-center">
          {modalOptions.map((opt) => (
            <div
              key={opt.label}
              tabIndex={0}
              className={`h-[330px] w-[310px] flex-1 bg-white border rounded-xl flex-general py-10 px-4 cursor-pointer text-center transition-shadow duration-150 ${
                isFocusCard === opt.label
                  ? "border-navText border-2"
                  : "border-borderOne"
              }`}
              onClick={() => handleFocus(opt)}
            >
              <div>
                <img
                  src={opt.img}
                  alt={opt.label}
                  className="w-[110px]  h-[110px] mb-4"
                />
                <h3 className="font-bold text-lg ">{opt.label}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="-mx-8 flex justify-end mt-8 border-t border-borderOne pt-4  ">
          <button
            disabled={isEnable}
            className="bg-neutral-900  text-white font-semibold text-lg rounded-lg px-9 py-3 disabled:opacity-50 disabled:cursor-not-allowed mr-5"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
