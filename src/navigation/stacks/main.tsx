import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SCREEN_NAMES } from 'src/navigation/constants';

import NavHeader from 'src/components/nav-header';

import App from 'src/screens/main';
import CreateInApp from 'src/screens/create/in-app';
import CreateGoogleForm from 'src/screens/create/google-form';

const StackCreator = createStackNavigator();

export default () => {
  return (
    <StackCreator.Navigator>
      <StackCreator.Screen
        options={{
          header: props => {
            return <NavHeader {...props} />;
          },
          title: 'Inbox',
        }}
        name={SCREEN_NAMES.reviewList}
        component={App}
      />
      <StackCreator.Screen
        options={{
          header: props => {
            return <NavHeader {...props} />;
          },
          title: 'Add review',
        }}
        name={SCREEN_NAMES.createInApp}
        component={CreateInApp}
      />
      <StackCreator.Screen
        options={{
          header: props => {
            return <NavHeader {...props} />;
          },
          title: 'Add review',
        }}
        name={SCREEN_NAMES.createGoogleForm}
        component={CreateGoogleForm}
      />
    </StackCreator.Navigator>
  );
};
