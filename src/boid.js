class Boid {
  constructor(x, y) {
    // Constants
    this.MINT_GREEN = [201, 237, 220, 190];
    this.RADIUS = 10;
    this.FIELD_OF_VIEW = 100;

    // Behaviours
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);

    // Steering
    this._separation = createVector(0, 0);
    this._alignment = createVector(0, 0);
    this._coherence = createVector(0, 0);
  }

  findNeighbours(boids) {
    return boids.filter((boid) => {
      if (this != boid) {
        const distance = p5.Vector.dist(this.position, boid.position);
        return distance < this.FIELDO_OF_VIEW;
      } else {
        return false;
      }
    });
  }

  // Steering
  applySteering() {
    this.acceleration.add(this._separation);
    this.acceleration.add(this._alignment);
    this.acceleration.add(this._coherece);
  }

  separate(neighbours) {}

  align(neighbours) {
    const aggregatedVelocity = neighbours.reduce((acc, boid) => {
      acc.add(boid.velocity);
    }, createVector(0, 0));

    const averageVelocity = p5.Vector.div(
      aggregatedVelocity,
      neighbours.length
    );

    return p5.Vector.sub(averageVelocity, this.velocity);
  }

  cohere(neighbours) {
    const aggregatedPositions = neighbours.reduce((acc, boid) => {
      acc.add(boid.position);
    }, createVector(0, 0));

    const averagePosition = p5.Vector.div(
      aggregatedPositions,
      neighbours.length
    );

    return p5.Vector.sub(averagePosition, this.position);
  }

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
