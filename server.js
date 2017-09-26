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



//Adding Data Manually to DB
//const SpoofItem     = require('./api/models/spoofitem');

// const spoofItem = new SpoofItem({
// 'title': 'Spoofer Title 3',
// 'img': 'https://scontent.forf1-2.fna.fbcdn.net/v/t31.0-8/16252166_10158670472275131_2340890356782076580_o.jpg?oh=dd161e0cf4dd9742dc626316d1f363e3&oe=5A3FD9C2',
// 'desc': 'Kogi pop-up hashtag fam prism. Try-hard letterpress single-origin coffee cliche keytar. Subway tile waistcoat meditation mumblecore cliche.'
// });
// spoofItem.save((err) => {
// console.log(err, 'saved')
// })