import { StyleSheet, ViewStyle } from 'react-native';

export default StyleSheet.create<{
  container: ViewStyle;
  fab: ViewStyle;
}>({
  container: {
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
