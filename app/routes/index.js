const Router = require('express').Router
const rateLimiter = require('./rate-limiter')

const spoofItem = require('./../spoof-item/spoof-item-controller')
const getAllSpoofItems = spoofItem.getAllSpoofItems
const getSingleSpoofItem = spoofItem.getSingleSpoofItem
const createSpoofItem = spoofItem.createSpoofItem
const viewSpoofItem = spoofItem.viewSpoofItem

const routes = Router()

routes.use('*', rateLimiter({ limit: 5, reset: '1 minute' }))

routes.get('/', (req, res) => res.status(200).send('Lift off, yo!'))

routes.get('/:encoded_id', viewSpoofItem)
routes.get('/collections/posts', getAllSpoofItems)
routes.get('/collections/posts/:encoded_id', getSingleSpoofItem)
routes.post('/collections/posts', createSpoofItem)

module.exports = routes
