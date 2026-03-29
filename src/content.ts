let currentTitle: string | null = null;
let currentTabId: number | null = null;

function getTitle(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_TAB_NAME" }, resolve);
  });
}

function overrideTitle() {
  const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, "title");
  if (!descriptor) return;

  Object.defineProperty(document, "title", {
    get() {
      return descriptor.get!.call(document);
    },
    set(value: string) {
      if (currentTitle) {
        descriptor.set!.call(document, currentTitle);
      } else {
        descriptor.set!.call(document, value);
      }
    }
  });
}

function observeTitle() {
  const titleEl = document.querySelector("title");
  if (!titleEl) return;

  const observer = new MutationObserver(() => {
    if (currentTitle && document.title !== currentTitle) {
      document.title = currentTitle;
    }
  });

  observer.observe(titleEl, { childList: true });
}

function startLoop() {
  setInterval(() => {
    if (currentTitle && document.title !== currentTitle) {
      document.title = currentTitle;
    }
  }, 300);
}

async function init() {
  const saved = await getTitle();

  if (saved) {
    currentTitle = saved;
    document.title = saved;
  }
}

function triggerRename() {
  const label = chrome.i18n.getMessage("rename_tab");
  const newName = prompt(label);

  if (!newName || !currentTabId) return;

  currentTitle = newName;

  chrome.runtime.sendMessage({
    type: "SET_TAB_NAME",
    title: newName,
    tabId: currentTabId
  });

  document.title = newName;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "RENAME_TAB") {
    currentTabId = msg.tabId;
    triggerRename();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "F2") {
    chrome.runtime.sendMessage({ type: "RENAME_TAB_REQUEST" });
  }
});

overrideTitle();
observeTitle();
startLoop();
init();
