import weatherService from '../services/weatherService';
import { format } from 'date-fns';

const displayController = (() => {
  const main = document.querySelector('.main');
  const temp = main.querySelector('.temp');
  const dateOutput = main.querySelector('.date-time');
  const nameOutput = main.querySelector('.name');
  const icon = main.querySelector('#icon');
  const cloudOutput = main.querySelector('.cloud');
  const feelsLikeOutput = main.querySelector('.feels-like');
  const chanceRainOutput = main.querySelector('.chance-rain');
  const humidityOutput = main.querySelector('.humidity');
  const windOutput = main.querySelector('.wind');
  const sunriseOutput = main.querySelector('.sunrise');
  const sunsetOutput = main.querySelector('.sunset');
  const form = main.querySelector('#location-input');
  const search = main.querySelector('.search');

  let location;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const weatherData = await weatherService.getWeather(search.value);
    location = weatherData.city;
    search.value = '';

    main.style.animation = '0.2s fade-off forwards';
    main.addEventListener(
      'animationend',
      (e) => {
        renderWeatherData(weatherData);
        main.style.animation = '0.2s fade-in forwards';
      },
      { once: true }
    );

    updateStorage();
  });

  const loadStorage = () => {
    return JSON.parse(localStorage.getItem('location'));
  };

  const updateStorage = () => {
    localStorage.setItem('location', JSON.stringify(location));
  };

  const convertIcon = (iconId) => {
    switch (iconId) {
      case '01d':
        return 'fa-sun';
      case '01n':
        return 'fa-moon';
      case '02d':
        return 'fa-cloud-sun';
      case '02n':
        return 'fa-cloud-moon';
      case '03d':
        return 'fa-cloud-sun';
      case '03n':
        return 'fa-cloud-moon';
      case '04d':
      case '04n':
        return 'fa-cloud';
      case '09d':
      case '09n':
        return 'fa-cloud-showers-heavy';
      case '10d':
        return 'fa-cloud-sun-rain';
      case '10n':
        return 'fa-cloud-moon-rain';
      case '11d':
      case '11n':
        return 'fa-cloud-bolt';
      case '13d':
      case '13n':
        return 'fa-snowflake';
      case '50d':
      case '50n':
        return 'fa-smog';
      default:
    }

    return false;
  };

  const renderWeatherData = (weatherData) => {
    console.log(weatherData);

    temp.innerHTML = weatherData.current.temp + '°';
    icon.className = `fa-solid ${convertIcon(weatherData.current.icon)}`;
    cloudOutput.innerHTML = weatherData.current.tempDescription;
    nameOutput.innerHTML = weatherData.city + `, ${weatherData.country}`;
    dateOutput.innerHTML = format(
      weatherData.current.time,
      'EEEE d MMMM yyyy | H:mm'
    );
    feelsLikeOutput.innerHTML = weatherData.current.feelsLike + '°';
    chanceRainOutput.innerHTML = weatherData.current.chanceOfRain + '%';
    humidityOutput.innerHTML = weatherData.current.humidity + '%';
    windOutput.innerHTML = weatherData.current.windSpeed + ' km/h';
    sunriseOutput.innerHTML = format(weatherData.current.sunriseTime, 'HH:mm');
    sunsetOutput.innerHTML = format(weatherData.current.sunsetTime, 'HH:mm');
  };

  const init = async () => {
    if (!localStorage.getItem('location')) {
      location = 'kotel';
      updateStorage();
    } else {
      location = loadStorage();
    }

    const weatherData = await weatherService.getWeather(location);
    renderWeatherData(weatherData);
    main.style.animation = '0.5s fade-in forwards';
  };

  return { init };
})();

export default displayController;
