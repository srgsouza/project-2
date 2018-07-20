const express = require('express');
const router = express.Router();

const Bike = require('../models/bikes');

// display the index page - show all items
router.get('/', async (req, res) => {
  try {
    const data = await Bike.find({});
    res.render('bikes/index.ejs', { "bikesList": data });
  } catch (error) {
    console.log(error);
  }
});

// create new - Shows the Form
router.get('/new', (req, res) => {
  res.render('bikes/new.ejs');
});

// find bike by ID and render the show.ejs page
router.get('/:id', async (req, res) => {
  try {
    await Bike.findById(req.params.id);
    res.render('bikes/show.ejs', {
      bike: data,
      index: req.params.id
    })
  } catch (error) {
    console.log(error);
  }
});

// render the edit page (pre-filled with existing data)
router.get('/:id/edit', async (req, res) => {
  try {
    await Bike.findById(req.params.id);
    res.render('bikes/edit.ejs', {
      bike: data,
      id: req.params.id
    })
  } catch (error) {
    console.log(error);
  }
});

// Create new - Insert new item in the DB
router.post('/', async (req, res) => {
  await Bike.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/bikes');
    }
  })
})

// update an item and render the index page (with edited information)
router.put('/:id', async (req, res) => {
  // req.body is the updated form info
  try {
    await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/bikes')
  } catch (error) {
    console.log(error);
  }
});

// Delete an item.  Takes an id , as an argument, from a delete form/button, such as the one on the index.ejs page
router.delete('/:id', async (req, res) => {
  try {
    await Bike.findByIdAndRemove(req.params.id);
    res.redirect('/bikes');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;