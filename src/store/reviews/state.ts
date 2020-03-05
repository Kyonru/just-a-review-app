import { ReviewsState } from 'src/@types/store';
import { Review } from 'src/@types';

export class ReviewInitialState implements ReviewsState {
  constructor(public reviews: Review[] = []) {}
}
