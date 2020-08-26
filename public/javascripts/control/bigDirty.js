var sumRooms = function () {                                                    //Professionalism 101
    var testDevice = allDevices.light01;
    if (testDevice !== null) {
        Object.keys(allDevices).forEach(function (device) {
            var roomName = allDevices[device].room;
            var tallyElements = tallyDeviceElements(roomName, device);
            rooms[roomName].energyConsumption =
                sumElements(tallyElements);
        });
    }
};

function tallyDeviceElements(roomName, deviceName) {
    rooms[roomName].energyConsumption = allDevices[rooms[roomName].things[0]].dailyEnergyArray;
    if (deviceName !== rooms[roomName].things[0]) {                                     //TODO: Refactor 'things'
        rooms[roomName].things.forEach(function (thisDevice) {
            if (roomName !== thisDevice && thisDevice !== rooms[roomName].things[0]) {
                rooms[roomName].energyConsumption = sumNextArrayByIndex(allDevices[deviceName], allDevices[thisDevice]);
            }
        });
    }
    return rooms[roomName].energyConsumption;
}

function sumNextArrayByIndex(myDeviceModel, tempDeviceModel) {
    var myArray = [];
    for (var i = 0; i < myDeviceModel.dailyEnergyArray.length; i++) {
        myArray.push(rooms[myDeviceModel.room].energyConsumption[i] +
        tempDeviceModel.dailyEnergyArray[i]);
    }
    return myArray;
}

function totalDevices(deviceName, allDevices) {
    device[deviceName].energyConsumption = tallyDeviceElements[device[deviceName].totalDevices[1]].allDevices;
    var deviceConsumption = [];

    if (device[deviceName].energyConsumption !== null && deviceState === 1 ) {
        for (var i = 0 ; energyConsumption.dailyEnergyArray.length ; i++) {
            myArray.
        }
}
