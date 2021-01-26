import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Store } from 'src/@types/store';
import { LocalizationContext, updateLanguage } from 'src/services/i18n';
import Drawer from 'src/screens/drawer';

import main from './stacks/main';
import about from './stacks/about';
import settings from './stacks/settings';

import { NAVIGATORS } from './constants';

const DrawerCreator = createDrawerNavigator();

export default () => {
  const { translate, strings, setLocale } = React.useContext(
    LocalizationContext,
  );
  const language = useSelector((state: Store) => state.settings.language);

  useEffect(() => {
    updateLanguage(language);
    setLocale(language);
  }, [language]);

  return (
    <DrawerCreator.Navigator
      initialRouteName={NAVIGATORS.drawer}
      drawerContent={props => <Drawer {...props} />}
      drawerType={Platform.OS === 'android' ? 'front' : 'back'}
    >
      <DrawerCreator.Screen
        options={{
          title: translate(strings.reviews),
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="pending-actions" size={size} color={color} />
          ),
        }}
        name={NAVIGATORS.drawer}
        component={main}
      />
      <DrawerCreator.Screen
        options={{
          title: translate(strings.settings),
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
        name={NAVIGATORS.settings}
        component={settings}
      />
      <DrawerCreator.Screen
        options={{
          title: translate(strings.about),
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
