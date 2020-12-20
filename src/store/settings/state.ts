import { SettingsState } from 'src/@types/store';
import { createRandomAvatar } from 'src/utils/avatar';

export const SettingsInitialState: SettingsState = {
  user: {
    name: 'Dear User',
    image: createRandomAvatar(),
  },
  development: {
    showYellowBox: false,
  },
  language: 'english',
  useDarkMode: false,
  showOnBoarding: false,
  useRewards: false,
  notifications: {
    clearDelivered: false,
    enabled: true,
    token: undefined,
  },
};
