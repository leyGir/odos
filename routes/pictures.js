var express = require('express');
var router = express.Router();
const Picture = require('../models/picture');

/* GET pictures listing. */
router.get('/', function(req, res, next) {
  Picture.find().sort('picture').exec(function(err, pictures) {
    if (err) {
      return next(err);
    }
    res.send(pictures);
  });
});


/* POST new picture */
router.post('/', loadPictureFromParamsMiddleware, function(req, res, next) {
    // Create a new picture from the JSON in the request body
    const newPicture = new Picture(req.body);
    // Save that document
    newPicture.save(function(err, savedPicture) {
      if (err) {
        return next(err);
      }
      // Send the saved document in the response
      res.status(201).send(savedPicture);
    });
  });


//   /* PUT new picture */
router.put('/:id', utils.requireJson, loadPictureFromParamsMiddleware, function (req, res, next) {

  // Update all properties (regardless of whether the are present in the request body or not)
  req.picture.description = req.body.description;
  req.picture.picture = req.body.picture;

  req.picture.save(function (err, savedPicture) {
    if (err) {
      return next(err);
    }

    debug(`Updated picture "${savedPicture.title}"`);
    res.send(savedPicture);
  });
});

function loadPictureFromParamsMiddleware(req, res, next) {

  const pictureId = req.params.id;
  // if (!ObjectId.isValid(pictureId)) {
  //   return pictureNotFound(res, pictureId);
  // }

  Picture.findById(req.params.id, function(err, list) {
    if (err) {
      return next(err);
    }
    // } else if (!picture) {
    //   return pictureNotFound(res, listId);
    // }

    req.picture = picture;
    next();
  });
}

//     /* DELETE new picture */
router.delete('/:id', loadPictureFromParamsMiddleware, function (req, res, next) {
  req.picture.remove(function (err) {
    if (err) {
      return next(err);
    }

    debug(`Deleted picture "${req.picture.description}"`);
    res.sendStatus(204);
  });
});

module.exports = router;


