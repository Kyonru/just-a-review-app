/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

// #region mock data
import { createMockReducer } from 'src/store/utils/mock';
import review from 'src/data/mock/review';
import reviewLog from 'src/data/mock/reviewLog';
// #endregion

import { ReviewsState } from 'src/@types/store';
import { Review, ReviewLog } from 'src/@types';
import { addLogAction, deleteLogAction } from 'src/store/shared/actions';
import { getNextDate } from 'src/utils/reviews';
import { moveDateToPresent } from 'src/utils/time';

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
  state.reviews[payload.reviewId].lastLog = moment().format();
  state.reviews[payload.reviewId].nextReminder = getNextDate(
    state.reviews[payload.reviewId],
  ).format();
}

function skipToNextReminder(
  state: ReviewsState,
  { payload }: PayloadAction<{ id: string; nextReminder: string }>,
) {
  state.reviews[payload.id].nextReminder = getNextDate({
    ...state.reviews[payload.id],
    nextReminder: moveDateToPresent(
      payload.nextReminder,
      state.reviews[payload.id].type,
    ),
  }).format();
}

function deleteLog(
  state: ReviewsState,
  { payload }: PayloadAction<{ reviewId: string; logId: string }>,
) {
  const index = state.reviews[payload.reviewId].logs.indexOf(payload.logId);

  state.reviews[payload.reviewId].logs = [
    ...state.reviews[payload.reviewId].logs.slice(0, index),
    ...state.reviews[payload.reviewId].logs.slice(
      index + 1,
      state.reviews[payload.reviewId].logs.length,
    ),
  ];
}

export default createSlice({
  name: 'reviews',
  initialState: INITIAL_STATE,
  reducers: {
    addReview,
    changeArchiveStateReview,
    deleteReview,
    editReview,
    skipToNextReminder,
  },
  extraReducers: builder => {
    builder.addCase(addLogAction, addLog);
    builder.addCase(deleteLogAction, deleteLog);
    createMockReducer(
      builder,
      [addReview, addLog],
      [review, { reviewId: reviewLog.reviewId, log: reviewLog }],
    );
  },
});
