import cors from 'cors'
import url from 'url'
import './whitelist.json'

export const setupCors = app => {
  app.enable('trust proxy')

  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin || whitelist.includes(origin) || process.env.NODE_ENV !== 'production') {
          return cb(null, true)
        }

        cb(new Error(`Not allowed by CORS: ${origin}`), false)
      }
    })
  )
}
