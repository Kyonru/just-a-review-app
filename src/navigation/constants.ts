import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';

export enum SCREEN_NAMES {
  createInApp = 'app.main.reviews.add',
  questionEdit = 'app.main.reviews.add.question.edit',
  createExternalForm = 'app.main.reviews.add.google.form',
  reviewList = 'app.main.reviews',
  archivedReviewList = 'app.main.reviews.archived',
  reviewDetails = 'app.main.reviews.details',
  reviewProcessQuestions = 'app.main.reviews.process.questions',
  reviewProcessEnd = 'app.main.reviews.process.end',
  reviewLogDetail = 'app.main.reviews.logs.details',
  aboutApp = 'app.about',
  easterEgg = 'app.about.surprise',
  settings = 'app.settings',
  avatarEdit = 'app.settings.avatar.edit',
}

export enum NAVIGATORS {
  drawer = 'app.drawer.main',
  about = 'app.drawer.about',
  settings = 'app.drawer.settings',
}

export const linkingOptions: LinkingOptions = {
  prefixes: ['justreviewapp://'],
  config: {
    screens: {
      [NAVIGATORS.drawer]: {
        screens: {
          [SCREEN_NAMES.reviewDetails]: {
            path: 'review/:id',
            parse: {
              id: String,
            },
          },
          [SCREEN_NAMES.reviewList]: 'reviews',
        },
      },
    },
  },
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Get the `url` property from the notification which corresponds to a screen
    // This property needs to be set on the notification payload when sending it
    return url;
  },
  // TODO: Fix and map routes
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => {
      listener(url);
    };

    // Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL);

    return () => {
      // Clean up the event listeners
      Linking.removeEventListener('url', onReceiveURL);
    };
  },
};
