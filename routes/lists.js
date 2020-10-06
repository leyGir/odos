const express = require('express');
const router = express.Router();
const List = require('../models/list');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:people');

// GET list of lists
router.get('/', function(req, res, next) {
  // res.send('lists')
  List.find().sort('list').exec(function(err, lists) {

    if (err) {
      return next(err);
    }

    res.send(lists);
  });
});


// POST new list
router.post('/', loadListFromParamsMiddleware, function(req, res, next) {
  const newList = new List(req.body);
  newList.save(function(err, savedList) {
    if (err) {
      return next(err);
    }
    res.status(201).send(savedList);
  });
});


// PUT the name of a list
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


//
function loadListFromParamsMiddleware(req, res, next) {

  const listId = req.params.id;
  // if (!ObjectId.isValid(listId)) {
  //   return listNotFound(res, listId);
  // }

  List.findById(req.params.id, function(err, list) {
    if (err) {
      return next(err);
    }
    // } else if (!list) {
    //   return listNotFound(res, listId);
    // }

    req.list = list;
    next();
  });
}

module.exports = router;
