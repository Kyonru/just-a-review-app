import { ErrorPayload } from 'src/@types';

export const createError = (
  message: string,
  tags?: { [key: string]: any },
  error?: Error,
): ErrorPayload => {
  return {
    message,
    error: error || Error(message),
    tags,
  };
};
