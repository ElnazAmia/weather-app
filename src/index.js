let now = new Date();
let date = document.querySelector(".current-day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let time = document.querySelector(".current-time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
date.innerHTML = `${day}`;
time.innerHTML = `${hours}:${minutes}`;

function showTemp(response) {
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#searchedCity").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "f0ff64afa8957098b6eda5ad96796c19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2f90638258a6a7e0494f0c77992c86c3&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showCity(event) {
  event.preventDefault();

  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let searchButton = document.querySelector("#search-city-form");
searchButton.addEventListener("submit", showCity);

function showPosition(position) {
  console.log(position);
  let apiKey = "f0ff64afa8957098b6eda5ad96796c19";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationBtn = document.querySelector("#current-location-button");
locationBtn.addEventListener("click", showLocation);

search("Berlin");
