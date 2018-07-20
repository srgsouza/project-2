const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema({
  name: String,
  type: String
});

module.exports = mongoose.model('Bike', bikeSchema);
