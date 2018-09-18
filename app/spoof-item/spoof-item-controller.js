const sanitize = require('mongo-sanitize')

const SpoofItem = require('./spoof-item-model')
const decode = require('./../utility/index.js').decode
const encode = require('./../utility/index.js').encode

const createSpoofItem = (req, res) => {
  const { title, desc, img } = sanitize(req.body)
  const spoofItem = new SpoofItem({ title, desc, img })

  spoofItem.save((err, s) => {
    if (err) return console.log(`this is your error ${err}`)
    const name = encode(s._id)
    res.status(200).json({
      title: s.title,
      desc: s.desc,
      img: s.img,
      name: name
    })
  })
}

const getSingleSpoofItem = (req, res, next) => {
  const base52Id = req.params.encoded_id
  const id = decode(base52Id)

  SpoofItem.findOne({ _id: id })
    .then(spoofItem => {
      res.status(200).json({
        title: spoofItem.title,
        desc: spoofItem.desc,
        img: spoofItem.img
      })
    })
    .catch(err => {
      res.send(err)
    })
}

const getAllSpoofItems = (req, res, next) => {
  SpoofItem.find()
    .then(spoofItems => {
      res.status(200).json(spoofItems)
    })
    .catch(err => {
      console.log(`Error in 'getAllSpoofItems' method: ${err}`)
      next()
    })
}

const viewSpoofItem = (req, res, next) => {
  const base52Id = req.params.encoded_id
  const id = decode(base52Id)

  SpoofItem.findOne({ _id: id }).then(spoofItem => {
    res.status(200).render('spoof-item', {
      title: spoofItem.title,
      desc: spoofItem.desc,
      img: spoofItem.img
    })
  })
}

module.exports = {
  createSpoofItem,
  getSingleSpoofItem,
  getAllSpoofItems,
  viewSpoofItem
}
