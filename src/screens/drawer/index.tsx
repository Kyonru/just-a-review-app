import React from 'react';
import { View } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Avatar, Drawer as PaperDrawer, Subheading } from 'react-native-paper';

import colors from 'src/theme/colors';

import styles from './styles';

function Drawer(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{
            uri: 'https://i.pravatar.cc/300',
          }}
        />
        <Subheading style={styles.name}>Generic First Name</Subheading>
      </View>
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

export default Drawer;
