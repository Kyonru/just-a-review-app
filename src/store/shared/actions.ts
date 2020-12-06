import { createAction } from '@reduxjs/toolkit';
import { ReviewLog } from 'src/@types';

export const addLogAction = createAction<{ reviewId: string; log: ReviewLog }>(
  'log.add',
);
export const deleteLogAction = createAction<{
  reviewId: string;
  logId: string;
}>('log.delete');
