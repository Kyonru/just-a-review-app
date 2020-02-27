import {ReviewType} from 'src/@types/index';
export const MockReviewList = [
  {
    title: 'Daily Review',
    description: 'This is a mock review',
    time: new Date(2020, 10, 10),
    type: ReviewType.daily,
    questions: [],
    log: [],
  },
  {
    title: 'Weekly Review',
    description: 'This is a mock review',
    time: new Date(2020, 10, 10),
    type: ReviewType.weekly,
    questions: [],
    log: [],
  },
  {
    title: 'Monthly Review',
    description: 'This is a mock review',
    time: new Date(2020, 10, 10),
    type: ReviewType.monthly,
    questions: [],
    log: [],
  },
  {
    title: 'Yearly Review',
    description: 'This is a mock review',
    time: new Date(2020, 10, 10),
    type: ReviewType.yearly,
    questions: [],
    log: [],
  },
  {
    title: 'Custom Review',
    description: 'This is a mock review',
    time: new Date(2020, 10, 10),
    type: ReviewType.custom,
    questions: [],
    log: [],
  },
];
