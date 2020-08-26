
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var weeklySchema = new Schema({
    weeklyEnergy: Array
});

var collectionName = "homeautos";

module.exports = mongoose.model('Weekly', weeklySchema);
