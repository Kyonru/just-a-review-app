import moment from 'moment';
import { SectionListData } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { capitalize } from 'src/utils/strings';
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

export const getSectionsFromReviewDates = (reviewObject: {
  [key: string]: Review[];
}): SectionListData<Review>[] => {
  return Object.keys(reviewObject).map(date => ({
    title: moment(date)
      .calendar()
      .split(' ')[0],
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
  return {
    id: uuidv4(),
    title:
      review.name === '' ? `${capitalize(review.type)} Review` : review.name,
    description: '',
    time: review.time,
    type: review.type,
    questions: review.questions,
    logs: [],
    date: review.date,
    day: review.type === ReviewType.monthly ? review.monthlyDay : review.day,
    createdAt: new Date(),
  };
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
  return {
    id: uuidv4(),
    title:
      review.name === '' ? `${capitalize(review.type)} Review` : review.name,
    description: '',
    time: review.time,
    type: 'ExternalReview',
    link: review.questions,
    logs: [],
    date: review.date,
    day: review.type === ReviewType.monthly ? review.monthlyDay : review.day,
  };
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
  return {
    id: review.id,
    title: update.name || review.title,
    description: review.description,
    time: update.time || review.time,
    type: update.type || review.type,
    questions: update.questions || review.questions,
    logs: review.logs || [],
    date: update.date || review.date,
    day: monthlyDay || review.day,
    createdAt: review.createdAt,
    updatedAt: new Date(),
  };
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
      (sum, curr) => sum + logState[curr].duration,
      0,
    ) /
      (review.logs || []).length) *
      100,
  ) / 100;
