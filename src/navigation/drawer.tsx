import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import main from './stacks/main';

const DrawerCreator = createDrawerNavigator();

export default () => {
  return (
    <DrawerCreator.Navigator initialRouteName="app.drawer.main">
      <DrawerCreator.Screen
        options={{gestureEnabled: false, title: 'Inbox'}}
        name="app.drawer.main"
        component={main}
      />
    </DrawerCreator.Navigator>
  );
};
