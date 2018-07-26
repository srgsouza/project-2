
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator'); // npm library that handles validation - ie email has proper format.
const bcrypt = require('bcryptjs'); // used for the hashing of passwords

// This UserSchema variable stores the schema (properties) for the user - using this since we can't add methods to the User model directly
const UserSchema = new mongoose.Schema({
  username: {
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
  },
  displayname: String,
  trails: [{type:Schema.Types.ObjectId, ref: 'Trail'}],
  bikes: [{ type: Schema.Types.ObjectId, ref: 'Bike' }]
});

UserSchema.methods.validPassword = async function (password) {
  // console.log("Testing this password: " + password)
  const valid = await bcrypt.compare(password, this.password);
  return valid;
}

UserSchema.pre('save', async function (next) {
  const existingUser = await User.findOne({username: this.username});
  if(!existingUser) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})


// create/register the mongoose model
const User = mongoose.model('User', UserSchema);  // this is the model

// export the model
module.exports = User;



