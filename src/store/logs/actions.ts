import { Dispatch } from 'redux';
import { Review } from 'src/@types';
import { convertReviewToLog } from 'src/utils/reviews';
import { addLogAction, deleteLogAction } from 'src/store/shared/actions';

import slice from './reducer';

export function addLog(review: Review, duration: number, startDate: string) {
  return async (dispatch: Dispatch) => {
    const payload = {
      reviewId: review.id,
      log: convertReviewToLog(review, duration, startDate),
    };

    dispatch(slice.actions.addLog(payload));

    return dispatch(addLogAction(payload));
  };
}

export function deleteLog(reviewId: string, logId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.deleteLog(logId));
    return dispatch(deleteLogAction({ reviewId, logId }));
  };
}
