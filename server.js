const express = require('express');
const bodyParser = require('body-parser');  // assist in parsing of req.body
const methodOverride = require('method-override'); // override GET/POST calls. Allow use of PUT , DELETE etc
const request = require('request'); // makes http / https calls
const bcrypt = require('bcryptjs'); // encrypts passwords by hashing
const session = require('express-session'); // allow storage of individual pieces of information while in session

const passport = require('passport');
require('dotenv').config();
require('./db/db');   // runs the db.js file 
require('./passport/serializing');
require('./passport/local-config');

const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());   
app.use(methodOverride('_method'));  // allows alt methods such as "PUT" from the html form to call a corresponding route
app.use(session({
  secret: "keepitsecretkeepitsafe",
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// require the controller(s)
const usersController = require('./controllers/users');
const bikesController = require('./controllers/bikes');
const trailsController = require('./controllers/trails');

app.use('/users', usersController);
app.use('/bikes', bikesController);
app.use('/trails', trailsController);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


module.exports = app;
