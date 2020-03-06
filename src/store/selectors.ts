import { Store, ReviewsState } from 'src/@types/store';

export const storeSelector = <T>(storeName: string, state: Store): T => {
  return (state[storeName] || {}) as T;
};

export const reviewsStoreSelector = (state: Store) =>
  storeSelector<ReviewsState>('reviews', state);
