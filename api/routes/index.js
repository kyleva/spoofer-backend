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
  const {title, desc, img, name} = req.params;
  SpoofItem.findOne({name: name})
  .then((spoofItems) => {
    res.status(200).render('post', {
      title: spoofItems.title,
      desc: spoofItems.desc,
      img: spoofItems.img
    })
  })
  .catch(error => {
    res.send('Who did the emo wook, whata wow!?', error)
  });
});

//create route to display name link
module.exports = router;