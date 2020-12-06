/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewsLogState } from 'src/@types/store';
import { ReviewLog } from 'src/@types/index';
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
});
