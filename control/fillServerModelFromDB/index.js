/**
 * Created by Adam on 18/09/2015.
 */

var DAO = require('../houseDAO');
var allDevices = require('../../model/devices');

var fillServerModelFromDB = function () {
    Object.keys(allDevices).forEach(function (device) {
        DAO.asyncGetState(device, function (state) {
            allDevices[device].state = state;
            //console.log("StatesDevice: " + device + " : " + allDevices[device]);
        });
        DAO.retrieveTotalEnergyArray(device, function(array, time){
            allDevices[device].dailyEnergyArray = array;
        })
    });
};

module.exports = fillServerModelFromDB;