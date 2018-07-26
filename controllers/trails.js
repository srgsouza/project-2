const express = require('express');
const router = express.Router();
const Trail = require("../models/trails")

// router.post('/search', (req, res) => {
// 	let mountainBikeProject = "200320520-bb520cea5200b21d7530c95bf2166f64";
// 	request("https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200320520-bb520cea5200b21d7530c95bf2166f64")
// }



router.get('/', async (req, res) => {
	try {
		const data = await Trail.find({});
		res.render('trails/index.ejs', 
		{ "trailsList": data });
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
		res.redirect('/trails')
	});
});

router.post('/:id/like', async (req, res) => {
	try {
		console.log(req.user);
		console.log("Got in the post /:id/like route");
		await req.user.trails.push(req.params.id);
		await req.user.save();
		console.log(req.user.trails);
		
		res.redirect('/users')
	// const likedTrail = await Trail.create(req.user)
	} catch (error) {
		console.log(error);
		
	}
})




router.get('/:id', async (req, res) => {
	try {
		const data = await Trail.findById(req.params.id);
		res.render('trails/show.ejs', {
			trail: data,
			index: req.params.id
		})
	} catch (error) {
		console.log(error)
	}
});

router.get('/:id/edit', (req, res) => {
	Trail.findById(req.params.id, (err, editTrail) => {
		res.render("trails/edit.ejs", {
			trail: editTrail
		});
	});
});

router.put('/:id', async (req, res) => {
	try {
		await Trail.findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.redirect('/trails');
	} catch(err) {
		console.log(error)
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Trail.findByIdAndRemove(req.params.id)
		res.redirect('/trails');
	} catch(err) {
		console.log(error)
	}
});



module.exports = router;