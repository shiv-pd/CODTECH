console.log(" Background script started!");

chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed.");
  if (details.reason === "install") {
    chrome.storage.sync.set({ blockSites: [], isFirstInstall: true }, () => {
      console.log("first install detected");
    });
  }
});

let activeTabId = null;
let activeSite = null;
let startTime = null;
let siteTimes = {};

chrome.storage.sync.get(["siteTimes"], (data) => {
  if (data.siteTimes) {
    siteTimes = data.siteTimes;
  }
});

function updateTimeSpent(activeSite) {
  if (activeSite && startTime) {
    let timeSpent = Date.now() - startTime;

    chrome.storage.sync.get(["siteTimes"], (data) => {
      let updatedTimes = data.siteTimes || {};
      updatedTimes[activeSite] = (updatedTimes[activeSite] || 0) + timeSpent;

      chrome.storage.sync.set({ siteTimes: updatedTimes }, () => {
        console.log(`tracked ${updatedTimes[activeSite] / 1000} seconds on ${activeSite}`);
      });
    });
  }
}

function trackActiveTab(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    if (tab && tab.url) {
      let url = new URL(tab.url);
      let site = url.hostname;

      updateTimeSpent(activeSite);

      activeTabId = tabId;
      activeSite = site;
      startTime = Date.now(); 

    }
  });
}

const checkForDistractingWebsite = (tab) => {
  console.log("Function called!");
  if (!tab.url) return;

  chrome.storage.sync.get(["blockSites", "isFirstInstall"], (data) => {
    if (data.isFirstInstall) {
      data.blockSites = [];
    }

    let tabUrl = new URL(tab.url).hostname;
    console.log(` Checking site: ${tabUrl}`);
    console.log(" Current block list:", data.blockSites);

    if (
      data.blockSites &&
      data.blockSites.some((site) => tabUrl.includes(site))
    ) {
      console.log(` Blocking: ${tabUrl}`);
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    } else {
      console.log("Not a blocked site:", tabUrl);
    }
  });
};

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log(" Tab switched: ", activeInfo);

  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.url) {
      checkForDistractingWebsite(tab);
    }
  });

  trackActiveTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Tab Updated: ", changeInfo, tab.url);
  
  if (changeInfo.status === "complete") {
    console.log("Checking for distracting site...");
    checkForDistractingWebsite(tab);
    trackActiveTab(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === activeTabId) {
    updateTimeSpent();
    activeTabId = null;
    activeSite = null;
    startTime = null;
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length > 0) {
    trackActiveTab(tabs[0].id);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.blockSites) {
    console.log("Block list updated:", changes.blockSites.newValue);
  }
});

chrome.runtime.onSuspend.addListener(() => {
  chrome.storage.sync.remove("siteTimes", () => {
    console.log(
      " Cleared site tracking data on suspend, but kept blocked sites."
    );
  });
});

chrome.runtime.setUninstallURL("https://example.com/uninstalled", () => {
  chrome.storage.sync.clear(() => console.log(" Cleared on Uninstall"));
  chrome.storage.local.clear(() => console.log(" Local storage cleared"));
});
