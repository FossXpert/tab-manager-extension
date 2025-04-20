export const getFilteredTabs = (
    tabs: chrome.tabs.Tab[],
    query: string
  ): chrome.tabs.Tab[] => {
    const lowerQuery = query.toLowerCase();
  
    const score = (text: string) => {
      if (text.startsWith(lowerQuery)) return 2;
      if (text.includes(lowerQuery)) return 1;
      return 0;
    };
  
    const filtered = tabs.filter(
      (tab) =>
        tab.title?.toLowerCase().includes(lowerQuery) ||
        tab.url?.toLowerCase().includes(lowerQuery)
    );
  
    // If searching, sort by score
    if (query.trim()) {
      return filtered.sort((a, b) => {
        const aTitle = a.title?.toLowerCase() ?? "";
        const bTitle = b.title?.toLowerCase() ?? "";
        const aUrl = a.url?.toLowerCase() ?? "";
        const bUrl = b.url?.toLowerCase() ?? "";
  
        const aScore = score(aTitle) + score(aUrl);
        const bScore = score(bTitle) + score(bUrl);
  
        return bScore - aScore;
      });
    }
  
    // No search: return tabs in reverse order (last opened first)
    return [...tabs].sort((a, b) => b.index - a.index);
  };
  