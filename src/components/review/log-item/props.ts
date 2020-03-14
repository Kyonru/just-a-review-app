import { ReviewLog } from 'src/@types/index';

export interface LogListItemProps {
  data: ReviewLog;
  onPress?(): void;
}
