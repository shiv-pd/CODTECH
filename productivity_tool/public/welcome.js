document.getElementById("saveBtn").addEventListener("click", () => {
    let input = document.getElementById("sitesInput").value;
    let sites = input.split(",").map(site => site.trim());

    chrome.storage.sync.set({ blockedSites: sites }, () => {
        alert("Blocked sites saved!");
        window.close(); // Close the popup
    });
});