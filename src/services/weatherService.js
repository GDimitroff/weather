import { addSeconds, fromUnixTime } from 'date-fns';

// TODO: handle errors

const weatherService = (() => {
  const API_KEY = 'e57aaa33be19bda2a68d3e3b0b8f05ee';

  async function processData(data) {
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], {
      type: 'region',
    });

    const { locationData, forecastData } = data;

    const processedData = {
      city: locationData.name,
      country: regionNamesInEnglish.of(locationData.sys.country),
      current: {
        temp: Math.round(forecastData.current.temp),
        feelsLike: Math.round(forecastData.current.feels_like),
        humidity: forecastData.current.humidity,
        clouds: forecastData.current.clouds,
        windSpeed: forecastData.current.wind_speed,
        tempDescription: forecastData.current.weather[0].description,
        weatherDescription: forecastData.current.weather[0].main,
        icon: forecastData.current.weather[0].icon,
        chanceOfRain: Math.round(forecastData.daily[0].pop * 100),
        sunriseTime: addSeconds(
          fromUnixTime(forecastData.current.sunrise),
          forecastData.timezone_offset + new Date().getTimezoneOffset() * 60
        ),
        sunsetTime: addSeconds(
          fromUnixTime(forecastData.current.sunset),
          forecastData.timezone_offset + new Date().getTimezoneOffset() * 60
        ),
        time: addSeconds(
          new Date(),
          forecastData.timezone_offset + new Date().getTimezoneOffset() * 60
        ),
      },
      daily: [],
    };

    for (let i = 1; i <= 7; i += 1) {
      processedData.daily[i - 1] = {
        date: addSeconds(
          fromUnixTime(forecastData.daily[i].dt),
          forecastData.timezone_offset
        ),
        icon: forecastData.daily[i].weather[0].icon,
        tempDescription: forecastData.daily[i].weather[0].description,
        dayTemp: Math.round(forecastData.daily[i].temp.day),
        nightTemp: Math.round(forecastData.daily[i].temp.night),
        windSpeed: forecastData.daily[i].wind_speed,
      };
    }

    return processedData;
  }

  async function getForecast(locationData) {
    const { coord } = locationData;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=metric&appid=${API_KEY}`,
        {
          method: 'GET',
          mode: 'cors',
        }
      );

      const forecastData = await response.json();
      return processData({ locationData, forecastData });
    } catch (error) {
      return { cod: error.name, message: error.message };
    }
  }

  async function getWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
        {
          method: 'GET',
          mode: 'cors',
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const locationData = await response.json();
      return getForecast(locationData);
    } catch (error) {
      return { cod: error.name, message: error.message };
    }
  }

  return {
    getWeather,
  };
})();

export default weatherService;
