var express = require('express');
var router = express.Router();
const List = require('../models/list');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:people');

/* GET lists listing. */
router.get('/', function(req, res, next) {
  // res.send('lists')
  List.find().sort('list').exec(function(err, lists) {
    if (err) {
      return next(err);
    }
    res.send(lists);
  });
});
module.exports = router;

/* POST new list */
router.post('/', function(req, res, next) {
  // Create a new document from the JSON in the request body
  const newList = new List(req.body);
  // Save that documentS
  newList.save(function(err, savedList) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedList);
  });
});

router.put('/:id', loadListFromParamsMiddleware, function(req, res, next) {
  // res.send(req.list.name);
  // Update all properties (regardless of whether they are in the request body or not)
  req.list.name = req.body.name;
  // req.list.gender = req.body.gender;
  // req.list.birthDate = req.body.birthDate;

  req.list.save(function(err, savedList) {
    if (err) {
      return next(err);
    }

    debug(`Updated list "${savedList.name}"`);
    res.send(savedList);
  });
});


function loadListFromParamsMiddleware(req, res, next) {

  const listId = req.params.id;
  if (!ObjectId.isValid(listId)) {
    return listNotFound(res, listId);
  }

  List.findById(req.params.id, function(err, list) {
    if (err) {
      return next(err);
    } else if (!list) {
      return listNotFound(res, listId);
    }

    req.list = list;
    next();
  });
}
