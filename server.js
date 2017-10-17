const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  router = express.Router(),
  RateLimit = require("express-rate-limit"),
  Counter = require("./api/models/counter")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

//rate limiting
app.enable("trust proxy") // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
})
app.use("/api/", apiLimiter)

// configure app to use bodyParser()
// this will let us get the data from a POS
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// CONNECT TO DATABASE -------------------------------
var mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
})
var db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

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
