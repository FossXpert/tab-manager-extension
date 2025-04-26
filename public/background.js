chrome.commands.onCommand.addListener((command) => {
    if (command === "open-tabbar") {
      openFloatingWindow();
    }
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "open-popup") {
      openFloatingWindow();
    }
  });
  
  function openFloatingWindow() {
    chrome.windows.create({
      url: "index.html",
      type: "popup",
      width: 450,
      height: 600,
      top: 100,
      left: 100
    });
  }
  