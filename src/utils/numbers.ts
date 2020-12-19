const INTEGER_LIMIT = 2000000000;

export function getRandomInt(max: number = INTEGER_LIMIT) {
  return Math.floor(Math.random() * Math.floor(max));
}
