const SpoofItem = require("../models/spoofitem");
const base52 = require('./../algo/base52');

const SpoofItemController = (module.exports = {
  create: (req, res) => {
    let shortUrl = '';
    const { title, desc, img } = req.body;
    const spoofer = new SpoofItem({ title, desc, img});
    spoofer.save((err, spoofItem) => {
      if (err) return console.log(`this is your error ${err}`);
      name = base52.encode(spoofer._id);
      res.send({'The end of the url is': name});
    })
  },
  detail: (req, res) => {
    const { title, desc, img} = req.params;
    const base52Id = req.params.encoded_id;
    const id = base52.decode(base52Id);

    SpoofItem.findOne({ _id: id }).then(spoofItems => {
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
