import moment from 'moment';

import {
  Notification,
  NotificationPayload,
  NotificationPayloadType,
  Review,
} from 'src/@types';
import { getRandomInt } from 'src/utils/numbers';
import { getNextDate } from './reviews';

export const createNotificationPayload = (
  type: NotificationPayloadType,
  data: Review,
): NotificationPayload => {
  return {
    type,
    date: moment().format(),
    info: data,
  };
};

export const createNotification = (
  title: string,
  message: string,
  date: string,
  id?: string,
): Notification => {
  return {
    id: id || `${getRandomInt()}`,
    title,
    message,
    date,
  };
};

export const mapReviewToNotificationPayload = (
  review: Review,
  nextDate: boolean = false,
): {
  title: string;
  message: string;
  data: NotificationPayload;
  review: Review;
} => {
  return {
    title: 'Time for a review process! 🔥',
    message: `${review.type}: ${review.title}`,
    data: {
      type: NotificationPayloadType.review,
      date: getNextDate(review, nextDate).format(),
      info: review,
    },
    review,
  };
};
