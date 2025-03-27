console.log("🔥 content.js executed on:", window.location.hostname);

chrome.storage.sync.get(["blockSites", "isFirstInstall"], (data) => {
    if(data.isFirstInstall || !data.blockSites || data.blockSites.length === 0 ){
        console.log("no blocked sites available");
        return ;
    }

    let currentSite = window.location.hostname;
    console.log("Checking against blocked sites list:", data.blockSites);
    
    if (data.blockSites.some(site => currentSite.includes(site))) {
        console.log(`🚫 Blocking: ${currentSite}`);

        document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white; text-align: center;">
            <h1 style="font-size: 3rem; color: red;"> This site is blocked. Stay focused! </h1>
        </div>
        `;

        document.title = "Blocked Site";
    } else {
        console.log("✅ Allowed:", currentSite);
    }
        // console.log("The blocjked sites are",data.blockSites);
       
        // document.body.innerHTML= `
        // <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white; text-align: center;">
        //     <h1 style="font-size: 3rem; color: red;"> This site is blocked. Stay focused! </h1>
        // </div>
        // `;
    
        // document.title = "blocked site"
        
    
        
})


