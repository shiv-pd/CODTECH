import { useState } from "react";
import SearchBtn from "./SearchBtn";
import WeatherDisplay from "./WeatherDisplay";
import './index.css';

function App() {

  const [weatherData, setWeatherData] = useState(null);

  return(
   <div className="outer-container">
      <div className="main-container">
        <div className="inner-container">

         <SearchBtn  onSearch={setWeatherData}/>
         {weatherData && <WeatherDisplay weather={weatherData} />}

        </div>
      </div>
   </div>
  );
}

export default App
