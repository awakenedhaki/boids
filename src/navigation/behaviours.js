/**
 * Calculates the alignment steering force for a boid within a flock.
 * @param {Boid} boid - The boid for which alignment is calculated.
 * @param {Boid[]} neighbours - An array of neighbouring boids.
 * @returns {p5.Vector} - The alignment steering force vector.
 */
function alignment(boid, neighbours) {
  if (neighbours.length === 0) {
    return createVector(0, 0);
  }

  const alignmentSteering = neighbours.reduce(
    (acc, agent) => acc.add(agent.velocity),
    createVector(0, 0)
  );

  alignmentSteering.div(neighbours.length);
  return alignmentSteering;
}

/**
 * Calculates the separation steering force for a boid within a flock.
 * @param {Boid} boid - The boid for which separation is calculated.
 * @param {Boid[]} neighbours - An array of neighbouring boids.
 * @returns {p5.Vector} - The separation steering force vector.
 */
function separation(boid, neighbours) {
  const immenentNeighbours = findNeighbours(
    boid,
    neighbours,
    boid.AVOIDANCE_RADIUS
  );
  if (immenentNeighbours.length === 0) {
    return createVector(0, 0);
  }

  const collisionAvoidanceSteering = immenentNeighbours.reduce(
    (acc, agent) => acc.add(p5.Vector.sub(boid.position, agent.position)),
    createVector(0, 0)
  );

  collisionAvoidanceSteering.div(immenentNeighbours.length);
  return collisionAvoidanceSteering;
}

/**
 * Calculates the cohesion steering force for a boid within a flock.
 * @param {Boid} boid - The boid for which cohesion is calculated.
 * @param {Boid[]} neighbours - An array of neighbouring boids.
 * @returns {p5.Vector} - The cohesion steering force vector.
 */
function coherence(boid, neighbours) {
  if (neighbours.length === 0) {
    return createVector(0, 0);
  }

  const cohesionSteering = neighbours.reduce(
    (acc, agent) => acc.add(agent.position),
    createVector(0, 0)
  );

  cohesionSteering.div(neighbours.length);
  cohesionSteering.sub(boid.position);
  return cohesionSteering;
}
