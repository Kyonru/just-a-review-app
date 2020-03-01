import React from 'react';
import { View } from 'react-native';
import styles from './styles';

function Dot({ active }: { active: boolean }) {
  return <View style={[styles.dot, active ? styles.activeDot : undefined]} />;
}

function Dots(props: { count: number; active: number }) {
  const { count, active } = props;
  const dots = Array(count).fill(0);
  return (
    <View style={styles.dotsContainer}>
      {dots.map((dot, index) => (
        <Dot active={index === active} />
      ))}
    </View>
  );
}

export default Dots;
