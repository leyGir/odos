const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for lists
const listSchema = new Schema({
  name: String,
  // name: {
  //   type: String,
  //   minlength: 3,
  //   required: [true, 'Name is required']
  // },
  // creationDate: {
  //   type: Date,
  //   default: Date.now
  // },
  // modificationDate: {
  //   type: Date,
  //   default: Date.now
  // },
  // pictures: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Picture'
  // },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: [true, 'A list must belong to a user']
  // },
  // public: Boolean
});
// Create the model from the schema and export it
module.exports = mongoose.model('List', listSchema);
