import React, { useState, useEffect } from "react";
import "./App.css";
import { getLatLon, getWeatherByLatLon } from "./weather";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [city, setCity] = useState("Atlanta, US");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    setWeather(null);
    if (!city) {
      setError("Please enter a location.");
      return;
    }
    setLoading(true);
    try {
      const { lat, lon } = await getLatLon(city);
      const data = await getWeatherByLatLon(lat, lon);
      setWeather(data);
    } catch (err) {
      setError("Unable to fetch weather for that location.");
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
      <SearchBar
        value={city}
        onChange={e => setCity(e.target.value)}
        onSearch={fetchWeather}
        loading={loading}
      />
      {error && <div className="error" style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {weather && !error && (
        <>
          <h2 style={{ marginTop: 20 }}>{weather.name}{weather.sys && weather.sys.country ? `, ${weather.sys.country}` : ''}</h2>
          <WeatherDetails
            temp={weather.main.temp}
            description={weather.weather && weather.weather[0] && weather.weather[0].description}
            humidity={weather.main.humidity}
            wind={weather.wind && weather.wind.speed}
          />
        </>
      )}
    </div>
  );
}

export default App;
