import { Review } from 'src/@types/index';

export interface Store {
  [key: string]: any;
  reviews: ReviewsState;
}

export interface StoreAction<T> {
  readonly type: T;
  payload?: any;
}

export interface ReviewsState {
  reviews: Review[];
}

export type StoreReducerAction<T> = {
  [key: string]: (state: T, payload?: any) => T;
};
