// geocode.js takes an 'address' parameter and callback funtion
// It encodes the address, and make a request to Google to provide the formatted address, longitude, and latitude

const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address); //encodes the address provided in argv
  // Make an http request to a google api, and the callback function to display the data
  request({
    // url: 'https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia', // testing hard coded address
    url: `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // console.log(body); // gets a concatenated version.
    // console.log(JSON.stringify(body, undefined, 2)); // Gets the entire object. '2' is the number of spaces per indentation
    if (error) {
      // console.log(error);
      // console.log('Unable to connect to servers.'); used prior to refactoring the code. Now use the callback function instead
      callback('Unable to connect to servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      // console.log(`Address: ${body.results[0].formatted_address}`);
      // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
      // console log statements above used prior to refactoring the code. Now use the callback function instead
      callback(undefined, {  // returns 'undefined' for the 1st param because there's no errorMessage.
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng        
      });      
    }
  });
};


module.exports = {
  geocodeAddress
};
//  or 'module.exports.geocodeAddress = geocodeAddress;'
