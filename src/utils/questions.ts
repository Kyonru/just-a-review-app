import moment from 'moment';

import { ReviewQuestion, ReviewQuestionAnswer } from 'src/@types';
import { v4 as uuidv4 } from 'uuid';

const EmptyAnswer: ReviewQuestionAnswer = {
  content: '',
  image: [],
  files: [],
  voiceNotes: [],
};

export const createQuestion = (
  question: string,
  required: boolean = true,
): ReviewQuestion => {
  const q = `${question}${
    question[question.length - 1].trim() !== '?' ? '?' : ''
  }`;
  return {
    id: uuidv4(),
    q,
    required,
  };
};

export const createAnswer = (
  question: ReviewQuestion,
  answer: string,
): ReviewQuestion => {
  const date = moment.now().toString();
  return {
    ...question,
    answer: question.answer
      ? { ...question.answer, content: answer, date }
      : { ...EmptyAnswer, content: answer, date },
  };
};

export const getAnsweredCount = (questions: ReviewQuestion[]) => {
  return (questions || []).reduce((sum, current) => {
    return current.answer ? sum + 1 : sum;
  }, 0);
};

export const isAnswerEmpty = (answer?: ReviewQuestionAnswer): boolean => {
  if (!answer) return true;

  return (
    !answer.content &&
    answer.files.length === 0 &&
    answer.image.length === 0 &&
    answer.voiceNotes.length === 0
  );
};
