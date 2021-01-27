const COLORS = ['#08d9d6', '#252a34'];
const GRAVITY = [0, 0.05];

const random = (min = 0, max = 1) => {
  return Math.random() * (max - min) + min;
};

const MoveFinger = (entities: any, { touches }: any) => {
  // -- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  // -- There's nothing stopping you from treating the game state as immutable and returning a copy..
  // -- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  // -- That said, it's probably worth considering performance implications in either case.

  touches
    .filter((t: any) => t.type === 'move')
    .forEach((t: any) => {
      const finger = entities[`${t.id + 1}`];
      if (finger && finger.position) {
        finger.position = [t.event.pageX, t.event.pageY];
      }
    });

  return entities;
};

const SpawnParticles = (state: any, { screen }: any) => {
  const flowRate = Math.random();
  if (flowRate > 0.2) {
    return state;
  }

  Object.keys(state)
    .filter(key => state[key].particles)
    .forEach(key => {
      const sys = state[key];
      sys.particles.push({
        position: [random(0, screen.width), -50],
        velocity: GRAVITY,
        mass: random(),
        lifespan: 148,
        size: random(0, 10),
        color: COLORS[Math.trunc(random(0, COLORS.length))],
      });
    });

  return state;
};

const Gravity = (state: any) => {
  Object.keys(state)
    .filter(key => state[key].particles)
    .forEach(key => {
      const sys = state[key];
      sys.particles.forEach((p: any) => {
        const { mass } = p;
        const acc = [GRAVITY[0] / mass, GRAVITY[1] / mass];
        const vel = p.velocity;

        // eslint-disable-next-line no-param-reassign
        p.velocity = [vel[0] + acc[0], vel[1] + acc[1]];
      });
    });

  return state;
};

export { MoveFinger, SpawnParticles, Gravity };
