# Flocking Simulation with p5.js

This repository contains a flocking simulation built using the p5.js library, implementing Craig Reynolds' classic flocking algorithm.

## Overview

The flocking simulation showcases the collective behavior of agents, or "boids," in a two-dimensional space. These boids exhibit three fundamental behaviors: alignment, cohesion, and separation, resulting in emergent flocking patterns.

## Implementation Details

- Alignment: Each boid adjusts its velocity to match the average velocity of neighboring boids within its field of view.
- Cohesion: Boids move towards the center of mass of neighboring boids, steering to align their positions.
- Separation: Boids avoid crowding by applying a repulsive force when they get too close to their neighbors.

## Technical Stack

- p5.js: Utilized for the creation and rendering of the simulation in a canvas element.
- JavaScript: Implemented the flocking algorithm using JavaScript, organizing behaviors and managing boid interactions.
