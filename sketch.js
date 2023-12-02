// Declaring Global Variables ==================================================
let boidManager;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(1000, 500);
  const navigator = new Navigator(
    [alignment, separation, coherence],
    [1, 1, 1]
  );
  boidManager = BoidManager.initialize(400, navigator);
}

function draw() {
  background(0);
  boidManager.update();
  boidManager.show();
}

function keyPressed() {
  if (key === " ") {
    noLoop();
  }
}
