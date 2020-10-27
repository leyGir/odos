const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema for users
const userSchema = new Schema({
  username: {
      type : String,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      required: [true, "can't be blank"],
      unique: true,

  },
  email:{
      type : String,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      required: [true, "can't be blank"],
      unique: true,
  },
  password:{
      type : String,
      minlength: 3,
      maxlength: 50,
      required: [true, "can't be blank"],
  },
  registrationDate:{
    type: Date,
    default: Date.now
  },
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// Do not send the password in the response
userSchema.set('toJSON', {
   transform: transformJsonUser
});
function transformJsonUser(doc, json, options) {
  // Remove the hashed password from the generated JSON.
  delete json.password;
  return json;
}

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);
