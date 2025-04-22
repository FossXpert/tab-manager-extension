import { useEffect, useState, useMemo } from "react";
import { TabCard } from "../Tabs/TabCard";

const GroupedTabs = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    chrome.tabs.query({}, (results) => setTabs(results));
  }, []);

  const groupedByDomain = useMemo(() => {
    const map: Record<string, chrome.tabs.Tab[]> = {};
    tabs.forEach(tab => {
         const domain = new URL(tab.url ?? "").hostname;
        map[domain] = [...(map[domain] || []), tab];
     });
    return map;
  }, [tabs]);

  const filteredGroupedTabs = useMemo(() => {
    const lower = searchQuery.toLowerCase();
    return Object.entries(groupedByDomain).filter(([domain, tabs]) =>
      domain.toLowerCase().includes(lower) || tabs.some(tab =>
        tab.title?.toLowerCase().includes(lower) || tab.url?.toLowerCase().includes(lower)
      )
    );
  }, [groupedByDomain, searchQuery]);

  return (
    <>
      <input
        type="text"
        placeholder="Search grouped..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px" }}
      />
      {filteredGroupedTabs.map(([domain, tabs]) => (
        <div key={domain} style={{ marginBottom: "16px" }}>
          <div style={{ fontWeight: 600, fontSize: "13px", color: "#374151", marginBottom: "4px" }}>{domain}</div>
          {tabs.map((tab) => (
            <TabCard key={tab.id} tab={tab} searchQuery={searchQuery} />
          ))}
        </div>
      ))}
    </>
  );
};

export default GroupedTabs;
