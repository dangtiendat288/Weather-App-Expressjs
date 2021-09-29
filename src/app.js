const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsPath);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Dang Dat" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Dang Dat" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a helpful message",
    name: "Dang Dat",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "You must provide an address." });
  }

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    name: "Dang Dat",
    error: "Help article not found",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    name: "Dang Dat",
    error: "Page not found",
    title: "404",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
