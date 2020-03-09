import { Dispatch } from 'redux';
import { ReviewsActions } from 'src/store/reviews/types';
import { addLog } from 'src/store/reviews/actions';
import { Review } from 'src/@types';

export interface EndProcessProps {
  navigation: any;
  route: any;
  addLog: (review: Review, duration: number) => Promise<ReviewsActions>;
  review: Review;
}

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch: Dispatch<ReviewsActions>) => ({
  addLog: (review: Review, duration: number) =>
    addLog(review, duration)(dispatch),
});
