
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   email: String,  // add validation ie minlength etc. also add validation in the client (via javascript validation)
//   password: String,
//   displayname: String
// });

const validator = require('validator'); // npm library that handles validation - ie email has proper format.
const bcrypt = require('bcryptjs'); // used for the hashing of passwords

// This UserSchema variable stores the schema (properties) for the user - using this since we can't add methods to the User model directly
const UserSchema = new mongoose.Schema({
  displayname: { type: String, required: false, minlength: 1, trim: true },
  email: {
    type: String, required: true, minlength: 1, trim: true, unique: true,
    validate: {
      validator: validator.isEmail,  // abobe validator block can be writen like this instead
      message: '{value} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  }
});

// create the mongoose model
const User = mongoose.model('User', UserSchema);  // this is the model

// export the model
module.exports = User;



