import React, { useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  TextStyle,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

import { Modal, Portal, Text } from 'react-native-paper';
import Animated, { interpolateColors, useValue } from 'react-native-reanimated';

import { LocalizationContext } from 'src/services/i18n';

import { onBoardingSteps as steps } from './constants';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const Slide = ({
  title,
  right,
  image,
}: {
  title: string;
  right?: boolean;
  image: ImageSourcePropType;
}) => {
  return (
    <View
      style={{
        width,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image resizeMode="contain" source={image} style={styles.image} />
      <View
        style={[
          right ? styles.right : styles.left,
          {
            transform: [{ rotateZ: '-90deg' }],
            position: 'absolute',
            top: height / 4,
            width: height / 2,
            alignItems: 'center',
          },
        ]}
      >
        <Text
          style={[
            styles.slideText as TextStyle,
            styles.headerText as TextStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const OnBoarding = ({ show, onDismiss }: OnBoardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const x = useValue(0);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x as any;
    x.setValue(offset);
    const step = Math.ceil(+offset / width);

    if (currentStep !== step) {
      setCurrentStep(step);
    }
  };
  const scrollView = React.createRef<Animated.ScrollView>();

  const onNext = () => {
    if (currentStep === steps.length - 1) {
      onDismiss();
      setCurrentStep(0);
      x.setValue(0);
      return;
    }
    const nextStep = currentStep + 1;
    scrollView.current
      ?.getNode()
      ?.scrollTo({ x: nextStep * width, animated: true });
  };

  const backgroundColor = interpolateColors(x, {
    inputRange: [0, width, width * 2, width * 3, width * 4],
    outputColorRange: ['#00B8A9', '#3F72AF', '#023436', '#64403E', '#815355'],
  }) as any;

  const { translate, strings } = React.useContext(LocalizationContext);

  return (
    <Portal>
      <Modal
        visible={show}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Animated.View style={{ flex: 1 }}>
          <Animated.View
            style={[
              styles.top,
              {
                backgroundColor,
              },
            ]}
          >
            <Animated.ScrollView
              ref={scrollView}
              horizontal
              snapToInterval={width}
              bounces={false}
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
            >
              {steps.map((step, index) => (
                <Slide
                  key={step.title}
                  image={step.image}
                  title={translate(step.title)}
                  right={index % 2 > 0}
                />
              ))}
            </Animated.ScrollView>
          </Animated.View>
          <Animated.View
            style={{
              flex: 0.4,
              backgroundColor,
            }}
          >
            <View style={styles.bottom as any}>
              <Animated.Text
                style={[
                  styles.slideText as TextStyle,
                  styles.descriptionText as TextStyle,
                  styles.descriptionSlide as TextStyle,
                ]}
              >
                {translate(steps[currentStep].description)}
              </Animated.Text>
              <TouchableOpacity onPress={onNext}>
                <Animated.View
                  style={[
                    styles.descriptionContainer as any,
                    {
                      backgroundColor,
                    },
                  ]}
                >
                  <Text style={[styles.slideText, styles.descriptionText]}>
                    {currentStep === steps.length - 1
                      ? translate(strings.close)
                      : translate(strings.next)}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
              {currentStep === steps.length - 1 ? null : (
                <TouchableOpacity onPress={onDismiss} style={styles.skipButton}>
                  <Text style={styles.skipText}>{`${translate(
                    strings.skip,
                  )} >`}</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </Portal>
  );
};

interface OnBoardingProps {
  show: boolean;
  onDismiss(): void;
}

export default OnBoarding;
