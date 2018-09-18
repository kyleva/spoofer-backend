const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const bootstrapCounter = require('./app/counter/counter-controller')
const setupCors = require('./app/routes/cors')
const routes = require('./app/routes')

// SETUP DB
require('./config/mongoose')

// INIT APP
const app = express()

// SETUP BASIC HTTP HEADER PROTECTIONS
app.use(helmet())

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
