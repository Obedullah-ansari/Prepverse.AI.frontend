import React from "react";

const Mybutton: React.FC<{
  title?: string;
  activeBtn?: string;
  icon?: React.ReactNode;
  TabClick?: (type: string) => void;
  ris: boolean;
}> = ({ title = "Profile", activeBtn, icon, TabClick, ris }) => {
  return (
    <>
      <div
        onClick={() => TabClick && TabClick(title)}
        className={`w-full max-w-[95%] rounded-sm !p-2   ${
          activeBtn === title
            ? "bg-amber-200/50"
            : "bg-transparent hover:bg-slate-200 transition-all duration-100"
        } flex justify-center items-center gap-3 cursor-pointer `}
      >
        <div className={`w-[20%]  ${ris ? "!pl-0" : "!pl-3"}  `}>
          {icon}
        </div>

        <div
          className={`w-[80%] ${ris ? "hidden" : " block"}  text-nowrap !pr-3`}
        >
          <span
            className={`text-[0.9rem] font-semibold ${
              activeBtn === title ? "text-amber-600" : "text-slate-500"
            }`}
          >
            {title}
          </span>
        </div>
      </div>
    </>
  );
};

export default Mybutton;
