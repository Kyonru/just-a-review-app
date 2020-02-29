import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import main from './stacks/main';
import { NAVIGATORS } from './constants';

const DrawerCreator = createDrawerNavigator();

export default () => {
  return (
    <DrawerCreator.Navigator initialRouteName={NAVIGATORS.drawer}>
      <DrawerCreator.Screen
        options={{ gestureEnabled: false, title: 'Inbox' }}
        name={NAVIGATORS.drawer}
        component={main}
      />
    </DrawerCreator.Navigator>
  );
};
