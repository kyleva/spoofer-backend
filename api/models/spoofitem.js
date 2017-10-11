const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpoofItemSchema = mongoose.Schema({
	name: {type: String, unique: true},
	title: {type: String, required: true},
    desc: {type: String, required: true, max: 300},
    img: {type: String, required: true}
});

module.exports = mongoose.model('SpoofItem', SpoofItemSchema);