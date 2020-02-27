import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const StackCreator = createStackNavigator();

import App from 'src/screens/main';

export default () => {
  return (
    <StackCreator.Navigator>
      <StackCreator.Screen name="App" component={App} />
    </StackCreator.Navigator>
  );
};
