import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Drawer from 'src/screens/drawer';

import main from './stacks/main';
import about from './stacks/about';
import settings from './stacks/settings';

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
          title: 'Reviews',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="pending-actions" size={size} color={color} />
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
      <DrawerCreator.Screen
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
        name={NAVIGATORS.settings}
        component={settings}
      />
    </DrawerCreator.Navigator>
  );
};
