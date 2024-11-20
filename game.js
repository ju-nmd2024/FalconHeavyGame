let canvasX = 800;
let canvasY = 550;

function setup() {
  createCanvas(canvasX, canvasY);
}

let canvasX = 800;
let canvasY = 550;

function setup() {
  createCanvas(canvasX, canvasY);
}

//Game loads in non initialized state
let gameState = 0;

//Colour variables
let white = "rgb(255,255,255)";
let red = "rgb(255,0,0)";
let black = "rgb(0,0,0)";

let x = canvasX / 2; //start halfway across the canvas
let y = 0; //Start at the top of the vanvas
let rotation = 0; //Initial rotation is 0
let speed = 0; //Intial speed is 0

let velocityX = 0; //Velocity in the x-direction
let velocityY = 0; //Velocity in the y-direction
let scaleFactor = 0.3; //Size of rocket
let thrustPower = 0.3; //Max thrust of rocket
let drag = 0.98; //Drag slows down the rocket

//Start button variables
let rectX = canvasX / 2;
let rectY = canvasY / 2;
let rectLength = 200;
let rectHeight = 100;

function draw() {
  //if the button has been clicked called the moveCharacter and drawCharacter functions
  //gamestate is set in the drawButton function.
  //background(black);
  //if (gameState === 1) {
    //moveCharacter();
    //drawCharacter(x, y, rotation, scaleFactor);
  //} else {
    //if the gamestate is 0 then called the drawButton function to allow the
    //player to start the game
    //drawButton(); 

  fill(white);
  rect(-25, -160, 50, 300, 10);


  }
}

function drawCharacter(x, y, rotation, scaleFactor) {
  push();

  translate(x, y);
  rotate(rotation); //Apply rotation
  scale(scaleFactor); //Apply scaling

  //Main rocket
  fill(white);
  rect(-25, -160, 50, 300, 10);

  //Side booster rockets
  rect(-65, -80, 40, 220, 10); //Left booster
  rect(25, -80, 40, 220, 10); //Right booster

  //Curved nose cone for main rocket
  fill(white);
  beginShape();
  vertex(-25, -150);
  bezierVertex(-10, -190, 10, -190, 25, -150);
  endShape(CLOSE);

  //Curved nose cones for side boosters
  beginShape();
  vertex(-65, -70);
  bezierVertex(-55, -100, -35, -100, -25, -70);
  endShape(CLOSE);

  beginShape();
  vertex(25, -70);
  bezierVertex(35, -100, 55, -100, 65, -70);
  endShape(CLOSE);

  //Red lines on central rocket
  stroke(red);
  strokeCap(SQUARE);
  strokeWeight(1 / scaleFactor); //Adjust the storke weight as the rocket is scaled
  line(-15, -150, -15, 140); //Left stripe
  line(15, -150, 15, 140); //Right stripe

  //Little windows on main rocket
  noStroke();
  fill(black);
  ellipse(0, -120, 8, 8); //Top window
  ellipse(0, -90, 8, 8); //Middle window
  ellipse(0, -60, 8, 8); //Bottom window

  // Black lines on booster rockets
  stroke(black);
  line(-55, -30, -55, 100); //Left booster stripe
  line(55, -30, 55, 100); //Right booster stripe

  pop();
}

function moveCharacter() {
  //Apply thrust when the 'W' key is pressed
  if (keyIsDown(87)) {
    // W' key is pressed
    velocityX += Math.sin(rotation) * thrustPower;
    velocityY -= Math.cos(rotation) * thrustPower;
  }

  let terminalVelocity = 6; //Max possible speed of the rocket when falling
  if (velocityY < terminalVelocity) {
    velocityY += 0.2; //Accelerate downwards at an increment of 0.1
  }

  //Drag to slow the rocket down over time
  velocityX *= drag;
  velocityY *= drag;

  //Update the rocket's position based on velocity
  x += velocityX;
  y += velocityY;

  //Adjust the rockets rotation with D and A keys
  if (keyIsDown(68)) {
    //D key rotates right
    rotation += 0.05;
  } else if (keyIsDown(65)) {
    //A key rotates left
    rotation -= 0.05;
  }
}

function drawButton() {
  push();
  rectMode(CENTER);
  fill(255);
  rect(rectX, rectY, rectLength, rectHeight);
  pop();

  fill(black);
  textAlign(CENTER, CENTER); //center align button text
  textSize(24); //set the text size
  text("START", rectX, rectY); //Position the text at the button center
}

function mousePressed() {
  //Check if the mouse is within the rectangle boundaries
  if (
    mouseX >= rectX - rectLength / 2 &&
    mouseX <= rectX + rectLength / 2 &&
    mouseY >= rectY - rectHeight / 2 &&
    mouseY <= rectY + rectHeight / 2
  ) {
    gameState = 1; // Start the game
  }
}
