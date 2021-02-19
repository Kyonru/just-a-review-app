import React from 'react';
import { View, Alert } from 'react-native';
import { List, Switch, IconButton, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';

import ScreenContainer from 'src/components/screen-container';
import Dropdown from 'src/components/dropdown/with-description';
import OnBoarding from 'src/containers/onboarding';

import { DropdownOption } from 'src/@types';
import { SCREEN_NAMES } from 'src/navigation/constants';
import { settingsStoreSelector } from 'src/store/selectors';
import settingsSlice from 'src/store/settings/reducer';
import LanguageName, { AvailableLanguages } from 'src/data/language';

import colors from 'src/theme/colors';
import { compareLanguageOptions } from 'src/utils/language';
import { LocalizationContext } from 'src/services/i18n';

import styles from './styles';

function Setting({ navigation }: any) {
  const dispatch = useDispatch();
  const {
    user,
    development,
    language,
    notifications,
    showOnBoarding,
  } = useSelector(settingsStoreSelector);

  const { setLocale, translate, strings } = React.useContext(
    LocalizationContext,
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
                label={translate(strings.name)}
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
            <Dropdown
              label={translate(strings.language)}
              options={AvailableLanguages}
              value={LanguageName[language.languageCode]}
              optionSelected={language.languageCode}
              onSelect={(option: DropdownOption) => {
                setLocale(option.value);
                dispatch(settingsSlice.actions.changeLanguage(option.value));
              }}
              style={styles.item}
              comparisonMapper={compareLanguageOptions}
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
              title={translate(strings.clearNotifications)}
              description={translate(strings.clearNotificationsDescription)}
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
              title={translate(strings.reminderNotifications)}
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
            <List.Item
              style={styles.item}
              title={translate(strings.showOnboarding)}
              onPress={() =>
                dispatch(settingsSlice.actions.toggleShowOnBoarding(true))
              }
            />
          </View>
        </View>
      </ScrollView>
      <OnBoarding
        show={showOnBoarding}
        onDismiss={() =>
          dispatch(settingsSlice.actions.toggleShowOnBoarding(false))
        }
      />
    </ScreenContainer>
  );
}

export default Setting;
