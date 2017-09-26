const express = require('express'),
bodyParser = require('body-parser'),
app     = express(),
router = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONNECT TO DATABASE -------------------------------
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/spooferTest';
mongoose.connect(mongoDB, {
useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// ROUTES FOR OUR API
// =============================================================================

router.get('/', function(req, res) {
res.json({ message: 'hooray! welcome to our api!' });	
});


// BRING IN OUR ROUTES -------------------------------
// const index = require('./api/routes/index');
const spoofItemRoute = require('./api/routes/spoofitem');


// REGISTER OUR ROUTES -------------------------------
app.use('/api', spoofItemRoute);



app.listen(3000);