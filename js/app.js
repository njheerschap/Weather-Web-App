function runWeatherApp() {

    const searchBar = document.getElementById('search-field');
    const searchIcon = document.getElementById('search-icon');
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    const detials = document.getElementById('details-wrapper');
    const weatherDescription = document.getElementById('description');
    const currentDate = document.getElementById('current-date');
    const currentTime = document.getElementById('current-time');
    const high = document.querySelectorAll('.high');
    const low = document.querySelectorAll('.low');
    const forecastIcon = document.querySelectorAll('#forecast-icon-display');
    const date = new Date();
    const day = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysDiv = document.querySelectorAll('.day');
    const currentIcon = document.getElementById('main-icon');
    const currentTemp = document.getElementById('main-temp');
    const cityField = document.getElementById('city');
    
    
    
    
    
    
    
    function generateCurrentWeatherHTML(oneCallData) {
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
        const today = daysOfWeek[day];
        for (let i = day; i < day + 7; i++) {
            daysDiv[i - day].innerText = daysOfWeek[i]
        }
    }
    
    function sevenDayForecast(oneCallData) {
        const daily = oneCallData.daily;
        for (let i = 0; i < high.length; i++) {
            high[i].innerText = Math.round(daily[i].temp.max)+'\xB0'+' F';
            low[i].innerText = Math.round(daily[i].temp.min)+'\xB0'+' F';
            
        }
    }
    
    function sevenDayIcon(oneCallData) {
        for(let i = 0; i < forecastIcon.length; i++) {
            const icon = oneCallData.daily[i].weather[0].main;
            forecastIcon[i].classList = 'wi'
            if(icon === 'Thunderstorm'){
                forecastIcon[i].classList += ' wi-thunderstorm';
            } else if(icon === 'Clouds') {
                forecastIcon[i].classList += ' wi-cloudy';
            } else if(icon === 'Drizzle' || icon === 'Rain') {
                forecastIcon[i].classList += ' wi-rain';
            } else if(icon === 'Snow') {
                forecastIcon[i].classList += ' wi-snow';                  
            } else if(icon === 'Clear') {
                forecastIcon[i].classList += ' wi-day-sunny'; 
            } else {
                forecastIcon[i].classList += ' wi-alien';
            }
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
                } else if (xhr.status = 404) {
                    handleNotFoundError();
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
                sevenDayIcon(oneCallData);
            }
            
            getWeatherInfo();
            
        }
        
        getCoordinateData();
    }
    
    function cityHTML() {
        const city = searchBar.value
        cityField.innerText = '';
        cityField.innerText = city;
    }
    
    function handleNotFoundError() {
        errorMessage.style.display = 'block';
        detials.innerHTML = '';
        weatherDescription.innerText = '';
        currentDate.innerText = '';
        currentTime.innerText = '';
        for (let i = 0; i < high.length; i++) {
            high[i].innerText = '';
            low[i].innerText = '';
            
        }
        for(let i = 0; i < forecastIcon.length; i++) {
            forecastIcon[i].classList = ''
        }
        for (let i = day; i < day + 7; i++) {
            daysDiv[i - day].innerText = ''
        }
        currentIcon.classList = '';
        currentTemp.innerText = '';
        cityField.innerText = '';
    }
    
    
    document.addEventListener('search', e => {
        errorMessage.style.display = 'none'
        cityHTML();
        createLabels();
        showDays();
        showWeather();
        searchBar.value = '';
    })
    
    searchIcon.addEventListener('click', e => {
        errorMessage.style.display = 'none'
        cityHTML();
        createLabels();
        showDays();
        showWeather();
        searchBar.value = '';
    })
    
    
}

runWeatherApp();