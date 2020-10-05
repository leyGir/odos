const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for pictures
const pictureSchema = new Schema({
  description: String,
  geoloaction: String,
  picture: String,
  creation_date: Date,
  last_mod_date: Date,
});
// Create the model from the schema and export it
module.exports = mongoose.model('Picture', pictureSchema);