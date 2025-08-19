const API_KEY = "46dc61ce87c0dba01864591b53da98c1";

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
