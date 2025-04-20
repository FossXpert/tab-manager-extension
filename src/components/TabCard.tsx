import { memo } from "react";

export const TabCard = memo(({ tab, searchQuery }: { tab: chrome.tabs.Tab; searchQuery: string }) => {
  const highlightMatch = (text: string, color: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} style={{ color, fontWeight: 600 }}>{part}</span> : part
    );
  };

  return (
    <div key={`${tab.id ?? tab.url}`} style={{ display: "flex", alignItems: "center", marginBottom: "8px", padding: "6px", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#ffffff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", transition: "transform 0.2s, box-shadow 0.2s", height: '38px', overflow: "hidden" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {tab.favIconUrl && <img src={tab.favIconUrl} alt="Tab Icon" style={{ width: "24px", height: "24px", marginRight: "12px", borderRadius: "4px", flexShrink: 0 }} />}
      <div style={{ overflow: "hidden" }}>
        <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "14px", color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "calc(94vw - 70px)" }}>
          {highlightMatch(tab.title || "No Title", "#2563eb")}
        </p>
        <small style={{ color: "#6b7280", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block", maxWidth: "calc(94vw - 70px)" }}>
          {highlightMatch(tab.url ?? "", "#10b981")}
        </small>
      </div>
    </div>
  );
});
