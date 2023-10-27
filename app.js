const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(request, response){
   response.sendFile(__dirname + "/index.html");
    });
app.post("/", function(request,response){
    const query = request.body.cityName;
    const apiKey = "032f1eca9bd1fc47555fd642f01b2adc";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(res){
    console.log(res.statusCode);
    res.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    response.write("<h1>the current temperature in " + query + " is: " + temp + " Degree celcius</h1>");
    response.write("<h3>DESCIPTION: " + description + "</h3>");
    response.write("<img src=" + imageurl + ">");
    response.send();
  });
  });
  });
app.listen(3000, function(){
  console.log("server started");
});
