import { useEffect, useState } from "react";

const Popup = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);

  useEffect(() => {
    chrome.tabs.query({}, (results) => {
      setTabs(results);
    });
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f3f4f6",
        color: "#111827",
        minHeight: "",
        width: "max-content",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "16px",
          color: "#1f2937",
        }}
      >
        Open Tabs
      </h1>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            padding: "6px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          {tab.favIconUrl && (
            <img
              src={tab.favIconUrl}
              alt="Tab Icon"
              style={{
                width: "24px",
                height: "24px",
                marginRight: "12px",
                borderRadius: "4px",
              }}
            />
          )}
          <div>
            <p
              style={{
                margin: "0 0 8px",
                fontWeight: "600",
                fontSize: "16px",
                color: "#374151",
              }}
            >
              {tab.title || "No Title"}
            </p>
            <small
              style={{
                color: "#6b7280",
                fontSize: "14px",
                wordBreak: "break-word",
              }}
            >
              {tab.url}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Popup;
