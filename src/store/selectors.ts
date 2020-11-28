import { Store, ReviewsState, ReviewsLogState } from 'src/@types/store';

export const storeSelector = <T>(storeName: string, state: Store): T => {
  return (state[storeName] || {}) as T;
};

export const reviewsStoreSelector = (state: Store) =>
  storeSelector<ReviewsState>('reviews', state);

export const logsStoreSelector = (state: Store) =>
  storeSelector<ReviewsLogState>('logs', state);
