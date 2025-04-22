import { useState } from "react";
import TabsNavigation from "./TabsNavigation";
import OpenTabs from "../Tabs/OpenTabs";
import RecentActivity from "../Recent/RecentActivity";
import GroupedTabs from "../Tabs/GroupedTabs";

const Popup = () => {
  const [activeTab, setActiveTab] = useState<"open" | "recent" | "grouped">("open");

  return (
    <div style={{ width: "450px", padding: "10px", fontFamily: "Segoe UI, sans-serif" }}>
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ transition: "all 1s ease-in-out" }}>
        {activeTab === "open" && <OpenTabs />}
        {activeTab === "recent" && <RecentActivity />}
        {activeTab === "grouped" && <GroupedTabs/>}
      </div>
    </div>
  );
};

export default Popup;
