import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingStyles {
  container: ViewStyle;
  slideText: TextStyle;
  descriptionText: TextStyle;
  descriptionSlide: ViewStyle;
  headerText: TextStyle;
  right: ViewStyle;
  left: ViewStyle;
  bottom: ViewStyle;
  descriptionContainer: ViewStyle;
  top: ViewStyle;
  image: ImageStyle;
  skipButton: ViewStyle;
  skipText: TextStyle;
}

export default StyleSheet.create<OnboardingStyles>({
  container: {
    width,
    height,
    backgroundColor: 'white',
  },
  slideText: {
    color: 'white',
    fontSize: 16,
  },
  descriptionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  descriptionSlide: {
    color: '#1F2421',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: 'bold',
  },
  right: { right: -height / 8 - 60 },
  left: { left: -height / 8 - 60 },
  bottom: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    padding: 40,
    flex: 1,
  },
  descriptionContainer: {
    height: 42,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  top: {
    paddingTop: 20,
    flex: 0.6,
    borderBottomRightRadius: 40,
  },
  image: { height: 250, width: 250 },
  skipButton: { position: 'absolute', right: 40, bottom: 50 },
  skipText: { color: '#728379', height: 20 },
});
