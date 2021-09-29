const axios = require("axios");

const MAP_BASE_URL = "https://api.mapbox.com";

const { MAP_BOX_API_TOKEN } = require("../../APIKeys");

const geoCode = async (address, callback) => {
  try {
    let { data } = await axios.get(
      `${MAP_BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json`,
      { params: { access_token: MAP_BOX_API_TOKEN } }
    );
    // console.log(data.features[0].center[0]);
    // console.log(data.features[0].center[1]);
    callback(undefined, {
      latitude: data.features[0].center[1],
      longitude: data.features[0].center[0],
      location: data.features[0].place_name,
    });
  } catch (error) {
    // console.log(error);
    callback("Cannot retrieve info!", undefined);
  }
};

module.exports = geoCode;
