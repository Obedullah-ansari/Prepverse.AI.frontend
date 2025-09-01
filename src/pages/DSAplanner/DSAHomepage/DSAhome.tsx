import React from "react";
import EditProfile from "./EditProfile";
import PorfileCom from "./PorfileCom";
import Subscribe from "./Subscribe";

const DSAhome: React.FC<{
  heading?: string;
}> = ({ heading }) => {
  return (
    <>
      <div className="relative w-full h-full  ">
        {/* Top bar */}
        <div className="w-full sticky top-0 bg-neutral-50 z-[100] left-0 border-b border-slate-200 flex max-h-[10%]   h-full">
          <div className="w-[40%] h-full flex justify-start !pl-5 items-end">
            <span className="text-3xl font-medium">{heading}</span>
          </div>
          <div className="w-[60%] h-full "></div>
        </div>

        {/* Main content */}
        <div
          className="w-full sm:h-auto  overflow-y-auto max-sm:h-auto md:h-[90%]  grid gap-6 !p-3
             grid-cols-1
             md:grid-cols-2 md:grid-rows-4"
        >
          <div className=" bg-neutral-100 rounded-lg shadow-sm w-full max-sm:h-[50vh] sm:h-[50vh] overflow-hidden md:h-auto md:col-span-1 md:row-span-2 !p-2">
            <PorfileCom />
          </div>

          <div className="  w-full h-auto md:col-span-1 md:row-span-4 overflow-hidden">
            <EditProfile />
          </div>
          <div className=" row-span-2 rounded-lg shadow-sm w-full overflow-hidden">
            <Subscribe />
          </div>
        </div>
      </div>
    </>
  );
};

export default DSAhome;
