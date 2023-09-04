const submit = document.getElementById("submit");
const SearchBox = document.getElementById("SearchBox");
const cityName = document.getElementById("cityName");
const CurrTemp = document.getElementById("currTemp");
const FeelsLike = document.getElementById("feelsLike");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '59e4d2219cmsh3745dbd77bd1859p19ef47jsnc35bc3c47490',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

async function fetchData(city) {    
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        CurrTemp.innerText = result.temp + '°';
        FeelsLike.innerText = result.feels_like;
    } catch (error) {
        console.error(error);
    }
}

fetchData('delhi');

submit.addEventListener("click", (e) => {
    e.preventDefault();
    fetchData(SearchBox.value);
    cityName.innerText = SearchBox.value;
    SearchBox.value = null;
})