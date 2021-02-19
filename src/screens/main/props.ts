import { Dispatch } from 'redux';
import { SectionListData } from 'react-native';
import { addReview } from 'src/store/reviews/actions';
import {
  getArchivedReviewListLength,
  getReviewListAsSectionList,
} from 'src/store/reviews/selector';
import { Review } from 'src/@types';
import { Store } from 'src/@types/store';
import settingsSlice from 'src/store/settings/reducer';
import { getShowOnBoarding } from 'src/store/settings/selectors';

export interface ReviewsMainScreenAppProps {
  navigation: any;
  addReview: (review: Review) => Promise<any>;
  reviews: SectionListData<Review>[];
  archiveCount: number;
  showOnboarding: boolean;
  hideOnboarding(): void;
}

export interface ReviewsMainScreenAppState {
  showFAB: boolean;
}

export const mapStateToProps = (state: Store) => ({
  reviews: getReviewListAsSectionList(state),
  archiveCount: getArchivedReviewListLength(state),
  showOnboarding: getShowOnBoarding(state),
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addReview: (review: Review) => addReview(review)(dispatch),
  hideOnboarding: () =>
    dispatch(settingsSlice.actions.toggleShowOnBoarding(false)),
});
