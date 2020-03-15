import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export default StyleSheet.create<{
  container: ViewStyle;
  viewPager: ViewStyle;
  card: ViewStyle;
  swipeUpIndicator: ViewStyle;
  playButton: ViewStyle;
  answerInput: ViewStyle;
  playButtonContainer: ViewStyle;
  averageText: TextStyle;
  title: TextStyle;
  firstPage: ViewStyle;
}>({
  container: {
    paddingBottom: 8,
  },
  card: { flex: 1, padding: 4 },
  viewPager: {
    flex: 1,
  },
  answerInput: { backgroundColor: 'transparent' },
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
  },
});
