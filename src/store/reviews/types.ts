import { StoreAction } from 'src/@types/store';
import { Review, ReviewLog } from 'src/@types/index';

export const ADD_REVIEW = 'store.reviews.add';
export const EDIT_REVIEW = 'store.reviews.edit';
export const ADD_LOG = 'store.reviews.log.add';

export type ReviewsActionType =
  | typeof ADD_REVIEW
  | typeof ADD_LOG
  | typeof EDIT_REVIEW;

export type ReviewsActions = AddReview | AddLog | EditReview;

export interface AddReview extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: Review;
}

export interface EditReview extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: { id: string; update: Review };
}

export interface AddLog extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: { log: ReviewLog; reviewId: number };
}
