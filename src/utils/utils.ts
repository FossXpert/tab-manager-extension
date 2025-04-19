export const getFilteredTabs = (
    tabs: chrome.tabs.Tab[],
    query: string
): chrome.tabs.Tab[] => {
    const lowerQuery = query.toLowerCase();

    return tabs
        .filter(
            (tab) =>
                tab.title?.toLowerCase().includes(lowerQuery) ||
                tab.url?.toLowerCase().includes(lowerQuery)
        )
        .sort((a, b) => {
            const aTitleMatch = a.title?.toLowerCase().includes(lowerQuery) ? 1 : 0;
            const bTitleMatch = b.title?.toLowerCase().includes(lowerQuery) ? 1 : 0;
            const aUrlMatch = a.url?.toLowerCase().includes(lowerQuery) ? 1 : 0;
            const bUrlMatch = b.url?.toLowerCase().includes(lowerQuery) ? 1 : 0;

            return bTitleMatch - aTitleMatch || bUrlMatch - aUrlMatch;
        });
};
