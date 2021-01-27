import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SCREEN_NAMES } from 'src/navigation/constants';

import NavHeader from 'src/components/nav-header';
import { LocalizationContext } from 'src/services/i18n';

import AboutApp from 'src/screens/drawer/about';
import EasterEgg from 'src/screens/drawer/about/easter-egg';

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
          title: translate(strings.aboutThisApp),
        }}
        name={SCREEN_NAMES.aboutApp}
        component={AboutApp}
      />
      <StackCreator.Screen
        options={{
          title: translate(strings.oopsYouFoundMe),
        }}
        name={SCREEN_NAMES.easterEgg}
        component={EasterEgg}
      />
    </StackCreator.Navigator>
  );
};
