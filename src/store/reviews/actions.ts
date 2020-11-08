import { Dispatch } from 'redux';

import { createReduxAction } from 'src/store/utils';
import { Review } from 'src/@types/index';
import { convertReviewToLog } from 'src/utils/reviews';
import {
  AddReview,
  AddLog,
  ADD_REVIEW,
  ADD_LOG as ADD_REVIEW_LOG,
  ReviewsActions,
} from './types';

export function addReview(review: Review) {
  return async (
    dispatch: Dispatch<ReviewsActions>,
  ): Promise<ReviewsActions> => {
    return dispatch(createReduxAction<AddReview>(ADD_REVIEW, review));
  };
}

export function addLog(review: Review, duration: number, startDate: string) {
  return async (
    dispatch: Dispatch<ReviewsActions>,
  ): Promise<ReviewsActions> => {
    return dispatch(
      createReduxAction<AddLog>(ADD_REVIEW_LOG, {
        reviewId: review.id,
        log: convertReviewToLog(review, duration, startDate),
      }),
    );
  };
}
