const SpoofItem = require("../models/spoofitem")
const base52 = require("./../algo/base52")

const IndexController = (module.exports = {
  detail: (req, res) => {
    const base52Id = req.params.encoded_id
    const id = base52.decode(base52Id)

    SpoofItem.findOne({ _id: id })
      .then(spoofItems => {
        res.status(200).render("post", {
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
    res.send("Home Page Info")
  }
})
