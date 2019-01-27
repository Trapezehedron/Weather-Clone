window.onload = function(){

var weathermain = document.getElementById('weathermain')
var weatherdescription = document.getElementById('weatherdescription')
var weathertemperature = document.getElementById('weathertemperature')
var weatherhumidity = document.getElementById('weatherhumidity')
var weatherimage = document.getElementById('image')
var button = document.getElementById('button')
var title = document.getElementById('title')
var inputcontainer = document.getElementById('inputcontainer')
var cityInput = document.getElementById('cityInput')

cityInput.addEventListener('keydown', function(e){
 if (e.keyCode === 13){
   makeRequest();
 }
})

button.addEventListener('click', makeRequest);

function makeRequest() {

var xhr = new XMLHttpRequest();
 xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" +cityInput.value +"&APPID=efd9f9fb712735f14865fbfbea3ff450", true);

 xhr.onload = function (e){
     if(xhr.readyState === 4){
       if(xhr.status === 200){

         var data = JSON.parse(xhr.responseText);

         console.log(data.visibility)
         console.log(data.main)
         console.log(data.weathermain)
         console.log(data)

         var sunrise = data.sys.sunrise;
         var sunset = data.sys.sunset;
         var now = Date.now() / 1000;
         var daytime = sunrise < now && now < sunset;

         console.log("sunrise",sunrise)
         console.log("sunset",sunset)
         console.log("now",now)
         console.log("is it daytime?", daytime)


         weathermain.innerHTML = data.weather[0].main

         if (daytime) {

           if (data.weather[0].main === "Clear") {
             weatherimage.src="../../assets/images/clear.png"
           }
           if (data.weather[0].main === "Clouds") {
             weatherimage.src="../../assets/images/clouds.png"
           }
           if (data.weather[0].main === "Rain") {
             weatherimage.src="../../assets/images/rain.png"
           }
           if (data.weather[0].main === "Snow") {
             weatherimage.src="../../assets/images/snowflake.png"
           }
           if (data.weather[0].main === "Drizzle") {
             weatherimage.src="../../assets/images/rain.png"
           }
         } else {
           weatherimage.src="../../assets/images/moon.png"
         }


         weatherdescription.innerHTML = toTitleCase(data.weather[0].description)
         weathertemperature.innerHTML = (data.main.temp - 273.15).toFixed() +"°C"
         weatherhumidity.innerHTML = data.main.humidity +"%"

       } else {
         console.error(xhr.statusText)
       }
     }
   };
   xhr.onerror = function (e) {
     console.error(xhr.statusText);
   };
   xhr.send(null)
 }

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

}
