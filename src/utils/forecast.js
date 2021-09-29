const axios = require("axios");

const BASE_URL = "http://api.weatherstack.com";

const { WEATHER_STACK_API_KEY } = require("../../APIKeys");

const forecast = async (latitude, longitude, callback) => {
  try {
    let { data } = await axios.get(`${BASE_URL}/current`, {
      params: {
        access_key: WEATHER_STACK_API_KEY,
        query: `${latitude},${longitude}`,
        // units: "m",
      },
    }); // return JS object not JSON like require
    callback(
      undefined,
      `${data.current.weather_descriptions[0]}. The current temperature is ${data.current.temperature} and it feels like ${data.current.feelslike}.`
    );
  } catch (error) {
    console.log("Fail to retrieve info!", undefined);
  }
};

module.exports = forecast;
