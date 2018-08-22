const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema({
  name: String,
  type: String,
  price: String,
  image: String
});

module.exports = mongoose.model('Bike', bikeSchema);
