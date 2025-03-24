console.log("🚀 Background script started!");


let activeTabId = null;
let activeSite = null;
let startTime = null;
let siteTimes = {};

chrome.storage.sync.get(["siteTimes"], (data) => {
  if(data.siteTimes){
    siteTimes = data.siteTimes;
  }
});

function updateTimeSpent(activeSite){
  if(activeSite && startTime){

    let timeSpent = Date.now() - startTime;

    chrome.storage.sync.get(["siteTimes"], (data) => {
      let updatedTimes = data.siteTimes || {};

      updatedTimes[activeSite] = (updatedTimes[activeSite] || 0) + timeSpent;

      chrome.storage.sync.set({siteTimes : updatedTimes}, () =>{
        console.log(`tracked ${updatedTimes[activeSite] / 1000} seconds on ${activeSite}`);
  
      });
     
    })

   

   
  }


}



function trackActiveTab(tabId) {
 

   chrome.tabs.get(tabId, (tab) => {
    if(tab && tab.url){ 
      
      let url = new URL(tab.url);
      let site = url.hostname;

      updateTimeSpent(activeSite);
      
      activeTabId = tabId;
      activeSite = site;
      startTime = Date.now()  //Date.now() returns the current time in milliseconds.

      // console.log(`switched to ${site} `);
      
    }
   })

}
const checkForDistractingWebsite = (tab) => {
  if(!tab.url) return;

  chrome.storage.sync.get("blockSites", (data) => {
    if (data.blockSites && data.blockSites.some(site => new URL(tab.url).hostname.includes(site))){
      chrome.scripting.executeScript({
        target: {tabId : tab.id},
        files: ["content.js"]
      });

      console.log(data.blockSites);
    }else{
      console.log("not a distracting site...");
      
    }

  })
}

chrome.tabs.onActivated.addListener((activeInfo) => {
   
  // chrome.tabs.get(activeInfo.tabId, (tab) => {
  //   // checkForDistractingWebsite(tab);
  // })

   trackActiveTab(activeInfo.tabId);  
})

// changeInfo shows what changed in the tab.

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
   if(tabId === activeTabId && changeInfo.url && changeInfo.status === "complete"){
    checkForDistractingWebsite(tab)
    trackActiveTab(tabId);
   }
   
})


chrome.tabs.onRemoved.addListener((tabId) => {
  if(tabId === activeTabId) {
    updateTimeSpent();
    activeTabId = null;
    activeSite = null;
    startTime = null;
  }
})


chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  if(tabs.length > 0){
    trackActiveTab(tabs[0].id);
  }
})

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed. Clearing old storage...");

  chrome.storage.sync.clear(() => {
    console.log("✅ All stored data cleared!");

    chrome.storage.sync.set({ blockSites: [] },()=>{
      console.log("reset blocksites to an empty array.");

      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if(tab.id){
            chrome.tabs.reload(tab.id);
          }
        });
      })
    })
  });
 
})

chrome.runtime.onSuspend.addListener(() => {
  chrome.storage.sync.clear(() => {
    console.log("clered storage");
    
  })
})