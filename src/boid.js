/**
 * Represents a boid in the flock simulation.
 * @class Boid
 */
class Boid {
  /**
   * Constructs a new Boid.
   * @param {number} x - The x-coordinate of the boid's initial position.
   * @param {number} y - The y-coordinate of the boid's initial position.
   */
  constructor(x, y) {
    // Constants
    this.MINT_GREEN = [201, 237, 220, 190];
    this.RADIUS = 10;
    this.FIELD_OF_VIEW = 30;
    this.PERSONAL_SPACE = 10;
    this.SEPARATION_WEIGHT = 0.002;
    this.ALIGNMENT_WEIGHT = 0.3;
    this.COHERENCE_WEIGHT = 0.001;
    this.MAX_SPEED = 1;

    // Behaviours
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);

    // Steering
    this._separation = createVector(0, 0);
    this._alignment = createVector(0, 0);
    this._coherence = createVector(0, 0);
  }

  /**
   * Finds neighboring boids within the field of view.
   * @param {Boid[]} boids - An array of boids to check for neighbors.
   * @returns {Boid[]} - An array of neighboring boids.
   */
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

  /**
   * Calculates steering forces based on neighboring boids.
   * @param {Boid[]} neighbours - An array of neighboring boids.
   * @returns {void}
   */
  applySteering() {
    this.acceleration.add(this._separation);
    this.acceleration.add(this._alignment);
    this.acceleration.add(this._coherence);
  }

  /**
   * Separates the boid from its neighbors to avoid collisions.
   * @param {Boid[]} neighbours - An array of neighboring boids.
   * @returns {p5.Vector} - A separation vector to avoid collisions.
   */
  calculateSteeringForces(neighbours) {
    if (neighbours.length === 0) {
      return;
    }
    this._separation = this.separate(neighbours);
    this._alignment = this.align(neighbours);
    this._coherence = this.cohere(neighbours);
  }

  /**
   * Separates the boid from its neighbors to avoid collisions.
   * @param {Boid[]} neighbours - An array of neighboring boids.
   * @returns {p5.Vector} - A separation vector to avoid collisions.
   */
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

  /**
   * Aligns the boid's velocity with its neighbors' average velocity.
   * @param {Boid[]} neighbours - An array of neighboring boids.
   * @returns {p5.Vector} - A steering vector for alignment.
   */
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

  /**
   * Moves the boid closer to the center of mass of its neighbors.
   * @param {Boid[]} neighbours - An array of neighboring boids.
   * @returns {p5.Vector} - A steering vector for cohesion.
   */
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

  /**
   * Checks for boundaries and adjusts boid's velocity if it reaches them.
   * @returns {void}
   */
  avoidBoundary() {
    if (this.x <= 0) {
      this.velocity.x = 0.2;
    } else if (this.x >= width) {
      this.velocity.x = -0.2;
    }

    if (this.y <= 0) {
      this.velocity.y = 0.2;
    } else if (this.y >= height) {
      this.velocity.y = -0.2;
    }
  }

  /**
   * Updates the boid's position, velocity, and checks for boundary avoidance.
   * @returns {void}
   */
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.MAX_SPEED);
    this.position.add(this.velocity);

    this.avoidBoundary();
  }

  /**
   * Displays the boid on the canvas.
   * @returns {void}
   */
  show() {
    fill(...this.MINT_GREEN);
    ellipse(this.x, this.y, this.RADIUS);
  }

  // Getters/Setters
  /**
   * Gets the x-coordinate of the boid's position.
   * @returns {number} - The x-coordinate of the boid's position.
   */
  get x() {
    return this.position.x;
  }

  /**
   * Gets the y-coordinate of the boid's position.
   * @returns {number} - The y-coordinate of the boid's position.
   */
  get y() {
    return this.position.y;
  }
}
