import { ReviewType } from 'src/@types';
import colors from './colors';

export const getReviewTypeColor = (type: ReviewType) => {
  return colors[type];
};
