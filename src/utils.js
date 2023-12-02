function findNeighbours(boid, flock) {
  return flock.filter((agent) => {
    if (boid != agent) {
      const distance = p5.Vector.dist(boid.position, agent.position);
      return distance < boid.FIELD_OF_VIEW;
    } else {
      return false;
    }
  });
}
