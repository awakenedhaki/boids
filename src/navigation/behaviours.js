function alignment(boid, flock) {
  if (flock.length === 0) {
    return createVector(0, 0);
  }

  const alignmentSteering = flock.reduce(
    (acc, agent) => acc.add(agent.velocity),
    createVector(0, 0)
  );

  alignmentSteering.div(flock.length);
  return alignmentSteering;
}

function separation(boid, flock) {
  if (flock.length === 0) {
    return createVector(0, 0);
  }

  const immenentNeighbours = findNeighbours(boid, flock, boid.AVOIDACNE_RADIUS);
  const collisionAvoidanceSteering = immenentNeighbours.reduce(
    (acc, agent) => acc.add(p5.Vector(boid.position, agent.position)),
    createVector(0, 0)
  );

  collisionAvoidanceSteering.div(immenentNeighbours.length);
  return collisionAvoidanceSteering;
}

function coherence(boid, flock) {
  if (flock.length === 0) {
    return createVector(0, 0);
  }

  const cohesionSteering = flock.reduce(
    (acc, agent) => acc.add(agent.position),
    createVector(0, 0)
  );

  cohesionSteering.div(flock.length);
  return cohesionSteering;
}

function smoothCoherence() {}

function avoidBoundary() {}
