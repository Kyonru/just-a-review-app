import { ReviewQuestionType } from 'src/@types';

export const questionTypes = [
  {
    translateKey: 'text',
    label: 'Text',
    value: ReviewQuestionType.String,
    id: 3,
  },
  {
    translateKey: 'choice',
    label: 'Choice',
    value: ReviewQuestionType.Choice,
    id: 0,
  },
  {
    translateKey: 'multipleSelect',
    label: 'Multiple Select',
    value: ReviewQuestionType.Select,
    id: 1,
  },
  {
    translateKey: 'numberOnly',
    label: 'Number Only',
    value: ReviewQuestionType.Number,
    id: 2,
  },
  {
    translateKey: 'time',
    label: 'Time',
    value: ReviewQuestionType.Time,
    id: 4,
  },
  {
    translateKey: 'date',
    label: 'Date',
    value: ReviewQuestionType.Date,
    id: 5,
  },
  {
    translateKey: 'list',
    label: 'List',
    value: ReviewQuestionType.List,
    id: 6,
  },
];
