const cors = require('cors')
const whitelist = require('./whitelist')

const setupCors = function(app) {
  app.use(
    cors({
      origin: (origin, cb) => {
        return cb(null, true)
        if (!origin || whitelist.includes(origin) || process.env.NODE_ENV !== 'production') {
        }

        cb(new Error(`Not allowed by CORS: ${origin}`), false)
      }
    })
  )
}

module.exports = setupCors
