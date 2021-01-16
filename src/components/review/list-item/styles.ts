import { StyleSheet, ViewStyle } from 'react-native';

export default StyleSheet.create<{
  card: ViewStyle;
  container: ViewStyle;
  expiredBadge: ViewStyle;
}>({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    borderRadius: 5,
  },
  expiredBadge: {
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 0,
    padding: 0,
    backgroundColor: '#004B67',
  },
});
