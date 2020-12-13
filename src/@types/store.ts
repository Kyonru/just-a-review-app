import { Review, ReviewLog, User } from 'src/@types/index';

export interface Store {
  [key: string]: any;
  reviews: ReviewsState;
  logs: ReviewsLogState;
}

export interface ReviewsState {
  reviews: { [key: string]: Review };
}

export interface ReviewsLogState {
  logs: { [key: string]: ReviewLog };
}

export interface SettingsState {
  user: User;
  development: {
    showYellowBox: boolean;
  };
  language: string;
  useDarkMode: boolean;
  showOnBoarding: boolean;
  useRewards: boolean;
}
