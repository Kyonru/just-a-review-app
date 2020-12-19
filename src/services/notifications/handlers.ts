import { PushNotification } from 'react-native-push-notification';
import { NotificationPayload, NotificationPayloadType } from 'src/@types';

import { navigate } from 'src/navigation';
import { SCREEN_NAMES } from 'src/navigation/constants';

export function onNotification(notification: PushNotification) {
  const data = notification.data as NotificationPayload;

  if (data.type === NotificationPayloadType.review && data.info) {
    navigate(SCREEN_NAMES.reviewDetails, { review: data.info });
  }
}
