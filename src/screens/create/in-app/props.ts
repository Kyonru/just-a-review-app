/* eslint-disable @typescript-eslint/indent */
import { Dispatch } from 'redux';
import { Route } from '@react-navigation/native';
import { addReview, editReview } from 'src/store/reviews/actions';
import {
  Review,
  ReviewType,
  ReviewQuestion,
  DayOfTheWeek,
} from 'src/@types/index';
import { SCREEN_NAMES } from 'src/navigation/constants';
import { addReviewScheduledNotification } from 'src/store/notifications/actions';
import { mapReviewToNotificationPayload } from 'src/utils/notifications';
import notificationSlice from 'src/store/notifications/reducer';

export interface CreateInAppProps
  extends Route<
    SCREEN_NAMES.reviewProcessEnd,
    { route: { review?: Review; editModeEnabled: boolean } }
  > {
  navigation: any;
  addReview: (review: Review) => Promise<any>;
  editReview: (id: string, review: Review) => Promise<any>;
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

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addReview: (review: Review) => {
    addReview(review)(dispatch);
    addReviewScheduledNotification(mapReviewToNotificationPayload(review))(
      dispatch,
    );
  },
  editReview: (id: string, review: Review) => {
    editReview(id, review)(dispatch);
    dispatch(notificationSlice.actions.deleteNotifications({ reviewId: id }));
    addReviewScheduledNotification(mapReviewToNotificationPayload(review))(
      dispatch,
    );
  },
});
