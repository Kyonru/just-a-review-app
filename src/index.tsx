import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React from 'react';
import { Provider } from 'react-redux';

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

import Drawer from 'src/navigation/drawer';
import { linkingOptions } from 'src/navigation/constants';
import { navigationRef } from 'src/navigation/';

import { store, persistor } from 'src/store';
import settingsSlice from 'src/store/settings/reducer';

import colors from 'src/theme/colors';
import theme from 'src/theme';

InitNotifications({
  onRegisterToke: token =>
    store.dispatch(settingsSlice.actions.updateNotificationToken(token)),
});

InitReporting();
InitAnalytics();

export default function GlobalAppComponent() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator animating color={colors.lynch} />}
        persistor={persistor}
      >
        <ActionSheetProvider>
          <NavigationContainer ref={navigationRef} linking={linkingOptions}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <PaperProvider theme={theme}>
                <Drawer />
              </PaperProvider>
            </SafeAreaProvider>
          </NavigationContainer>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
}
