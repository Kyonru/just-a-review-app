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
  return {
    ...question,
    answer: question.answer
      ? { ...question.answer, content: answer }
      : { ...EmptyAnswer, content: answer },
  };
};

export const getAnsweredCount = (questions: ReviewQuestion[]) => {
  return (questions || []).reduce((sum, current) => {
    return current.answer ? sum + 1 : sum;
  }, 0);
};
