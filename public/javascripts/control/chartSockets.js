
var socket = io.connect("http://onetime1.herokuapp.com/");
var setSockets = function (socket) {

    socket.on('nowBuilding', function (builder) {
        Object.keys(builder.myDevices).forEach(function (device) {
            allDevices[device] = builder.myDevices[device];
            rooms[allDevices[device].room].energyConsumption = sumElements(allDevices[device].dailyEnergyArray);
        });
        setTimeout(function () {
                sumRooms();
                dsnChart(retrieveValues());

        }, 3000);
    });


    socket.on('connect', function () {
        console.log("connected to client");
    });
};


function sumElements(myArray){
    var sum = 0;
    for(var i = 0; i < 7; i++){
        sum += myArray[i];
    }
    return sum;
}