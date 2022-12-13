// "borrowed" from MDN's geolocation API example
function geoFindMe() {
    console.log("calling geofindme");
    const status = document.querySelector('#weatherStatus');
    
    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const latitude_input = document.querySelector("#latitude-input");
        const longitude_input = document.querySelector("#longitude-input");

        longitude_input.value = longitude;
        latitude_input.value = latitude;
        console.log(`${latitude}, ${longitude}`);
        status.textContent = "";
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
}

WEATHER_CODES = {
0:  'Clear sky',
1:  'Mainly clear',
2:  'Partly cloudy',
3:  'Overcast',
45: 'Fog',
48: 'Depositing Rime fog',
51: 'Light Drizzle',
53: 'Moderate Drizzle',
55: 'Dense Drizzle',
57: 'Light Freezing Drizzle',
57: 'Dense Freezing Drizzle',
61: 'Slight Rain',
63: 'Moderate Rain',
65: 'Heavy Rain',
66: 'Light Freezing Rain',
67: 'Heavy Freezing Rain',
71: 'Slight Snow fall',
73: 'Moderate Snow fall',
75: 'Heavy Snow fall',
77: 'Snow grains',
80: 'Slight Rain showers',
81: 'Moderate Rain showers',
82: 'Violent Rain showers',
85: 'Slight Snow showers slight and heavy',
86: 'Heavy Snow showers slight and heavy',
95: 'Thunderstorm',
96: 'Thunderstorm with slight hail',
99: 'Thunderstorm with heavy hail',
}

SS_ERROR_CODES = {INVALID_REQUEST: "ERROR: Please Double-Check lat/lang", 
                  INVALID_DATE: "ERROR: Please Specify Date", 
                  UNKNOWN_ERROR: "ERROR: Please Try Again"}

async function getWeather() 
{
    let latitude = document.getElementById("latitude-input").value
    let longitude = document.getElementById("longitude-input").value


    // open-meteo api
    const omLatitude = "latitude=" + latitude;
    const omLongitude = "longitude=" + longitude;

    // Create the url 
    const omURL = "https://api.open-meteo.com/v1/forecast?" + omLatitude + "&" + omLongitude + "&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=ms&timezone=America%2FChicago";
  
    let weatherConditions = await fetch(omURL);
    let weatherJSON = await weatherConditions.json();

    document.getElementById("temp-display").innerText = "Temperature: " + weatherJSON["current_weather"]["temperature"];
    document.getElementById("cloud-cover-display").innerText = WEATHER_CODES[weatherJSON["current_weather"]["weathercode"]];


    //sunrise-sunset api
    const ssLatitude = "lat=" + latitude;
    const ssLongitude = "lng=" + longitude;

    const ssURL = "https://api.sunrise-sunset.org/json?" + ssLatitude + "&" + ssLongitude + "&formatted=0";

    let sunriseSunset = await fetch(ssURL);
    let sunriseSunsetJSON = await sunriseSunset.json();

    let riseTime = new Date(sunriseSunsetJSON["results"]["sunrise"]);
    riseTime = riseTime.toLocaleTimeString("en-US");

    let setTime = new Date(sunriseSunsetJSON["results"]["sunset"]);
    setTime = setTime.toLocaleTimeString("en-US");

    if (sunriseSunsetJSON["status"] == "OK")
    {
      document.getElementById("sunrise-display").innerText = "Sunrise: " + riseTime;
      document.getElementById("sunset-display").innerText = "Sunset: " + setTime;
    }
    else 
    {
      document.getElementById("sunrise-display").innerText = SS_ERROR_CODES[sunriseSunsetJSON["status"]];
      document.getElementById("sunset-display").innerText = SS_ERROR_CODES[sunriseSunsetJSON["status"]];
    }
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
document.querySelector("#get-weather-btn").addEventListener('click', getWeather);
