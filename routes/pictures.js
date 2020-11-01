// ------ REQUIRE ------
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:people');

// ------ WEBSOCKET ------
const webSocket = require('../websocket/dispatcher');

// ------ MODELS ------
const Picture = require('../models/picture');
const List = require('../models/list');


// ------ RESOURCES ODOS ------
/**
 * Show all pictures
 * Add a aggregation to count pictures for a liste // je ne sais pas s'il faut finalement le faire ?
 * Example : http://localhost:3000/users/:userId/pictures
 * Pagination
 * Example : http://localhost:3000/users/:userId/pictures?pageSize=3
 */

router.get('/pictures', function (req, res, next) {
  Picture.find().count(function (err, total) {
    if (err) {
      return next(err);
    }

    // Parse pagination parameters from URL query parameters
    const { page, pageSize } = func.getPaginationParameters(req);

    // Aggregation
    Picture.aggregate([
      {
        $lookup: {
          from: 'lists',
          localField: '_id',
          foreignField: 'pictureId',
          as: 'listedPicture'
        }
      },
      {
        $unwind:
        {
          path: "$listedPicture",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          listedPicture: {
            $cond: {
              if: '$listedPicture',
              then: 1,
              else: 0
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          description: { $first: '$description' },
          location: { $first: '$location' },
          picture: { $first: '$picture' },
          creation_date: { $first: '$creation_date' },
          last_mod_date: { $first: '$last_mod_date' },
          listedPicture: { $sum: '$listedPicture' }
        }
      },
      {
        $sort: {
          description: 1
        }
      },
      {
        $skip: (page - 1) * pageSize
      },
      {
        $limit: pageSize
      }
    ], (err, pictures) => {
      if (err) {
        return next(err);
      }
      console.log(pictures);

      // Add the Link header to the response
      func.addLinkHeader('/pictures', page, pageSize, total, res);

      // Websocket
      const nbPictures = pictures.length;
      webSocket.nbPictures(nbPictures);

      res.send(pictures.map(picture => {

        // Transform the aggregated object into a Mongoose model.
        const serialized = new Picture(picture).toJSON();

        // Add the aggregated property.
        serialized.listedPicture = picture.listedPicture;

        return serialized;
      }));
    });
  });
});


/* GET pictures pictureing. */
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
  res.send(req.picture);
});


// -- POST --
/**
 * Create a picture
 * Example : http://localhost:3000/users/:uersId/pictures
 * Example body for Postman :
  {
       "description": "First picture",
       "location":
       {
            "type": "Point",
            "coordinates": [ 48.862725, 2.287592 ]
       },
        "picture": "https://source.unsplash.com/random"
  }
 */

/* POST new picture */
router.post('/', utils.authenticate, getPicture, function (req, res, next) {
  // Retrieve the user ID from the URL.
  const user = req.params.userId;
  // Create a new picture from the JSON in the request body
  const newPicture = new Picture(req.body);
  newPicture.set('user', user);
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
router.patch('/:pictureId', utils.authenticate, getPicture, function (req, res, next) {
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
router.delete('/:pictureId', utils.authenticate, getPicture, function (req, res, next) {
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
  Picture.findById(req.params.pictureId, function (err, picture) {
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
