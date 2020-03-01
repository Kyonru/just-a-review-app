import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Drawer from 'src/navigation/drawer';
import theme from 'src/theme';

export default function GlobalAppComponent() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Drawer />
      </PaperProvider>
    </NavigationContainer>
  );
}
