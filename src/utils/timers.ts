import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

export const withDebounce = (
  method: () => any,
  limit = 500,
  leading = true,
  trailing = false,
) => debounce(method, limit, { leading, trailing });

export const withThrottle = (
  method: () => any = () => {},
  limit = 500,
  leading = true,
  trailing = false,
) => throttle(method, limit, { leading, trailing });
