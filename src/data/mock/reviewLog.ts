import moment from 'moment';

import { ReviewLog } from 'src/@types/index';

export default {
  id: 'a8c95eg5-1c53-45ef-87f2-8f530163d13jf',
  date: moment().toString(),
  duration: 242,
  questions: [
    {
      id: '12A',
      q:
        'How does this look with a larger question, maybe longer that the average question this app is waiting?',
      required: true,
      answer: {
        content: 'This is so cool! Im trying to have a test on this project',
      },
    },
    {
      id: '34',
      q: 'How does it looks with a medium sized question?',
      required: false,
      answer: {
        content: 'A working test, or something',
      },
    },
    {
      id: '1',
      q: 'What about a short one?',
      required: true,
      answer: {
        content: 'Finally!',
      },
    },
  ],
  startDate: moment().toString(),
  reviewId: '08c95e75-1cad-45ef-87f2-8f340163d100f',
} as ReviewLog;
