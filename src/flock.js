/**
 * Represents a flock of boids in the simulation.
 * @class Flock
 */
class Flock {
  /**
   * Constructs a new Flock.
   * @param {Boid[]} boids - An array containing all the boids in the flock.
   * @param {Navigator} navigator - The navigator object for steering behavior calculations.
   */
  constructor(boids, navigator) {
    this.boids = boids;
    this.navigator = navigator;
  }

  /**
   * Initializes a flock with a specified number of boids and a navigator.
   * @param {number} n - The number of boids to create in the flock.
   * @param {Navigator} navigator - The navigator object for steering behavior calculations.
   * @returns {Flock} - The initialized flock.
   */
  static initialize(n, navigator) {
    const boids = [];
    for (let i = 0; i < n; i++) {
      const x = random(width);
      const y = random(height);
      boids.push(new Boid(x, y));
    }
    return new Flock(boids, navigator);
  }

  /**
   * Updates all boids in the flock based on the navigator's calculated steering forces.
   * @returns {void}
   */
  update() {
    this.boids.forEach((boid) => {
      const steering = this.navigator.calculateSteering(boid, this);
      boid.applySteering(steering);

      boid.update();
    });
  }

  /**
   * Displays all boids in the flock.
   * @returns {void}
   */
  show() {
    this.boids.forEach((boid) => boid.show());
  }
}
