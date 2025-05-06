import { useEffect, useState, useMemo } from "react";
import { TabCard } from "../Tabs/TabCard";
import { getFilteredTabs } from "../../utils/utils";

const RecentActivity = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [recentlyClosed, setRecentlyClosed] = useState<chrome.sessions.Session[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch open tabs
    chrome.tabs.query({}, (results) => setTabs(results));

    // Fetch recently closed tabs/sessions
    chrome.sessions.getRecentlyClosed({ maxResults: 10 }, (sessions) => {
      if (chrome.runtime.lastError) {
        console.error("Error fetching recently closed sessions:", chrome.runtime.lastError.message);
        return;
      }
      setRecentlyClosed(sessions);
    });
  }, []);

  const recentlyOpenedTabs = useMemo(() => getFilteredTabs(tabs, searchQuery), [tabs, searchQuery]);

  const filteredRecentlyClosed = useMemo(() => {
    return recentlyClosed.filter((session) => {
      const tab = session.tab;
      return (
        tab &&
        (tab.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tab.url?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [recentlyClosed, searchQuery]);

  return (
    <>
      <input
        type="text"
        placeholder="Search recent..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "96%",
          padding: "8px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          marginBottom: "12px",
        }}
      />

      <h3 style={{ marginBottom: "8px", fontSize: "15px", fontWeight: "600" }}>Recently Opened</h3>
      {recentlyOpenedTabs.length > 0 ? (
        recentlyOpenedTabs.map((tab) => (
          <TabCard key={`opened-${tab.id}`} tab={tab} searchQuery={searchQuery} />
        ))
      ) : (
        <p style={{ fontSize: "14px", color: "#6b7280" }}>No recently opened tabs found.</p>
      )}

      <h3 style={{ margin: "12px 0 8px", fontSize: "15px", fontWeight: "600" }}>Recently Closed</h3>
      {filteredRecentlyClosed.length > 0 ? (
        filteredRecentlyClosed.map((session, index) =>
          session.tab ? (
            <TabCard
              key={`closed-${session.tab.sessionId ?? index}`}
              tab={session.tab as chrome.tabs.Tab}
              searchQuery={searchQuery}
              isClosed={true}
            />
          ) : null
        )
      ) : (
        <p style={{ fontSize: "14px", color: "#6b7280" }}>No recently closed tabs found.</p>
      )}
    </>
  );
};

export default RecentActivity;
