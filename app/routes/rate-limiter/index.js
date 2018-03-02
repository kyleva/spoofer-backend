import rateLimit from 'express-rate-limit'

export const rateLimiter = props => {
  if (process.env.NODE_ENV === 'production') return rateLimit({ limit: props.limit, reset: props.reset })
  return (req, res, next) => next()
}
