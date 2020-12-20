import { v4 as uuidv4 } from 'uuid';

import { Store } from 'src/@types/store';

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
        id: uuidv4(),
      },
    },
  };
}
