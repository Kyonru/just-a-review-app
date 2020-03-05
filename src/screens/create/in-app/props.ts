import { Dispatch } from 'redux';
import { ReviewsActions } from 'src/store/reviews/types';
import { addReview } from 'src/store/reviews/actions';
import {
  Review,
  ReviewType,
  ReviewQuestion,
  DayOfTheWeek,
} from 'src/@types/index';

export interface CreateInAppProps {
  navigation: any;
  addReview: (review: Review) => Promise<ReviewsActions>;
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
}

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch: Dispatch<ReviewsActions>) => ({
  addReview: (review: Review) => addReview(review)(dispatch),
});
