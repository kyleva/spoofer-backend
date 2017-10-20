const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const router = express.Router()
const RateLimit = require("express-rate-limit")
const Counter = require("./api/models/counter")
const {mongoose} = require('./config/mongoose')


//rate limiting
app.enable("trust proxy") // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
const apiLimiter = new RateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
})
app.use("/api/", apiLimiter)

// configure app to use bodyParser()
// this will let us get the data from a POS
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// POPULATE DB W/ COUNTER COLLECTION
// =============================================================================
Counter.findOne({}, (err, result) => {
  console.log(err, result)
  if (result == null) {
    const counter = new Counter({
      _id: "url_count",
      seq: 10000
    }).save()
  }
})

// ROUTES FOR OUR API
// =============================================================================

// BRING IN OUR ROUTES -------------------------------
const index = require("./api/routes/index")
const spoofItemRoute = require("./api/routes/spoofitem")

// REGISTER OUR ROUTES -------------------------------

//set up cross orgin resource sharing

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use("/api", cors(corsOptions), spoofItemRoute)
app.use("/", index)

// VIEWS
// =============================================================================
app.set("views", __dirname + "/api/views")
app.set("view engine", "ejs")

app.listen(process.env.PORT || 3000)
