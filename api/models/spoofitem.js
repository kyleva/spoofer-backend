const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpoofItemSchema = mongoose.Schema({
	name: {type: String},
	title: {type: String, required: true,  trim: true, minlength: 1,},
    desc: {type: String, required: true, max: 300,  trim: true, minlength: 1,},
    img: {type: String, required: true}
});

module.exports = mongoose.model('SpoofItem', SpoofItemSchema);