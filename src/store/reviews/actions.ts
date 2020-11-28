import { Dispatch } from 'redux';

import { Review } from 'src/@types/index';
import slice from './reducer';

export function addReview(review: Review) {
  return async (dispatch: Dispatch) => {
    return dispatch(slice.actions.addReview(review));
  };
}

export function editReview(id: string, update: Review) {
  return async (dispatch: Dispatch) => {
    return dispatch(slice.actions.editReview({ id, update }));
  };
}

export function deleteReview(id: string) {
  return async (dispatch: Dispatch) => {
    return dispatch(slice.actions.deleteReview(id));
  };
}

export function changeArchiveStateReview(id: string) {
  return async (dispatch: Dispatch) => {
    return dispatch(slice.actions.changeArchiveStateReview(id));
  };
}
