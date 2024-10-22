const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');

// Schema for lists
const listSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'List name is required'],
    unique: true
    // validate: {
    //   validator: nameUnique,
    //   message: 'List name {VALUE} already exists'
    // }
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  modificationDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: [true, 'A list must belong to an user'],
    // default: '5f840ec9baa3a856541d879c'
  },
  picture: [{
    type: Schema.Types.ObjectId,
    ref: 'Picture'
  }],
  public: { type: Boolean, default: false }
});

// Model for lists
module.exports = mongoose.model('List', listSchema);

// Check that the list name is unique and send an "better" error message other than MongoDB
// function listNameUnique(value) {
//   const ListModel = mongoose.model('List', listSchema);
//   return ListModel.findOne().where('name').equals(value).exec().then( (existingList) => {
//     return !existingList || existingList._id.equals(this._id)
//   });
// }
//

listSchema.plugin(uniqueValidator, { message: 'List name {VALUE} already exists' });
