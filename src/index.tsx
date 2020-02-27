import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from 'src/navigation/drawer';

export default class GlobalAppComponent extends Component {
  render() {
    return (
      <NavigationContainer>
        <PaperProvider>
          <Drawer />
        </PaperProvider>
      </NavigationContainer>
    );
  }
}
