/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from 'src/@types/index';
import { NotificationState } from 'src/@types/store';
import { cancelLocalNotification } from 'src/services/notifications/triggers';

import { NotificationsInitialState } from './state';

function addNotification(
  state: NotificationState,
  { payload }: PayloadAction<{ reviewId: string; data: Notification }>,
) {
  state[payload.reviewId] = {
    ...state[payload.reviewId],
    [payload.data.id]: payload.data,
  };
}

function deleteNotifications(
  state: NotificationState,
  { payload }: PayloadAction<{ reviewId: string }>,
) {
  if (state[payload.reviewId]) {
    Object.keys(state[payload.reviewId]).forEach(notificationId => {
      cancelLocalNotification(notificationId);
    });
    delete state[payload.reviewId];
  }
}

export default createSlice({
  name: 'notifications',
  initialState: NotificationsInitialState,
  reducers: {
    addNotification,
    deleteNotifications,
  },
});
