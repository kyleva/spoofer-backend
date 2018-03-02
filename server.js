import express from 'express'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'

import { bootstrap as bootstrapCounter } from './app/counter/counter-controller'
import { setupCors } from './app/routes/cors'
import { routes } from './app/routes'

// SETUP DB
import './config/mongoose'

// INIT APP
const app = express()

// SETUP BASIC HTTP HEADER PROTECTIONS
app.use(helmet.default())

// BOOTSTRAP PROJECT
bootstrapCounter()

// CONFIGURE BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// CORZ
setupCors(app)

// ROUTES FOR OUR API
app.use('/', routes)

// VIEWZ
app.set('views', __dirname + '/app/views')
app.set('view engine', 'ejs')

// START DA APP
app.listen(process.env.PORT || 3000)
