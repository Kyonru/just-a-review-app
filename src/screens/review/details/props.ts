import { Dispatch } from 'redux';
import { ActionSheetProps } from '@expo/react-native-action-sheet';

import { getReview } from 'src/store/reviews/selector';
import { ReviewsActions } from 'src/store/reviews/types';
import {
  changeArchiveStateReview,
  deleteReview,
} from 'src/store/reviews/actions';

import { Review } from 'src/@types/index';
import { Store } from 'src/@types/store';

export interface ReviewDetailsProps extends ActionSheetProps {
  navigation: any;
  route: any;
  getReview(id: string): Review;
  deleteReview(id: string): Promise<ReviewsActions>;
  changeArchiveStateReview(id: string): Promise<ReviewsActions>;
}

export interface ReviewDetailsState {
  review: Review;
}

export const mapStateToProps = (state: Store) => ({
  getReview: getReview(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<ReviewsActions>) => ({
  deleteReview: (id: string) => deleteReview(id)(dispatch),
  changeArchiveStateReview: (id: string) =>
    changeArchiveStateReview(id)(dispatch),
});
