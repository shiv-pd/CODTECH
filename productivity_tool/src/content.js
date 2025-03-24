chrome.storage.sync.get(["blockSites", "isFirstInstall"], (data) => {
    if(data.isFirstInstall || !data.blockSites || data.blockSites.length === 0 ){
        console.log("no blocked sites available");
        return ;
    }
        document.body.innerHTML= `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white; text-align: center;">
            <h1 style="font-size: 3rem; color: red;"> This site is blocked. Stay focused! </h1>
        </div>
    `;
    
    document.title = "blocked site"
})

chrome.storage.sync.get(["blockSites", "isFirstInstall"], (data) => {
  console.log(data.blockSites);
})

console.log(" Content script executed on:", window.location.hostname);





