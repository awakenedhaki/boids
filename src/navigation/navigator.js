class Navigator {
  constructor(behaviours, weights) {
    this.behaviours = behaviours || [];
    this.weights = weights || [];
  }

  calculateSteering(boid, flock) {
    const neighbours = findNeighbours(boid, flock);

    let steering = createVector(0, 0);
    for (let i = 0; i < this.behaviours.length; i++) {
      const desiredMovement = p5.Vector.mult(
        p5.Vector.normalize(this.behaviour[i](boid, neighbours)),
        this.weights[i]
      );
      steering.add(desiredMovement);
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
