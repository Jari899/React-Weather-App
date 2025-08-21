const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export async function getWeather(query) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}
