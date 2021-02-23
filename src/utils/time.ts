import { DayOfTheWeek, ReviewType } from 'src/@types/index';

import moment from 'moment';
import { translate } from 'src/services/i18n/index';

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
  const dayDate = moment(ignoreToday ? nextReminder : undefined).day(
    translate(day as string),
  );

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
  const dayDate = moment(ignoreToday ? nextReminder : undefined);

  if (!ignoreToday) {
    dayDate.set('date', day).set('month', moment().month());
  }

  if (ignoreToday || dayDate.isBefore(moment().startOf('day'))) {
    dayDate.add(moment.duration({ M: 1 }), 'M');
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

const languageSplitter: { [key: string]: string } = {
  en: 'at',
  es: 'a las',
};

export const formatReviewDate = (date: string, locale: string): string => {
  const dateValue = moment(date);

  if (Math.abs(moment().diff(dateValue, 'days')) > 7) {
    return dateValue.format('LL');
  }

  return dateValue.calendar().split(languageSplitter[locale])[0];
};

// FIXME Sometimes on weekly review, the diff is less and the review stays near today but in the past
export const moveDateToPresent = (date: string, type: ReviewType): string => {
  const a = moment(date);
  const b = moment();
  if (type === ReviewType.daily) {
    const days = b.diff(a, 'days');
    if (days < 0) return date;
    return a.add(days, 'days').format();
  }
  if (type === ReviewType.weekly) {
    const weeks = b.diff(a, 'weeks');
    if (weeks < 0) return date;
    return a.add(weeks, 'weeks').format();
  }
  if (type === ReviewType.monthly) {
    const months = b.diff(a, 'months');
    if (months < 0) return date;
    return a.add(moment.duration({ M: months }), 'M').format();
  }
  if (type === ReviewType.yearly) {
    const year = b.diff(a, 'years');
    if (year < 0) return date;
    return a.add(year, 'year').format();
  }
  return date;
};
