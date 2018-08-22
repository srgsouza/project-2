const express = require('express');
const router = express.Router();
const Trail = require("../models/trails")
const request = require('request');

const User = require('../models/users');
const geocode = require('../api/geocode');
const weather = require('../api/weather');

router.get('/search', (req, res) => {
	let mountainBikeProject = "200320520-bb520cea5200b21d7530c95bf2166f64";
	request("https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&maxResults=6&key=200320520-bb520cea5200b21d7530c95bf2166f64", (err, response, body) => {
		console.log(err);
		body = JSON.parse(body)
		res.render ('trails/search.ejs',
		{body: body});
	});
});

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

// Get Geo Location
router.post('/location', (req, res) => {
	let username = null;
	if (req.user !== undefined) {
		username = req.user.username;
	}
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
				body = JSON.parse(body);
				res.render('trails/search.ejs',
					{
						body: body,
						username: username
					});
			});

		}
	});
})

router.get('/search', (req, res) => {
	let mountainBikeProject = "200320520-bb520cea5200b21d7530c95bf2166f64";
	request({
		url: `https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200320520-bb520cea5200b21d7530c95bf2166f64`
	}, (err, response, body) => {
		console.log(err);
		res.render('trails/search.ejs',
			{ body: body });
	});
});

// Get trail id (from mtb project api). Insert in MongoDB, also update trails array of user 
router.post('/:id/like', async (req, res) => {	
	try {
		const trail = {trailId: req.params.id}; // object to be inserted in the db
		await Trail.create(trail, (err, createdTrail) => {
		});
		await Trail.findOne({ trailId: req.params.id }, (err, mongoDbTrail) => {			
			 req.user.trails.push(mongoDbTrail._id);
			 req.user.save();
		});
		res.redirect('/users')
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