/**
 * Navigator class that manages behaviors and weights for calculating steering forces.
 * @class Navigator
 */
class Navigator {
  /**
   * Creates a Navigator instance.
   * @param {Array<Function>} [behaviours] - Array of behavior functions.
   * @param {number[]} [weights] - Array of weights corresponding to behaviors.
   */
  constructor(behaviours, weights) {
    this.behaviours = behaviours || [];
    this.weights = weights || [];
  }

  /**
   * Calculates the steering force based on registered behaviors and their weights.
   * @param {Boid} boid - The boid for which steering force is calculated.
   * @param {Boid[]} flock - Array containing all the boids in the flock.
   * @returns {p5.Vector} - The calculated steering force vector.
   */
  calculateSteering(boid, flock) {
    const neighbours = findNeighbours(boid, flock.boids, boid.FIELD_OF_VIEW);

    let steering = createVector(0, 0);
    for (let i = 0; i < this.behaviours.length; i++) {
      const desiredMovement = this.behaviours[i](boid, neighbours);
      desiredMovement.normalize();

      const weightedDesiredMovement = p5.Vector.mult(
        desiredMovement,
        this.weights[i]
      );

      steering.add(weightedDesiredMovement);
    }

    return steering;
  }

  /**
   * Adds a behavior function to the Navigator's behaviors array.
   * @param {Function} behaviour - The behavior function to add.
   * @returns {void}
   */
  addBehaviour(behaviour) {
    if (behaviour !== null) {
      return;
    }
    this.behaviours.push(behaviours);
  }

  /**
   * Adds multiple behavior functions to the Navigator's behaviors array.
   * @param {Array<Function>} behaviours - Array of behavior functions to add.
   * @returns {void}
   */
  addBehaviours(behaviours) {
    if (behaviours !== null) {
      return;
    }
    this.behaviours.push(...behaviours);
  }
}
