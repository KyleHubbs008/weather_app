const apiKey = "0d8f3e8fd315df68c9b5736f35658e95";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " mph";

    if(data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if(data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if(data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if(data.weather[0].main == "Mist" || "Fog") {
      weatherIcon.src = "images/mist.png";
    } else if(data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if(data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
   
}

searchBtn.addEventListener("click", () => {
  let city = searchBox.value;
  getWeather(city);
});