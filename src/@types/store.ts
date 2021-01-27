import { Locale } from 'react-native-localize';
import { Review, ReviewLog, User, Token, Notification } from 'src/@types/index';

export interface Store {
  [key: string]: any;
  reviews: ReviewsState;
  logs: ReviewsLogState;
  settings: SettingsState;
  notifications: NotificationState;
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
  language: Locale;
  useDarkMode: boolean;
  showOnBoarding: boolean;
  useRewards: boolean;
  notifications: {
    clearDelivered: boolean;
    enabled: boolean;
    token?: Token;
  };
}

export interface NotificationState {
  [reviewId: string]: {
    [notificationId: string]: Notification;
  };
}
