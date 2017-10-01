const SpoofItem = require('../models/spoofitem');

const IndexController = module.exports = {
    detail: (req, res) => {
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
          res.status(500).json({ error })
        })
    },
    
    home: (req, res) => {
      res.send('Home Page Info')
    }
}