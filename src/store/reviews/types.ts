import { StoreAction } from 'src/@types/store';
import { Review, ReviewLog } from 'src/@types/index';

export const ADD_REVIEW = 'store.reviews.add';
export const ADD_LOG = 'store.reviews.log.add';

export type ReviewsActionType = typeof ADD_REVIEW | typeof ADD_LOG;

export type ReviewsActions = AddReview | AddLog;

export interface AddReview extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: Review;
}

export interface AddLog extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: { log: ReviewLog; reviewId: number };
}
