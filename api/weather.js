// API call to darksky.net -> takes latitude and longitude - returns weather 
const request = require('request'); 

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/04729b280a8d0bbf0dacd2a8106dbbff/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });

};

module.exports.getWeather = getWeather;

//  api key  04729b280a8d0bbf0dacd2a8106dbbff
//  https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// https://api.darksky.net/forecast/04729b280a8d0bbf0dacd2a8106dbbff/40.1733277,-105.1142011
