
document.body.innerHTML= `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white; text-align: center;">
        <h1 style="font-size: 3rem; color: red;">🚫 This site is blocked. Stay focused! 🚀</h1>
    </div>
`;

document.title = "blocked site"


chrome.storage.sync.get("blockedSites", (data) => {
    console.log("fetched blockedSites", data.blockedSites);
    if(!data.blockedSites || data.blockedSites.length === 0){
        console.log("no blocked sites available");
        
    }else{
        console.log("blocking sites: ", data.blockedSites);
        
    }
    
})