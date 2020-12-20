import moment from 'moment';
import { Dispatch } from 'redux';
import {
  NotificationPayload,
  NotificationPayloadType,
  Review,
} from 'src/@types';
import { createScheduleNotification } from 'src/services/notifications/triggers';
import {
  createNotification,
  createNotificationPayload,
} from 'src/utils/notifications';

import { store } from 'src/store';
import { getNotificationsSettings } from 'src/store/settings/selectors';

import slice from './reducer';

export function addReviewScheduledNotification(payload: {
  title: string;
  message: string;
  data: NotificationPayload;
  review: Review;
}) {
  return async (dispatch: Dispatch) => {
    if (!getNotificationsSettings(store.getState()).enabled) {
      return {}; // TODO: Fix this
    }

    const id = createScheduleNotification(moment(payload.data.date).toDate(), {
      title: payload.title,
      message: payload.message,
      group: 'Reviews',
      data: createNotificationPayload(
        NotificationPayloadType.review,
        payload.review,
      ),
    });

    const notification = createNotification(
      payload.title,
      payload.message,
      payload.data.date,
      id,
    );

    return dispatch(
      slice.actions.addNotification({
        reviewId: payload.review.id,
        data: notification,
      }),
    );
  };
}
