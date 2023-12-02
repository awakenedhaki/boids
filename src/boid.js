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
    this.SEPARATION_WEIGHT = 0.005;
    this.ALIGNMENT_WEIGHT = 0.5;
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
}
