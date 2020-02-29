import { ReviewType, Review } from 'src/@types/index';

export const MockReviewList: Review[] = [
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

export const MockDatedReviewLists: { [key: string]: Review[] } = {
  '2020-02-27': MockReviewList.slice(0, 1),
  '2020-02-28': MockReviewList.slice(2, 4),
  '2020-02-29': MockReviewList.slice(3),
  '2020-03-15': MockReviewList.slice(0),
};
