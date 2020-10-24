const jwt = require('jsonwebtoken');
const config = require('../config');

// A REPRENDRE PLUS TARD, POUR LES AUTORISATIONS
// Route protections, not accessible until someone is authenticated
// It uses the token
exports.authenticate = function(req, res, next) {
  // Ensure the header is present.
  const authorization = req.get('Authorization');
  if (!authorization) {
    return res.status(401).send('Authorization header is missing');
  }

  // Check that the header has the correct format.
  const match = authorization.match(/^Bearer (.+)$/);
  if (!match) {
    return res.status(401).send('Authorization header is not a bearer token');
  }

  // Extract and verify the JWT.
  const token = match[1];
  jwt.verify(token, config.secretKey, function(err, payload) {
    if (err) {
      return res.status(401).send('Your token is invalid or has expired');
    } else {
      req.currentUserId = payload.sub;
      next(); // Pass the ID of the authenticated user to the next middleware.
    }
  });
}
