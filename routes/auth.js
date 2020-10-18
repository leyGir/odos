const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

/* Authentication */
router.post('/', function(req, res, next) {

  User.findOne({
    username: req.body.username
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.sendStatus(401);
    }

    bcrypt.compare(req.body.password, user.password, function(err, valid) {

      if (err) {
        return next(err);
      } else if (!valid) {
        return res.sendStatus(401);
      }
      // Login is valid...
      // res.send(`Hello ${user.username} !`);

      // Generate a valid JWT which expires in 7 days.
      // An authentication token allows a user to authenticate to a server without sending his or her credentials at every request.
      // When a user authenticate, a token is given to him/her
      const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
      const payload = {
        sub: user._id.toString(),
        exp: exp
      };
      jwt.sign(payload, config.secretKey, function(err, token) {
        if (err) {
          return next(err);
        }
        res.send({
          token: token
        }); // Send the token to the client.
      });

    });

  })

});

module.exports = router;
