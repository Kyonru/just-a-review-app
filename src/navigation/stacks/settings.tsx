import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SCREEN_NAMES } from 'src/navigation/constants';

import NavHeader from 'src/components/nav-header';

import Settings from 'src/screens/settings';
import AvatarEdit from 'src/screens/settings/avatar-edit';

const StackCreator = createStackNavigator();

export default () => {
  return (
    <StackCreator.Navigator
      screenOptions={{
        header: props => {
          return <NavHeader {...props} />;
        },
      }}
    >
      <StackCreator.Screen
        options={{
          title: 'Settings',
        }}
        name={SCREEN_NAMES.settings}
        component={Settings}
      />
      <StackCreator.Screen
        options={{
          title: 'Avatar Edit',
        }}
        name={SCREEN_NAMES.avatarEdit}
        component={AvatarEdit}
      />
    </StackCreator.Navigator>
  );
};
