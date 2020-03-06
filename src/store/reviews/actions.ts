import { Dispatch } from 'redux';

import { createReduxAction } from 'src/store/utils';
import { Review } from 'src/@types/index';
import { AddReview, ADD_REVIEW, ReviewsActions } from './types';

export function addReview(review: Review) {
  return async (
    dispatch: Dispatch<ReviewsActions>,
  ): Promise<ReviewsActions> => {
    return dispatch(createReduxAction<AddReview>(ADD_REVIEW, review));
  };
}
