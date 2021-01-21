import { ReviewQuestionType } from 'src/@types';

export const questionTypes = [
  { label: 'Text', value: ReviewQuestionType.String, id: 3 },
  { label: 'Choice', value: ReviewQuestionType.Choice, id: 0 },
  { label: 'Multiple Select', value: ReviewQuestionType.Select, id: 1 },
  { label: 'Number Only', value: ReviewQuestionType.Number, id: 2 },
  { label: 'Time', value: ReviewQuestionType.Time, id: 4 },
  { label: 'Date', value: ReviewQuestionType.Date, id: 5 },
  { label: 'List', value: ReviewQuestionType.List, id: 6 },
];
