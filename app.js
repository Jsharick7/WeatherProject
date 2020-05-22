const express = require("express");

const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index.ejs",{});

});

app.post("/", function(req, res){

  const query = req.body.zipCode;
  const appid = "dc727bca447734796cdb5248a06af9f5"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&units=Imperial&zip=" + query;
  https.get(url, function(response) {

      response.on("data", function(data) {

        try{
          const weatherData = JSON.parse(data);
          console.log(weatherData);
          const temp = weatherData.main.temp
          const description = weatherData.weather[0].description
          const icon = weatherData.weather[0].icon
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          res.render("newQuery",{temp:temp, description: description, icon: icon, query:query, imageURL:imageURL});
        }
        catch(error){
          console.log(error);
          res.render("error",{});
        }
      });
    });
});







app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
