var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=d8c80ace4b34f001fb4f2334a529a592";
$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    createRow(response);
    });