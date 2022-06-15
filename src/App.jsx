import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d47aaf5a7ca8357e87b2d06f96316705`;
  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('');
    }
  }
  
  return (
  <div className="app">
    <div className="search">
      <input 
      value = {location}
      onChange = {event => setLocation(event.target.value)}
      onKeyPress = {searchLocation} 
      placeholder = 'Enter Location'
      type = 'text' />
    </div>
    {data.name ? 
      <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          <h1>
            {data.main ? data.main.temp.toFixed() : null}&deg;C
            {data.weather ? <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" /> : null}
          </h1>
        </div>
        <div className="description">
          <p>{data.weather ? data.weather[0].main : null}</p>
        </div>
      </div>
      <div className="bottom">
        <div className="feels">
          <p className="bold">{data.main ? data.main.feels_like.toFixed() : null}&deg;C</p>
          <p>Fells Like</p>
        </div>
        <div className="humidity">
          <p className="bold">{data.main ? data.main.humidity : null}%</p>
          <p>Humidity</p>
        </div>
        <div className="wind">
          <p className="bold">{data.wind ? data.wind.speed : null}mph</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div> 
    : null
  }
  </div>)
}

export default App;
