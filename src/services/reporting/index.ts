import * as Sentry from '@sentry/react-native';
import { SENTRY } from '@env';

import { ErrorPayload } from 'src/@types';

export const Init = () => {
  if (__DEV__) {
    return;
  }
  Sentry.init({
    dsn: SENTRY,
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
