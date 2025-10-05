import navOne from "/src/assets/nav/nav-1.png";
import navTwo from "/src/assets/nav/nav-2.avif";
import navThree from "/src/assets/nav/nav-3.avif";
const NavTabs = ({ className }) => {
  return (
    <div className={`flex gap-[35px] mb-6 ${className}`}>
      <div className="border-b-[3px] border-[#222222] max-w-max pb-[9px] flex items-center gap-4">
        <img className="navImageSize" src={navOne} alt="" />
        <h4 className="text-sm text-navText font-bold">Homes</h4>
      </div>
      <div className="navSecond group">
        <div className="relative transition-transform group-hover:scale-110 ">
          <img className="navImageSize" src={navTwo} alt="" />
          <span className="new">NEW</span>
        </div>
        <h4 className="navTitle">Experiences</h4>
      </div>
      <div className="navSecond group gap-3">
        <div className="relative transition-transform group-hover:scale-110">
          <img className="navImageSize" src={navThree} alt="" />
          <span className="new">NEW</span>
        </div>
        <h4 className="navTitle">Services</h4>
      </div>
    </div>
  );
};

export default NavTabs;
