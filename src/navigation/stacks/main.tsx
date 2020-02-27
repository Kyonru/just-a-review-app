import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const StackCreator = createStackNavigator();

import NavHeader from 'src/components/nav-header';

import App from 'src/screens/main';

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
        name="app.main.reviews"
        component={App}
      />
    </StackCreator.Navigator>
  );
};
