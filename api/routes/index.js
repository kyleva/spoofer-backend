const express = require('express');
const router = express.Router();
const SpoofItem = require('../models/spoofitem');
const proxy = require('http-proxy-middleware');
const IndexController = require('../controllers/index');


// middleware to use for api requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening on index!');
    next(); // make sure we go to the next routes and don't stop here
  });
  

router.get('/:name', IndexController.detail);

router.get('/', IndexController.home);


module.exports = router;