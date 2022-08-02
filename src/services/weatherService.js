const weatherService = (() => {
  const API_KEY = 'e57aaa33be19bda2a68d3e3b0b8f05ee';

  async function fetchWeatherData(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&units=metric&appid=${API_KEY}`,
        { mode: 'cors' }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    fetchWeatherData,
  };
})();

export default weatherService;
