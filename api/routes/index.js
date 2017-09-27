const express = require('express');
const router = express.Router();
const SpoofItem = require('../models/spoofitem');
//const SpoofController = require('../controllers/spoofer');

router.use(function(req, res, next) {
  console.log('Something is happening on index');
  next(); 
});

router.get('/', (req, res) => {
  res.send('Home Page Info')
});

//render html template when viewing root/:name
router.get('/:name', (req, res) => {
  const name = req.params.name;
  SpoofItem.findOne({name: name}).then((spoofItems) => {
    res.status(200).render('post')
  }) 
});

//create route to display name link
module.exports = router;