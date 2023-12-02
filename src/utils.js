/**
 * Finds neighboring agents within a specified threshold distance from a boid.
 * @param {Boid} boid - The boid for which neighbors are being found.
 * @param {Boid[]} flock - An array containing all the boids in the flock.
 * @param {number} threshold - The maximum distance to consider neighboring agents.
 * @returns {Boid[]} - An array containing neighboring agents.
 */
function findNeighbours(boid, flock, threshold) {
  return flock.filter((agent) => {
    if (boid !== agent) {
      const distance = p5.Vector.dist(boid.position, agent.position);
      return distance < threshold;
    }
  });
}
