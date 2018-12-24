const request = require("request");
const Table = require("cli-table");
const chalk = require("chalk");

let apiKey = "8d1650437e2f9630d93679b92a80bc86";
let city = process.argv[2] || "dehradun";
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const table = new Table({
  head: [chalk.blue("Weather")],
  colWidths: [70],
  colAligns: ["middle"]
});

request(url, function(error, response, body) {
  if (error) {
    console.log("error:", error);
  } else {
    let weather = JSON.parse(body);
    let tempInCel = weather.main.temp - 273.15;
    table.push(["City :" + weather.name]);
    table.push(["Country :" + weather.sys.country]);
    table.push(["Temp :" + tempInCel + "°C"]);
    table.push(["Humidity :" + weather.main.humidity]);
    table.push(["Weather :" + weather.weather[0].description]);
    console.log(table.toString());
  }
});
