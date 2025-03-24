// App.jsx

import { useEffect, useState } from "react";
import './index.css';

function App() {
  const [blockSites, setBlockSites] = useState([]);
  const [isFirstInstall, setIsFirstInstall] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isShowingBSites , setIsShowingBSites] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get("blockSites", (data) => {
      if (!data.blockSites || data.blockSites.length === 0) {
        setIsFirstInstall(true);

        chrome.storage.sync.set({blockSites: []}, ()=> {
          console.log("blocked sites cleared!!!!!!!!!");
          
        })
      } else {
        setBlockSites(data.blockSites);
      }
    });
  }, []);

  const saveBlockSites = () => {
    console.log("saving blocked sites....");

    const updatedSitesArray = inputValue.split(",").map((site) => site.trim());

    chrome.storage.sync.get("blockSites", (data) => {
      const existingBlockSites = data.blockSites || [];

      const newSitesArray = [
        ...new Set([...existingBlockSites, ...updatedSitesArray]),
      ];

      chrome.storage.sync.set({ blockSites: newSitesArray }, () => {
        alert("blocked sites saaved! happy productivity!!");
        setBlockSites(newSitesArray);
        setIsFirstInstall(false);
        setIsUpdating(false);
        setIsShowingBSites(true);
      });
    });
    
  };

  const updateBlockSites = () => {
    console.log("updating sites....");
    setIsUpdating(true);  //React detects the state change in isUpdating, and it automatically re-renders the component 
  };

  return (
    <div className="main-div">
      {isFirstInstall || isUpdating  ? (
        <div>
          <h3>{isFirstInstall ? " Welcome! Enter distracting sites: " : "add more sites!!"}</h3>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. yputube.com , facebook.com"
            style={{ width: "100%", height: "60px", marginBottom: "10px" }}
          />
          <button onClick={saveBlockSites}>{isFirstInstall ? "save" : "update"}</button>
        </div>
      ) : (
        <div>
         {isShowingBSites ? (
          <div>
            <h3>Blocked sites: </h3>
             <ul>
              {blockSites.length > 0 ? (
                blockSites.map((site, index) => <li key={index}>{site}</li>)
              ) : (
                <p>no blocked sites yet</p>
              )}
             </ul>
          </div>
           
         ):(
          
          <div>
            <h3 style={{ width: "15rem", marginBottom: "2rem" }}>Stay focused! 🚀</h3>
            <button onClick={updateBlockSites}>Update Distracting websites</button>
          </div>
        
         )}
        </div>
      )}
      
    </div>
  );
}

export default App;
