import moment from 'moment';
import { SectionListData } from 'react-native';
import { capitalize } from 'src/utils/strings';

import {
  Review,
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
    title:
      review.name === '' ? `${capitalize(review.type)} Review` : review.name,
    description: '',
    time: review.time,
    type: review.type,
    questions: review.questions,
    log: [],
    date: review.date,
    day: review.type === ReviewType.monthly ? review.monthlyDay : review.day,
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
    title:
      review.name === '' ? `${capitalize(review.type)} Review` : review.name,
    description: '',
    time: review.time,
    type: 'ExternalReview',
    link: review.questions,
    log: [],
    date: review.date,
    day: review.type === ReviewType.monthly ? review.monthlyDay : review.day,
  };
};
