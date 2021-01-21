import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

import { Box } from './renderers';

import { Physics, CreateBox, MoveBox, CleanBoxes } from './rigidbody';

Matter.Common.isElement = () => false; // -- Overriding this function because the original references HTMLElement

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ff2e63',
    position: 'absolute',
    textAlign: 'center',
    left: 0,
    right: 0,
    top: 40,
  },
});

export default React.memo(() => {
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);

  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  const body = Matter.Bodies.rectangle(width / 2, -1000, boxSize, boxSize, {
    frictionAir: 0.021,
  });
  const floor = Matter.Bodies.rectangle(
    width / 2,
    height - 64 - boxSize / 2,
    width,
    boxSize,
    { isStatic: true },
  );
  const constraint = Matter.Constraint.create({
    label: 'Drag Constraint',
    pointA: { x: 0, y: 0 },
    pointB: { x: 0, y: 0 },
    length: 0.01,
    stiffness: 0.1,
    // angularStiffness: 1,
  });

  Matter.World.add(world, [body, floor]);
  Matter.World.addConstraint(world, constraint);

  return (
    <GameEngine
      style={styles.container}
      systems={[Physics, CreateBox, MoveBox, CleanBoxes]}
      entities={{
        physics: { engine, world, constraint },
        box: {
          body,
          size: [boxSize, boxSize],
          color: '#252a34',
          renderer: Box,
        },
        floor: {
          body: floor,
          size: [width, boxSize],
          color: '#ff2e63',
          renderer: Box,
        },
        text: {
          position: [width / 2, 40],
          renderer: () => (
            <Text style={styles.text}>Tap to destroy performance!</Text>
          ),
        },
      }}
    />
  );
});
