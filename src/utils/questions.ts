import { ReviewQuestion } from 'src/@types';
import { v4 as uuidv4 } from 'uuid';

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
