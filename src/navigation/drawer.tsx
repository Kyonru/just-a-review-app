import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Drawer from 'src/screens/drawer';

import main from './stacks/main';
import about from './stacks/about';

import { NAVIGATORS } from './constants';

const DrawerCreator = createDrawerNavigator();

export default () => {
  return (
    <DrawerCreator.Navigator
      initialRouteName={NAVIGATORS.drawer}
      drawerContent={props => <Drawer {...props} />}
      drawerType={Platform.OS === 'android' ? 'front' : 'back'}
    >
      <DrawerCreator.Screen
        options={{
          title: 'Inbox',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="inbox" size={size} color={color} />
          ),
        }}
        name={NAVIGATORS.drawer}
        component={main}
      />
      <DrawerCreator.Screen
        options={{
          title: 'About',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="info-outline" size={size} color={color} />
          ),
        }}
        name={NAVIGATORS.about}
        component={about}
      />
    </DrawerCreator.Navigator>
  );
};
