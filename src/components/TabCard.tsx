import { memo } from "react";

export const TabCard = memo(({ tab, searchQuery }: { tab: chrome.tabs.Tab; searchQuery: string }) => {
  
    const highlightMatch = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part)
        ? <mark key={i} style={{ padding: 0, color:'#2b0582'}}>{part}</mark>
        : part
    );
  };

  return (
    <div key={`${tab.id ?? tab.url}`} style={{ display: "flex", alignItems: "center", marginBottom: "8px", padding: "6px", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#ffffff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", transition: "transform 0.2s, box-shadow 0.2s" }}
     onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")} 
     onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      {tab.favIconUrl && <img src={tab.favIconUrl} alt="Tab Icon" style={{ width: "24px", height: "24px", marginRight: "12px", borderRadius: "4px" }} />}
      <div>
        <p style={{ margin: "0 0 8px", fontWeight: "600", fontSize: "16px", color: "#374151" }}>
          {highlightMatch(tab.title || "No Title")}
        </p>
        <small style={{ color: "#6b7280", fontSize: "14px", wordBreak: "break-word" }}>
          {highlightMatch(tab.url ?? "")}
        </small>
      </div>
    </div>
  );
});
