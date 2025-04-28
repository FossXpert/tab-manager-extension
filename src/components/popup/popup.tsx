import { useEffect, useState } from "react";
import TabsNavigation from "./TabsNavigation";
import OpenTabs from "../Tabs/OpenTabs";
import RecentActivity from "../Recent/RecentActivity";
import GroupedTabs from "../Tabs/GroupedTabs";

const Popup = () => {
  const [activeTab, setActiveTab] = useState<"open" | "recent" | "grouped">("open");
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  const toggleFloatingWindow = () => {
    chrome.runtime.sendMessage({ action: "open-popup" });
    setIsFloatingOpen(prev => !prev);
  };

  useEffect(() => {
    // If user manually closes floating window, reset state
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "floating-closed") {
        setIsFloatingOpen(false);
      }
    });
  }, []);

  return (
    <div style={{ width: "450px", padding: "10px", fontFamily: "Segoe UI, sans-serif" }}>
      <button
        onClick={toggleFloatingWindow}
        style={{
          marginBottom: "10px",
          padding: "8px 12px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {isFloatingOpen ? "Close Floating Window" : "Open Floating Window"}
      </button>

      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{
        transform: activeTab === "open" ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.3s ease",
      }}>
        {activeTab === "open" && <OpenTabs />}
        {activeTab === "recent" && <RecentActivity />}
        {activeTab === "grouped" && <GroupedTabs />}
      </div>
    </div>
  );
};

export default Popup;
