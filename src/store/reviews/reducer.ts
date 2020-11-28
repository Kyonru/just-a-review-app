/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { ReviewsState } from 'src/@types/store';
import { Review, ReviewLog } from 'src/@types';

import { ReviewInitialState } from './state';

const INITIAL_STATE = ReviewInitialState;

function addReview(state: ReviewsState, { payload }: PayloadAction<Review>) {
  state.reviews[payload.id] = payload;
}

function changeArchiveStateReview(
  state: ReviewsState,
  { payload }: PayloadAction<string>,
) {
  state.reviews[payload].archivedAt = state.reviews[payload].archivedAt
    ? undefined
    : moment().format('MM/DD/YYYY');
}

function deleteReview(state: ReviewsState, { payload }: PayloadAction<string>) {
  delete state.reviews[payload];
}

function editReview(
  state: ReviewsState,
  { payload }: PayloadAction<{ id: string; update: Review }>,
) {
  const { id, update } = payload;

  state.reviews[id] = { ...state.reviews[id], ...update };
}

function addLog(
  state: ReviewsState,
  { payload }: PayloadAction<{ reviewId: string; log: ReviewLog }>,
) {
  state.reviews[payload.reviewId].logs.push(payload.log.id);
  state.reviews[payload.reviewId].lastLog = new Date().toString();
}

export default createSlice({
  name: 'reviews',
  initialState: INITIAL_STATE,
  reducers: {
    addLog,
    addReview,
    changeArchiveStateReview,
    deleteReview,
    editReview,
  },
});
