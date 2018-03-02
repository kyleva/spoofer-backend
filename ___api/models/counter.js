const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CounterSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
})

module.exports  = mongoose.model("counter", CounterSchema)