const mongoose = require('mongoose');


const trailSchema = new mongoose.Schema({
	name: {type: String, required: true},
	location: {type: String, required: true},
	length: Number,
	level: {type: String, required: true}
});

module.exports = mongoose.model('Trail', trailSchema);