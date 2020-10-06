var express = require('express');
var router = express.Router();
const Test = require('../models/test');
/* GET tests testing. */
router.get('/', function(req, res, next) {
  res.send('tests')
  // Test.find().sort('test').exec(function(err, tests) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.send(tests);
  // });
});
module.exports = router;

/* POST new test */
router.post('/', function(req, res, next) {
  // Create a new document from the JSON in the request body
  const newTest = new Test(req.body);
  // Save that document
  newTest.save(function(err, savedTest) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedTest);
  });
});
