//let regular_link = "api.openweathermap.org/data/2.5/weather?q=New York,&appid=94910b8a80339cf128a4c86c41826ed3&units=imperial"

//thing 
let weatherInput = document.querySelector("#weatherInput");
let weatherText = document.querySelector(".weatherText")
let searchIcon = document.querySelector("#searchIcon")
let celciusButton = document.querySelector(".celciusButton")
weatherInput.addEventListener("keyup", (event) => { //event listener callback 
  if (event.key === "Enter") { //listens every time a key is realized until the enter button is released 
    getWeather()
    console.log(weatherInput.value)
  }
});

const getWeather = ()=>{
    var api_key = config.WEATHER_API
    let city_name = weatherInput.value
    let api_link= `http://api.openweathermap.org/data/2.5/weather?q=${city_name},&appid=${api_key}&units=imperial`
    fetch(api_link)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        let weather = data["main"]["temp"]
        console.log(data)
        weatherText.innerText = `The weather in ${city_name} is: ${weather} ° F`
        weatherText.style.fontSize ="clamp(1.5rem, 2vw, 3rem)"
        //logic for celcius button
        celciusButton.addEventListener("click", ()=> {
          let celciusValue = (5/9) * (weather-32)
          if(celciusButton.innerHTML == "Celcius"){
            weatherText.innerText = `The weather in ${city_name} is: ${Math.round(celciusValue)} ° C`
            celciusButton.innerHTML = "Fahrenheit"
            celciusButton.style.fontSize = "1rem"
          }
          else{
            weatherText.innerText = `The weather in ${city_name} is: ${weather} ° F`
            celciusButton.innerHTML = "Celcius"
            celciusButton.style.fontSize = "1.5rem"

          }
        })
        
    })
    .catch(err => alert(`Sorry, "${city_name}" was not a valid city`))
}

searchIcon.addEventListener("click", getWeather)

