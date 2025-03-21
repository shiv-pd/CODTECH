const api_KEY = import.meta.env.VITE_API_KEY;


import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import { useState } from "react";


function SearchBtn({onSearch}){
    const warning = document.querySelector('.search-invite');
     
    const [city, setCity] = useState("");
    
    const handleInputChange = (event)=>{        
        setCity(event.target.value);
    }

    function handleInputEnter(e){
        if(e.key === "Enter"){
            e.preventDefault();
            searchCity(); 
        }       
    }
    const searchCity = async () => {
     
        if(city.trim() == "") return;
        console.log("logging from search city", city);

        const api_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_KEY}&units=metric`;

        try {
            const response = await fetch(api_URL);
            const data = await response.json();

            console.log(data);
            
            if(data.cod === 200){
                 onSearch(data);
                 warning.innerHTML = "Search for weather of any city!!";
            }
            else{
               
                warning.innerHTML = `<u>City not found!! </u> <br>
                Search for weather of another city!!`
                console.log("City not found");
            }
            
        } catch (error) {
            console.log("Error fetching weather: ",error);
            
        }
        setCity("");
    }
    


    return(
        <>
    <div className="search-input" >
        <i className="fa-solid fa-magnifying-glass" onClick={searchCity}></i>
        <input type="text" id="city-input" placeholder="Search" value={city} onChange={handleInputChange} onKeyDown={(e) => handleInputEnter(e)}/>
        
    </div>
    
    <div className="search-invite font-change">
        Search for weather of any city!!
    </div>
    </>
    
    );

}

export default SearchBtn;