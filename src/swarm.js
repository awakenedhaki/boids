class Swarm {
  constructor(boids) {
    this.boids = boids;
  }

  static initialize(n) {
    const boids = [];
    for (let i = 0; i < n; i++) {
      const x = random(width);
      const y = random(height);
      boids.push(new Boid(x, y));
    }
    return new Swarm(boids);
  }

  // Boilerplate
  update() {
    this.boids.forEach((boid) => {
      const neighbours = boid.findNeighbours(this.boids);

      boid.calculateSteeringForces(neighbours);
      boid.applySteering();
    });

    this.boids.forEach((boid) => boid.update());
  }

  show() {
    this.boids.forEach((boid) => boid.show());
  }
}
