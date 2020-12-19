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

import Drawer from 'src/navigation/drawer';
import theme from 'src/theme';

import { store, persistor } from 'src/store';
import colors from 'src/theme/colors';
import { Init } from 'src/services/notifications/index';
import settingsSlice from 'src/store/settings/reducer';

Init({
  onRegisterToke: token =>
    store.dispatch(settingsSlice.actions.updateNotificationToken(token)),
});

export default function GlobalAppComponent() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator animating color={colors.lynch} />}
        persistor={persistor}
      >
        <ActionSheetProvider>
          <NavigationContainer>
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
