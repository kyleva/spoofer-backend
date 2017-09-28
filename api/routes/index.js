const express = require('express');
const router = express.Router();
const SpoofItem = require('../models/spoofitem');
const proxy = require('http-proxy-middleware');

module.exports = (app) => {
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
      res.status(200).json({ error })
    });
  });

  // Ran into some issues -- commenting out for now
  // app.use('/[^a-zA-Z]', proxy({
  //   target: process.env.FRONTEND_URL,
  //   changeOrigin: true,
  //   strict: false
  // }));

  return router;
}