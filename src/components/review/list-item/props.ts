import {Review} from 'src/@types';

export interface ReviewListItemProps {
  data: Review;
  onPress?(): void;
}
