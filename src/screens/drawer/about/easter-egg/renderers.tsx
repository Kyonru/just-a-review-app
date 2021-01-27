import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const RADIUS = 20;

const styles = StyleSheet.create({
  finger: {
    borderColor: '#CCC',
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: '#252a34',
    position: 'absolute',
  },
});

const Box = (props: any) => {
  const { color, size, body } = props;
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  const { angle } = body;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        transform: [{ rotate: `${angle}rad` }],
        backgroundColor: color || '#252a34',
      }}
    />
  );
};

class Finger extends PureComponent<any> {
  render() {
    const { position } = this.props;
    const x = position[0] - RADIUS / 2;
    const y = position[1] - RADIUS / 2;
    return <View style={[styles.finger, { left: x, top: y }]} />;
  }
}

export { Box, Finger };
