import { useEffect, useState, useMemo } from "react";
import { getFilteredTabs } from "../../utils/utils";
import { TabCard } from "./TabCard";

const OpenTabs = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    chrome.tabs.query({}, (results) => setTabs(results.reverse())); // Reverse for most recent first
  }, []);

  const filteredTabs = useMemo(() => getFilteredTabs(tabs, searchQuery), [tabs, searchQuery]);

  return (
    <>
      <input
        type="text"
        placeholder="Search tabs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px" }}
      />
      {filteredTabs.map((tab) => (
        <TabCard key={tab.id ?? tab.url} tab={tab} searchQuery={searchQuery} createdTime={Date.now() - 10000} />
      ))}
    </>
  );
};

export default OpenTabs;
