import { Router } from 'express'
import { proxy } from 'http-proxy-middleware'

import { rateLimiter } from './rate-limiter'

import {
  getAllSpoofItems,
  getSingleSpoofItem,
  createSpoofItem,
  viewSpoofItem
} from './../spoof-item/spoof-item-controller'

export const routes = Router()

routes.use('*', rateLimiter({ limit: 5, reset: '1 minute' }))

routes.get('/', (req, res) => res.status(200).send('Lift off, yo!'))

routes.get('/:encoded_id', viewSpoofItem)
routes.get('/collections/posts', getAllSpoofItems)
routes.get('/collections/posts/:encoded_id', getSingleSpoofItem)
routes.post('/collections/posts', createSpoofItem)
