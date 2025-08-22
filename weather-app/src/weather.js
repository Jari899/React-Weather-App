
const WEATHER_API_KEY = "46dc61ce87c0dba01864591b53da98c1";
const GEOCODE_API_KEY = "46dc61ce87c0dba01864591b53da98c1"; // For demo, using same key. Replace with your OpenCage key if needed.

export async function getLatLon(query) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${GEOCODE_API_KEY}&limit=1`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    return { lat, lon: lng };
  }
  throw new Error("Location not found");
}

export async function getWeatherByLatLon(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Weather not found");
  return await response.json();
}

