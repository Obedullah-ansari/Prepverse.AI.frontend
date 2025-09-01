import React from "react";

import {
  Calendar,
  LayoutDashboard,
  ChartNoAxesCombined,
  ChartColumnBigIcon,
  LogOut,
  Eclipse,
  BookOpenText,
  ChartPie
} from "lucide-react";
import Mybutton from "./Mybutton";
import { useMediaQuery } from "react-responsive";

const DSAdashboardSidebar: React.FC<{
  activeTab?: string;
  handleTabClick?: (tab: string) => void;
  paramsVal: string;
}> = ({ activeTab, handleTabClick, paramsVal }) => {
  const risponsive = useMediaQuery({
    query: "(max-width: 900px)",
  });

  return (
    <>
      <div
        className={`shadow-md  h-full flex flex-col  justify-start items-center  gap-4 ${
          risponsive ? "w-[4rem]" : "w-[12rem]"
        } `}
      >
        <div className="w-full flex justify-center items-center !mb-16 !mt-5 ">
          <span>Logo</span>
        </div>
        <div className="text-start w-full !pl-3 ">
          <span className=" text-[0.8rem] text-slate-500  font-medium">
            {risponsive ? "WS" : "WORKSPACE"}
          </span>
        </div>
        <Mybutton
          ris={risponsive}
          title="Profile"
          activeBtn={activeTab}
          TabClick={handleTabClick}
          icon={
            <LayoutDashboard
              className={` w-5 h-5 ${
                activeTab === "Profile" ? "text-amber-600" : "text-slate-500"
              }`}
            />
          }
        />
        {paramsVal === "dsa" && (
          <>
            <Mybutton
              ris={risponsive}
              title="Daily Practice Plan"
              activeBtn={activeTab}
              TabClick={handleTabClick}
              icon={
                <Calendar
                  className={` w-5 h-5 ${
                    activeTab === "Daily Practice Plan"
                      ? "text-amber-600"
                      : "text-slate-500"
                  }`}
                />
              }
            />

            <Mybutton
              ris={risponsive}
              title="Statistics"
              activeBtn={activeTab}
              TabClick={handleTabClick}
              icon={
                <ChartNoAxesCombined
                  className={` w-5 h-5 ${
                    activeTab === "Statistics"
                      ? "text-amber-600"
                      : "text-slate-500"
                  }`}
                />
              }
            />

            <Mybutton
              ris={risponsive}
              title="customize"
              activeBtn={activeTab}
              TabClick={handleTabClick}
              icon={
                <ChartColumnBigIcon
                  className={` w-5 h-5 ${
                    activeTab === "customize"
                      ? "text-amber-600"
                      : "text-slate-500"
                  }`}
                />
              }
            />
          </>
        )}
        {paramsVal === "quizz" && (
          <>
            <Mybutton
              ris={risponsive}
              title="QuizzSummary"
              activeBtn={activeTab}
              TabClick={handleTabClick}
              icon={
                <BookOpenText
                  className={` w-5 h-5 ${
                    activeTab === "QuizzSummary"
                      ? "text-amber-600"
                      : "text-slate-500"
                  }`}
                />
              }
            />
            <Mybutton
              ris={risponsive}
              title="QuizzStats"
              activeBtn={activeTab}
              TabClick={handleTabClick}
              icon={
                <ChartPie
                  className={` w-5 h-5 ${
                    activeTab === "QuizzStats"
                      ? "text-amber-600"
                      : "text-slate-500"
                  }`}
                />
              }
            />
          </>
        )}

        <div className="w-full flex   flex-col justify-center h-full items-center  gap-4 ">
          <div className="text-start w-full !pl-3 ">
            <span className=" text-[0.8rem] text-slate-500 font-medium">
              {risponsive ? "SE" : "SETTINGS"}
            </span>
          </div>

          <Mybutton
            ris={risponsive}
            title="Sign Out"
            activeBtn={activeTab}
            TabClick={handleTabClick}
            icon={
              <LogOut
                className={` w-5 h-5 ${
                  activeTab === "Sign Out" ? "text-amber-600" : "text-slate-500"
                }`}
              />
            }
          />
          <Mybutton
            ris={risponsive}
            title="Dark Mode"
            activeBtn={activeTab}
            TabClick={handleTabClick}
            icon={
              <Eclipse
                className={` w-5 h-5 ${
                  activeTab === "Dark Mode"
                    ? "text-amber-600"
                    : "text-slate-500"
                }`}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default DSAdashboardSidebar;
