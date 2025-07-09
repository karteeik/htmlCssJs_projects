let city = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let temprature = document.querySelector(".temprature");
let min = document.querySelector(".min");
let max = document.querySelector(".max");
let forcast = document.querySelector(".forecast");
let feel_like = document.querySelector(".feel_like");
let humi = document.querySelector(".humidity");
let wnd = document.querySelector(".wind");
let presure = document.querySelector(".pressure");
let searchCity = document.querySelector(".weather_header");

const GetCountry = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
  const currDate = new Date(dt * 1000);
  console.log(currDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  console.log(formatter);

  const formateDate = formatter.format(currDate);
  return formateDate;
};

let inputCity = "Surat";

searchCity.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = document.getElementById("city_name");
  inputCity = cityName.value;
  console.log(cityName.value);

  GetWeatherData();

  cityName.value = "";
});

const GetWeatherData = async () => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=d3423d02fc3c0ed20f2edb046ecd5f40`;
  try {
    const res = await fetch(weatherURL);
    const data = await res.json();

    if (data.cod !== 200) {
      alert(`City not found: ${data.message}`);
      return;
    }

    const { main, name, weather, wind, sys, dt } = data;
    city.innerHTML = `${name}, ${GetCountry(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    forcast.innerHTML = weather[0].main;
    temprature.innerHTML = `${main.temp}&#176`;
    min.innerHTML = `Min : ${main.temp_min.toFixed()}&#176`;
    max.innerHTML = `Max : ${main.temp_max.toFixed()}&#176`;
    feel_like.innerHTML = `${main.feels_like.toFixed()}&#176`;
    humi.innerHTML = `${main.humidity}%`;
    wnd.innerHTML = `${wind.speed} m/s`;
    presure.innerHTML = `${main.pressure} hpa`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", GetWeatherData());
