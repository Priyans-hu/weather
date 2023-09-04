async function fetchData() {
    const url = 'https://foreca-weather.p.rapidapi.com/current/102643743?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '59e4d2219cmsh3745dbd77bd1859p19ef47jsnc35bc3c47490',
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchData();
