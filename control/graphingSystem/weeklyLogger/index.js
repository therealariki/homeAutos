var DAO = require('../../houseDAO/index');

weeklyLoggingFunctions = {};
var logger = require('../logger/index');

//function to log weekly usage
weeklyLoggingFunctions.weeklyLogTimer = function(){
    var devices = require('../../../model/devices');
    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 10, 0, 0) - now;
    if (millisTill10 < 0) {
        millisTill10 += 86400000;
    }
    setTimeout(function(){

                DAO.weeklyUpdate(function(weeklyEnergies){
                    console.log("ENERGY: " + weeklyEnergies);
                });

        console.log("Doing Weekly Logging");
    }, millisTill10);
}


module.exports = weeklyLoggingFunctions;
