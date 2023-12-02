class Flock {
  constructor(boids, navigator) {
    this.boids = boids;
    this.navigator = navigator;
  }

  static initialize(n, navigator) {
    const boids = [];
    for (let i = 0; i < n; i++) {
      const x = random(width);
      const y = random(height);
      boids.push(new Boid(x, y));
    }
    return new Flock(boids, navigator);
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
