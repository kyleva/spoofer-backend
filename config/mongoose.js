const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.Promise = global.Promise
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = { mongoose }
