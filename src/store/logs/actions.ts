import { Dispatch } from 'redux';
import { Review } from 'src/@types';
import { convertReviewToLog } from 'src/utils/reviews';

import slice from './reducer';

export function addLog(review: Review, duration: number, startDate: string) {
  return async (dispatch: Dispatch) => {
    return dispatch(
      slice.actions.addLog({
        reviewId: review.id,
        log: convertReviewToLog(review, duration, startDate),
      }),
    );
  };
}
