import {  useState } from "react";
import DSAdashboardSidebar from "./DashboardSidebar";
import DSAhome from "../DSAplanner/DSAHomepage/DSAhome";
import StatPage from "../DSAplanner/Stats/StatPage";
import Dpp from "../DSAplanner/DPP/Dpp";
import { useParams } from "react-router-dom";
import QuizzStats from "../Quizz/QizzDashboard/QuizzStats";
import QuizzSummary from "../Quizz/QizzDashboard/QuizzSummary";

function DSAdashboard() {
  const params = useParams();
  const ParamsObj = params;

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Profile";
  });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const renderContent = (tab: string) => {
    switch (tab) {
      case "Profile":
        return <DSAhome heading={tab} />;
      case "Statistics":
        return <StatPage heading={tab} />;
      case "Daily Practice Plan":
        return <Dpp heading={tab} />;
      case "QuizzStats":
        return <QuizzStats heading={tab} />;
      case "QuizzSummary":
        return <QuizzSummary heading={tab} />;
      default:
        return <></>
    }
  };
  

  return (
    <section className="relative flex w-full h-screen bg-neutral-100 overflow-hidden">
      {/* Sidebar */}
      <DSAdashboardSidebar
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        paramsVal={ParamsObj.id || ""}
      />

      {/* Content area with scrolling */}
      <div className="scrollcontainer bg-neutral-50 flex-1 h-full overflow-y-auto">
        {renderContent(activeTab)}
      </div>
    </section>
  );
}

export default DSAdashboard;
