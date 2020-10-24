const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config');
const bcrypt = require('bcrypt');
const debug = require('debug')('demo:people');
const jwt = require('jsonwebtoken');

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
    res.send(req.user);
});

/* POST new user */
router.post('/', function(req, res, next) {
  // Get the password
  const password= req.body.password;
  const costFactor = config.bcryptCostFactor;
  // Hash the password
  bcrypt.hash(password, costFactor, function(err, passwordHash){
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

// A REPRENDRE PLUS TARD, POUR LES AUTORISATIONS
// Route protections, not accessible until someone is authenticated
// It uses the token
// function authenticate(req, res, next) {
//   // Ensure the header is present.
//   const authorization = req.get('Authorization');
//   if (!authorization) {
//     return res.status(401).send('Authorization header is missing');
//   }
//
//   // Check that the header has the correct format.
//   const match = authorization.match(/^Bearer (.+)$/);
//   if (!match) {
//     return res.status(401).send('Authorization header is not a bearer token');
//   }
//
//   // Extract and verify the JWT.
//   const token = match[1];
//   jwt.verify(token, config.secretKey, function(err, payload) {
//     if (err) {
//       return res.status(401).send('Your token is invalid or has expired');
//     } else {
//       req.currentUserId = payload.sub;
//       next(); // Pass the ID of the authenticated user to the next middleware.
//     }
//   });
// }


module.exports = router;
