import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { SCREEN_NAMES } from 'src/navigation/constants';
import { LocalizationContext } from 'src/services/i18n';

import NavHeader from 'src/components/nav-header';

import Settings from 'src/screens/settings';
import AvatarEdit from 'src/screens/settings/avatar-edit';

const StackCreator = createStackNavigator();

export default () => {
  const { translate, strings } = React.useContext(LocalizationContext);

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
          title: translate(strings.settings),
        }}
        name={SCREEN_NAMES.settings}
        component={Settings}
      />
      <StackCreator.Screen
        options={{
          title: translate(strings.avatarEdit),
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        name={SCREEN_NAMES.avatarEdit}
        component={AvatarEdit}
      />
    </StackCreator.Navigator>
  );
};
