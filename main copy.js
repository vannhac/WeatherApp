// select element
const form = document.querySelector("#weather__form");
const weatherInput = document.querySelector("#weather__input");
const notification = document.querySelector(".errorDisplay");
const weatherDisplay = document.querySelector(".weatherDisplay");
// VAR
const apiKey = "60baa7d1b947445441469180877c9dce";
// Event
/*
in: input value, keyvalue (bắt sự kiện) 
out: thông tin chi tiết về thành phố mình muốn
ans 
kiểm tra value nó có rỗng ko, nếu có thì dùng hàm lỗi
rồi tiếp tục tạo url key để mình lấy thông tin
try .. catch để khi hàm try ra lỗi thì sẽ hiện ở catch ha
nếu đúng thì mình cần 1 hàm lấy thông tin thời tiết
hàm thứ 2 là từ thông tin đó in thời gian
 */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = weatherInput.value.trim();
  if (city) {
    try {
      let weatherResponse = await getWeatherData(city);
      showWeather(weatherResponse);
      weatherInput.value = "";
      weatherInput.focus();
    } catch (error) {
      showNotification(error);
    }
  } else {
    showNotification("Form's empty");
  }
});
async function getWeatherData(city) {
  // bắt được response
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  // kiểm tra nó oke ko
  if (!response.ok) {
    throw new Error("Cannot Fetch the city");
  } else {
    return await response.json();
  }

  // trả về kết quả bằng json
}
function showWeather(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  const emoji = getEmoji(id);

  weatherDisplay.innerHTML = `<h1 class="cityDisplay">${city}</h1>
      <p class="temptDisplay">${Math.floor(temp - 273.15)}°C</p>
      <p class="humidityDisplay">Humidity: ${humidity}%</p>
      <p class="descDisplay">${description}</p>
      <p class="emojiDisplay">${emoji}</p>`;
  weatherDisplay.style.display = "flex";
}

// EMOJI
function getEmoji(id) {
  switch (true) {
    case id >= 200 && id < 300:
      return "⛈️";
    case id >= 300 && id < 500:
      return "🌧️";
    case id >= 500 && id < 600:
      return "🌧️";
    case id >= 600 && id < 700:
      return "❄️";
    case id >= 700 && id < 800:
      return "🍃";
    case id >= 800:
      return "🌞";
  }
}

// Error
function showNotification(msg) {
  notification.innerHTML = msg;
  notification.classList.add("error-trans");
  setTimeout(() => {
    notification.classList.remove("error-trans");
  }, 2000);
}
