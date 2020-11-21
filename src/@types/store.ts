import { Review } from 'src/@types/index';

export interface Store {
  [key: string]: any;
  reviews: ReviewsState;
}

export interface ReviewsState {
  reviews: Review[];
}
