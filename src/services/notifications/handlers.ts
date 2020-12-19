import { PushNotification } from 'react-native-push-notification';

export function onNotification(notification: PushNotification) {
  console.log('NOTIFICAITON RECEIVED', notification);
}
