var express = require('express');
var router = express.Router();
const Picture = require('../models/picture');

/* GET pictures listing. */
router.get('/', function(req, res, next) {
  Picture.find().sort('description'||'geolocation'||'picture'||'creation_date'||'last_mod_date').exec(function(err, pictures) {
    if (err) {
      return next(err);
    }
    res.send(pictures);
  });
});

/* POST new picture */
router.post('/', function(req, res, next) {
    // Create a new picture from the JSON in the request body
    const newPicture = new Picture(req.body);
    // Save that document
    newPicture.save(function(err, savedPicture) {
      if (err) {
        return next(err);
      }
      // Send the saved document in the response
      res.send(savedPicture);
    });
  });


  /* PUT new picture */
router.put('/', function(req, res, next) {
    // Modify a picture from the JSON in the request body
    this.model.set({editable: true});
    // Cancel modification
    this.picture.set({editable: false});
  });

    /* DELETE new picture */
router.delete('/', function(req, res, next) {
    // Delete a picture from the JSON in the request body
    this.picture.destroy();
  });

module.exports = router;


