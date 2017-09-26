const express = require('express');
const router = express.Router();
const SpoofItem = require('../models/spoofitem');

// middleware to use for api requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); 
});

//show all posts
router.get('/posts', (req, res) => {
  // const mongoose = require('mongoose')
  // const start = mongoose.connect('mongodb://localhost:27017/ogspoofer', {
  //   useMongoClient: true
  // })
  // .then((db) => {
  //   SpoofItem.find({}, function(spoofItems){
  //     res.status(200).json(spoofItems)
  //   })
  // })
  SpoofItem.find().then((spoofItems) => {
    res.status(200).json(spoofItems)
  })
})

module.exports = router;