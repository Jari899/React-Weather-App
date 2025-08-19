import React, { useState, useEffect } from "react";
import "./App.css";
import { getWeather } from "./weather";

function App() {
  const [city, setCity] = useState("Atlanta, US");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    setWeather(null);
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    try {
      const data = await getWeather(city);
      if (data) {
        setWeather(data);
      } else {
        setError("Unable to fetch weather data.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Weather Logo" style={{ width: 80, marginBottom: 10 }} />
      <h1>React Weather App</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') fetchWeather(); }}
          disabled={loading}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>
      {error && <div className="error" style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {weather && !error && (
        <>
          <h2 style={{ marginTop: 20 }}>{weather.name}{weather.sys && weather.sys.country ? `, ${weather.sys.country}` : ''}</h2>
          <div className="weather-container">
            <div className="weather-main">
              <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather-desc">{weather.weather && weather.weather[0] && weather.weather[0].description}</div>
            </div>
            <div className="weather-details">
              <div>Humidity: {weather.main.humidity}%</div>
              <div>Wind: {weather.wind && weather.wind.speed} m/s</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
