import { getReview } from 'src/store/reviews/selector';
import { Review } from 'src/@types/index';
import { Store } from 'src/@types/store';

export interface ReviewDetailsProps {
  navigation: any;
  route: any;
  getReview(id: string): Review;
}

export interface ReviewDetailsState {
  review: Review;
}

export const mapStateToProps = (state: Store) => ({
  getReview: getReview(state),
});

export const mapDispatchToProps = () => ({});
