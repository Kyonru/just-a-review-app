import React from 'react';
import { View, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { SvgUri } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Drawer as PaperDrawer, Subheading } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';

import {
  triggerLocalNotification,
  createScheduleNotification,
} from 'src/services/notifications/triggers';
import { setMockState } from 'src/store/mock/actions';
import { settingsStoreSelector } from 'src/store/selectors';
import colors from 'src/theme/colors';
import review from 'src/data/mock/review';

import { createNotificationPayload } from 'src/utils/notifications';
import { NotificationPayloadType } from 'src/@types';
import styles from './styles';

function Drawer(props: any) {
  const dispatch = useDispatch();
  const { user } = useSelector(settingsStoreSelector);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
      testID="drawer_screen"
    >
      <View style={styles.header}>
        <SvgUri width={100} height={100} uri={user.image} />
        <Subheading style={styles.name}>{user.name}</Subheading>
      </View>
      {__DEV__ ? (
        <>
          <TouchableOpacity
            style={styles.testButton}
            testID="populate_date_button"
            onPress={() => {
              dispatch(setMockState());
              (props.navigation as any).toggleDrawer();
            }}
          >
            <Text>Populate Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.testButton}
            testID="test_notification_button"
            onPress={() => {
              triggerLocalNotification({
                title: 'Local Notification',
                message: 'Test Message',
                group: 'Reviews',
                data: createNotificationPayload(
                  NotificationPayloadType.review,
                  review,
                ),
              });
              createScheduleNotification(new Date(Date.now() + 25 * 1000), {
                title: 'Schedule Notification',
                message: `${new Date(Date.now() + 25 * 1000)}`,
                group: 'Reviews',
                data: createNotificationPayload(
                  NotificationPayloadType.review,
                  review,
                ),
              });

              (props.navigation as any).toggleDrawer();
            }}
          >
            <Text>Notification</Text>
          </TouchableOpacity>
        </>
      ) : null}
      <PaperDrawer.Section title=" ">
        <DrawerItemList
          {...props}
          activeBackgroundColor="transparent"
          activeTintColor={colors.pistonBlue}
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
}

export default connect(undefined, undefined)(Drawer);
