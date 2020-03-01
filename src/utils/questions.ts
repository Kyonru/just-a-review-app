import { ReviewQuestion } from 'src/@types';
import { v4 as uuidv4 } from 'uuid';

const EmptyAnswer = {
  content: '',
  image: [],
  files: [],
  voiceNotes: [],
};

export const createQuestion = (
  question: string,
  required: boolean = true,
): ReviewQuestion => {
  const q = `${question}${question[question.length - 1] !== '?' ? '?' : ''}`;
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
  return {
    ...question,
    answer: question.answer
      ? { ...question.answer, content: answer }
      : { ...EmptyAnswer, content: answer },
  };
};
