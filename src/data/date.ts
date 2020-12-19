import { DayOfTheWeek } from 'src/@types';

export const daysOfTheWeek = [
  { label: 'Monday', value: DayOfTheWeek.monday, id: 0 },
  { label: 'Tuesday', value: DayOfTheWeek.tuesday, id: 1 },
  { label: 'Wednesday', value: DayOfTheWeek.wednesday, id: 2 },
  { label: 'Thursday', value: DayOfTheWeek.thursday, id: 3 },
  { label: 'Friday', value: DayOfTheWeek.friday, id: 4 },
  { label: 'Saturday', value: DayOfTheWeek.saturday, id: 5 },
  { label: 'Sunday', value: DayOfTheWeek.sunday, id: 6 },
];

export const Weekday: { [key: number]: string } = {
  1: DayOfTheWeek.monday,
  2: DayOfTheWeek.tuesday,
  3: DayOfTheWeek.wednesday,
  4: DayOfTheWeek.thursday,
  5: DayOfTheWeek.friday,
  6: DayOfTheWeek.saturday,
  7: DayOfTheWeek.sunday,
};
