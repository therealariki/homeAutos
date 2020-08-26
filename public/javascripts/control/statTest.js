dojo.require("dojox.charting.Chart2D");
dojo.require("dojox.charting.plot2d.Pie");
dojo.require("dojox.charting.action2d.Highlight");
dojo.require("dojox.charting.action2d.MoveSlice");
dojo.require("dojox.charting.action2d.Tooltip");
dojo.require("dojox.charting.themes.CubanShirts");
dojo.require("dojox.charting.widget.SelectableLegend");
dojo.require("dojox.charting.widget.Legend");


function filterReportPrototype(k,o){
    return true; //see JSLint suggestion for the  for ( k in object) cycle
}

var retrieveValues = function () {
    var power = [];
    Object.keys(rooms).forEach(function (room) {
        power.push(rooms[room]);
    });
    return power;
};

function dsnChart(roomModel){
    sumRooms();
    var dsnArr=[];
    for (var room in roomModel){
        if (filterReportPrototype(room, roomModel)){
            dsnArr.push({
                y: roomModel[room].energyConsumption,
                text: roomModel[room].name,
                tooltip: (function(){
                    var myString = "";
                    roomModel[room].things.forEach(function(thing){
                        myString += thing + ": "+ floatFormatter(sumElements(allDevices[thing].dailyEnergyArray)) + " - ";
                    })
                    myString += "Total: "+ floatFormatter(roomModel[room].energyConsumption);
                    return myString;
                }()),
                fontColor: "black",
                color: roomModel[room].color
            });
        }
    }

    console.debug("Array of rooms : " , dsnArr);

    var c = new dojox.charting.Chart2D("reportChartDiv");
    c.addPlot("default", {
        type: "Pie",
        radius: 200,
        labelOffset: -40,
        shadow:true,
        stroke:"gray",
        labelWiring: "cccc",
        labelStyle: "columns",
        labelSize: 50
    }).setTheme(dojox.charting.themes.CubanShirts);
    c.addSeries("DSN", dsnArr);
    var a1 = new dojox.charting.action2d.Tooltip(c, "default");
    var a = new dojox.charting.action2d.MoveSlice(c, "default", {
        duration: 2000,
        scale: 1.1,
        shift: 10
    });
    var a2 = new dojox.charting.action2d.Highlight(c, "default");


    c.render();

    //
    //var selectableLegend = new dojox.charting.widget.SelectableLegend({
    //    chart: c,
    //    outline: false,
    //    horizontal: false
    //}, "reportChartLegendDiv");

}



var floatFormatter = function(number){
    var result = Math.round(number*10000)/10000;
    return result;
}