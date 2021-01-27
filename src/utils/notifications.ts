import moment from 'moment';

import {
  Notification,
  NotificationPayload,
  NotificationPayloadType,
  Review,
} from 'src/@types';
import { LanguageSource } from 'src/@types/services';
import { getRandomInt } from 'src/utils/numbers';
import { translate } from 'src/services/i18n/index';

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
  message: string,
  nextDate: boolean = false,
): {
  title: string;
  message: string;
  data: NotificationPayload;
  review: Review;
} => {
  return {
    title: message,
    message: `${review.type}: ${review.title} ${translate(
      LanguageSource.time,
    )}`,
    data: {
      type: NotificationPayloadType.review,
      date: nextDate ? getNextDate(review).format() : review.nextReminder,
      info: review,
    },
    review,
  };
};
