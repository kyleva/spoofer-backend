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
            res.send('you\'re item has been saved');
        })
    }
}