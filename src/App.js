import { useEffect, useState } from "react";
import coldBg from "./assets/cold.jpg";
import hotBg from "./assets/hot.jpg";
import Description from "./components/Description";
import { getFormatWeatherData } from "./components/weatherService.js";

function App() {
  const[bg,setBg]=useState(hotBg);
  const [city, setCity] = useState("Daund");
  const [weather, setweather] = useState(null);
  const [units, setUnits] = useState("metric");
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormatWeatherData(city, units);
      setweather(data);
      console.log(data);

      const threshold = units ==='metric'?20:60;
      if(data.temp<=threshold) setBg(coldBg)
      else setBg(hotBg);
    };
    fetchWeatherData(units, city);
  }, []);
  const handelUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCesius = currentUnit === "c";
    button.innerText = isCesius ? "°F" : "°C";
    setUnits(isCesius ? "metric" : "imperial");
    console.log(button.innerText);
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  return (
    <div  style={{justifyContent:'center',alignItems:'center'}}>
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section-inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter Your City.."
              />
              <button onClick={(e) => handelUnitsClick(e)}>°F</button>
            </div>
            <div className="section section-temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcons" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}° ${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            {/*bottom description*/}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
    
</div>
  );
}

export default App;
