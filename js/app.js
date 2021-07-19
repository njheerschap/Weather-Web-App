const searchBar = document.getElementById('search-field');

function generateCurrentWeatherHTML(oneCallData) {
    const weatherDescription = document.getElementById('description')
    const currentIcon = document.getElementById('main-icon');
    const currentTemp = document.getElementById('main-temp');
    const weather = oneCallData.current.weather[0].description;
    const weatherIcon = oneCallData.current.weather[0].main
    const temperature = Math.round(oneCallData.current.temp)

    //Display current weather conditions 
    weatherDescription.innerText = weather

    //Display current weather icon 
    currentIcon.classList = 'wi current-icon'
    if(weatherIcon === 'Thunderstorm'){
        currentIcon.classList += ' wi-thunderstorm';
    } else if(weatherIcon === 'Clouds') {
        currentIcon.classList += ' wi-cloudy';
    } else if(weatherIcon === 'Drizzle' || weatherIcon === 'Rain') {
        currentIcon.classList += ' wi-rain';
    } else if(weatherIcon === 'Snow') {
        currentIcon.classList += ' wi-snow';                  
    } else if(weatherIcon === 'Clear') {
        currentIcon.classList += ' wi-day-sunny'; 
    } else {
        currentIcon.classList += ' wi-alien';
    }

    //Display current temperature 
    currentTemp.innerText = temperature+'\xB0'+' F'
} 

function showTime(date, time) {
    const currentDate = document.getElementById('current-date');
    const currentTime = document.getElementById('current-time');
    currentDate.innerText = date;
    currentTime.innerText = time;
}

function convertTime(unixTimeStamp){
    let date = new Date(unixTimeStamp * 1000)
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    let minute = date.getMinutes();
    let twelveHour = hour;
    let amPM = 'AM'
    if(twelveHour >= 12) {
        twelveHour = twelveHour - 12;
        amPM = 'PM'
    }
    if(twelveHour === 0) {
        twelveHour = 12
    }
    if (minute < 10) {
        minute = '0'+minute
    }
    const fullDate = month+' '+day+' '+year+' EST';
    const fullTime = twelveHour+':'+minute;
    showTime(fullDate, fullTime);
}

function createLabels() {
    const detials = document.getElementById('details-wrapper');
    detials.innerHTML = `
        <div class="weather-details">
            <div class="weather-detail-icon" id="detail-icon">
                <i class="wi wi-thermometer"></i>
            </div>
            <div class="weather-detail-info">
                <div class="details-label" id="label">Feels Like</div>
                <div class="details-data" id="feels-like"></div>
            </div> 
        </div>
        <div class="weather-details">
            <div class="weather-detail-icon" id="detail-icon">
                <i class="wi wi-humidity"></i>
            </div>
            <div class="weather-detail-info">
                <div class="details-label" id="label">Humidity</div>
                <div class="details-data" id="humidity"></div>
            </div> 
        </div>
        <div class="weather-details">
            <div class="weather-detail-icon" id="detail-icon">
                <i class="wi wi-rain"></i>
            </div>
            <div class="weather-detail-info">
                <div class="details-label" id="label">Chance of Precip</div>
                <div class="details-data" id="precip"></div>
            </div> 
        </div>
        <div class="weather-details">
            <div class="weather-detail-icon" id="detail-icon">
                <i class="wi wi-strong-wind"></i>
            </div>
            <div class="weather-detail-info">
                <div class="details-label" id="label">Wind Speed</div>
                <div class="details-data" id="wind-speed"></div>
            </div> 
        </div>
    `
}

function getDetails(oneCallData) {
    const feelsLike = document.getElementById('feels-like')
    const humidity = document.getElementById('humidity')
    const precipitation = document.getElementById('precip')
    const windSpeed = document.getElementById('wind-speed')
    const feel = Math.round(oneCallData.current.feels_like);
    const humid = Math.round(oneCallData.current.humidity);
    const precip = oneCallData.daily[0].pop * 100;
    const wind = oneCallData.current.wind_speed;

    feelsLike.innerText = feel+'\xB0'+' F';
    humidity.innerText = humid+'%';
    precipitation.innerText = precip+'%';
    windSpeed.innerText = wind+'mph';   
}

function showDays() {
    const date = new Date();
    const day = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = daysOfWeek[day];
    const daysDiv = document.querySelectorAll('.day')
    for (let i = day; i < 7; i++) {
        daysDiv[i].innerText = daysOfWeek[i + 1]
    }
}

function sevenDayForecast(oneCallData) {
    const high = document.querySelectorAll('.high');
    const low = document.querySelectorAll('.low');
    const daily = oneCallData.daily;
    for (let i = 0; i < high.length; i++) {
    console.log(daily[i].temp.max)
    high[i].innerText = Math.round(daily[i].temp.max)+'\xB0'+' F';
    low[i].innerText = Math.round(daily[i].temp.min)+'\xB0'+' F';

    }
}


function showWeather() {
    const city = searchBar.value; 
    const coordinateURL = 'https://api.openweathermap.org/data/2.5/weather?q='+`${city}`+'&appid=25fd488fa4e24097b62cda762320b0c9'
    
    function getJSON(url, callback) {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', url);
        xhr.onload = () => {
            if(xhr.status === 200) {
                let data = JSON.parse(xhr.response);
                return callback(data);
            }
        }
        xhr.send();
    }
    
    function getCoordinateData() {
        getJSON(coordinateURL, oneCall);
    }
    
   function oneCall(data){
        const longitude = data.coord.lon;
        const latitude = data.coord.lat
        const oneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+`${latitude}`+'&lon='+`${longitude}&units=imperial`+'&exclude={part}&appid=25fd488fa4e24097b62cda762320b0c9';
        function getOneCallJSON(url, callback) {
            let xhr = new XMLHttpRequest;
            xhr.open('GET', url);
            xhr.onload = () => {
                if(xhr.status = 200) {
                    let oneCallData = JSON.parse(xhr.response);
                    return callback(oneCallData);
                } 
            }
            xhr.send();
        }

        function getWeatherInfo() {
            getOneCallJSON(oneCallURL, generateHTML)
        }

        function generateHTML(oneCallData) {
            let unix = oneCallData.current.dt;
            convertTime(unix);
            generateCurrentWeatherHTML(oneCallData);
            getDetails(oneCallData);
            sevenDayForecast(oneCallData);
        }

        getWeatherInfo();

    }

    getCoordinateData();
}

function cityHTML() {
    const city = searchBar.value
    const cityField = document.getElementById('city');
    cityField.innerText = '';
    cityField.innerText = city;
}


document.addEventListener('search', e => {
    cityHTML();
    createLabels();
    showDays();
    showWeather();
    searchBar.value = '';
})

