var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var deviceSchema = new Schema({
    deviceName: String,
    deviceState: String,
    deviceRoom: String
});
var collectionName = "homeautos";

module.exports = mongoose.model('Device', deviceSchema);
//var Device = mongoose.model('Device', deviceSchema);