import { ReviewsState, StoreAction } from 'src/@types/store';
import { ReducerActionMapper } from 'src/store/utils';
import { Review } from 'src/@types';

import { ReviewInitialState } from './state';
import { ADD_REVIEW, ReviewsActionType } from './types';

const INITIAL_STATE = new ReviewInitialState();

const mapActionToReducer = new ReducerActionMapper<ReviewsState>();

mapActionToReducer.add(ADD_REVIEW, (state, review: Review) => ({
  ...state,
  reviews: state.reviews.concat(review),
}));

export default function reviewsReducer(
  state: ReviewsState = INITIAL_STATE,
  action: StoreAction<ReviewsActionType>,
): ReviewsState {
  return mapActionToReducer.mapAction(action.type, state, action.payload);
}
