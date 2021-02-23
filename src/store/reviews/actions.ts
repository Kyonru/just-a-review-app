import { Dispatch } from 'redux';

import { Review } from 'src/@types/index';
import notificationSlice from 'src/store/notifications/reducer';
import { addReviewScheduledNotification } from 'src/store/notifications/actions';
import { mapReviewToNotificationPayload } from 'src/utils/notifications';
import { moveDateToPresent } from 'src/utils/time';

import slice from './reducer';

export function addReview(review: Review) {
  return async (dispatch: Dispatch) => {
    return dispatch(slice.actions.addReview(review));
  };
}

export function editReview(id: string, update: Review) {
  return async (dispatch: Dispatch) => {
    return dispatch(slice.actions.editReview({ id, update }));
  };
}

export function deleteReview(id: string) {
  return async (dispatch: Dispatch) => {
    return dispatch(slice.actions.deleteReview(id));
  };
}

export function changeArchiveStateReview(id: string) {
  return async (dispatch: Dispatch) => {
    return dispatch(slice.actions.changeArchiveStateReview(id));
  };
}

export function skipToNextReminder(review: Review, message: string) {
  return async (dispatch: Dispatch) => {
    const updated: Review = {
      ...review,
      nextReminder: moveDateToPresent(review.nextReminder, review.type),
    };
    dispatch(
      notificationSlice.actions.deleteNotifications({ reviewId: updated.id }),
    );
    addReviewScheduledNotification(
      mapReviewToNotificationPayload(updated, message, true),
    )(dispatch);
    return dispatch(
      slice.actions.skipToNextReminder({
        id: updated.id,
        nextReminder: updated.nextReminder,
      }),
    );
  };
}
