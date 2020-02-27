import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import main from './stacks/main';

const DrawerCreator = createDrawerNavigator();

export default () => {
  return (
    <DrawerCreator.Navigator initialRouteName="Main">
      <DrawerCreator.Screen
        options={{gestureEnabled: false}}
        name="Main"
        component={main}
      />
    </DrawerCreator.Navigator>
  );
};
