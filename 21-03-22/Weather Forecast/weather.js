let CITY = "" 

// Event Listeners
document.querySelector("input").addEventListener("focusout",handleGetWeather);

// Event Handlers
async function handleGetWeather(event){
    CITY = event.target.value;

    const newURL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=d78bb19274d9db42f93a3ef5c77f7b4a`;

    const response = await fetch(newURL)
                    .then(res => res.json())
                    .then(res => res);
    // console.log(response);
    
    const currentTemp = document.querySelector(".current .temp h1");
    currentTemp.textContent = `${Math.round(response.main.temp / 10)}°c`;

    const diffTemps = document.querySelector(".current .hi-low h1");
    diffTemps.textContent = `${Math.round(response.main.temp_min / 10)}°c / ${Math.round(response.main.temp_max / 10)}°c`;

    document.querySelector("#city").textContent = response.name;

    document.querySelector("#date").textContent =new Date().toJSON().slice(0,10).replace(/-/g,'/');
}


