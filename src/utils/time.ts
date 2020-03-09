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

export const getNextDayOfWeek = (day: DayOfTheWeek) => {
  const dayDate = moment().day(day);

  if (dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(1, 'weeks');
  }
  return dayDate;
};

export const getNextDayOfMonth = (day: number) => {
  const dayDate = moment()
    .day(day)
    .month(moment().month());

  if (dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(1, 'months');
  }

  return dayDate;
};

export const getNextDayOfYear = (date: Date) => {
  const review = moment(date);
  const dayDate = moment()
    .day(review.day())
    .month(review.month());

  if (dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(1, 'years');
  }

  return dayDate;
};
