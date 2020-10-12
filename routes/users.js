const express = require('express');
const router = express.Router();
const User = require('../models/user');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   User.find().sort('username').exec(function(err, users) {
//     if (err) {
//       return next(err);
//     }
//     res.send(users);
//   });
// });


// GET user of all users
router.get('/', function(req, res, next) {
  // res.send('users')

  User.find().sort('username').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});

router.get('/id', getUser, function(req, res, next) {
  User.find(req.user).exec(function(err, user) {
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


///////////////////

/* PUT/modify username */
router.put('/', function(req, res, next) {
  User.find().sort('name').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});


/* DELETE user */
router.delete('/', function(req, res, next) {
  User.find().sort('name').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});
module.exports = router;