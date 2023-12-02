function findNeighbours(boid, flock, threshold) {
  return flock.boids.filter((agent) => {
    if (boid !== agent) {
      const distance = p5.Vector.dist(boid.position, agent.position);
      return distance < threshold;
    } else {
      return false;
    }
  });
}
