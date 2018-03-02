import { Router } from 'express'
import { proxy } from 'http-proxy-middleware'

import { rateLimiter } from './rate-limiter'

import { getAllSpoofItems, getSingleSpoofItem, createSpoofItem } from './../spoof-item/spoof-item-controller'

export const routes = Router()

routes.use('*', rateLimiter({ limit: 5, reset: '1 minute' }))

routes.get('/', (req, res) => res.status(200).send('Lift off, yo!'))

routes.get('/posts', getAllSpoofItems)
routes.get('/posts/:encoded_id', getSingleSpoofItem)
routes.post('/posts', createSpoofItem)
