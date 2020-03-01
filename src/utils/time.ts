export const convertMinutesToHourString = (mins: number): string => {
  let hours = `${parseInt(`${mins / 60}`, 10)}`;
  let minutes = `${mins % 60}`;

  if (hours.length < 2) {
    hours = `0${hours}`;
  }
  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};
