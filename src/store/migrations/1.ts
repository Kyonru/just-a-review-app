import { Store } from 'src/@types/store';
import { getRandomInt } from 'src/utils/numbers';

export default function(state: Store) {
  return {
    ...state,
    settings: {
      ...state.settings,
      notifications: {
        token: undefined,
        enabled: true,
        clearDelivered: true,
      },
      user: {
        ...state.settings.user,
        id: getRandomInt(),
      },
    },
  };
}
