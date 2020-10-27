const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config');
const bcrypt = require('bcrypt');
const debug = require('debug')('demo:people');
const utils = require('./utils');



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

/**
 * @api {get} /users/:id Request a user's information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Unique identifier of the user
 *
 * @apiSuccess {String} username Username of the user
 * @apiSuccess {String} email  Email of the user
 * @apiSuccess {String} password  Password of the user
 */
router.get('/:id', getUser, utils.authenticate, function(req, res, next) {
  // Check the authorization of the user. Is he authorized to check this thing ?
  if (req.currentUserId != req.user._id) {
    return res.status(403).send("You can't check someone else's data.")
  }
    res.send(req.user);
  
});

/* POST new user */
router.post('/', function(req, res, next) {
  // Get the password
  const password = req.body.password;
  const costFactor = config.bcryptCostFactor;
  // Hash the password
  bcrypt.hash(password, costFactor, function(err, passwordHash) {
    if (err) {
      return next(err);
    }
    // Create a new document from the JSON in the request body
    const newUser = new User(req.body);
    newUser.set('password', passwordHash);
    // Save that document
    newUser.save(function(err, savedUser) {
      if (err) {
        return next(err);
      }
      debug(`New user "${savedUser.username}"`);
      // Send the saved document in the response
      res.send(savedUser);
    });
  });
});

// PATCH the username of a user
router.patch('/:id', getUser, utils.authenticate, function(req, res, next) {
  // Check the authorization of the user. Is he authorized to change this thing ?
  if (req.currentUserId != req.user._id) {
    return res.status(403).send("You can't change someone else's data.")
  }

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
router.delete('/:id', getUser, utils.authenticate, function(req, res, next) {
  // Check the authorization of the user. Is he authorized to delete this thing?
  if (req.currentUserId != req.user._id) {
    return res.status(403).send("You can't delete another user.")
  }
  req.user.remove(function(err) {
    if (err) {
      return next(err);
    }

    // debug(`Deleted user "${req.user.username}"`);
    res.send(`"${req.user.username}" deleted`).sendStatus(204);
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
