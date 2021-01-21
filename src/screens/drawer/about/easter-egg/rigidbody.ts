/* eslint-disable no-param-reassign */
import Matter from 'matter-js';
import { Box } from './renderers';

let boxIds = 0;

const distance = ([x1, y1]: number[], [x2, y2]: number[]) =>
  Math.sqrt(Math.abs((x2 - x1) ** 2 + (y2 - y1) ** 2));

const Physics = (state: any, { time }: any) => {
  const { engine } = state.physics;

  Matter.Engine.update(engine, time.delta);

  return state;
};

const CreateBox = (state: any, { touches, screen }: any) => {
  const { world } = state.physics;
  const boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);

  touches
    .filter((t: any) => t.type === 'press')
    .forEach((t: any) => {
      const body = Matter.Bodies.rectangle(
        t.event.pageX,
        t.event.pageY,
        boxSize,
        boxSize,
        { frictionAir: 0.021 },
      );
      Matter.World.add(world, [body]);

      // eslint-disable-next-line no-plusplus
      state[++boxIds] = {
        body,
        size: [boxSize, boxSize],
        color: boxIds % 2 === 0 ? '#08d9d6' : '#252a34',
        renderer: Box,
      };
    });

  return state;
};

const MoveBox = (state: any, { touches }: any) => {
  const { constraint } = state.physics;

  // -- Handle start touch
  const start = touches.find((x: any) => x.type === 'start');

  if (start) {
    const startPos: any = [start.event.pageX, start.event.pageY];

    const boxId = Object.keys(state).find(key => {
      const { body } = state[key];

      return (
        body && distance([body.position.x, body.position.y], startPos) < 25
      );
    });

    if (boxId) {
      constraint.pointA = { x: startPos[0], y: startPos[1] };
      constraint.bodyB = state[boxId].body;
      constraint.pointB = { x: 0, y: 0 };
      constraint.angleB = state[boxId].body.angle;
    }
  }

  // -- Handle move touch
  const move = touches.find((x: any) => x.type === 'move');

  if (move) {
    constraint.pointA = { x: move.event.pageX, y: move.event.pageY };
  }

  // -- Handle end touch
  const end = touches.find((x: any) => x.type === 'end');

  if (end) {
    constraint.pointA = null;
    constraint.bodyB = null;
    constraint.pointB = null;
  }

  return state;
};

const CleanBoxes = (state: any, { screen }: any) => {
  const { world } = state.physics;

  Object.keys(state)
    .filter(
      key => state[key].body && state[key].body.position.y > screen.height * 2,
    )
    .forEach(key => {
      Matter.Composite.remove(world, state[key].body);
      // eslint-disable-next-line no-param-reassign
      delete state[key];
    });

  return state;
};

export { Physics, CreateBox, MoveBox, CleanBoxes };
