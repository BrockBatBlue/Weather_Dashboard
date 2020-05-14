var lastCity = localStorage.getItem("lastCity");
var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));

var displaySearchedCities = function(searchedCities){
    $(".citiesSaved").html("");
    var tableBody = $(".citiesSaved").append("<tbody>");
    for(i=0; i<searchedCities.length; i++){
       var row = $("<tr>").append($("<td>").text(searchedCities[i]).addClass("tableButton"));
       tableBody.append(row);
    }
}
var displayWeather = function(weatherInfo){
    var name = weatherInfo.name
    var time = moment.unix(weatherInfo.dt).format("MMMM Do YYYY, h:mm:ss a")
    $("#cityTime").text(name + " - " + time);

    $("#degrees").text(weatherInfo.main.temp);
    $("#percentage").text(weatherInfo.main.humidity);
    $("#mph").text(weatherInfo.wind.speed);
}
var displayForecast = function(forecastInfo){
    var forecastArray = forecastInfo.list;
    $(".forecastCards").html("");
    for(i=0; i<forecastArray.length; i++){
        var card = $("<div>").addClass("card")
        card.append(
            $("<div>").addClass("card-divider").append(
                $("<h5>").text(forecastArray[i].dt_txt)
            )
        )
        .append(
            $("<div>").addClass("card-section").append(
                $("<img>").attr("src","http://openweathermap.org/img/w/" + forecastArray[i].weather[0].icon + ".png")
            ).append(
                $("<p>").text("Temp: " + forecastArray[i].main.temp +" F")
            )
            .append(
                $("<p>").text("Humidity: " + forecastArray[i].main.humidity +"%")
            )
        )
        $(".forecastCards").append(card);
    }
}
var getWeather = function(city){
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d8c80ace4b34f001fb4f2334a529a592&units=imperial";
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function(response) {
        displayWeather(response);
    });
}
var getForecast = function(city){
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d8c80ace4b34f001fb4f2334a529a592&units=imperial&cnt=5";
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response) {
        displayForecast(response);
    });
}

if(lastCity !== null){
    // get data from last city
    getWeather(lastCity);
    getForecast(lastCity);
    displaySearchedCities(searchedCities);
}

// Event Listeners Section 
$(".searchButton").on("click", function(event) {
    //Grabbed city
    var cityName = $(".searchInput").val();
    //Get city data
    getWeather(cityName);
    getForecast(cityName);
    lastCity = cityName
    if(searchedCities === null){
        searchedCities = [];
    }
    searchedCities.unshift(cityName);
    localStorage.setItem("lastCity", cityName);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
    displaySearchedCities(searchedCities);
})
$(".tableButton").on("click", function(){
    var cityName = $(this).text();
    console.log(cityName);
    getWeather(cityName);
    getForecast(cityName);
    lastCity = cityName;    
    localStorage.setItem("lastCity", cityName);
})
