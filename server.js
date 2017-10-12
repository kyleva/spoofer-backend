const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  router = express.Router();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// configure app to use bodyParser()
// this will let us get the data from a POS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONNECT TO DATABASE -------------------------------
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// ROUTES FOR OUR API
// =============================================================================

// BRING IN OUR ROUTES -------------------------------
const index = require("./api/routes/index");
const spoofItemRoute = require("./api/routes/spoofitem");

// REGISTER OUR ROUTES -------------------------------

//set up cross orgin resource sharing

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use("/api", cors(corsOptions), spoofItemRoute);
app.use("/", index);

// VIEWS
// =============================================================================
app.set("views", __dirname + "/api/views");
app.set("view engine", "ejs");

app.listen(3000);
