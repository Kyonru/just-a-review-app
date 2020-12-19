import {
  Review,
  ReviewType,
  DayOfTheWeek,
  ReviewQuestionType,
} from 'src/@types/index';

export default {
  id: '08c95e75-1cad-45ef-87f2-8f340163d100f',
  title: 'Daily Review',
  description: 'This is a mock review',
  time: new Date(2020, 10, 10),
  type: ReviewType.daily,
  questions: [
    {
      id: '12A',
      q:
        'How does this look with a larger question, maybe longer that the average question this app is waiting?',
      required: true,
      type: ReviewQuestionType.String,
    },
    {
      id: '34',
      q: 'How does it looks with a medium sized question?',
      required: false,
      type: ReviewQuestionType.String,
    },
    {
      id: '1',
      q: 'What about a short one?',
      required: true,
      type: ReviewQuestionType.String,
    },
  ],
  logs: [],
  date: new Date(2020, 10, 10),
  day: DayOfTheWeek.saturday,
  createdAt: new Date(2020, 10, 10),
  updatedAt: new Date(2020, 10, 10),
} as Review;
