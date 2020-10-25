// ------ REQUIRE ------
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:people');

// ------ WEBSOCKET ------


// ------ MODELS ------
const Picture = require('../models/picture');

/* GET pictures listing. */
router.get('/', function (req, res, next) {
  Picture.find().sort('picture').exec(function (err, pictures) {
    if (err) {
      return next(err);
    }
    res.send(pictures);
  });
});


/* GET one specific picture */
router.get('/:pictureId', getPicture, function (req, res, next) {
  Picture.find(req.picture).exec(function (err, picture) {
    if (err) {
      return next(err);
    }
    res.send(picture);
  });
});


/* POST new picture */
router.post('/', getPicture, function (req, res, next) {
  // Retrieve the user ID from the URL.
  const user = req.params.userId;
  // Create a new picture from the JSON in the request body
  const newPicture = new Picture(req.body);
  newPicture.set('picture', picture);
  // Save that document
  newPicture.save(function (err, savedPicture) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    debug(`New picture "${savedPicture.description}"`);
    res.status(201).send(savedPicture);
  });
});


//   /* PATCH one picture */
router.patch('/:pictureId', getPicture, function (req, res, next) {
  // res.send(req.picture.name);
  // Update all properties (regardless of whether they are in the request body or not)
  if (req.body.name !== undefined) {
    req.picture.description = req.body.name;
  }

  if (req.body.public !== undefined) {
    req.picture.public = req.body.public;
  }

  req.picture.last_mod_date = new Date();

  req.picture.save(function (err, savedPicture) {
    if (err) {
      return next(err);
    }

    debug(`Updated picture "${savedPicture.description}"`);
    res.send(savedPicture);
  });
});



///* DELETE one picture */
router.delete('/:pictureId', getPicture, function (req, res, next) {
  req.picture.remove(function (err) {
    if (err) {
      return next(err);
    }

    debug(`Deleted picture "${req.picture.description}"`);
    res.sendStatus(204);
  });
});

// Get the picture by id
function getPicture(req, res, next) {
  // get the id of the picture by the param
  const pictureId = req.params.pictureId;
  // if (!ObjectId.isValid(pictureId)) {
  //   return pictureNotFound(res, pictureId);
  // }
  // get the picture by id
  List.findById(req.params.pictureId, function (err, list) {
    if (err) {
      return next(err);
    }
    // } else if (!picture) {
    //   return pictureNotFound(res, pictureId);
    // }

    req.picture = picture;
    next();
  });
}

module.exports = router;
