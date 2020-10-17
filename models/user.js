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
  //A faire! Hash password
  password:{
      type : String,
      required: [true, "can't be blank"],


  },
  registrationDate:{
    type: Date,
    default: Date.now
  },
});

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
