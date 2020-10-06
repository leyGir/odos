const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Schema for lists
const listSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'List name is required'],
    unique: true,
    validate: {
      // Manually validate uniqueness to send a "pretty" validation error rather than a MongoDB duplicate key error
      validator: listNameUnique,
      message: 'List name {VALUE} already exists'
    }
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  modificationDate: {
    type: Date,
    default: Date.now
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: [true, 'A list must belong to an user']
  // },
  // pictures: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Picture'
  // },
  public: { type: Boolean, default: false }
});
// Model from the schema and export it
module.exports = mongoose.model('List', listSchema);

// Verify if the list's name is unique and manually send a message error other thant the MongoBD one
function listNameUnique(value) {
  const ListModel = mongoose.model('List', listSchema);
  return ListModel.findOne().where('name').equals(value).exec().then( (existingList) => {
    return !existingList || existingList._id.equals(this._id)
  });
}
