const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Define the schema for pictures
const pictureSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Picture description is required'],
    minlength: 3,
    maxlength: 50,
    unique: true,
    validate: {
      validator: pictureUnique,
      message: 'This picture descrition {VALUE} already exists'
    }
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});


// Create the model from the schema and export it
module.exports = mongoose.model('Picture', pictureSchema);


// Check that the picture is unique and send an "better" error message other than MongoDB
function pictureUnique(value) {
  const PictureModel = mongoose.model('Picture', pictureSchema);
  return PictureModel.findOne().where('picture').equals(value).exec().then( (existingPicture) => {
    return !existingPicture || existingPicture._id.equals(this._id)
  });
}
