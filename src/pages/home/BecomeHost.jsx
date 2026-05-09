import HostModal from "@/components/home/HostModal";
import { Globe, Menu } from "lucide-react";
import { useState } from "react";

const BecomeHost = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex gap-3">
      <button
        onClick={() => setShowModal(true)}
        className="hover:bg-hostBg xl:block hidden py-[11px] px-[12px] rounded-full cursor-pointer text-sm font-semibold"
      >
        Become a host
      </button>
      {showModal && <HostModal onClose={() => setShowModal(false)} />}
      <button className="bg-nav w-10 h-10 rounded-full flex-general bg-navActionHoverBg hover:bg-hoverSearchButton cursor-pointer">
        <Globe className="w-4 h-4" />
      </button>
      <button className="bg-nav w-10 h-10 rounded-full flex-general bg-navActionHoverBg hover:bg-hoverSearchButton cursor-pointer">
        <Menu className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BecomeHost;
