class Navigator {
  constructor(behaviours, weights) {
    this.behaviours = behaviours || [];
    this.weights = weights || [];
  }

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

  addBehaviour(behaviour) {
    if (behaviour !== null) {
      return;
    }
    this.behaviours.push(behaviours);
  }

  addBehaviours(behaviours) {
    if (behaviours !== null) {
      return;
    }
    this.behaviours.push(...behaviours);
  }
}
