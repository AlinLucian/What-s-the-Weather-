$(document).ready(function() {
  //variable declaration
  var lat;
  var long;
  var city;
  var country;
  var units = "metric";
  var description;

  //using API to get user location
  $.getJSON("http://ip-api.com/json?callback=?", function(location) {
    lat = location.lat;
    long = location.lon;
    city = location.city;
    country = location.country;
  });

  //get initial weather info using JSON get requests
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + units, function(weather) {
    $("#temp").html("<p>" + weather.main.temp + " °C </p>");
    description = weather.weather[0].description;
    $("#description").html("<p>" + weather.weather[0].description + ".</p>");
    $("#location").html("<p>" + city + ", " + country + "</p>");

    //change background according to the weather description
    if (description.indexOf("cloud") != -1) {
      $("body").css({
        "background": "url(http://i.imgur.com/DpxsRoS.jpg)",
        "background-size": "cover",
        "background-repeat": "no-repeat"
      });
    } else if (description.indexOf("snow") != -1) {
      $("body").css({
        "background": "url(http://i.imgur.com/ftlYtco.jpg)",
        "background-size": "cover",
        "background-repeat": "no-repeat"
      });
    } else if (description.indexOf("sun") != -1) {
      $("body").css({
        "background": "url(http://i.imgur.com/M4eLADq.jpg)",
        "background-size": "cover",
        "background-repeat": "no-repeat"
      });
    } else {
      $("body").css({
        "background": "url(http://i.imgur.com/mmKq9oa.jpg)",
        "background-size": "cover",
        "background-repeat": "no-repeat"
      });
    }
  });

  //handling of the toggle button
  $("#toggle").click(function() {
    if (units === "metric") {
      units = "imperial";
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + units, function(weather) {
        $("#temp").html("<p>" + weather.main.temp + " °F </p>");
        $("#toggle").html("Toggle to Celsius");
      });
    } else {
      units = "metric";
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + units, function(weather) {
        $("#temp").html("<p>" + weather.main.temp + " °C </p>");
        $("#toggle").html("Toggle to Fahrenheit");
      });
    };
  });

});
