import moment from 'moment';
import { SectionListData } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { capitalize } from 'src/utils/strings';
import {
  getNextDayOfMonth,
  getNextDayOfWeek,
  getNextDayOfYear,
  formatReviewDate,
} from 'src/utils/time';
import {
  Review,
  ReviewLog,
  MonthlyReview,
  YearlyReview,
  WeeklyReview,
  ReviewType,
  ReviewQuestion,
  DayOfTheWeek,
  ExternalReview,
} from 'src/@types';

const getDate: {
  [key: string]: (review: Review, ignoreToday?: boolean) => moment.Moment;
} = {
  [ReviewType.daily]: (review, ignoreToday = true) => {
    if (ignoreToday) {
      return moment(review.nextReminder).add(1, 'day');
    }
    return moment(review.nextReminder);
  },
  [ReviewType.weekly]: (review, ignoreToday = true) =>
    getNextDayOfWeek(
      review.day! as DayOfTheWeek,
      review.nextReminder,
      ignoreToday,
    ),
  [ReviewType.monthly]: (review, ignoreToday = true) =>
    getNextDayOfMonth(review.day! as number, review.nextReminder, ignoreToday),
  [ReviewType.yearly]: (review, ignoreToday = true) =>
    getNextDayOfYear(
      moment(review.date!).toDate(),
      review.nextReminder,
      ignoreToday,
    ),
};

export const getNextDate = (review: Review, ignoreToday: boolean = true) => {
  const time = moment(review.time);
  const date = getDate[review.type](review, ignoreToday)
    .set('hour', time.hour())
    .set('minute', time.minutes())
    .set('second', 0)
    .set('millisecond', 0);

  return date;
};

export const getSectionsFromReviewDates = (reviewObject: {
  [key: string]: Review[];
}): SectionListData<Review>[] => {
  return Object.keys(reviewObject).map(date => ({
    title: formatReviewDate(date),
    value: moment(date).format('YYYY-MM-DD'),
    data: reviewObject[date],
  }));
};

export const createReview = (review: {
  name: string;
  type: ReviewType;
  questions: ReviewQuestion[];
  date: Date;
  day: DayOfTheWeek;
  time: Date;
  monthlyDay: number;
}): Review | MonthlyReview | YearlyReview | WeeklyReview => {
  const newReview: Review = {
    id: uuidv4(),
    title:
      review.name === '' ? `${capitalize(review.type)} Review` : review.name,
    description: '',
    time: moment(review.time).format(),
    type: review.type,
    questions: review.questions,
    logs: [],
    date: moment(review.date).format(),
    day: review.type === ReviewType.monthly ? review.monthlyDay : review.day,
    createdAt: moment().format(),
    nextReminder: moment().format(),
  };

  newReview.nextReminder = getNextDate(newReview, false).format();

  return newReview;
};

export const createExternalReview = (review: {
  name: string;
  type: ReviewType;
  questions: string;
  date: Date;
  day: DayOfTheWeek;
  time: Date;
  monthlyDay: number;
}): ExternalReview => {
  const newReview: ExternalReview = {
    id: uuidv4(),
    title:
      review.name === '' ? `${capitalize(review.type)} Review` : review.name,
    description: '',
    time: moment(review.time).format(),
    type: 'ExternalReview',
    link: review.questions,
    logs: [],
    date: moment(review.date).format(),
    day: review.type === ReviewType.monthly ? review.monthlyDay : review.day,
    nextReminder: moment().format(),
  };

  newReview.nextReminder = getNextDate(
    (newReview as unknown) as Review,
    false,
  ).format();

  return newReview;
};

export const updateReview = (
  review: Review,
  update: {
    name: string;
    type: ReviewType;
    questions: ReviewQuestion[];
    date: Date;
    day: DayOfTheWeek;
    time: Date;
    monthlyDay: number;
  },
): Review | MonthlyReview | YearlyReview | WeeklyReview => {
  const monthlyDay =
    update.type === ReviewType.monthly ? update.monthlyDay : review.day;
  const updatedreview: Review = {
    id: review.id,
    title: update.name || review.title,
    description: review.description,
    time: moment(update.time || review.time).format(),
    type: update.type || review.type,
    questions: update.questions || review.questions,
    logs: review.logs || [],
    date: moment(update.date || review.date).format(),
    day: monthlyDay || review.day,
    createdAt: review.createdAt,
    updatedAt: moment().format(),
    nextReminder: getNextDate(review).format(),
  };

  return updatedreview;
};

export const convertReviewToLog = (
  review: Review,
  duration: number,
  startDate: string,
): ReviewLog => ({
  id: uuidv4(),
  duration,
  questions: review.questions,
  date: new Date().toString(),
  reviewId: review.id,
  startDate,
});

export const getReviewAverageTime = (
  review: Review,
  logState: { [key: string]: ReviewLog },
): number =>
  Math.round(
    ((review.logs || []).reduce(
      (sum, curr) => sum + (logState[curr] ? logState[curr].duration : 0),
      0,
    ) /
      (review.logs || []).length) *
      100,
  ) / 100;
