import { Dispatch } from 'redux';
import { ActionSheetProps } from '@expo/react-native-action-sheet';

import { getReview } from 'src/store/reviews/selector';
import {
  changeArchiveStateReview,
  deleteReview,
} from 'src/store/reviews/actions';

import { Review, ReviewLog } from 'src/@types/index';
import { Store } from 'src/@types/store';
import { getLogList } from 'src/store/logs/selectors';
import notificationSlice from 'src/store/notifications/reducer';
import { addReviewScheduledNotification } from 'src/store/notifications/actions';
import { mapReviewToNotificationPayload } from 'src/utils/notifications';

export interface ReviewDetailsProps extends ActionSheetProps {
  navigation: any;
  route: any;
  logs: { [key: string]: ReviewLog };
  getReview(id: string): Review;
  deleteReview(id: string): Promise<any>;
  changeArchiveStateReview(id: string, review: Review): Promise<any>;
}

export interface ReviewDetailsState {
  review: Partial<Review>;
}

export const mapStateToProps = (state: Store) => ({
  getReview: getReview(state),
  logs: getLogList(state),
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteReview: (id: string) => {
    dispatch(notificationSlice.actions.deleteNotifications({ reviewId: id }));
    return deleteReview(id)(dispatch);
  },
  changeArchiveStateReview: (id: string, review: Review) => {
    if (!review.archivedAt) {
      dispatch(
        notificationSlice.actions.deleteNotifications({
          reviewId: id,
        }),
      );
    } else {
      addReviewScheduledNotification(mapReviewToNotificationPayload(review))(
        dispatch,
      );
    }
    return changeArchiveStateReview(id)(dispatch);
  },
});
