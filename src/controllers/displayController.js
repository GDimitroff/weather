import weatherService from '../services/weatherService';

const displayController = (() => {
  const main = document.querySelector('.main');
  const temp = main.querySelector('.temp');
  const dateOutput = main.querySelector('.date');
  const timeOutput = main.querySelector('.time');
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
  const btn = main.querySelector('.submit');

  let location;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (search.value.length === 0) {
      // TODO: fix empty search input
      console.log('empty search');
      return;
    }

    const weatherData = await weatherService.getWeather(search.value);
    location = weatherData.name;
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

  const renderWeatherData = (weatherData) => {
    console.log(location);
    console.log(weatherData);

    nameOutput.innerHTML = weatherData.name + `, ${weatherData.sys.country}`;
    cloudOutput.innerHTML = weatherData.weather[0].description;
    temp.innerHTML = weatherData.main.temp.toString().slice(0, 2) + '°';
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
