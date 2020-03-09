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

import Drawer from 'src/navigation/drawer';
import theme from 'src/theme';

import { store, persistor } from 'src/store';
import colors from 'src/theme/colors';

export default function GlobalAppComponent() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator animating color={colors.lynch} />}
        persistor={persistor}
      >
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <Drawer />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
