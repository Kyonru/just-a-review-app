import React, { useState, useEffect } from 'react';
import { Image, View, Linking } from 'react-native';
import { List, Subheading, DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ART_URL, CHANNEL_URL, PAY_URL, GITHUB_URL } from '@env';

import ScreenContainer from 'src/components/screen-container';
import app from 'src/data/app';
import { SCREEN_NAMES } from 'src/navigation/constants';
import resources from 'src/resources';
import colors from 'src/theme/colors';
import { getRandomColor } from 'src/utils/colors';
import { LocalizationContext } from 'src/services/i18n';

import styles from './styles';

function Legal() {
  const { translate, strings } = React.useContext(LocalizationContext);

  return (
    <List.Accordion
      title={translate(strings.credits)}
      style={styles.legal}
      theme={{ colors: { primary: colors.black } }}
    >
      <DataTable>
        <DataTable.Header>
          <DataTable.Title> </DataTable.Title>
          <DataTable.Title numeric>{translate(strings.source)}</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row
          rippleColor={`${colors.pistonBlue}22`}
          onPress={() => Linking.openURL(ART_URL) as any}
        >
          <DataTable.Cell>{translate(strings.art)}</DataTable.Cell>
          <DataTable.Cell numeric>ls.graphics</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </List.Accordion>
  );
}

function AboutApp(props: any) {
  const [easterEggCount, setCount] = useState(0);
  const { navigation } = props;

  const { translate, strings } = React.useContext(LocalizationContext);

  useEffect(() => {
    if (easterEggCount > 10) {
      setCount(0);
      navigation.navigate(SCREEN_NAMES.easterEgg);
    }
  }, [easterEggCount]);

  const incrementAppTouchesCount = () => {
    setCount(easterEggCount + 1);
  };

  return (
    <ScreenContainer
      containerProps={{ testID: 'about_screen' }}
      containerStyle={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <View>
            <List.Item
              style={styles.item}
              title={translate(strings.appVersion)}
              description={app.version}
              onPress={incrementAppTouchesCount}
              rippleColor={`${getRandomColor()}22`}
            />
            <List.Item
              onPress={() => Linking.openURL(CHANNEL_URL) as any}
              style={styles.item}
              title={translate(strings.twitchChannel)}
              rippleColor={`${colors.yearly}22`}
            />
            <List.Item
              onPress={() => Linking.openURL(PAY_URL) as any}
              style={styles.item}
              title={translate(strings.invitePizza)}
              rippleColor={`${colors.shamrock}22`}
            />
            <Legal />
          </View>
          <View style={styles.bottom}>
            <Image
              style={styles.bottomImage}
              resizeMethod="scale"
              resizeMode="contain"
              source={resources.images.emptyStates.coding}
            />
            <Subheading style={styles.message}>
              {translate(strings.hiMyNameIs)}
              <Subheading
                onPress={() => Linking.openURL(GITHUB_URL) as any}
                style={styles.kyonru}
              >
                kyonru!{' '}
              </Subheading>
              {'\n'}
              {translate(strings.appMadeWith)}
              <Subheading style={styles.love}>{`${' 💗 '}`}</Subheading>
              {translate(strings.andReactNative)}
            </Subheading>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export default React.memo(AboutApp);
