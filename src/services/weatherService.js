const weatherService = (() => {
  const API_KEY = 'e57aaa33be19bda2a68d3e3b0b8f05ee';

  async function getWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&units=metric&appid=${API_KEY}`,
        {
          method: 'GET',
          mode: 'cors',
        }
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
    getWeather,
  };
})();

export default weatherService;
