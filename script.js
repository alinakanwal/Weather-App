
document.getElementById("searchbtn").addEventListener("click", function () {
    const city = document.getElementById("inputsearch").value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    fetchWeather(city);
});

window.onload = function () {
    fetchWeather("Multan");
};

function fetchWeather(city) {
    const apiKey = "66546a4a6beeeda263b89e7dd651ad95";

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  
 const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

   
    fetch(currentWeatherUrl)
 .then(function (response) {
  return response.json();
 })
 .then(function (data) {
         
 document.getElementById("city").textContent = data.name;
 document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°`;
 document.getElementById("condition").textContent = data.weather[0].description;
 document.getElementById("wind").textContent = `${data.wind.speed} mph`;
 document.getElementById("humidity").textContent = `${data.main.humidity}%`;
 document.getElementById('current-temp').textContent = `${data.main.temp}°C`;
 document.getElementById('feels-like').textContent = `Feels like ${data.main.feels_like}°C`;
 document.getElementById('hourly-condition').textContent = data.weather[0].description;
  document.getElementById("wind2").textContent = `${data.wind.speed} mph`;
 document.getElementById("humidity2").textContent = `${data.main.humidity}%`;

let sunrise = new Date(data.sys.sunrise * 1000);
let sunset = new Date (data.sys.sunset * 1000);
document.getElementById("sunset").textContent = sunset.toLocaleTimeString();
document.getElementById("sunrise").textContent = sunrise.toLocaleTimeString();


const hours = new Date().getHours();
 let greeting;
 if (hours < 12) {
  greeting = "Good Morning";
 } else if (hours < 18) {
 greeting = "Good Afternoon";
 } else {
    greeting = "Good Evening";
 }
 document.getElementById("greetmrng").textContent = greeting;
 })
 .catch(function (error) {
  console.error("Error fetching the current weather data:", error);
   alert('Failed to retrieve data. Please try again.');
 });

   

    fetch(forecastUrl)
.then(function (response) {
   return response.json();
 })
.then(function (data) {
         
 const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

 for (let i = 0; i < 5; i++) {
 const forecastIndex = i * 8;
 const item = data.list[forecastIndex];
  const date = new Date(item.dt * 1000);
 const day = daysMap[date.getDay()];



 document.querySelector(`#day${i + 1} p:nth-child(1)`).textContent = day;
 document.querySelector(`#day${i + 1} p:nth-child(2)`).textContent = `${Math.round(item.main.temp)}°`;
  document.querySelector(`#day${i + 1} p:nth-child(3)`).textContent = item.weather[0].main;
            }
        })
      .catch(function (error) {
     console.error("Error fetching the 5-day forecast data:", error);
 });



    setInterval(myTimer, 1000);

    function myTimer() {
        const date = new Date();
        document.getElementById("time").innerHTML = date.toLocaleTimeString();
    }
}









