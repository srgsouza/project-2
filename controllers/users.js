const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');
const request = require('request');


const User  = require('../models/users');
const geocode = require('../api/geocode');
const weather = require('../api/weather');

// display the index page - show all users
router.get('/', async (req, res) => {
  let message = null;
  if (req.user !== undefined) {
    message = req.user.username;
  }
  try {
    const data = await User.find({}).populate('trails').populate('bikes');
    res.render('users/index.ejs', { 
      "usersList": data,
      message: message
    });
  } catch (error) {
    console.log(error);
  }
});  

// create new - Shows the Form
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

// Render the login page
router.get('/login', function (req, res) {
  res.render('users/login.ejs')
});

// logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/users');
});

router.get('/logged', (req, res) => {
  if (!req.user) {
    res.redirect('/users')
  }
  res.send(`Logged in user is ${req.user.username}`);
})

// render the edit page (pre-filled with existing data)
router.get('/:id/edit', async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.render('users/edit.ejs', {
      user: data,
      id: req.params.id
    })
  } catch (error) {
    console.log(error);
  }
});

// find user by ID and render the show.ejs page
router.get('/:id', async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.render('users/show.ejs', {
      user: data,
      index: req.params.id
    })
  } catch (error) {
    console.log(error);
  }
});

// Get Geo Location
router.post('/location', (req, res) => {
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
        res.render('trails/search.ejs',
          { body: body });
      });

    }
    // res.render('users/geoinfo.ejs', {
    //   location: results.address,
    //   latitude: results.latitude,
    //   longitude: results.longitude,

    // });
  });
})

// Login user - using Passport JS
router.post('/login', (req, res, next) => {
  // passport.authenticate returns a callback function
  // appended: '(res, req, next)' to the function listed on the Passport Docs
  passport.authenticate('local', { 
    successRedirect: '/users', 
    failureRedirect: '/users/login'
  }) (req, res, next);
})

// Register new user - Insert new item in the DB
router.post('/register', async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
})

// update an item and render the index page (with edited information)
router.put('/:id', async (req, res) => {
  // req.body is the updated form info
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
});

// Delete an item.  Takes an id , as an argument, from a delete form/button, such as the one on the index.ejs page
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
