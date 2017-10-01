const express = require('express'),
bodyParser = require('body-parser'),
app     = express(),
router = express.Router();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// configure app to use bodyParser()
// this will let us get the data from a POS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONNECT TO DATABASE -------------------------------
var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// ROUTES FOR OUR API
// =============================================================================

// BRING IN OUR ROUTES -------------------------------
const index = require('./api/routes/index');
const spoofItemRoute = require('./api/routes/spoofitem');


// REGISTER OUR ROUTES -------------------------------
app.use('/api', spoofItemRoute);
app.use('/', index);

// VIEWS
// =============================================================================
app.set('views', __dirname + '/api/views');
app.set('view engine', 'ejs');

app.listen(3000);