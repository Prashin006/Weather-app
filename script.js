let card = document.querySelector('.card');
let btn = document.querySelector('#button');
let input = document.querySelector('#city');
let photo = document.querySelector('.weather img');
let h2 = document.querySelector('.weather>h2');
let temp = document.querySelector('.temp span');
let humidity = document.querySelector('.humidity h2 span');
let wind = document.querySelector('.wind h2 span');
let apiKey = 'f6fe6f1392d8150360a6e3bb6eaa3612';
let error = document.getElementsByClassName('error')[0];
let apiUrl;
let city;
btn.addEventListener('click', () => {
    city = input.value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    checkWeather();
});

async function checkWeather() {
    let res = await fetch(apiUrl);
    // As we are using asynchronous programming we will get a promise in result which we need to parse
    let rawData = await res.json();
    rawData = JSON.stringify(rawData);
    let data = JSON.parse(rawData);
    if (res.status == 404) {
        error.style.display = 'block';
    }
    else {
        error.style.display = 'none';
        if (data.main.temp) temp.innerHTML = Math.round(data.main.temp);
        h2.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
        // console.log(h2);
        // console.log('city is', city);
        humidity.innerHTML = data.main.humidity;
        wind.innerHTML = data.wind.speed;
        // console.log(data);
        let weather = data.weather['0'].main;
        if (weather == 'Clear') {
            photo.src = 'images/clear.png';
            photo.alt = 'Clear sky';
            card.style.background = 'linear-gradient(135deg, #c0e47a, #c7f239)'
        }
        else if (weather == 'Mist') {
            photo.src = 'images/mist.png';
            photo.alt = 'Misty';
            card.style.background = 'linear-gradient(135deg, #d9e8bb, #464841)';
        }
        else if (weather == 'Clouds') {
            photo.src = 'images/clouds.png';
            photo.alt = 'Cloudy';
            card.style.background = 'linear-gradient(135deg, #ab6be2, #110663)';
        }
        else if (weather == 'Haze' || weather == 'Smoke') {
            photo.src = 'images/drizzle.png';
            photo.alt = 'Haze';
            card.style.background = 'linear-gradient(135deg, #a5c6bd, #150c55)';
        }
        else if (weather == 'Thunderstorm') {
            photo.src = 'images/rain.png';
            photo.alt = 'Thunderstorm';
            card.style.background = 'linear-gradient(135deg, #515355, #1e142a)';
        }
    }
}

