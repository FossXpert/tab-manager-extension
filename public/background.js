let floatingWindowId = null;

chrome.commands.onCommand.addListener((command) => {
  if (command === "open-tabbar") {
    toggleFloatingWindow();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "open-popup") {
    toggleFloatingWindow();
  }
});

function toggleFloatingWindow() {
  if (floatingWindowId !== null) {
    chrome.windows.remove(floatingWindowId, () => {
      floatingWindowId = null;
    });
  } else {
    chrome.windows.create({
      url: "index.html",
      type: "popup",
      width: 450,
      height: 600,
      top: 100,
      left: 100
    }, (newWindow) => {
      floatingWindowId = newWindow.id;
    });
  }
}
