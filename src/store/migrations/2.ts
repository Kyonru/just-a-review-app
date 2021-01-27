import { defaultLanguage } from 'src/data/language';

import { Store } from 'src/@types/store';

export default function(state: Store) {
  return {
    ...state,
    settings: {
      ...state.settings,
      language: defaultLanguage,
    },
  };
}
