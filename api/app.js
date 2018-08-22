// yargs facilitates the handlig of arguments
console.log("Got in the app.js file");

const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');


const argv = yargs
  .options({ //chaining calls
    a: {
      demand: true, // makes the 'a' argument is required
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true // string takes true/false
    }
  })
  .help() // adds the help flag
  .alias('help', 'h')
  .argv;

// geocodeAddress passes the address arugment and a callback function that returns either an error or the results
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // console.log(JSON.stringify(results, undefined, 2));   // 'undefined' is a filtering option, then '2' is the spacing of indentation
    console.log('This is the Location: ' + results.address);
    // lat, lng, callback  -
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log("Error somewhere");
        console.log(errorMessage);
      } else {
        // console.log(JSON.stringify(weatherResults, undefined, 2));
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
