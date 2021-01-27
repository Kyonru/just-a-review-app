import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { withThrottle } from 'src/utils/timers';

import styles from './styles';

class AppHeader extends Component<Props> {
  goBack = withThrottle(
    () => {
      if (this.props.navigation.canGoBack()) {
        this.props.navigation.pop();
      }
    },
    1,
    true,
    false,
  );

  openDrawer = () => (this.props.navigation as any).toggleDrawer();

  renderLeft = () => {
    const { leftIcon, onLeftAction, previous } = this.props;

    if (leftIcon) {
      return (
        <Appbar.Action
          testID="left_header_button"
          color="#000000"
          icon={leftIcon}
          onPress={onLeftAction}
        />
      );
    }

    if (previous) {
      return (
        <Appbar.BackAction
          testID="back_header_button"
          color="#000000"
          onPress={this.goBack}
        />
      );
    }

    return (
      <Appbar.Action
        testID="open_drawer_button"
        color="#000000"
        icon="menu"
        onPress={this.openDrawer}
      />
    );
  };

  renderRight = () => {
    const { scene } = this.props;

    if (!scene.route.params) {
      return null;
    }

    const right = (scene.route.params as any).headerRightIcon;
    const rightOnPress = (scene.route.params as any).headerRightOnPress;

    if (right) {
      return (
        <Appbar.Action
          testID="right_header_button"
          color="#000000"
          icon={right}
          onPress={rightOnPress}
        />
      );
    }

    return null;
  };

  render() {
    const { scene } = this.props;
    return (
      <Appbar.Header style={styles.container} dark={Platform.OS === 'android'}>
        {this.renderLeft()}
        <Appbar.Content
          color="#000000"
          title={scene.descriptor.options.title}
        />
        {this.renderRight()}
      </Appbar.Header>
    );
  }
}

interface Props extends StackHeaderProps {
  onLeftAction?(): any;
  leftIcon?: string;
}

export default AppHeader;
