interface Props {
    activeTab: "open" | "recent" | "grouped";
    setActiveTab: (tab: "open" | "recent" | "grouped") => void;
  }
  
  
  const TabsNavigation = ({ activeTab, setActiveTab }: Props) => {
    const tabs: { key: "open" | "recent" | "grouped"; label: string }[] = [
      { key: "open", label: "Open Tabs" },
      { key: "recent", label: "Recent Activity" },
      { key: "grouped", label: "Grouped" }
    ];
  
    return (
      <div style={{ display: "flex", marginBottom: "12px", borderBottom: "2px solid #d1d5db" }}>
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              backgroundColor: "transparent",
              fontWeight: activeTab === key ? 600 : 400,
              borderBottom: activeTab === key ? "3px solid #2563eb" : "3px solid transparent",
              color: activeTab === key ? "#2563eb" : "#6b7280",
              transition: "all 1s",
              cursor: "pointer"
            }}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };
  
  
  export default TabsNavigation;
  