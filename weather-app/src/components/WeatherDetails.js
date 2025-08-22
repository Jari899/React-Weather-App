import React from "react";

function WeatherDetails({ temp, description, humidity, wind }) {
  return (
    <div className="weather-container">
      <div className="weather-main">
        <div className="weather-temp">{Math.round(temp)}°C</div>
        <div className="weather-desc">{description}</div>
      </div>
      <div className="weather-details">
        <div>Humidity: {humidity}%</div>
        <div>Wind: {wind} m/s</div>
      </div>
    </div>
  );
}

export default WeatherDetails;
