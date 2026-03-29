// F2
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "RENAME_TAB_REQUEST") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "RENAME_TAB",
          tabId: tab.id
        });
      }
    });
  }
});

// Alt+R
chrome.commands.onCommand.addListener((command) => {
  if (command === "rename-tab") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "RENAME_TAB",
          tabId: tab.id
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SET_TAB_NAME" && typeof msg.tabId === "number") {
    chrome.storage.local.get("titles", (data) => {
      const titles = (data.titles || {}) as Record<string | number, string>;
      titles[msg.tabId as string | number] = msg.title;
      chrome.storage.local.set({ titles });
    });
  }

  if (msg.type === "GET_TAB_NAME" && sender.tab && typeof sender.tab.id === "number") {
    chrome.storage.local.get("titles", (data) => {
      const titles = (data.titles || {}) as Record<string | number, string>;
      sendResponse(titles[sender.tab!.id as string | number] || null);
    });

    return true;
  }
});
