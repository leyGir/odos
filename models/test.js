const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for lists
const testsSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Test', testsSchema);
