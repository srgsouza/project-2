const express = require('express');
const router = express.Router();
const Bike = require('../models/bikes');



// display our basic view of all the usernames
router.get('/', (req, res) => {
  Bike.find({}, (err, Bike) => {
    console.log("Bike.find is running this: {} ")
    res.render('bikes/index.ejs', {
      bikes: Bike
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
  Bike.find({}, (err, Bike) => {
    res.render('bikes/new.ejs', {
      // the variable on the left of the colon is
      // passed into the template/function
      bikes: Bike
    });
  });
});


// post the new or edited bike
router.post('/', (req, res) => {
  console.log(req.body)
  Bike.create(req.body, (err, createdBike) => {
    console.log(createdBike, ' this is the createdBike');
    res.redirect('/bikes');
  });
});

router.post('/:id/like', async (req, res) => {
  try {
    console.log(req.user);
    await req.user.bikes.push(req.params.id);
    await req.user.save();
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
})
// VERSION 1
//display the create page for when creating a new username
router.get('/new', (req, res) => {
  Bike.find({}, (err, Bike) => {
    res.render('bikes/new.ejs', {
      // the variable on the left of the colon is
      // passed into the template/function
      bikes: Bike
    });
  });
});


// VERSION 2
// router.get('/new', (req, res) => {
//   Bike.create(req.body, (err, Bike) => {
//     res.render('bikes/new.ejs', {
//       // the variable on the left of the colon is
//       // passed into the template/function
//       bikes: Bike
//     });
//   });
// });

// Show page for the corresponding Bike
router.get('/:id', async (req, res) => {
    try {
        const data = await Bike.findById(req.params.id);
        res.render('bikes/show.ejs', {
            bike: data,
            index: req.params.id
        })
    } catch (error) {
        console.log(error)
    }
});

// display the edit page for when editing a username
router.get('/:id/edit', (req, res) => {
  Bike.findById(req.params.id, (err, foundBike) => {
      res.render('bikes/edit.ejs', {
        // use the name of the variable you just passed
        // into the callback function
        bike: foundBike
      });
  });
});

router.put('/:id', (req, res) => {
  console.log(req.body, " this is req.body in the put route")
  Bike.findByIdAndUpdate(req.params.id, req.body, (err, updatedBike) => {
    res.redirect("/bikes");
  })
})

// THE OLD DELETE
// router.delete('/:id/delete', (req, res) => {
//
//   Bike.findByIdAndRemove(req.params.id, (err, deletedBike) => {
//     console.log(deletedBike, ' A bike has been deleted...');
//     res.redirect('/bikes');
//   });
// });

router.delete('/:id', async (req, res) => {
  try {
    await Bike.findByIdAndRemove(req.params.id);
    console.log(' Bike has been deleted');
    res.redirect('/bikes');
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
