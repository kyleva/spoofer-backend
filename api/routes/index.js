const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home Page Info')
});

router.post('/', (req, res) => {
  
  
})



module.exports = router;