const express = require('express');
const router = express.Router();
//const SpoofItem = require('../models/spoofitem');
const SpoofController = require('../controllers/spoofer');

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next(); 
});

router.get('/', (req, res) => {
  res.send('Home Page Info')
});

// router.post('/', (req, res) => {
//     const {title, desc, img} = req.body;
//     const spoofer = new SpoofItem({ title, desc, img });
//     console.log(`Spoof Item: ${spoofer} ${spoofer.title} - ${spoofer.desc} - ${spoofer.img}` );

//     spoofer.save((err) => {
//       if (err) return console.log(err)
//       console.log('saved to database');
//       res.send('you\'re item has been saved');
//     })

// })

router.post('/', SpoofController.create);

module.exports = router;