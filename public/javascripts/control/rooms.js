var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var display = document.getElementById('roomView');
var mq = window.matchMedia("(max-width: 481px)");
var mqMobilePortrait = window.matchMedia("(max-width: 480px)");


$(window).on("resize", function () {
    document.location.reload();
    killPopup();
});

var x;                                                                             //lets just declare these
var y;                                                                             //event positions here for now

//setBoundaryPatterns();                                                              //seting patterns from img tags
setSockets(socket);                                                                //see public/javacripts/control/setSockets

var displayRooms = function () {
    buildRoom(rooms["garage"]);
    buildRoom(rooms["dining"]);
    buildRoom(rooms["bathroom"]);
    buildRoom(rooms["balcony"]);
    buildRoom(rooms["garden"]);
    buildRoom(rooms["bedroom01"]);
    buildRoom(rooms["bedroom02"]);
    buildRoom(rooms["living"]);
    buildRoom(rooms["bedroom03"]);
    buildRoom(rooms["bedroom04"]);
    buildRoom(rooms["boundary"]);
    replaceListeners();
};

//--------------------------------Device Button Functionality----------------------------------------

var deviceListBuilder = function (thisRoom) {
    var myList = document.createElement('ul');
    thisRoom["things"].forEach(function (device) {
        var myButton = document.createElement('input');
        var myItem = document.createElement('li');                                  //create elements for this button
        var myStateText = document.createTextNode(allDevices[device].state);
        setButtonAttributes(myItem, myButton, device);
        handleButtonWithClosure(myButton);
        setButtonListener(myButton);
        appendElementsToList(myList, myItem, myButton, myStateText);
        myItem.setAttribute("class", "displaying");     //TODO: Look out for Items and their Attributes
    });
    appendToDisplay(display, myList);
    if (thisRoom.name !== "boundary") { //TODO: Test popup function of room selection
        openPopup();
    }
    return myList.firstChild.firstChild.value;
};

var handleButtonWithClosure = function (myButton) { //TODO: Fix this cuz it's fucked - eg. Tess plz
    return (function (myButton) {                                                   //handle button press with closure
        socket.on("stateChanged", function (stateChanged) {
            if (myButton.name === stateChanged.nameValue) {
                console.log(stateChanged.nameValue + "State Changed To" + stateChanged.stateValue);
                allDevices[stateChanged.nameValue] = stateChanged.stateValue;
                console.log("Name" + stateChanged.nameValue + "buttons value: " + stateChanged.stateValue);
                myButton.parentNode.lastChild.nodeValue = allDevices[stateChanged.nameValue];
                refreshView();
                roomStatusDisplayController();

            }
            updateLocationIcon(location.currentRoom);
        });
    }(myButton));
};


var setButtonAttributes = function (myItem, myButton, device) {
    myItem.setAttribute('class', 'myButton');                               //set attributes for elements
    myButton.setAttribute('type', 'button');
    myButton.setAttribute('class', 'niceButton');
    myButton.setAttribute('name', device);
    myButton.setAttribute('value', device);
    return myItem.className;
};

var appendToDisplay = function (display, myList) {
    display.appendChild(myList);                                                //append list to div
};


var appendElementsToList = function (myList, myItem, myButton, myStateText) {
    myItem.appendChild(myButton);                                           //append elements to list item
    myItem.appendChild(myStateText);
    try {
        myList.appendChild(myItem);
        return "Appended Child";
    } catch(Error) {
        return "Failed to append child";
    };                                             //append list item to list
};


var setButtonListener = function (myButton) {                                   //add event listener to button

    myButton.addEventListener('click', function (event) {
        socket.emit("buttonPressed", {myName: myButton.name});
        console.log("button pressed");
    });
};

//------------------------------Room Button Functionality----------------------------------------


var buildRoom = function (thisRoom) {
    responsiveRoomDraw(thisRoom, mqMobilePortrait);
};


var responsiveRoomDraw = function (thisRoom, mq) {
    if (mq.matches) {
        thisRoom.mobilePoints = normalizePoints(600, 900, thisRoom.mobilePoints);
        thisRoom.mobilePoints = denormalizePoints(350, 600, thisRoom.mobilePoints);
        drawRoom(thisRoom, thisRoom["mobilePoints"], thisRoom["path"]);
        return "is Mobile";

    } else {
        thisRoom.points = normalizePoints(900, 600, thisRoom.points);
        thisRoom.points = denormalizePoints(900, 600, thisRoom.points);
        drawRoom(thisRoom, thisRoom["points"], thisRoom["path"]);
        return "is Regular";
    }
};


var drawRoom = function (thisRoom, points, path) {
    var count = 0;
    path.moveTo(points[0][0], points[0][1]);
    for (var i = 0; i < points.length; i++) {
        path.lineTo(points[i][0], points[i][1]);
        count++;
    }
    return count;
};


var replaceListeners = function () {
    canvas.addEventListener('click', listener);
};


var removeRoom = function () {
    var nextChild;
    var display = document.getElementById('roomView');
    var count = 0;
    while (nextChild = display.firstChild) {
        display.removeChild(nextChild);
        count++;
    }
    return count;
};

var listener = function (event) {   //TODO: plz test me
    console.log("in listener");
    if (!buttonState === false) {
        getEventCoords(event);
        refreshView();
        roomStatusDisplayController();
        Object.keys(rooms).forEach(function (room) {
            filterRoomButtonClick(rooms[room], x, y);
            if (rooms[room].name !== "boundary") {
                openPopup();
                buttonState = false;
            }
        });
    } else {
        removeRoom();
        refreshView();
        roomStatusDisplayController();
        updateLocationIcon(updateLocationIcon(location.currentRoom));
        buttonState = true;
        closePopup();
    }
};


var filterRoomButtonClick = function (thisRoom, x, y) {
    if (context.isPointInPath(thisRoom.path, x, y)) {
        highlightRoom(thisRoom, "blue");
        //freezeOtherRooms(thisRoom);
        if (thisRoom.name !== "boundary") {
            deviceListBuilder(thisRoom);
        }
        buttonState = false;
    }
};


var getEventCoords = function (event) {
    x = event.x;
    y = event.y;
};

var refreshView = function () { //TODO: Check this on lows res screen
    context.clearRect(0, 0, 900, 600);
};

var highlightRoom = function(thisRoom, acolor){
    context.fillStyle = acolor;
    context.globalAlpha = 0.3;
    context.fill(thisRoom.path);
}

var roomStatusDisplayController = function () {
    Object.keys(allDevices).forEach(function (device) {
        console.log("this room is :" + allDevices[device].room)
        if (allDevices[device].state === "ON") {
            highlightRoom(rooms[allDevices[device].room], "yellow");
        } else if (allDevices[device].state === "OFF") {
            highlightRoom(rooms[allDevices[device].room], "black");
        }
    });
};

var testUpdatedRooms = function () {
    setInterval(function () {
        socket.emit("doBuilding");
        refreshView();
        roomStatusDisplayController();
    }, 6000);
};


var normalizePoints = function (width, height, myPoints) {
    var pointX;
    var pointY;
    var normalizedPoints = [];
    for (var i = 0; i < myPoints.length; i++) {
        pointX = myPoints[i][0] / width;
        pointY = myPoints[i][1] / height;
        normalizedPoints[i] = [pointX, pointY];
        console.log("Normalized point " + i + "-> x:" + pointX + "-> y: " + pointY);
    }
    return normalizedPoints;
};

var denormalizePoints = function (width, height, myPoints) {
    var pointX;
    var pointY;
    var denormalizedPoints = [];
    for (var i = 0; i < myPoints.length; i++) {
        pointX = myPoints[i][0] * width;
        pointY = myPoints[i][1] * height;
        denormalizedPoints[i] = [pointX, pointY];
        console.log("My deNormalized point " + i + "-> x:" + pointX + "-> y: " + pointY);
    }
    return denormalizedPoints;
};