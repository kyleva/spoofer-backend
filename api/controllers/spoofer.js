const SpoofItem = require('../models/spoofitem');

const SpoofItemController = module.exports = {
    create: (req,res) => {
        const {title, desc, img} = req.body;
        const spoofer = new SpoofItem({ title, desc, img });

        spoofer.save((err) => {
            if (err) return console.log(err)
            console.log('saved to database');
            res.send('you\'re item has been saved');
        })
    }
}