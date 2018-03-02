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

// ROUTES FOR OUR API
app.use('/', routes)

// CORZ
setupCors(app)

// START DA APP
app.listen(process.env.PORT || 3000)
