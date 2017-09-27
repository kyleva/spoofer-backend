const express = require('express');
const router = express.Router();
const SpoofController = require('../controllers/spoofer');

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
router.get('/posts', SpoofController.list);

module.exports = router;