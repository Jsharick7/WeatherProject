const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query = req.body.zipCode;
  const appid = "dc727bca447734796cdb5248a06af9f5"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&units=Imperial&zip=" + query;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1> Current: " + description +"</h1>");
      res.write("<img src=" + imageURL + ">")
      res.write("<h1>The temperature at " + query + " is " + temp + " degrees Farenheit.</h1>");
      res.send();
    });
  });

})
//
// const query = "17532";
// const appid = "dc727bca447734796cdb5248a06af9f5"
// const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&units=Imperial&zip=" + query;
// https.get(url, function(response) {
//   console.log(response.statusCode);
//
//   response.on("data", function(data) {
//     const weatherData = JSON.parse(data);
//     const temp = weatherData.main.temp
//     const description = weatherData.weather[0].description
//     const icon = weatherData.weather[0].icon
//     const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
//     res.write("<h1> Current: " + description +"</h1>");
//     res.write("<img src=" + imageURL + ">")
//     res.write("<h1>The temperature in Holtwood is " + temp + " degrees Farenheit.</h1>");
//     res.send();
//   });
// });







app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
