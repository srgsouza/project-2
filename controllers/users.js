const express = require('express');
const router = express.Router();

const User  = require('../models/users');

// display the index page - show all items
router.get('/', async (req, res) => {
  try {
    const data = await User.find({});
    res.render('users/index.ejs', { "usersList": data });
  } catch (error) {
    console.log(error);
  }
});

// create new - Shows the Form
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

// find bike by ID and render the show.ejs page
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

// Create new - Insert new item in the DB
router.post('/', async (req, res) => {
  await User.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/users');
    }
  })
})
//  after the create call. if 
// // Create new - Insert new item in the DB
// router.post('/', async (req, res) => {
//   await Bike.create(req.body, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/bikes');
//     }
//   })
// })



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