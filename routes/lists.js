var express = require('express');
var router = express.Router();
const List = require('../models/list');
/* GET lists listing. */
router.get('/', function(req, res, next) {
  res.send('lists')
  // List.find().sort('list').exec(function(err, lists) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.send(lists);
  // });
});
module.exports = router;

/* POST new list */
router.post('/', function(req, res, next) {
  // Create a new document from the JSON in the request body
  const newList = new List(req.body);
  // Save that document
  newList.save(function(err, savedList) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedList);
  });
});
