const express = require('express');
const router = express.Router();
const User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User
    .find()
    .sort('username')
    .exec(function(err, users) {
      if (err) {
        return next(err);
      }
    res.send(users);
  });
});

/* GET user id */
router.get('/:id', getUser, function(req, res, next) {
  User
    .find(req.user)
    .exec(function(err, user) {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
});

/* POST new user */
router.post('/', function(req, res, next) {
  // Create a new document from the JSON in the request body
  const newUser = new User(req.body);
  // Save that document
  newUser.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedUser);
  });
});

// PATCH the username of a user
router.patch('/:id', getUser, function(req, res, next) {
  // Update all properties (regardless of whether they are in the request body or not)
  if (req.body.username !== undefined) {
    req.user.username = req.body.username;
  }

  if (req.body.email !== undefined) {
    req.user.email = req.body.email;
  }

  if (req.body.password !== undefined) {
    req.user.password = req.body.password;
  }

  req.user.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }

    // debug(`Updated user "${savedUser.username}"`);
    res.send(savedUser);
  });
});


/* DELETE user */
router.delete('/:id', getUser, function(req, res, next) {
  req.user.remove(function(err) {
    if (err) {
      return next(err);
    }

    // debug(`Deleted user "${req.user.username}"`);
    res.sendStatus(204);
  });
});


// Get the user by id
function getUser(req, res, next) {
  // get the id of the user by the param
  const id = req.params.id;
  // if (!ObjectId.isValid(id)) {
  //   return userNotFound(res, id);
  // }

  // get the user by id
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    // } else if (!user) {
    //   return userNotFound(res, id);
    // }
    req.user = user;
    next();
  });
}


module.exports = router;
