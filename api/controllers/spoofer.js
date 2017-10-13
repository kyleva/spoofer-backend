const SpoofItem = require("../models/spoofitem");
const base52 = require('./../algo/base52');

const SpoofItemController = (module.exports = {
  create: (req, res) => {
    let shortUrl = '';
    const { title, desc, img } = req.body;
    const spoofer = new SpoofItem({ title, desc, img});

    spoofer.save((err, spoofItem) => {
      if (err) return console.log(`this is your error ${err}`);
      shortUrl = process.env.ROOT_URL + base52.encode(spoofer._id);
      // res.json(spoofItem);
      res.send({'shortUrl': shortUrl});
    })

  },
  detail: (req, res) => {
    const { title, desc, img, name } = req.params;
    SpoofItem.findOne({ name: name }).then(spoofItems => {
      res.status(200).json({
        title: spoofItems.title,
        desc: spoofItems.desc,
        img: spoofItems.img
      });
    });
  },
  list: (req, res) => {
    SpoofItem.find().then(spoofItems => {
      res.status(200).json(spoofItems);
    });
  }
});
