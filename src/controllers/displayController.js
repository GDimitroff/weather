import weatherService from '../services/weatherService';

const displayController = (() => {
  const main = document.querySelector('.main');
  const temp = main.querySelector('.temp');
  const dateOutput = main.querySelector('.date');
  const timeOutput = main.querySelector('.time');
  const conditionOutput = main.querySelector('.condition');
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

  // Default city when the page loads
  let cityInput = 'Kotel';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (search.value.length === 0) {
      // TODO: fix empty search input
      console.log('empty search');
      return;
    }

    cityInput = search.value;
    search.value = '';
    main.style.opacity = '0';
    const data = await weatherService.fetchWeatherData(cityInput);
    temp.innerHTML = data.main.temp;
    main.style.opacity = '1';
  });

  function dayOfTheWeek(day, month, year) {
    const weekday = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    return weekday[new Date(`${day}/${month}/${year}`)].getDay();
  }

  const init = () => {};

  return { init };
})();

export default displayController;
