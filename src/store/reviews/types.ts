import { StoreAction } from 'src/@types/store';
import { Review, ReviewLog } from 'src/@types/index';

export const ADD_REVIEW = 'store.reviews.add';
export const EDIT_REVIEW = 'store.reviews.edit';
export const DELETE_REVIEW = 'store.reviews.delete';
export const CHANGE_ARCHIVE_STATE_REVIEW = 'store.reviews.archive';
export const ADD_LOG = 'store.reviews.log.add';

export type ReviewsActionType =
  | typeof ADD_REVIEW
  | typeof ADD_LOG
  | typeof DELETE_REVIEW
  | typeof CHANGE_ARCHIVE_STATE_REVIEW
  | typeof EDIT_REVIEW;

export type ReviewsActions =
  | AddReview
  | AddLog
  | EditReview
  | ChangeArchiveStateReview
  | DeleteReview;

export interface AddReview extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: Review;
}

export interface DeleteReview extends StoreAction<ReviewsActionType> {
  type: typeof DELETE_REVIEW;
  payload: string;
}

export interface ChangeArchiveStateReview
  extends StoreAction<ReviewsActionType> {
  type: typeof CHANGE_ARCHIVE_STATE_REVIEW;
  payload: string;
}

export interface EditReview extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: { id: string; update: Review };
}

export interface AddLog extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: { log: ReviewLog; reviewId: number };
}
