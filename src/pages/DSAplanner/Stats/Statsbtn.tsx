import React from "react";

const Statsbtn: React.FC<{
  logo?: React.ReactNode;
  heading?: string;
}> = ({ logo, heading }) => {
  return (
    <>
      <div className="w-[8rem] !pl-2 h-[4rem] bg-neutral-100 rounded-sm flex justify-center items-center  ">
        <div>{logo}</div>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <span className="text-slate-600 font-medium text-[0.9rem]">
            {heading}
          </span>
          <span className="text-slate-500 text-[0.9rem]">
            30 days
          </span>
        </div>
      </div>
    </>
  );
};

export default Statsbtn;
