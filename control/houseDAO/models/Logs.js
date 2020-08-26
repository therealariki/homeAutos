var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var logSchema = new Schema({
    name: String,
    onTime: Array,
    offTime: Array,
    watts: Number
});
//logSchema.set("collection", "logs");
var collectionName = "homeautos";

module.exports = mongoose.model('Log', logSchema);
//var Log = mongoose.model('Log', logSchema);