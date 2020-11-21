/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { ReviewsState } from 'src/@types/store';
import { Review, ReviewLog } from 'src/@types';

import { ReviewInitialState } from './state';

const INITIAL_STATE = ReviewInitialState;

function addReview(state: ReviewsState, { payload }: PayloadAction<Review>) {
  state.reviews.push(payload);
}

function changeArchiveStateReview(
  state: ReviewsState,
  { payload }: PayloadAction<string>,
) {
  const index = state.reviews.findIndex(
    (value: Review) => value.id === payload,
  );

  state.reviews[index].archivedAt = state.reviews[index].archivedAt
    ? undefined
    : moment().format('MM/DD/YYYY');
}

function deleteReview(state: ReviewsState, { payload }: PayloadAction<string>) {
  const index = state.reviews.findIndex(
    (value: Review) => value.id === payload,
  );

  state.reviews = [
    ...state.reviews.slice(0, index),
    ...state.reviews.slice(index + 1),
  ];
}

function editReview(
  state: ReviewsState,
  { payload }: PayloadAction<{ id: string; update: Review }>,
) {
  const { id, update } = payload;

  const index = state.reviews.findIndex((value: Review) => value.id === id);
  state.reviews[index] = { ...state.reviews[index], ...update };
}

function addLog(
  state: ReviewsState,
  { payload }: PayloadAction<{ reviewId: string; log: ReviewLog }>,
) {
  const index = state.reviews.findIndex(
    (value: Review) => value.id === payload.reviewId,
  );
  state.reviews[index].logs.push(payload.log);
  state.reviews[index].lastLog = new Date().toString();
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
