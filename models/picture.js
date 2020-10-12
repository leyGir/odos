const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for pictures
const pictureSchema = new Schema({
  description: {
    type: String,
    required: [true, 'List name is required'],
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  geoloaction: String, // comment faire avec la géolocalisation ?
  picture: String, // comment faire pour dire que cela est une image?
  creation_date: {
    type: Date,
    default: Date.now
  },
  last_mod_date:{
    type: Date,
    default: Date.now
  },
  // userId: {

  // },
  // listId:{

  // }
});


// Create the model from the schema and export it
module.exports = mongoose.model('Picture', pictureSchema);


// Check that the picture is unique and send an "better" error message other than MongoDB
function pictureNameUnique(value) {
  const PictureModel = mongoose.model('Picture', pictureSchema);
  return PictureModel.findOne().where('picture').equals(value).exec().then( (existingList) => {
    return !existingList || existingList._id.equals(this._id)
  });
}
