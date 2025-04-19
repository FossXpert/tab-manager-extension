import { useEffect, useState } from "react";

const Popup = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);

  useEffect(() => {
    chrome.tabs.query({}, (results) => {
      setTabs(results);
    });
  }, []);

  return (
    <div className="p-4">
      {tabs.map((tab) => (
        <div key={tab.id}>
          <p>{tab.title}</p>
          <small>{tab.url}</small>
        </div>
      ))}
    </div>
  );
};

export default Popup;
