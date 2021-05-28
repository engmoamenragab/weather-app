let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  d = new Date(),
  todayWeather,
  nextDayWeather,
  next2DayWeather;
async function getWeather(city = "London") {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=05529798d3334e4c99333633210205&q=${city}&days=3`),
    responseData = await response.json();
  todayWeather = {
    date: getDayName(responseData.forecast.forecastday[0].date),
    location: responseData.location.name,
    degree: responseData.current.temp_c,
    condition: {
      icon: responseData.current.condition.icon,
      text: responseData.current.condition.text
    },
    windDir: responseData.current.wind_dir,
    humidity: responseData.current.humidity,
    windKph: responseData.current.wind_kph
  };
  nextDayWeather = {
    date: getDayName(responseData.forecast.forecastday[1].date),
    degree: {
      maxDegree: responseData.forecast.forecastday[1].day.maxtemp_c,
      minDegree: responseData.forecast.forecastday[1].day.mintemp_c
    },
    condition: {
      icon: responseData.forecast.forecastday[1].day.condition.icon,
      text: responseData.forecast.forecastday[1].day.condition.text
    },
  };
  next2DayWeather = {
    date: getDayName(responseData.forecast.forecastday[2].date),
    degree: {
      maxDegree: responseData.forecast.forecastday[2].day.maxtemp_c,
      minDegree: responseData.forecast.forecastday[2].day.mintemp_c
    },
    condition: {
      icon: responseData.forecast.forecastday[2].day.condition.icon,
      text: responseData.forecast.forecastday[2].day.condition.text
    },
  };
  displayTodayWeather();
  displayNextDayWeather();
  displayNext2DayWeather();
}
getWeather("Cairo");
//ANCHOR get day name
function getDayName(dateInNumbers) {
  let d = new Date(dateInNumbers),
    x = d.getDay(),
    dayName = "";
  switch (x) {
    case (0):
      dayName = "Sunday";
      break;
    case (1):
      dayName = "Monday";
      break;
    case (2):
      dayName = "Tuesday";
      break;
    case (3):
      dayName = "Wednesday";
      break;
    case (4):
      dayName = "Thrusday";
      break;
    case (5):
      dayName = "Friday";
      break;
    case (6):
      dayName = "Saturday";
      break;
    default:
      break;
  }
  return dayName;
}
//ANCHOR display today weather function
function displayTodayWeather() {
  let today = document.getElementById("today");
  today.innerHTML = `<div class="card text-white">
  <div class="card-header bg-dark d-flex justify-content-between">
    <h5 class="day">${todayWeather.date}</h5>
    <h5 class="date">${d.getDate()} ${months[d.getMonth()]}</h5>
  </div>
  <div class="card-body bg-dark">
    <div class="card-title degree">
      <h6 class="today-city">${todayWeather.location}</h6>
      <h4 class="today-degree">${todayWeather.degree}<sup>o</sup>C</h4>
      <div class="weather-item-icon">
        <img src="https:${todayWeather.condition.icon}" alt="" />
      </div>
    </div>
    <p class="card-text">${todayWeather.condition.text}</p>
    <div class="status-icon">
      <span class="mr-3"><img class="mr-2" src="img/icon-umberella.png" alt="" />${todayWeather.humidity}%</span>
      <span class="mr-3"><img class="mr-2" src="img/icon-wind.png" alt="" />${todayWeather.windKph} km/h</span>
      <span class="mr-3"><img class="mr-2" src="img/icon-compass.png" alt="" />${todayWeather.windDir}</span></div>
    </div>
</div>`;
}
//ANCHOR display next day weather function
function displayNextDayWeather() {
  let nextDay = document.getElementById("nextDay");
  nextDay.innerHTML = `<div class="card text-white">
  <h5 class="card-header bg-secondary text-center">${nextDayWeather.date}</h5>
  <div class="card-body bg-secondary text-center">
    <div class="weather-item-icon">
      <img src="https:${nextDayWeather.condition.icon}" alt="" class="mb-5 p-3" />
    </div>
    <h5 class="card-title degree">${nextDayWeather.degree.maxDegree}<sup>o</sup>C</h5>
    <small>${nextDayWeather.degree.minDegree}<sup>o</sup>C</small>
    <p class="card-text status">${nextDayWeather.condition.text}</p>
  </div>
</div>`;
}
//ANCHOR display next 2 day weather function
function displayNext2DayWeather() {
  let next2Day = document.getElementById("next2Day");
  next2Day.innerHTML = `<div class="card text-white">
  <h5 class="card-header bg-dark text-center">${next2DayWeather.date}</h5>
  <div class="card-body bg-dark text-center">
    <div class="weather-item-icon">
      <img src="https:${next2DayWeather.condition.icon}" alt="" class="mb-5 p-3" />
    </div>
    <h5 class="card-title degree">${next2DayWeather.degree.maxDegree}<sup>o</sup>C</h5>
    <small>${next2DayWeather.degree.minDegree}<sup>o</sup>C</small>
    <p class="card-text status">${next2DayWeather.condition.text}</p>
  </div>
</div>`;
}
//ANCHOR real time search
let searchWeather = document.getElementById("searchWeather");
function realTimeSearch() {
  let searchWord = searchWeather.value;
  if (searchWord.length >= 3) {
    getWeather(searchWord);
  }
}
searchWeather.addEventListener("keyup", realTimeSearch);