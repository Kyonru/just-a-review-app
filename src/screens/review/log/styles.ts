import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export default StyleSheet.create<{
  container: ViewStyle;
  averageText: TextStyle;
  title: TextStyle;
  date: TextStyle;
  firstPage: ViewStyle;
  type: ViewStyle;
  questionsCompleted: ViewStyle;
  finishButton: ViewStyle;
}>({
  container: {
    flex: 1,
  },
  averageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  date: { fontSize: 16, fontWeight: 'bold' },
  title: { fontSize: 40, lineHeight: 40 },
  firstPage: {
    padding: 20,
    flex: 1,
  },
  type: {
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  questionsCompleted: { lineHeight: 38, fontSize: 32, fontWeight: 'bold' },
  finishButton: { paddingVertical: 8, paddingHorizontal: 16 },
});
