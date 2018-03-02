const SpoofItem = require('../models/spoofitem')
const base52 = require('./../algo/base52')
const counter = require('./../models/counter')
const sanitize = require('mongo-sanitize')

const create = (req, res) => {
  const { title, desc, img } = sanitize(req.body)
  const spoofer = new SpoofItem({ title, desc, img })

  spoofer.save((err, spoofItem) => {
    if (err) return console.log(`this is your error ${err}`)
    const name = base52.encode(spoofer._id)
    res.status(200).json({
      title: spoofItem.title,
      desc: spoofItem.desc,
      img: spoofItem.img,
      name: name
    })
  })
}

const detail = (req, res) => {
  const { title, desc, img } = req.params
  const base52Id = req.params.encoded_id
  const id = base52.decode(base52Id)

  SpoofItem.findOne({ _id: id })
    .then(spoofItems => {
      res.status(200).json({
        title: spoofItems.title,
        desc: spoofItems.desc,
        img: spoofItems.img
      })
    })
    .catch(err => {
      res.send(err)
    })
}

const list = (req, res) => {
  SpoofItem.find().then(spoofItems => {
    res.status(200).json(spoofItems)
  })
}

module.exports = { create, detail, list }
