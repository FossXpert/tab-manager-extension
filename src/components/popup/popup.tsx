import { useEffect, useState, useMemo } from "react";
import { getFilteredTabs } from "../../utils/utils";
import { TabCard } from "../TabCard";



const Popup = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    chrome.tabs.query({}, (results) => {
      setTabs(results);
    });
  }, []);

  const filteredTabs = useMemo(() => getFilteredTabs(tabs, searchQuery), [tabs, searchQuery]);

  return (
    <div style={{ padding: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f3f4f6", color: "#111827", width: "450px", boxSizing: "border-box" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" }}>
        Open Tabs
      </h1>
      <input
        type="text"
        placeholder="Search tabs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "16px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }}
      />
      {filteredTabs.map((tab) => (
        <TabCard key={`${tab.id ?? tab.url}`} tab={tab} searchQuery={searchQuery}/>
      ))}
    </div>
  );
};

export default Popup;
