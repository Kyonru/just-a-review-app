import { ReviewQuestion } from 'src/@types';

export const createQuestion = (
  question: string,
  required: boolean = true,
): ReviewQuestion => {
  return {
    q: question,
    required,
  };
};
