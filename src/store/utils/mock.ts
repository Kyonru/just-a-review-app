import { ActionCreator, CaseReducer } from '@reduxjs/toolkit';
import { setMockState } from 'src/store/mock/actions';

export function createMockReducer(
  builder: any,
  callbacks: CaseReducer<any, ReturnType<ActionCreator<any>>>[],
  mockData: unknown[],
) {
  builder.addCase(setMockState, (state: any) => {
    callbacks.forEach((cb, index) => {
      cb(state, { payload: mockData[index] });
    });
  });
}
