var city

var getWeather = function (city){
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d8c80ace4b34f001fb4f2334a529a592";
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
}

var getForecast = function(city){
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=d8c80ace4b34f001fb4f2334a529a592&cnt=5";
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
}