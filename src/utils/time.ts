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
    .set('date', day)
    .set('month', moment().month());

  if (ignoreToday || dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(1, 'month'); // TODO: FIX ME! Adding a year instead of a month
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
    .set('date', +review.format('DD'))
    .set('month', review.month());
  if (ignoreToday || dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(1, 'year');
  }

  return dayDate;
};

export const formatReviewDate = (date: string): string => {
  const dateValue = moment(date);

  if (Math.abs(moment().diff(dateValue, 'days')) > 7) {
    return dateValue.format('LL');
  }

  return dateValue.calendar().split('at')[0];
};
