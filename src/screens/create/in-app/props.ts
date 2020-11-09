/* eslint-disable @typescript-eslint/indent */
import { Dispatch } from 'redux';
import { Route } from '@react-navigation/native';
import { ReviewsActions } from 'src/store/reviews/types';
import { addReview, editReview } from 'src/store/reviews/actions';
import {
  Review,
  ReviewType,
  ReviewQuestion,
  DayOfTheWeek,
} from 'src/@types/index';
import { SCREEN_NAMES } from 'src/navigation/constants';

export interface CreateInAppProps
  extends Route<
    SCREEN_NAMES.reviewProcessEnd,
    { route: { review?: Review; editModeEnabled: boolean } }
  > {
  navigation: any;
  addReview: (review: Review) => Promise<ReviewsActions>;
  editReview: (id: string, review: Review) => Promise<ReviewsActions>;
}

export interface CreateInAppState {
  name: string;
  type: ReviewType;
  questions: ReviewQuestion[];
  currentQuestion: string;
  date: Date;
  day: DayOfTheWeek;
  time: Date;
  monthlyDay: number | string;
  showFAB: boolean;
}

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch: Dispatch<ReviewsActions>) => ({
  addReview: (review: Review) => addReview(review)(dispatch),
  editReview: (id: string, review: Review) => editReview(id, review)(dispatch),
});
