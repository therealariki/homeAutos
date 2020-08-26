
var setIconPosition = function(posX, posY){
    context.fillStyle = "blue";
    context.globalAlpha = 1;
    context.fillRect(posX, posY, 30, 30);
};

var updateLocationIcon = function(aRoom){
    switch(aRoom){
        case "garage":
            console.log("Im in the garage");
            setPosition(rooms.garage.iconPosition);
            break;
        case "living":
            console.log("Im in the living room");
            setPosition(rooms.living.iconPosition);
            break;
        case "bathroom":
            console.log("Im in the bathroom");
            setPosition(rooms.bathroom.iconPosition);
            break;
        case "balcony":
            console.log("Im on the balcony");
            setPosition(rooms.balcony.iconPosition);
            break;
        case "dining":
            console.log("Im in the dining room");
            setPosition(rooms.dining.iconPosition);
            break;
        case "garden":
            console.log("Im in the garden");
            setPosition(rooms.garden.iconPosition);
            break;
        case "bedroom01":
            console.log("Im in the master bedroom");
            setPosition(rooms.bedroom01.iconPosition);
            break;
        case "bedroom02":
            console.log("Im in the bedroom");
            setPosition(rooms.bedroom02.iconPosition);
            break;
        case "bedroom03":
            console.log("Im in the bedroom");
            setPosition(rooms.bedroom03.iconPosition);
            break;
        case "bedroom04":
            console.log("Im in the bedroom");
            setPosition(rooms.bedroom04.iconPosition);
            break;
    }
}

var setPosition = function(position){
    console.log("setting positions"  + position[0] + position[1]);
    setIconPosition(position[0], position[1]);
}