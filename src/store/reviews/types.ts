import { StoreAction } from 'src/@types/store';

export const ADD_REVIEW = 'store.reviews.add';

export type ReviewsActionType = typeof ADD_REVIEW;

export type ReviewsActions = AddReview;

export interface AddReview extends StoreAction<ReviewsActionType> {
  type: typeof ADD_REVIEW;
  payload: any;
}
