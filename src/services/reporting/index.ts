import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';

import { SENTRY } from '@env';

import { ErrorPayload } from 'src/@types';

export const Init = () => {
  if (__DEV__) {
    return;
  }
  Sentry.init({
    dsn: SENTRY,
  });

  codePush.getUpdateMetadata().then(update => {
    if (update) {
      /**
       * This is kinda broken u..u Keep an eye on this:
       * @url https://forum.sentry.io/t/managing-sentry-releases-for-react-native-codepush-updates-that-use-semantic-version/2793/9
       */
      Sentry.setRelease(`${update.appVersion}+codepush:${update.label}`);
    }
  });
};

export const captureException = (error: ErrorPayload): string => {
  return Sentry.captureException(error.error, {
    tags: {
      displayedMessage: error.message,
      ...error.tags,
    },
  });
};
