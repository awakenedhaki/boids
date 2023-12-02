class Flock {
  constructor(boids, behaviour) {
    this.boids = boids;
    this.behaviour = behaviour;
  }

  static initialize(n) {
    const boids = [];
    for (let i = 0; i < n; i++) {
      const x = random(width);
      const y = random(height);
      boids.push(new Boid(x, y));
    }
    return new Flock(boids);
  }

  update() {
    this.boids.forEach((boid) => {
      const steering = behaviour.calculateSteering(boid, this);
      boid.applySteering(steering);

      boid.update();
    });
  }

  show() {
    this.boids.forEach((boid) => boid.show());
  }
}
