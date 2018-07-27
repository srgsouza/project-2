const express = require('express');
const bodyParser = require('body-parser');  // assist in parsing of req.body
const methodOverride = require('method-override'); // override GET/POST calls. Allow use of PUT , DELETE etc
const request = require('request'); // makes http / https calls
const bcrypt = require('bcryptjs'); // encrypts passwords by hashing
const session = require('express-session'); // allow storage of individual pieces of information while in session

const passport = require('passport');

require('dotenv').config();
require('./db/db');   // runs the db.js file
const {store} = require('./db/mongo_session'); // mongo session config file

const Bike = require('./models/bikes');
const bikes = require('./input_files/bikes_data');

for(let i = 0; i < bikes.length; i++) {
  Bike.create(bikes[i]);
}

require('./passport/serializing');
require('./passport/local-config');
const geocode = require('./api/geocode');
const weather = require('./api/weather');

const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));  // allows alt methods such as "PUT" from the html form to call a corresponding route

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());  // ** must be placed after session
app.use(passport.session());
app.use((req, res, next) => { 
  // res.locals is available on every route. Undefined initially, then set after user logs in
  // templates (ie ejs) will understand 'user' of req.locals
  res.locals.user = req.user; 
  next();
});
// require the controller(s)
const usersController = require('./controllers/users');
const bikesController = require('./controllers/bikes');
const trailsController = require('./controllers/trails');

// app.use('/users', usersController);
app.use('/bikes', bikesController);
// app.use('/trails', trailsController);

app.use('/users', usersController);
app.use('/bikes', bikesController);
app.use('/trails', trailsController);

app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.get('/extras', (req, res) => {
    res.render('extras/index.ejs', {
    });
});

app.post('/extras', (req, res) => {
  let username = null;
  if (req.user !== undefined) {
    username = req.user.username;
  }
  geocode.geocodeAddress(req.body.cityName, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      // console.log(JSON.stringify(results, undefined, 2));   // 'undefined' is a filtering option, then '2' is the spacing of indentation
      console.log('Location: ' + results.address);
      console.log('Latitute: ' + results.latitude);
      console.log('Longitute: ' + results.longitude);


      // lat, lng, callback  -
      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log("Error somewhere");
          console.log(errorMessage);
        } else {
          // console.log(JSON.stringify(weatherResults, undefined, 2));
          console.log(`It's currently ${weatherResults.temperature} in . It feels like ${weatherResults.apparentTemperature}.`);
        }
      });

      // call MTB project api here
      let mountainBikeProject = "200320520-bb520cea5200b21d7530c95bf2166f64";
      request({
        url: `https://www.mtbproject.com/data/get-trails?lat=${results.latitude}&lon=${results.longitude}&maxDistance=10&key=200320520-bb520cea5200b21d7530c95bf2166f64`
      }, (err, response, body) => {
        console.log(err);
        // body = JSON.parse(body);
        const latlon = results.latitude + "," + results.longitude;
        console.log(latlon);
        
        let url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&key=AIzaSyBuR_F9fvqIunopC4343MFtTSxRTtOHbNw`;
        console.log(url);
        
        res.render('extras/index.ejs',
          {
            // body: body,
            // username: username,
            // lat: results.latitude,
            // long: results.longitude,
            googleMapInfo: url
          });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


module.exports = app;
