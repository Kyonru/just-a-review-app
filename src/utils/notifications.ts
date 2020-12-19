import moment from 'moment';
import {
  NotificationPayloadType,
  NotificationPayload,
  Review,
} from 'src/@types';

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
