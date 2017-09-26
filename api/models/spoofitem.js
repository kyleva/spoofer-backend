const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpoofItemSchema = mongoose.Schema({
	//spoof_name: mongoose.Schema.Types.ObjectId,
	title: {type: String, required: true},
    desc: {type: String, reuired: true, max: 300},
    img: {type: String, reuired: true}
    //places_id: {type: Date, default: Date.now}
});


module.exports = mongoose.model('SpoofItem', SpoofItemSchema);