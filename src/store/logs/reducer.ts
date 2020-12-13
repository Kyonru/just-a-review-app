/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewsLogState } from 'src/@types/store';
import { ReviewLog } from 'src/@types/index';
import { createMockReducer } from 'src/store/utils/mock';
import reviewLog from 'src/data/mock/reviewLog';

import { ReviewsLogsInitialState } from './state';

function addLog(
  state: ReviewsLogState,
  { payload }: PayloadAction<{ reviewId: string; log: ReviewLog }>,
) {
  state.logs[payload.log.id] = {
    ...payload.log,
    reviewId: payload.reviewId,
  };
}

function deleteLog(state: ReviewsLogState, { payload }: PayloadAction<string>) {
  delete state.logs[payload];
}

export default createSlice({
  name: 'logs',
  initialState: ReviewsLogsInitialState,
  reducers: {
    addLog,
    deleteLog,
  },
  extraReducers: builder => {
    createMockReducer(
      builder,
      [addLog],
      [{ reviewId: reviewLog.reviewId, log: reviewLog }],
    );
  },
});
