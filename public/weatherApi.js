const TOKKEN_OPENWEATHER = "b33caad8375bc8a37f2353905658ff39";
const TOKKEN_GEOLOCATION = "06c475e5e19743d1bbe8531eaf0eedc7";
let city_name = "default";

const btn_info = document.querySelector("#btn_info");
const btn_current = document.querySelector("#btn_current");
const btn_7days = document.querySelector("#btn_7days");

const temperatura = document.querySelector('#temperatura');
const umiditate = document.querySelector('#umiditate');
const presiune = document.querySelector('#presiune');
const temp_max = document.querySelector('#temp_max');
const temp_min = document.querySelector('#temp_min');
const vreme = document.querySelector("#vreme");
const icon = document.querySelector("#weather_icon");
const oras = document.querySelector("#oras");
const optiuni_orase =document.querySelector("#cities"); 

let temp = "#temperature";
let max_temp = "#max_temp";
let min_temp = "#min_temp";
let image = "#image"
let tempElem = [];
let maxTempElem = [];
let minTempElem = [];
let imageElem = []

const cityNameSearchBar = document.querySelector("#cityName");

for(let i=0; i < 7; i++){
    tempElem.push(document.querySelector(temp+`${i}`));
    maxTempElem.push(document.querySelector(max_temp+`${i}`));
    minTempElem.push(document.querySelector(min_temp+`${i}`));
    imageElem.push(document.querySelector(image + `${i}`))
}

let resetData = function(){
        temperatura.textContent = "Temperature:";
        umiditate.textContent = "Humidity:";
        presiune.textContent = "Pressure:";
        temp_max.textContent = "Max temperature:";
        temp_min.textContent = "Min temperature:";
        vreme.textContent = "Current Weather:"
        oras.textContent = "Selected city:";

}

let resetForecast = function(){
    for(let i=0; i < 7; i++){
        tempElem[i].textContent = "Temperature:";
        maxTempElem[i].textContent = "Max temperature:";
        minTempElem[i].textContent = "Min temperature:";

    }
}

let convertToCelsius = function(kelvinTemp){
    let celsius = kelvinTemp.toFixed(2) - 273.15;
    return celsius.toFixed(2);
}


let fetchData = function() {
    
    let selectedCity = cityNameSearchBar.value;
    
    if(selectedCity == '' || selectedCity == undefined){
        alert('Enter a city name');
        return;
    }else{
        resetData();    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${TOKKEN_OPENWEATHER}`)
    .then((resp) => resp.json())
    .then(function(data){
        
        let mainData = data.main;
 
        oras.textContent += "\t" + selectedCity;
        temperatura.textContent += "\t"+convertToCelsius(mainData.temp)+" C";
        umiditate.textContent += "\t"+mainData.humidity + "%";
        presiune.textContent += "\t"+mainData.pressure+" bari";
        temp_max.textContent += "\t"+convertToCelsius(mainData.temp_max);
        temp_min.textContent += "\t"+convertToCelsius(mainData.temp_min);
        vreme.textContent += "\t" + data.weather[0].description;
        
    })
    
    }
}   

let getForecast = function (){
    let selectedCity = cityNameSearchBar.value;
    if(selectedCity == '' || selectedCity == undefined){
        alert('Enter a city name');
        return;
    }else{
    resetForecast();
    let coordinates = {};
    
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=`+selectedCity+`&key=${TOKKEN_GEOLOCATION}&pretty=1`)
    .then((resp) =>  resp.json())
    .then((data) => {


        coordinates = data.results[0].bounds.southwest;
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=hourly&appid=${TOKKEN_OPENWEATHER}`)
        .then((resp)=> resp.json())
        .then(function(data){   
            console.log(data.daily);
            for(let i=0;i<7;i++){
                let iconcode =  data.daily[i].weather[0].icon;
                iconurl = `http://openweathermap.org/img/wn/${iconcode}@2x.png`;
               
                tempElem[i].textContent += convertToCelsius(data.daily[i].temp.day)+" C";
                maxTempElem[i].textContent += convertToCelsius(data.daily[i].temp.max)+ " C";
                minTempElem[i].textContent += convertToCelsius(data.daily[i].temp.min) + " C"; 
                imageElem[i].src = iconurl;
    
            }
        })

    })

}
    
}
let getWeatherCurrentLocation = function(){
    navigator.geolocation.getCurrentPosition(position,error, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0})
}

let position = function(pos){
    let tmpPos = pos.coords;

    console.log(`${tmpPos.latitude} and ${tmpPos.longitude}`);
    let latitude = tmpPos.latitude;
    let longitude = tmpPos.longitude;

  
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${TOKKEN_OPENWEATHER}`)
    .then((resp) => resp.json())
    .then((data) => {

        resetData();
        console.log(data)
        cityNameSearchBar.value = "Bucharest";
        oras.textContent += "\tBucharest";
        temperatura.textContent += "\t"+convertToCelsius(data.main.temp)+" C";
        umiditate.textContent += "\t"+data.main.humidity + "%";
        presiune.textContent += "\t"+data.main.pressure+" bari";
        temp_max.textContent += "\t"+convertToCelsius(data.main.temp_max);
        temp_min.textContent += "\t"+convertToCelsius(data.main.temp_min);
        vreme.textContent += "\t" + data.weather[0].description;
    });

}
function error(err){
    console.warn(`Error${err.code}: ${err.message}`);
}
let showDiv=function() {
    document.getElementById('forecast').style.display = "block"; }

btn_info.addEventListener("click", fetchData);
btn_7days.addEventListener("click", getForecast,showDiv);
btn_current.addEventListener("click", getWeatherCurrentLocation);