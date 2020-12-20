import React from 'react';
import { View, Alert } from 'react-native';
import { List, Switch, IconButton, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';

import ScreenContainer from 'src/components/screen-container';
import { settingsStoreSelector } from 'src/store/selectors';
import settingsSlice from 'src/store/settings/reducer';
import { SCREEN_NAMES } from 'src/navigation/constants';
import colors from 'src/theme/colors';

import styles from './styles';

function Setting({ navigation }: any) {
  const dispatch = useDispatch();
  const { user, development, language, notifications } = useSelector(
    settingsStoreSelector,
  );

  return (
    <ScreenContainer
      containerProps={{ testID: 'setting_screen' }}
      containerStyle={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <View>
            <View style={styles.header}>
              <View style={{ marginBottom: 20 }}>
                <SvgUri width={140} height={140} uri={user.image} />
                <IconButton
                  icon="pencil-ruler"
                  color="#607D8B"
                  size={30}
                  style={styles.avatar}
                  onPress={() => navigation.navigate(SCREEN_NAMES.avatarEdit)}
                />
              </View>
            </View>
            <View>
              <TextInput
                mode="outlined"
                selectionColor={colors.lynch}
                label="Name"
                value={`${user.name}`}
                onChangeText={name =>
                  dispatch(
                    settingsSlice.actions.updateUserInfo({
                      name,
                    }),
                  )
                }
                theme={{
                  colors: { primary: colors.lynch, background: 'white' },
                }}
              />
            </View>
            <List.Item
              style={styles.item}
              title="Language"
              description={language}
            />
            {__DEV__ ? (
              <List.Item
                style={styles.item}
                title="Ignore Yellow Boxes"
                right={() => (
                  <Switch
                    value={development.showYellowBox}
                    onValueChange={status =>
                      dispatch(settingsSlice.actions.toggleWarnings(status))
                    }
                  />
                )}
              />
            ) : null}
            <List.Item
              style={styles.item}
              title="Clear notification"
              description="When the app is opened, all the delivered notifications will be removed."
              right={() => (
                <Switch
                  value={notifications.clearDelivered}
                  onValueChange={status => {
                    dispatch(
                      settingsSlice.actions.toggleClearDeliveredNotifications(
                        status,
                      ),
                    );
                  }}
                />
              )}
            />
            <List.Item
              style={styles.item}
              title="Reminder Notifications"
              right={() => (
                <Switch
                  value={notifications.enabled}
                  onValueChange={status => {
                    if (notifications.enabled && !status) {
                      Alert.alert(
                        'Are you sure?',
                        'This will cancel all the current reminders, and disable future notifications.',
                        [
                          { text: 'No' },
                          {
                            text: 'Yes',
                            onPress: () =>
                              dispatch(
                                settingsSlice.actions.toggleNotifications(
                                  status,
                                ),
                              ),
                          },
                        ],
                      );
                      return;
                    }
                    dispatch(settingsSlice.actions.toggleNotifications(status));
                  }}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export default Setting;
