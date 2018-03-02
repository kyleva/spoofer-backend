const mongoose = require('mongoose')
const Schema = mongoose.Schema

import Counter from './../counter/counter-model'

const SpoofItemSchema = mongoose.Schema({
  _id: { type: Number, index: true },
  title: { type: String, required: true, trim: true, minlength: 1 },
  desc: { type: String, required: true, max: 300, trim: true, minlength: 1 },
  img: { type: String, required: true },
  created_at: Date,
  name: { type: String }
})

SpoofItemSchema.pre('save', function(next) {
  var doc = this
  Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { seq: 1 } })
    .then(counter => {
      doc._id = counter.seq
      doc.created_at = new Date()
      next()
    })
    .catch(err => next(error))
})

module.exports = mongoose.model('SpoofItem', SpoofItemSchema)
