import cors from 'cors'
import url from 'url'
import whitelist from './whitelist'

export const setupCors = function(app) {
  // app.enable('trust proxy')
  console.log('hellllllLLLLLLLO???', app)
  app.use(
    cors({
      origin: (origin, cb) => {
        return cb(null, true)
        console.log(origin)
        if (!origin || whitelist.includes(origin) || process.env.NODE_ENV !== 'production') {
        }

        cb(new Error(`Not allowed by CORS: ${origin}`), false)
      }
    })
  )
}
