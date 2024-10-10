
let canvas; 
let xPos = 0;
let yPos = 0;
let easing = .1;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style("z-index", -2);
    //background(225);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    clear();

    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);
    drawThing(xPos, yPos);


}


function drawThing(_x, _y){
    //alien

    //head
    strokeWeight(1);
    fill(0, 255,0);
    ellipse(_x,_y, 30,40);
    
   //left eye
    strokeWeight(0);
    fill(0, 0,0);
    ellipse(_x - 10,_y, 10,5);
    //right eye
    strokeWeight(0);
    fill(0, 0,0);
    ellipse(_x + 10,_y, 10,5);
}