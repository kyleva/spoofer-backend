const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

router.get('/', (req, res) => {
  res.send('Home Page Info')
});

router.post('/', (req, res) => {
  
  
})



module.exports = router;