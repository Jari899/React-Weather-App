import { getWeather } from "./weather.js";

function App() {
  const [weather, setWeather] = React.useState(null);
  const [search, setSearch] = React.useState("New York, US");
  const [loading, setLoading] = React.useState(false);

  async function fetchWeather(query) {
    setLoading(true);
    const data = await getWeather(query);
    setWeather(data);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchWeather(search); // Load default city
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim() !== "") {
      fetchWeather(search);
    }
  }

  return (
    <div className="app-container">
      <h1>Weather App</h1>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Enter city, state, country"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading weather...</p>}

      {weather && !loading && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="temperature">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="description">
            {weather.weather[0].description}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
