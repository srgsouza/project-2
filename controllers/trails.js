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

router.get('/new', (req, res) => {
		res.render('trails/new.ejs')
});


router.post('/', (req, res) => {
	Trail.create(req.body, (err, createdTrail) => {
		console.log(createdTrail);
		res.redirect('/')
	});
});

	
// router.get('/:id', async (req, res) => {
// 	try {
// 		const data = await Trail.findById(req.params.id);
// 		res.render('trails/show.ejs');
// 			trail: data,
// 			id: req.params.id
// 		}
// 	} catch (error) {
// 		console.log(error)
// 	}
// })


module.exports = router;