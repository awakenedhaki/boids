class Boid {
  constructor(x, y) {
    // Constants
    this.MINT_GREEN = [201, 237, 220, 190];
    this.RADIUS = 10;
    this.FIELD_OF_VIEW = 100;
    this.PERSONAL_SPACE = 50;
    this.SEPARATION_WEIGHT = 1;
    this.ALIGNMENT_WEIGHT = 1;
    this.COHERENCE_WEIGHT = 1;

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
        return distance < this.FIELD_OF_VIEW;
      } else {
        return false;
      }
    });
  }

  calculateSteeringForces(neighbours) {
    if (neighbours.length === 0) {
      return;
    }
    this._separation = this.separate(neighbours);
    this._alignment = this.align(neighbours);
    this._coherence = this.cohere(neighbours);
  }

  // Steering
  applySteering() {
    this.acceleration.add(this._separation);
    this.acceleration.add(this._alignment);
    this.acceleration.add(this._coherence);
  }

  separate(neighbours) {
    const neighboursWithinCollisionRange = neighbours.filter((boid) => {
      const distance = p5.Vector.dist(this.position, boid.position);
      return distance < this.PERSONAL_SPACE;
    });

    const aggregatedPositions = neighboursWithinCollisionRange.reduce(
      (acc, boid) => {
        const difference = p5.Vector.sub(this.position, boid.position);
        return p5.Vector.add(acc, difference);
      },
      createVector(0, 0)
    );

    return p5.Vector.mult(aggregatedPositions, this.SEPARATION_WEIGHT);
  }

  align(neighbours) {
    const aggregatedVelocity = neighbours.reduce((acc, boid) => {
      return p5.Vector.add(acc, boid.velocity);
    }, createVector(0, 0));

    const averageVelocity = p5.Vector.div(
      aggregatedVelocity,
      neighbours.length
    );

    const steering = p5.Vector.sub(averageVelocity, this.velocity);
    return p5.Vector.mult(steering, this.ALIGNMENT_WEIGHT);
  }

  cohere(neighbours) {
    const aggregatedPositions = neighbours.reduce((acc, boid) => {
      return p5.Vector.add(acc, boid.position);
    }, createVector(0, 0));

    const averagePosition = p5.Vector.div(
      aggregatedPositions,
      neighbours.length
    );

    const steering = p5.Vector.sub(averagePosition, this.position);
    return p5.Vector.mult(steering, this.COHERENCE_WEIGHT);
  }

  // Boilerplate
  update() {
    this.velocity.add(this.acceleration);
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
