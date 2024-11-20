let canvasX = 800;
let canvasY = 550;

function setup() {
  createCanvas(canvasX, canvasY);
}

// Game loads in non-initialized state
let gameState = 0;

// Colour variables
let white = "rgb(255,255,255)";
let red = "rgb(255,0,0)";
let green = "rgb(0,128,0)";
let black = "rgb(0,0,0)";
let grey = "rgb(145, 142, 133)";

let x = canvasX / 2; //Start halfway across the canvas
let y = 0; //Start at the top of the canvas
let rotation = 0; //Initial rotation is 0
let speed = 0; //Initial speed is 0

let velocityX = 0; //Velocity in the x-direction
let velocityY = 0; //Velocity in the y-direction
let scaleFactor = 0.3; //Size of rocket
let thrustPower = 0.4; //Max thrust of rocket
let drag = 0.98; //Drag slows down the rocket

let terminalVelocity = 6; //Max possible speed of the rocket when falling
let crashVelocity = 4; //Max safe landing speed

//Platform variables
let platformX = canvasX / 2 - 50; //Platform position
let platformY = canvasY - 30;
let platformWidth = 100;
let platformHeight = 10;

//Grass floor height
let grassHeight = 20;

function draw() {
  background(black);

  if (gameState === 1) {
    //Game in progress
    moveCharacter();
    drawGrassFloor();
    drawPlatform();
    drawCharacter(x, y, rotation, scaleFactor);

    //check for crash on grass
    if (y >= canvasY - grassHeight - 40) {
      gameState = 2; // Crash state
    }
    //Check for successful landing on platform
    if (
      y >= platformY - 40 &&
      y <= platformY &&
      x > platformX &&
      x < platformX + platformWidth &&
      Math.abs(velocityY) <= crashVelocity
    ) {
      gameState = 3; //Mission accomplished
    }
  } else if (gameState === 2) {
    //Crash screen
    drawCrashScreen();
  } else if (gameState === 3) {
    //Mission accomplished screen
    drawWinScreen();
  } else {
    //srtart screen
    drawButton();
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
  rect(-65, -80, 40, 220, 10); // Left booster
  rect(25, -80, 40, 220, 10); // Right booster

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
  strokeWeight(1 / scaleFactor); // Adjust the stroke weight as the rocket is scaled
  line(-15, -150, -15, 140); // Left stripe
  line(15, -150, 15, 140); // Right stripe

  //Little windows on main rocket
  noStroke();
  fill(black);
  ellipse(0, -120, 8, 8); // Top window
  ellipse(0, -90, 8, 8); // Middle window
  ellipse(0, -60, 8, 8); // Bottom window

  //Black lines on booster rockets
  stroke(black);
  line(-55, -30, -55, 100); // Left booster stripe
  line(55, -30, 55, 100); // Right booster stripe

  pop();
}

function drawPlatform() {
  fill(grey);
  rect(platformX, platformY, platformWidth, platformHeight);
}

function drawGrassFloor() {
  fill(green);
  rect(0, canvasY - grassHeight, canvasX, grassHeight);
}

function moveCharacter() {
  //Apply thrust when the 'W' key is pressed
  if (keyIsDown(87)) {
    //W key is pressed
    velocityX += Math.sin(rotation) * thrustPower;
    velocityY -= Math.cos(rotation) * thrustPower;
  }

  //Accelerate towards the groudn
  if (velocityY < terminalVelocity) {
    velocityY += 0.2; // Accelerate downwards
  }

  //Apply drag to slow the rocket down over time
  velocityX *= drag;
  velocityY *= drag;

  //Update the rocket's position based on velocity
  x += velocityX;
  y += velocityY;

  //Adjust the rocket's rotation with D and A keys
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
  rect(canvasX / 2, canvasY / 2, 200, 100);
  pop();

  fill(black);
  textAlign(CENTER, CENTER); //Center align button text
  textSize(24); //Set the text size
  text("START", canvasX / 2, canvasY / 2); //Position the text at the button center
}

function drawCrashScreen() {
  fill(white);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("YOU CRASHED", canvasX / 2, canvasY / 2 - 100);

  drawButton();
}

function drawWinScreen() {
  fill(white);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("MISSION ACCOMPLISHED", canvasX / 2, canvasY / 2 - 100);

  drawButton();
}

function mousePressed() {
  // Check if the mouse is within the rectangle boundaries
  if (
    mouseX >= canvasX / 2 - 100 &&
    mouseX <= canvasX / 2 + 100 &&
    mouseY >= canvasY / 2 - 50 &&
    mouseY <= canvasY / 2 + 50
  ) {
    gameState = 1; // Start the game
    restartGame(); // Reset game state
  }
}

function restartGame() {
  x = canvasX / 2;
  y = 0;
  velocityX = 0;
  velocityY = 0;
  rotation = 0;
}
