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


//post spoofer 

router.post('/posts', (req, res) => {
  let item = new SpoofItem();
	const { title, description, image } = req.body
  // now you have title, description, and image variables set
  item.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Item created!' });
  });

});

//show all posts
// router.get('/posts', (req, res) => {
// 	SpoofItem.find()
//   .then((spoof) => {
//   	// res = response
//     // set status to 200 (not actually necessary but good practice)
//     // send json object w/ spoof grabbed from db
//     res.status(200).json(spoof)
//   })
// })

module.exports = router;