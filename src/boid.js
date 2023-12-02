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
    this.FIELD_OF_VIEW = 50;
    this.AVOIDANCE_RADIUS_WEIGHT = 3;
    this.MAX_SPEED = 1;

    // Behaviours
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
  }

  /**
   * Applies a steering force to the boid.
   * @param {p5.Vector} steering - The steering force to apply.
   * @returns {void}
   */
  applySteering(steering) {
    this.acceleration.add(steering);
  }

  /**
   * Updates the boid's position, velocity, and checks for boundary avoidance.
   * @returns {void}
   */
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.MAX_SPEED);
    this.position.add(this.velocity);
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

  get AVOIDANCE_RADIUS() {
    return this.RADIUS * this.AVOIDANCE_RADIUS_WEIGHT;
  }
}
