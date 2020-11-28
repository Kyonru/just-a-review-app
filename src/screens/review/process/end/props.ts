import { Dispatch } from 'redux';
import { addLog } from 'src/store/logs/actions';
import { Review } from 'src/@types';

export interface EndProcessProps {
  navigation: any;
  route: any;
  addLog: (review: Review, duration: number, startDate: string) => Promise<any>;
  review: Review;
}

export const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addLog: (review: Review, duration: number, startDate: string) =>
    addLog(review, duration, startDate)(dispatch),
});
