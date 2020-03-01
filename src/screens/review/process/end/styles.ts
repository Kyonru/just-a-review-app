import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export default StyleSheet.create<{
  container: ViewStyle;
  averageText: TextStyle;
  title: TextStyle;
  firstPage: ViewStyle;
  questionsCompleted: ViewStyle;
  finishButton: ViewStyle;
}>({
  container: {
    flex: 1,
  },
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
    justifyContent: 'space-around',
  },
  questionsCompleted: { lineHeight: 32, fontSize: 32, fontWeight: 'bold' },
  finishButton: { paddingVertical: 8, paddingHorizontal: 16 },
});
