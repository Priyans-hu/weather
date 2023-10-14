const submit = document.getElementById("submit");
const UvIndex = document.getElementById("uv");
const Humidity = document.getElementById("humidity");
const cityName = document.getElementById("cityName");
const CurrTemp = document.getElementById("currTemp");
const Condition = document.getElementById("status");
const WindSpeed = document.getElementById("windSpd");
const FeelsLike = document.getElementById("feelsLike");
const SearchBox = document.getElementById("SearchBox");
const Visibility = document.getElementById("visibility");
const RegionName = document.getElementById("regionName");
const Precipitation = document.getElementById("precip");
const WindDirection = document.getElementById("windDir");
const LastUpdated = document.getElementById("lastUpdated");
const CountryName = document.getElementById("countryName");
const WeatherDataContainer = document.getElementById("weatherDataContainer");

function update(result, city) {
    WeatherDataContainer.style.display = "initial";
    cityName.innerText = city;
    CurrTemp.innerText = result.current.temp_c + "°";
    Humidity.innerText = result.current.humidity + "%";
    Condition.innerText = result.current.condition.text;
    Precipitation.innerText = result.current.precip_mm + " mm";
    FeelsLike.innerText = result.current.feelslike_c + "°C";
    UvIndex.innerText = result.current.uv;
    LastUpdated.innerText = result.current.last_updated;
    WindSpeed.innerText = result.current.wind_kph;
    WindDirection.innerText = result.current.wind_dir;
    Visibility.innerText = result.current.vis_km;
    RegionName.innerText = result.location.region;
    CountryName.innerText = result.location.country;
}

function updateOnError(city){
    cityName.innerText = "Invalid city";
    RegionName.innerText = city;
    CountryName.innerText = "No data found for this";
    WeatherDataContainer.style.display = "none";
}

function updateBG(temp, cond, isDay){
    const body = document.body;
    body.classList.remove("sunny", "rainy", "cloudy", "winter", "night");

    if(isDay == 0){
        body.classList.add("night");
    } else if (cond.includes("sunny") || temp > 33) {
        body.classList.add("sunny");
    } else if (cond.includes("rain")) {
        body.classList.add("rainy");
    } else if (cond.includes("cloud")) {
        body.classList.add("cloudy");
    } else if (temp <= 18) {
        body.classList.add("winter");
    } else {
        body.classList.add("sunny");
    }
}

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "59e4d2219cmsh3745dbd77bd1859p19ef47jsnc35bc3c47490",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
};

async function fetchData(city) {
    const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=" + city;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        // calling the update function to update all the values in webpage
        update(result, city);
        updateBG(result.current.temp_c, result.current.condition.text, result.current.is_day);
    } catch (error) {
        updateOnError(city);
        console.error(error);
    }
}

fetchData("new delhi");

submit.addEventListener("click", (e) => {
    e.preventDefault();
    fetchData(SearchBox.value);
    cityName.innerText = SearchBox.value;
    SearchBox.value = null;
});

const autoRefresh = setInterval(() => {
    fetchData(cityName.innerText);
}, 30 * 60 * 1000);
