import { ReviewsState, StoreAction } from 'src/@types/store';
import { ReducerActionMapper } from 'src/store/utils';
import { Review, ReviewLog } from 'src/@types';

import { ReviewInitialState } from './state';
import { ADD_REVIEW, ADD_LOG, ReviewsActionType } from './types';

const INITIAL_STATE = new ReviewInitialState();

const mapActionToReducer = new ReducerActionMapper<ReviewsState>();

mapActionToReducer.add(ADD_REVIEW, (state, review: Review) => ({
  ...state,
  reviews: state.reviews.concat(review),
}));

mapActionToReducer.add(
  ADD_LOG,
  (state, { reviewId, log }: { reviewId: string; log: ReviewLog }) => {
    const index = state.reviews.findIndex(
      (value: Review) => value.id === reviewId,
    );

    const logs = [log, ...(state.reviews[index].logs || [])];

    const reviews = [
      ...state.reviews.slice(0, index),
      { ...state.reviews[index], logs },
      ...state.reviews.slice(index + 1),
    ];

    return { ...state, reviews };
  },
);

export default function reviewsReducer(
  state: ReviewsState = INITIAL_STATE,
  action: StoreAction<ReviewsActionType>,
): ReviewsState {
  return mapActionToReducer.mapAction(action.type, state, action.payload);
}
