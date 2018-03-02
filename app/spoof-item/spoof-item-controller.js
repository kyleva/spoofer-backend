import sanitize from 'mongo-sanitize'

// import SpoofItem from './spoof-item-model'
import Counter from './../counter/counter-model'
import { decode, encode } from './../utility/index.js'

const SpoofItem = require('./spoof-item-model')

export function createSpoofItem(req, res) {
  const { title, desc, img } = sanitize(req.body)
  const spoofItem = new SpoofItem({ title, desc, img })

  spoofItem.save((err, s) => {
    if (err) return console.log(`this is your error ${err}`)
    console.log(s)
    const name = encode(s._id)
    res.status(200).json({
      title: s.title,
      desc: s.desc,
      img: s.img,
      name: name
    })
  })
}

export function getSingleSpoofItem(req, res, next) {
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

export function getAllSpoofItems(req, res, next) {
  SpoofItem.find()
    .then(spoofItems => {
      res.status(200).json(spoofItems)
    })
    .catch(err => {
      console.log(`Error in 'getAllSpoofItems' method: ${err}`)
      next()
    })
}

export function viewSpoofItem(req, res, next) {
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
