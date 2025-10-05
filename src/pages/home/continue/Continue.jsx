import { ChevronRight } from "lucide-react";

const Continue = () => {
  return (
    <>
      {/* Continue searching for homes in Rome */}
      <div className=" flex-general z-10   gap-4 border-b border-borderOne  h-[80px]">
        <div className="flex gap-3">
          <h1 className="text-navText font-bold ">
            Continue searching for homes in Rome{"   "}
            <span className="ml-2 text-navNormalText font-normal">
              Nov 10 -14 3 guests
            </span>
          </h1>
          <span className="bg-navActionHoverBg rounded-full flex-general w-6 h-6 ">
            <ChevronRight className=" w-4 h-4" />
          </span>
        </div>
        <div className="relative rounded-xl">
          <img
            className=" shadow-xl bg-gray-600  border-2 z-20 relative  border-white  rounded-xl w-[50px] h-[50px] "
            src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=700&auto=format&fit=crop"
            alt=""
          />
          <img
            className=" border-2 z-10 absolute top-1.5 right-1 border-white rounded-xl w-[50px] h-[50px] -rotate-5"
            src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=700&auto=format&fit=crop"
            alt=""
          />
          <img
            className="  border-2 z-10 absolute top-1.5 left-1 border-white rounded-xl w-[50px] h-[50px] rotate-5"
            src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=700&auto=format&fit=crop"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Continue;
