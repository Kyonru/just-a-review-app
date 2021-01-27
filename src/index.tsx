import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React from 'react';
import { Provider } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

import {
  ActivityIndicator,
  Provider as PaperProvider,
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { Init as InitNotifications } from 'src/services/notifications/index';
import { Init as InitReporting } from 'src/services/reporting';
import { Init as InitAnalytics } from 'src/services/analytics';
import { Init as InitI18n, LocalizationContext } from 'src/services/i18n';

import { LanguageSource } from 'src/@types/services';

import Drawer from 'src/navigation/drawer';
import { linkingOptions } from 'src/navigation/constants';
import { navigationRef } from 'src/navigation/';

import { store, persistor } from 'src/store';
import settingsSlice from 'src/store/settings/reducer';

import { translate } from 'src/services/i18n/index';

import colors from 'src/theme/colors';
import theme from 'src/theme';

const current = InitI18n();
InitNotifications({
  onRegisterToke: token =>
    store.dispatch(settingsSlice.actions.updateNotificationToken(token)),
});

InitReporting();
InitAnalytics();

RNBootSplash.hide({ fade: true });

export default function GlobalAppComponent() {
  const [locale, setLocale] = React.useState(current);
  const localizationContext = React.useMemo(
    () => ({
      translate: (key: string, options: any) =>
        translate(key, { locale: locale.languageCode, ...options }),
      strings: LanguageSource,
      locale,
      setLocale,
    }),
    [locale],
  );

  return (
    <Provider store={store}>
      <PersistGate
        loading={() => <ActivityIndicator animating color={colors.lynch} />}
        persistor={persistor}
      >
        <LocalizationContext.Provider value={localizationContext}>
          <ActionSheetProvider>
            <NavigationContainer ref={navigationRef} linking={linkingOptions}>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <PaperProvider theme={theme}>
                  <Drawer />
                </PaperProvider>
              </SafeAreaProvider>
            </NavigationContainer>
          </ActionSheetProvider>
        </LocalizationContext.Provider>
      </PersistGate>
    </Provider>
  );
}
