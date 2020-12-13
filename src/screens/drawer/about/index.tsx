import React from 'react';
import { Image, View, Linking } from 'react-native';
import { List, Subheading, DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ART_URL, CHANNEL_URL, PAY_URL, GITHUB_URL } from '@env';

import app from 'src/data/app';
import ScreenContainer from 'src/components/screen-container';
import colors from 'src/theme/colors';
import resources from 'src/resources';

import styles from './styles';

function Legal() {
  return (
    <List.Accordion
      title="Legal"
      style={styles.legal}
      theme={{ colors: { primary: colors.black } }}
    >
      <DataTable>
        <DataTable.Header>
          <DataTable.Title> </DataTable.Title>
          <DataTable.Title numeric>Source</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row onPress={() => Linking.openURL(ART_URL) as any}>
          <DataTable.Cell>Art</DataTable.Cell>
          <DataTable.Cell numeric>ls.graphics</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </List.Accordion>
  );
}

function AboutApp() {
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
              title="App version"
              description={app.version}
            />
            <List.Item
              onPress={() => Linking.openURL(CHANNEL_URL) as any}
              style={styles.item}
              title="Visit my channel!"
            />
            <List.Item
              onPress={() => Linking.openURL(PAY_URL) as any}
              style={styles.item}
              title="Invite a ☕"
            />
            <Legal />
          </View>
          <View>
            <Image
              style={styles.bottomImage}
              resizeMethod="scale"
              resizeMode="contain"
              source={resources.images.emptyStates.coding}
            />
            <Subheading style={styles.message}>
              Hi, my name is{' '}
              <Subheading
                onPress={() => Linking.openURL(GITHUB_URL) as any}
                style={styles.kyonru}
              >
                kyonru!{' '}
              </Subheading>
              {'\n'}This app was made with
              <Subheading style={styles.love}>{`${' 💗 '}`}</Subheading>
              and react native.
            </Subheading>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export default AboutApp;
