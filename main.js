// xoá API lúc xong xui

// select Element
const form = document.querySelector("#weather__form");
const cityInput = document.querySelector("#weather__input");
const errorNot = document.querySelector(".errorDisplay");
const weatherDisplay = document.querySelector(".weatherDisplay");

// API
const apiKey = "60baa7d1b947445441469180877c9dce";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    try {
      const weaTherData = await getWeatherData(city);
      displayWeather(weaTherData);
      cityInput.value = "";
      cityInput.focus();
    } catch (error) {
      console.log(error);
      showError(error);
    }
  } else {
    showError("Please enter your city");
  }
});

// GET DATA of Weather
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Can not fetch the city");
  }
  return response.json();
}
// DISPLAY WEATHER
function displayWeather(data) {
  weatherDisplay.innerHTML = "";
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  const emoji = getEmoji(id);
  weatherDisplay.innerHTML = `<h1 class="cityDisplay">${city}</h1>
<p class="temptDisplay">${Math.floor(temp - 273.15)}°C</p>
      <p class="humidityDisplay">Humidity: ${humidity}%</p>
      <p class="descDisplay">${description.toUpperCase()}</p>
      <p class="emojiDisplay">${emoji}</p>`;
  weatherDisplay.style.display = "flex";
}
// GET EMOJI
function getEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 500:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🍃";
    case weatherId >= 800:
      return "🌞";
  }
}
// Error
function showError(msg) {
  errorNot.innerHTML = msg;
  errorNot.classList.add("error-trans");
  setTimeout(() => {
    errorNot.classList.remove("error-trans");
  }, 2000);
}
