import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from 'src/theme/colors';

export default StyleSheet.create<{
  container: ViewStyle;
  viewPager: ViewStyle;
  card: ViewStyle;
  swipeUpIndicator: ViewStyle;
  playButton: ViewStyle;
  answerInput: ViewStyle;
  listAnswerInput: ViewStyle;
  playButtonContainer: ViewStyle;
  averageText: TextStyle;
  title: TextStyle;
  firstPage: ViewStyle;
  flex: ViewStyle;
  footer: ViewStyle;
  item: ViewStyle;
}>({
  container: {
    paddingBottom: 8,
  },
  card: { backgroundColor: 'white', flex: 1, padding: 4 },
  viewPager: {
    flex: 1,
  },
  answerInput: { backgroundColor: 'white', paddingBottom: 20 },
  listAnswerInput: { flex: 1, backgroundColor: 'white', marginRight: 16 },
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
    paddingBottom: 20,
    textAlign: 'center',
  },
  title: { fontSize: 40, lineHeight: 40 },
  firstPage: {
    padding: 20,
  },
  flex: { flex: 1 },
  footer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  item: {
    paddingHorizontal: 0,
    borderBottomColor: `${colors.lynch}33`,
    borderBottomWidth: 1,
  },
});
