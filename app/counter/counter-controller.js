const Counter = require('./counter-model')

const bootstrap = () => {
  Counter.findOne({}, (err, result) => {
    if (result == null) {
      const counter = new Counter({
        _id: 'url_count',
        seq: 10000
      }).save()
    }
  })
}

module.exports = bootstrap
