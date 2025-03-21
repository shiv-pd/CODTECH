import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function WeatherDisplay({ weather }) {
   if (!weather) return;
    
  const {
    name,
    main: { temp, humidity },
    weather: [{ id, main: weatherMain, description }],
    wind: { speed },
  } = weather;

   const getWeatherImage = (id) => {
       if(id < 232) return "./src/assets/thunderstorm.png";
       if(id < 321 ) return "./src/assets/drizzle.png";
       if(id < 531 ) return "./src/assets/rain.png";
       if(id < 622) return "./src/assets/snow.png";
       if (id< 781) return  "./src/assets/atmosphere.png";
       if(id == 800) return "./src/assets/clear.png";
       else return "./src/assets/clouds.png";
       
   }

   const dateParts = new Date().toLocaleDateString("en-GB", {
    weekday: "short",  
    day: "2-digit",    
    month: "long"      
  }).split(" "); 
  
  const formattedDate = `${dateParts[0]}, ${dateParts[1]} ${dateParts[2]}`;

  return (
    <div className="weather-grid">
      <div className="div-item">
        <div className="city-name"><i className="fa-solid fa-location-dot"></i> {name}</div>
        <div className="md-text">{formattedDate}</div>
      </div>
      <div className="div-item">
        <div><img src= {getWeatherImage(id)}  className="weather-img" />  </div>
        <div className="temp-container ">
          <div className="temp-val">{temp} °C</div>{description}
        </div>
      </div>
      <div className="div-item">
        <div className="extra-content">
          <img className="small-img" src="./src/assets/humidity1.png" />
          <div className="md-text">Humidity<br /> <b>{humidity}%</b>
          </div>
        </div>
        <div className="extra-content">
          <img className="small-img" src="./src/assets/yt-wind.png" />
          <div className="md-text">Wind speed<br /> <b>{speed}m/s</b>
          </div>
        </div>
      </div>
      {/* <div className="corousel">
        <div className="card">
          <div className="date"></div>
          <div className="img"></div>
          <div className="temp-inner"></div>
        </div>
      </div> */}
    </div>
  );
}

export default WeatherDisplay;
