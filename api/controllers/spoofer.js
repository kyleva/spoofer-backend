const SpoofItem = require('../models/spoofitem');
const randomstring = require("randomstring");

const SpoofItemController = module.exports = {
    create: (req,res) => {
        let name = randomstring.generate({length:8, charset: 'alphabetic'});
        const {title, desc, img} = req.body;
        const spoofer = new SpoofItem({ title, desc, img, name});

        spoofer.save((err) => {
            if (err) return console.log(err)
            console.log('saved to database');
            res.json(spoofer);
        })
    },
    detail: (req, res) => {
        const name = req.params.name;
        SpoofItem.findOne({name: name}).then((spoofItems) => {
            res.status(200).json(spoofItems)
        })
    },
    list: (req, res) => {
        SpoofItem.find().then((spoofItems) => {
          res.status(200).json(spoofItems)
        })
    }
}