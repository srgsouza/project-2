const express = require('express');
const bodyParser = require('body-parser');  // assist in parsing of req.body
const methodOverride = require('method-override'); // override GET/POST calls. Allow use of PUT , DELETE etc
const request = require('request'); // makes http / https calls
const bcrypt = require('bcryptjs'); // encrypts passwords by hashing
const session = require('express-session'); // allow storage of individual pieces of information while in session

const passport = require('passport');
require('dotenv').config();
require('./db/db');   // runs the db.js file 
// require('./db/mongo_session');
const store = require('./db/mongo_session'); // mongo session config file
require('./passport/serializing');
require('./passport/local-config');
const geocode = require('../api/geocode');
const weather = require('../api/weather');

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

app.use('/users', usersController);
app.use('/bikes', bikesController);
app.use('/trails', trailsController);

app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.get('/extras', (req, res) => {
    res.render('extras/extra.ejs', {
      location: results.address,
      latitude: results.latitude,
      longitude: results.longitude,
    });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


module.exports = app;
