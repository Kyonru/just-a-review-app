import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export default StyleSheet.create<{
  container: ViewStyle;
  viewPager: ViewStyle;
  swipeUpIndicator: ViewStyle;
  playButton: ViewStyle;
  playButtonContainer: ViewStyle;
  averageText: TextStyle;
  title: TextStyle;
  firstPage: ViewStyle;
}>({
  container: {},
  viewPager: {
    flex: 1,
  },
  swipeUpIndicator: { position: 'absolute', bottom: 20 },
  playButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonContainer: { padding: 20 },
  averageText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  title: { fontSize: 40, lineHeight: 40 },
  firstPage: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
