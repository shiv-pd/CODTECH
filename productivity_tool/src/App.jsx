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
    chrome.storage.sync.get(["blockSites", "isFirstInstall"], (data) => {
      if (data.isFirstInstall) {
        setIsFirstInstall(true);
        chrome.storage.sync.set({blockSites: [], isFirstInstall: false})
      } 
      if(data.blockSites){
        setBlockSites(data.blockSites);
      }else{
        setBlockSites([]);
      }
    });
  }, []);

  // const showDailyReport = () => {
  //   let date = Date().now;

  // }

  const saveBlockSites = () => {
    console.log("saving blocked sites....");

    const updatedSitesArray = inputValue.split(",").map((site) => site.trim());

    chrome.storage.sync.get(["blockSites", "isFirstInstall"], (data) => {
      if(data.isFirstInstall) {
        data.blockSites = [];
      }
      if(!data.blockSites){
        data.blockSites = [];
      }
      const existingBlockSites = data.blockSites;

      console.log("existing blocksites are : ",existingBlockSites);

      const newSitesArray = [
        ...new Set([...existingBlockSites, ...updatedSitesArray]),
      ];

      chrome.storage.sync.set({ blockSites: newSitesArray }, () => {
        alert("blocked sites saaved! happy productivity!!");
        setBlockSites(newSitesArray);
        setInputValue("");
       
        setIsFirstInstall(false);
        setIsUpdating(false);
         setIsShowingBSites(true);
      });
    });
    
  };

  const updateBlockSites = () => {
    console.log("updating sites....");
    console.log("this is from updateBlockSites..... ");
    setIsUpdating(true);  
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
          {/* <button onClick={() => console.log("Button clicked!")}>Update Distracting websites</button> */}

          </div>
        
         )}
        </div>
      )}
      
    </div>
  );
}

export default App;
