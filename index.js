
var locationUrlApi = "https://ipapi.co/json"
var weatherUrlApi = "https://api.darksky.net/forecast/51c6db8bfa1c72263c519b283ad1b58e/"


//if manual location is need manualToggle to 1 and fill the empty var

//----------------------------------------------

var manualToggle = 0;               //0 - using API to get location  1 - using manual input to get location
var mLat = "1.3521";
var mLon = "103.8198";
var mCity = "Singapore";
var mUrl = weatherUrlApi + mLat + "," + mLon + "?units=si";
// ----------------------------------------------


//Run function to call APIs

$(document).ready(function () {
    
    if (manualToggle == 0){
        returnPlace();
    }
    else{
        $("#location").text(mCity);
        theWeather(mUrl);

    }
    
});


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
        h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}


function returnPlace() {
    var city = "";
    var region = "";
    var lat = "";
    var lon = "";
    $.getJSON(locationUrlApi, function (data) {                                     //if Successfully connected to API
        city = data.city;
        region = data.region;
        lat = data.latitude;
        lon = data.longitude;
        $("#location").text(city)
        var theUrl = weatherUrlApi + lat + "," + lon + "?units=si";
        theWeather(theUrl);
    })
    .fail (function(){                                                             //if Fail to connect to API
        $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDSunnyDay.mp4" type="video/mp4">'); //Video Background
        $("#icon").append("<img src = './image/day.svg' width = '400px'>"); //Weather Icon
        $("#summaryOne").text("Location API Error");

    });


}


function theWeather(theUrl) {
    $.ajax({
        url: theUrl,
        dataType: "jsonp",
        success: function (returned) {                                                           //if Successfully connected to API
            var weatherC = (returned.currently.temperature).toFixed();
            var weatherF = (returned.currently.temperature * 1.8 + 32).toFixed();
            $(".temp").text(weatherC + "° C");
            var summarization = returned.currently.summary;


            $("#summaryOne").text(summarization);
            var weatherIcon = returned.currently.icon;
            //var weatherIcon = "rain";

            var numGen = Math.floor(Math.random() * 2);

            if (weatherIcon == "clear-day") {

                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDSunnyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/day.svg' width = '400px'>"); //Weather Icon
            }
            else if (weatherIcon == "clear-night") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDSunnyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/night.svg' width = '300px'>"); //Weather Icon
            }
            else if (weatherIcon == "rain") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDRainyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/rainy.svg' width = '300px'>"); //Weather Icon
            }
            else if (weatherIcon == "snow") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDRainyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/snowy.svg' width = '300px'>"); //Weather Icon
            }
            else if (weatherIcon == "sleet") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDRainyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/cloudy-day.svg' width = '300px'>"); //Weather Icon
            }
            else if (weatherIcon == "wind") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDRainyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/cloudy.svg' width = '300px'>"); //Weather Icon
            }
            else if (weatherIcon == "fog") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDSunnyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/cloudy.svg' width = '300px'>"); //Weather Icon

            }
            else if (weatherIcon == "cloudy") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDRainyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/cloudy.svg' width = '300px'>"); //Weather Icon

            }
            else if (weatherIcon == "partly-cloudy-day") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDRainyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/cloudy.svg' width = '300px'>"); //Weather Icon
            }
            else if (weatherIcon == "partly-cloudy-night") {
                $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDRainyDay.mp4" type="video/mp4">'); //Video Background
                $("#icon").append("<img src = './image/cloudy-night.svg' width = '300px'>"); //Weather Icon
            }
            else {
                $("body").append("<h3>Weather Image Not Found</h3>");
                $("#icon").append("<h3>Weather Image Not Found</h3>")
            }
        },

        error: function(){                                                                      //if Fail to connect to API
            alert("error");
            $('#videoBG').append('<video autoplay muted loop id="videoBG"><source src="./image/JCDSunnyDay.mp4" type="video/mp4">'); //Video Background
            $("#icon").append("<img src = './image/day.svg' width = '400px'>"); //Weather Icon
            $("#summaryOne").text("Weather API Error");

        }
    });
}