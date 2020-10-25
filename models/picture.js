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
    // validate: {
    //   validator: pictureUnique,
    //   message: 'This picture descrition {VALUE} already exists'
    // }
  },
  geoloaction: {
    location: {
      type: {
        type: String,
        required: true,
        enum: [ 'Point' ]
      },
      coordinates: {
        type: [ Number ],
        required: true,
        // Allows to validate the format we pass to it
        validate: {
          validator: validateGeoJsonCoordinates,
          message: '{VALUE} is not a valid longitude/latitude(/altitude) coordinates array'
        }
      }
    }
  }, 
  picture: String,
  creation_date: {
    type: Date,
    default: Date.now, 
    required: true
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



// Create a geospatial index on the location property.
pictureSchema.index({ location: '2dsphere' });

// Customize the behavior of user.toJSON() (called when using res.send)
pictureSchema.set('toJSON', {
    transform: transformJsonPicture, // Modify the serialized JSON with a custom function
    virtuals: true // Include virtual properties when serializing documents to JSON
});

// ------ FUNCTIONS ------
/**
 * Validate a GeoJSON coordinates array (longitude, latitude and optional altitude).
 */
function validateGeoJsonCoordinates(value) {
    return Array.isArray(value) && value.length >= 2 && value.length <= 3 && value[0] >= -180 && value[0] <= 180 && value[1] >= -90 && value[1] <= 90;
}

/**
 * Removes extra MongoDB properties from serialized users.
 */
function transformJsonPicture(doc, json, options) {

  // Remove MongoDB _id & __v (there's a default virtual "id" property)
  delete json._id;
  delete json.__v;

  return json;
}

// Create the model from the schema and export it
module.exports = mongoose.model('Picture', pictureSchema);


// Check that the picture is unique and send an "better" error message other than MongoDB
// function pictureDescriptionUnique(value) {
//   const PictureModel = mongoose.model('Picture', pictureSchema);
//   return PictureModel.findOne().where('picture').equals(value).exec().then( (existingPicture) => {
//     return !existingPicture || existingPicture._id.equals(this._id)
//   });
// }
