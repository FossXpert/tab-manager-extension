import { memo } from "react";

export const TabCard = memo(({ tab, searchQuery, createdTime, isClosed }: { tab: chrome.tabs.Tab; searchQuery: string; createdTime?: number; isClosed?: boolean }) => {
  const highlightMatch = (text: string, color: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} style={{ color, fontWeight: 600 }}>{part}</span> : part
    );
  };

  const getAgeLabel = () => {
    if (!createdTime) return null;
    const seconds = Math.floor((Date.now() - createdTime) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const handleClose = (e: React.MouseEvent) => { e.stopPropagation(); if (tab.id !== undefined) { chrome.tabs.remove(tab.id); } };
  const handleStash = (e: React.MouseEvent) => { e.stopPropagation(); alert(`Stashed tab: ${tab.title}`); };
  const handleReopen = (e: React.MouseEvent) => { e.stopPropagation(); chrome.sessions.restore(tab.sessionId as string); };

  return (
    <div key={`${tab.id ?? tab.url}`} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "8px",
      padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: "8px",
      backgroundColor: isClosed ? "#f9fafb" : "#ffffff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)", transition: "transform 0.2s", cursor: isClosed ? "default" : "pointer",
      opacity: isClosed ? 0.6 : 1
    }}
      onClick={() => !isClosed && tab.id && chrome.tabs.update(tab.id, { active: true })}
    >
      {tab.favIconUrl && <img src={tab.favIconUrl} alt="Tab Icon" style={{ width: "20px", height: "20px", flexShrink: 0 }} />}
      <div style={{ overflow: "hidden", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <span style={{
          fontSize: "13px", fontWeight: 500,
          fontStyle: isClosed ? "italic" : "normal",
          color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
        }}>
          {highlightMatch(tab.title || "No Title", "#2563eb")}
        </span>
        <span style={{ fontSize: "11px", color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {highlightMatch(tab.url ?? "", "#10b981")}
        </span>
      </div>
      <div>
        {createdTime && <small style={{ fontSize: "11px", color: "#9ca3af", marginRight: "8px" }}>{getAgeLabel()}</small>}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
          {isClosed
            ? <button onClick={handleReopen} style={iconButtonStyle}>♻️</button>
            : <>
                <button onClick={handleClose} style={iconButtonStyle}>❌</button>
                <button onClick={handleStash} style={iconButtonStyle}>📥</button>
              </>
          }
        </div>
      </div>
    </div>
  );
});


const iconButtonStyle: React.CSSProperties = { border: "none", background: "none", cursor: "pointer", fontSize: "14px", padding: "0", color: "#6b7280" };
