const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');

// Define the schema for users
const userSchema = new Schema({
  username: {
      type : String,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      required: [true, "can't be blank"],
      unique: true,
    //   validate: {
    //     validator: usernameUnique,
    //     message: 'List name {VALUE} already exists'
    // }
  },
  email:{
      type : String,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      required: [true, "can't be blank"],
      unique: true,
    //   validate: {
    //     validator: emailUnique,
    //     message: 'List name {VALUE} already exists'
    // }
  },
  //A faire! Hash password
  password:{
      type : String,

  },
  registrationDate:{
    type: Date,
    default: Date.now
  },
});

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);

// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});