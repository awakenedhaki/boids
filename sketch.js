// Declaring Global Variables ==================================================
let flock;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(1000, 500);
  flock = Flock.initialize(400);
}

function draw() {
  background(0);
  flock.update();
  flock.show();
}

function keyPressed() {
  if (key === " ") {
    noLoop();
  }
}
