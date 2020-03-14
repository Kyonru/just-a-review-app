import { Review } from 'src/@types';

export interface ReviewListItemProps {
  data: Review;
  onPress?(value: Review): void;
}
