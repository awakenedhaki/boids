// Declaring Global Variables ==================================================
let swarm;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(1000, 500);
  swarm = Swarm.initialize(400);
}

function draw() {
  background(0);
  swarm.update();
  swarm.show();
}

function keyPressed() {
  if (key === " ") {
    noLoop();
  }
}
