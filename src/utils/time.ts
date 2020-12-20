import { DayOfTheWeek } from 'src/@types/index';
import moment from 'moment';

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

export const convertMinutesToAverageTime = (mins?: number): string => {
  if (!mins) {
    return '00m 00s';
  }

  let hours = `${parseInt(`${mins / 60}`, 10)}`;
  let minutes = `${mins % 60}`;

  if (hours.length < 2) {
    hours = `0${hours}`;
  }
  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }
  return `${hours}m ${minutes}s`;
};

export const getNextDayOfWeek = (
  day: DayOfTheWeek,
  nextReminder: string,
  ignoreToday: boolean = true,
) => {
  const dayDate = moment(ignoreToday ? nextReminder : undefined).day(day);

  if (ignoreToday || dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(1, 'weeks');
  }
  return dayDate;
};

export const getNextDayOfMonth = (
  day: number,
  nextReminder: string,
  ignoreToday: boolean = true,
) => {
  const dayDate = moment(ignoreToday ? nextReminder : undefined)
    .day(day)
    .month(moment().month());

  if (ignoreToday || dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(1, 'months');
  }

  return dayDate;
};

export const getNextDayOfYear = (
  date: Date,
  nextReminder: string,
  ignoreToday: boolean = true,
) => {
  const review = moment(date);
  const dayDate = moment(ignoreToday ? nextReminder : undefined)
    .day(review.day())
    .month(review.month());

  if (ignoreToday || dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(1, 'years');
  }

  return dayDate;
};
