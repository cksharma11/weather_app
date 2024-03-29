const request = require("request");
const Table = require("cli-table");
const chalk = require("chalk");

const apiKey = "8d1650437e2f9630d93679b92a80bc86";
const city = process.argv[2] || "dehradun";
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const table = new Table({
  head: [chalk.blue("Weather")],
  colWidths: [70],
  colAligns: ["middle"]
});

request(url, function(error, response, body) {
  if (error) {
    console.log("error:", error);
  } else {
    const weather = JSON.parse(body);
    const tempInCel = weather.main.temp - 273.15;

    table.push(["City :" + weather.name]);
    table.push(["Country :" + weather.sys.country]);
    table.push(["Temp :" + tempInCel + "°C"]);
    table.push(["Humidity :" + weather.main.humidity]);
    table.push(["Weather :" + weather.weather[0].description]);

    console.log(table.toString());
  }
});
