import { Dispatch } from 'redux';

import { addLog } from 'src/store/logs/actions';
import { Review } from 'src/@types';
import { addReviewScheduledNotification } from 'src/store/notifications/actions';
import { mapReviewToNotificationPayload } from 'src/utils/notifications';

export interface EndProcessProps {
  navigation: any;
  route: any;
  addLog: (
    review: Review,
    duration: number,
    startDate: string,
    message: string,
  ) => Promise<any>;
  review: Review;
}

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addLog: (
    review: Review,
    duration: number,
    startDate: string,
    message: string,
  ) => {
    addReviewScheduledNotification(
      mapReviewToNotificationPayload(review, message, true),
    )(dispatch);
    return addLog(review, duration, startDate)(dispatch);
  },
});
