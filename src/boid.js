class Boid {
  constructor(x, y) {
    // Constants
    this.MINT_GREEN = [201, 237, 220, 190];
    this.RADIUS = 10;

    // Behaviours
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);

    // Steering
    this._separation = createVector(0, 0);
    this._alignment = createVector(0, 0);
    this._coherence = createVector(0, 0);
  }

  findNeighbours(boids) {}

  // Steering
  applySteering() {
    this.acceleration.add(this._separation);
    this.acceleration.add(this._alignment);
    this.acceleration.add(this._coherece);
  }

  separate(neighbours) {}

  align(neighbours) {}

  coehere(neighbours) {}

  // Boilerplate
  update() {
    this.position.add(this.velocity);
  }

  show() {
    fill(...this.MINT_GREEN);
    ellipse(this.x, this.y, this.RADIUS);
  }

  // Getters/Setters
  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }
}
