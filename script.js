const searchBox = document.getElementById("search-box");
const search = document.getElementById("search-box-input");
const searchBtn = document.getElementById("search-box-btn");
const navSearch = document.getElementById("search")
const weatherImage = document.getElementById("weather-image");

navSearch.addEventListener("click", () => {
    if(searchBox.style.visibility == "visible") {
        searchBox.style.visibility = "hidden";
        // console.log(searchBox.style.visibility);
    } else {
        searchBox.style.visibility = "visible";
        // console.log(searchBox.style.visibility);
    }
})

searchBox.addEventListener("keyup", key => {
    if(key.key == "Enter") checkWeather(search.value);
})

document.getElementById("right-1").addEventListener("click", () => {
    if(document.getElementById("week").style.display == "block") {
        document.getElementById("main-thing").style.display = "block";
        document.getElementById("week").style.display = "none";
    } else {
        document.getElementById("main-thing").style.display = "none";
        document.getElementById("week").style.display = "block";
    }
})

document.getElementById("back-arrow").addEventListener("click", () => {
    if(document.getElementById("week").style.display == "block") {
        document.getElementById("main-thing").style.display = "block";
        document.getElementById("week").style.display = "none";
    } else {
        document.getElementById("main-thing").style.display = "none";
        document.getElementById("week").style.display = "block";
    }
})




const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?';
const options = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '0e3f0be1cdmsha878e2883e6262cp184b7djsn82494a7bd097',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

async function checkWeatherTomorrow(city) {
    const response = await fetch(url + "q=" + city + "&days=7", options);
    let data = await response.json();
    console.log(data)
    
    document.getElementById("location").innerText = data.location.name + ",\n" + data.location.country;
    
    document.getElementById("temp").innerText = Math.round(data.forecast.forecastday[2].day.avgtemp_c);
    
    document.querySelectorAll(".humidity").forEach(element => {
        element.innerText = data.forecast.forecastday[1].day.avghumidity + " %";
    });
    document.querySelectorAll(".wind").forEach(element => {
        element.innerText = data.forecast.forecastday[1].day.avgvis_km + " km/h";
    });
    document.querySelectorAll(".weather-2").forEach(element => {
        element.innerText = data.forecast.forecastday[1].day.condition.text;
    });
    document.querySelectorAll(".current-day").forEach(element => {
        element.innerText = data.forecast.forecastday[1].hour[1].time;
    });

    let array = document.querySelectorAll(".hourly");
    
    for(let i = 0; i<24; i++) {
        array[i].innerText = Math.round(data.forecast.forecastday[1].hour[i].temp_c) + " °";
    }
}
    
async function checkWeather(city) {
    const response = await fetch(url + "q=" + city + "&days=7", options);
    let data = await response.json();
    console.log(data)
    
    document.querySelectorAll(".location").forEach(element => {
        element.innerText = data.location.name + ",\n" + data.location.country;
    });
    document.querySelectorAll(".temp").forEach(element => {
        element.innerText = Math.round(data.current.temp_c);
    });
    document.querySelectorAll(".humidity").forEach(element => {
        element.innerText = data.current.humidity + "%";
    });
    document.querySelectorAll(".wind").forEach(element => {
        element.innerText = data.current.wind_kph + " km/h";
    });
    document.querySelectorAll(".weather-2").forEach(element => {
        element.innerText = data.current.condition.text;
    });
    document.querySelectorAll(".current-day").forEach(element => {
        element.innerText = data.forecast.forecastday[0].date;
    });
    
    document.getElementById("temp-2").innerText = Math.round(data.forecast.forecastday[2].day.avgtemp_c);
    document.getElementById("temp-tomorrow").innerText = Math.round(data.forecast.forecastday[1].day.avgtemp_c);
    document.getElementById("wind-tomorrow").innerText = data.forecast.forecastday[1].day.avgvis_km + " km/h";
    document.getElementById("humidity-tomorrow").innerText = data.forecast.forecastday[1].day.avghumidity + " %";
    if(data.forecast.forecastday[1].day.daily_chance_of_rain == 0) {
        document.getElementById("rain-tomorrow").innerText = "no rain";
    } else {
        document.getElementById("rain-tomorrow").innerText = "a chance of rain";
    }
    
    let array = document.querySelectorAll(".hourly");
    
    for(let i = 0; i<24; i++) {
        array[i].innerText = String(Math.round(data.forecast.forecastday[0].hour[i].temp_c)) + " °";
    }

    console.log(data.forecast.forecastday[0].day.condition.text);
    
    if(String(data.forecast.forecastday[0].day.condition.text) == "Sunny") {
        weatherImage.src = "./images/sunny.svg"
    }
    
}

searchBtn.addEventListener("click", () => {
    if(search.value != "") checkWeather(search.value);
})

const tomorrow = document.getElementById('tomorrow');

tomorrow.addEventListener("click", () => {
    if(search.value == "" || search.value == null) {
        checkWeatherTomorrow("tashkent");
    } else {
        checkWeatherTomorrow(search.value)
    }
    tomorrow.style.color = "black"
    today.style.color = "#D6996B"
})

const today = document.getElementById('today');

today.addEventListener("click", () => {
    if(search.value == "" || search.value == null) {
        checkWeather("tashkent");
    } else {
        checkWeather(search.value);
    }
    today.style.color = "black"
    tomorrow.style.color = "#D6996B"
})

checkWeather("Tashkent");

setInterval(() => {
    checkWeather("Tashkent")
}, (1000*3600));
