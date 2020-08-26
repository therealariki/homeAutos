var Device = require('./models/Device.js');

//var mongoose = require('mongoose');

var functions = {};

functions.toggleButton = function(device, callback){
    //do set set state for device in db
    var doc = Device.findOne({deviceName: device}, function (err, doc) {
        if (err) {
            console.log(err);
        }
        if(!doc){
            console.log("doc is null");
        }
        if (doc["deviceState"] === "OFF") {
            doc["deviceState"] = "ON";
        } else {
            doc["deviceState"] = "OFF";
        }
        Device.update({deviceName: device},{$set:{ deviceState: doc.deviceState}}, {multi:false}, function(err, numAffected){
            console.log("affected: "+ numAffected.toString());
        });
        console.log("state: " + doc.deviceState);
        //pass the parameter to the callback after its new value assigned
        callback(doc.deviceState);
    });
};
functions.asyncGetDeviceState = function(device, callback){             //retreive device state from db
    var doc = Device.findOne({deviceName: device}, function (err, doc) {
            if (!doc) {
                console.log("doc in nulls");
            }
            callback (doc.deviceState);
        });
};
functions.turnOffByRoom = function (aroom) {
    var doc;
    doc = Device.find({deviceRoom: aroom}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        if (!docs) {console.log("doc is null");
        }
        docs.forEach(function (deviceDoc){
            Device.update({deviceName: deviceDoc.deviceName},{$set: { deviceState: "OFF"}}, {multi:false}, function(err, numAffected){
                console.log("affected: "+ numAffected);
            });
            daoFunctions.retrieveArrayAndPushTime(deviceDoc.deviceName, "OFF", function(timeArray, state){
                if(deviceDoc.deviceState === "ON") {
                    daoFunctions.insertLogArray(timeArray, deviceDoc.deviceName, "offTime");
                }
            });
        });
    });
};
functions.retrieveStates = function(devices) {
    devices.forEach(function (device) {
        var docs = Device.find({deviceName: {$in: ["light01", "light02", "light03", "light04", "light05", "light06", "light07", "light08", "light09", "light10", "light11"]}}, function (err, doc) {
            if (err) {
                console.log(err);
            }
            if (!doc) {
                console.log("no Doc");
            }
            console.log("in the thing");
        });
    });
};

module.exports = functions;