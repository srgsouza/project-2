// Require mongoose
// Declare mongoose Schema 
// Use mongoose schema (declare key/pair data)
// Create a mongoose model from such schema 
// export model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bikeSchema = new Schema({
//   name: String,  // add validation ie minlength etc. also add validation in the client (via javascript validation)
//   frame: String,
//   size: String,
//   group: String,
//   type: String,
// });

const userSchema = new Schema({
  username: String,  // add validation ie minlength etc. also add validation in the client (via javascript validation)
  password: String,
  displayname: String
});


const User = mongoose.model('User', userSchema);  // this is the model

// export the model
module.exports = User;




// #########

// UserSchema.pre('save')