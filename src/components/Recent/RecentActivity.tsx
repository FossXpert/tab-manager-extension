import { useEffect, useState, useMemo } from "react";
import { TabCard } from "../Tabs/TabCard";
import { getFilteredTabs } from "@/utils/utils";

const RecentActivity = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [recentlyClosed, setRecentlyClosed] = useState<chrome.sessions.Session[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    chrome.tabs.query({}, (results) => setTabs(results));
    chrome.sessions.getRecentlyClosed({ maxResults: 10 }, (sessions) => setRecentlyClosed(sessions));
  }, []);

  const recentlyOpenedTabs = useMemo(() => getFilteredTabs(tabs, searchQuery), [tabs, searchQuery]);
  

  return (
    <>
      <input
        type="text"
        placeholder="Search recent..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px" }}
      />

      <h3 style={{ marginBottom: "8px", fontSize: "15px", fontWeight: "600" }}>Recently Opened</h3>
      {recentlyOpenedTabs.map((tab) => (
        <TabCard key={`opened-${tab.id}`} tab={tab} searchQuery={searchQuery} />
      ))}

      <h3 style={{ margin: "12px 0 8px", fontSize: "15px", fontWeight: "600" }}>Recently Closed</h3>
      {recentlyClosed.map((session, index) =>
        session.tab ? (
          <TabCard key={`closed-${session.tab.sessionId ?? index}`} tab={session.tab as chrome.tabs.Tab} searchQuery={searchQuery} isClosed={true}/>
        ) : null
      )}
    </>
  );
};

export default RecentActivity;
