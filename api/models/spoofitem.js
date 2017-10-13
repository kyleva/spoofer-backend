const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = Schema({
    _id: {type: String},
    seq: { type: Number, default: 0 }
});

const counter = mongoose.model('counter', CounterSchema);

const SpoofItemSchema = mongoose.Schema({
    _id: {type: Number, index: true},
	title: {type: String, required: true,  trim: true, minlength: 1,},
    desc: {type: String, required: true, max: 300,  trim: true, minlength: 1,},
    img: {type: String, required: true}
});

SpoofItemSchema.pre('save', function(next){
    console.log('pre save on spoof item');
    var doc = this;
    // find the url_count and increment it by 1
    counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
        if (error) {
            console.log('error in pre save');
            return next(error);
        }
           
        // set the _id of the urls collection to the incremented value of the counter
        doc._id = counter.seq;
        doc.created_at = new Date();
        next();
    });
});

module.exports = mongoose.model('SpoofItem', SpoofItemSchema);