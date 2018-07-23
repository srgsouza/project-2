const express = require('express');
const router = express.Router();
const User = require('../models/bikes');


// display our basic view of all the usernames
router.get('/', (req, res) => {
  User.find({}, (err, theseBikes) => {
    res.render('bikes/index.ejs', {
      bikes: theseBikes
    });
  })
});

// display our basic view of all the usernames
router.get('/index', (req, res) => {
  res.render('bikes/index.ejs', {
    bikes: theseBikes
  });
});

// display the create page for when creating a new username
router.get('/new', (req, res) => {
  User.find({}, (err, Bike) => {
    res.render('bikes/new.ejs', {
      // the variable on the left of the colon is
      // passed into the template/function
      bikes: theseBikes
    });
  });
});

// display the show page for the corresponding user/username
router.get('/:id', (req, res) => {
  res.render('bikes/show.ejs', {
    bikes: theseBikes
  });
});

// display the edit page for when editing a username
router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
      res.render('bike/edit.ejs', (err, foundUser) => {
        bikes: theseBikes
      });
  });
});

module.exports = router;
