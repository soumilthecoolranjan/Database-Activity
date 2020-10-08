var ball;
var database,myposition; 


function setup(){
    createCanvas(500,500);

    database = firebase.database();
    console.log(database);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    var ballposition = database.ref("ball/position");
    ballposition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
        
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0); 

    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x: ball.x + x, // ball.x = ball.x -1 // 249, 248,247
        y: ball.y + y // ball.y = ball.y + 0 // 250,250,250
    })
}

function readPosition(data) {
position = data.val();
ball.x = position.x;
ball.y = position.y;
}    

function showError(){
    console.log("error");
}
