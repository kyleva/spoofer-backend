const rateLimit = require('express-rate-limit')

const rateLimiter = props => {
  if (process.env.NODE_ENV === 'production') return rateLimit({ limit: props.limit, reset: props.reset })
  return (req, res, next) => next()
}

module.exports = rateLimiter
