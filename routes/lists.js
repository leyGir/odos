const express = require('express');
const router = express.Router({
  mergeParams: true
});
const List = require('../models/list');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:lists');
const utils = require('./utils');

// GET list of all lists
router.get('/', utils.authenticate, getList, function(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId) {
    return res.status(403).send("You can't see these lists")
  }
  // Find the lists
  List
    .find({
      user: req.currentUserId
    })
    .populate('user')
    .populate('picture')
    .sort('name')
    .exec(function(err, lists) {
      if (err) {
        return next(err);
      }
      res.send(lists);
    });
});

/* GET one specific list */
router.get('/:listId', utils.authenticate, getList, function(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId || req.currentUserId != req.list.user) {
    return res.status(403).send("You can't see this list")
  }
  // Find the list
  res.send(req.list);
  List
    .find(req.list)
    .populate('user')
    .populate('picture')
    .exec(function(err, list) {
      if (err) {
        return next(err);
      }
      res.send(list);
    });
});


// POST new list
router.post('/', utils.authenticate, getList, function(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId) {
    return res.status(403).send("You can't create your list there")
  }
  // Retrieve the user ID from the URL.
  const user = req.params.userId;
  // res.send(req.params.userId);
  // Create list and send response...
  const newList = new List(req.body);
  newList.set('user', user);

  newList.save(function(err, savedList) {
    if (err) {
      return next(err);
    }

    debug(`New list "${savedList.name}"`);
    res.status(201).send(savedList);
  });
});


// PUT the name of a list
router.patch('/:listId', utils.authenticate, getList, function(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId || req.currentUserId != req.list.user) {
    return res.status(403).send("You can't edit this list")
  }
  // Update all properties (regardless of whether they are in the request body or not)
  if (req.body.name !== undefined) {
    req.list.name = req.body.name;
  }

  if (req.body.public !== undefined) {
    req.list.public = req.body.public;
  }

  if (req.body.picture !== undefined) {
    req.list.picture.push(req.body.picture);
    // req.list.picture = req.body.picture;
  }

  req.list.modificationDate = new Date();

  req.list.save(function(err, savedList) {
    if (err) {
      return next(err);
    }

    debug(`Updated list "${savedList.name}"`);
    res.send(savedList);
  });
});


//DELETE one list
router.delete('/:listId', utils.authenticate, getList, function(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId || req.currentUserId != req.list.user) {
    return res.status(403).send("You can't delete this list")
  }
  // Delete the list
  req.list.remove(function(err) {
    if (err) {
      return next(err);
    }

    debug(`Deleted list "${req.list.name}"`);
    res.sendStatus(204);
  });
});

// Get the list by id
function getList(req, res, next) {
  // get the id of the list by the param
  const listId = req.params.listId;
  // if (!ObjectId.isValid(listId)) {
  //   return listNotFound(res, listId);
  // }
  // get the list by id
  List.findById(req.params.listId, function(err, list) {
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
