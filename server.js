const express = require('express');
const bodyParser = require('body-parser');  // assist in parsing of req.body
const methodOverride = require('method-override'); // override GET/POST calls. Allow use of PUT , DELETE etc
const request = require('request'); // makes http / https calls
const bcrypt = require('bcryptjs'); // encrypts passwords by hashing
const session = require('express-session'); // allow storage of individual pieces of information while in session

const passport = require('passport');
require('./db/db');   // runs the db.js file 
const {store} = require('./db/mongo_session'); // mongo session config file
require('./passport/serializing');
require('./passport/local-config');

const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());   
app.use(methodOverride('_method'));  // allows alt methods such as "PUT" from the html form to call a corresponding route
// app.use(session({
//   secret: "keepitsecretkeepitsafe",
//   saveUninitialized: false
// }));
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
