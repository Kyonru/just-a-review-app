import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SCREEN_NAMES } from 'src/navigation/constants';

import NavHeader from 'src/components/nav-header';

import App from 'src/screens/main';
import CreateInApp from 'src/screens/create/in-app';
import CreateExternalForm from 'src/screens/create/external-form';
import ReviewDetails from 'src/screens/review/details';
import ReviewProcessQuestions from 'src/screens/review/process/questions';
import ReviewProcessEnd from 'src/screens/review/process/end';
import ReviewLogDetail from 'src/screens/review/log';

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
          title: 'Inbox',
        }}
        name={SCREEN_NAMES.reviewList}
        component={App}
      />
      <StackCreator.Screen
        options={{
          title: 'Add review',
        }}
        name={SCREEN_NAMES.createInApp}
        component={CreateInApp}
      />
      <StackCreator.Screen
        options={{
          title: 'Add review',
        }}
        name={SCREEN_NAMES.createExternalForm}
        component={CreateExternalForm}
      />
      <StackCreator.Screen
        options={{
          title: '',
        }}
        name={SCREEN_NAMES.reviewDetails}
        component={ReviewDetails}
      />
      <StackCreator.Screen
        options={{
          title: '',
        }}
        name={SCREEN_NAMES.reviewLogDetail}
        component={ReviewLogDetail}
      />
      <StackCreator.Screen
        options={{
          title: '00:00',
          gestureEnabled: false,
          headerTitle: '',
        }}
        name={SCREEN_NAMES.reviewProcessQuestions}
        component={ReviewProcessQuestions}
      />
      <StackCreator.Screen
        options={{
          title: '',
        }}
        name={SCREEN_NAMES.reviewProcessEnd}
        component={ReviewProcessEnd}
      />
    </StackCreator.Navigator>
  );
};
