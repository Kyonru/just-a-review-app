import { Dispatch } from 'redux';
import { SectionListData } from 'react-native';
import { ReviewsActions } from 'src/store/reviews/types';
import { addReview } from 'src/store/reviews/actions';
import { getReviewListAsSectionList } from 'src/store/reviews/selector';
import { Review } from 'src/@types';
import { Store } from 'src/@types/store';

export interface ReviewsMainScreenAppProps {
  navigation: any;
  addReview: (review: Review) => Promise<ReviewsActions>;
  reviews: SectionListData<Review>[];
}

export interface ReviewsMainScreenAppState {
  showFAB: boolean;
}

export const mapStateToProps = (state: Store) => ({
  reviews: getReviewListAsSectionList(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<ReviewsActions>) => ({
  addReview: (review: Review) => addReview(review)(dispatch),
});
