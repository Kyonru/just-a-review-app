import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import colors from 'src/theme/colors';

export default StyleSheet.create<{
  container: ViewStyle;
  content: ViewStyle;
  scrollView: ViewStyle;
  fab: ViewStyle;
  legal: ViewStyle;
  item: ViewStyle;
  bottomImage: ImageStyle;
  avatar: ImageStyle;
  message: TextStyle;
  kyonru: TextStyle;
  love: TextStyle;
  header: ViewStyle;
  name: TextStyle;
}>({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
  name: { fontWeight: 'bold', color: colors.brown, paddingTop: 16 },
  container: {
    padding: 12,
    justifyContent: 'space-between',
  },
  content: { flex: 1, justifyContent: 'space-between' },
  scrollView: { flex: 1 },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  item: {
    paddingHorizontal: 0,
    borderBottomColor: `${colors.lynch}33`,
    borderBottomWidth: 1,
  },
  bottomImage: { width: 300, height: 300, alignSelf: 'center' },
  message: { textAlign: 'center', padding: 8, fontSize: 12 },
  kyonru: { color: colors.lynch, fontSize: 12 },
  love: { color: 'red', fontSize: 12 },
  legal: { paddingHorizontal: 0 },
  avatar: {
    backgroundColor: '#607D8B22',
    position: 'absolute',
    bottom: -20,
    right: 0,
  },
});
