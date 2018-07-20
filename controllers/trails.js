const express = require('express');
const router = express.Router();

const Trail = require("../models/trails")

router.get('/', async (req, res) => {
	try {
		const data = await Trail.find({});
		res.render('trails/index.ejs', { "trailsList": data });
	} catch (error) {
		console.log(error);
	}
});

// router.get('/', async (req, res) => {
//   try {
//     const data = await Bike.find({});
//     res.render('bikes/index.ejs', { "bikesList": data });
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;