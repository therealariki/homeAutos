var DAO = require('../../houseDAO');

dailyLoggingFunctions = {};
var logger = require('../logger/index');

//function to log daily usage

dailyLoggingFunctions.dailyLogTimer = function(){
    var devices = require('../../../model/devices');
    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 23, 0, 0) - now;
    if (millisTill10 < 0) {
        millisTill10 += 86400000; // it's after 12.15am, try 12.15am tomorrow.
    }
    setTimeout(function(){
        Object.keys(devices).forEach(function(device){
            logger.logDevices(device);
            DAO.refreshOnTimeOffTimeArrays(device, devices[device].state);
        });
        console.log("Doing Daily Logging");
    }, millisTill10);
}

module.exports = dailyLoggingFunctions;