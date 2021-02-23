import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

import colors from 'src/theme/colors';

export default StyleSheet.create<{
  container: ViewStyle;
  logItem: ViewStyle;
  logItemRight: ViewStyle;
  viewPager: ViewStyle;
  swipeUpIndicator: ViewStyle;
  swipeDownIndicator: ViewStyle;
  playButton: ViewStyle;
  playButtonContainer: ViewStyle;
  averageText: TextStyle;
  nextDate: TextStyle;
  title: TextStyle;
  firstPage: ViewStyle;
  badge: ViewStyle;
  expiredBadge: ViewStyle;
  listHeaderComponent: ViewStyle;
}>({
  container: { backgroundColor: 'white', flex: 1 },
  listHeaderComponent: { padding: 16 },
  viewPager: {
    flex: 1,
  },
  logItem: {
    borderBottomColor: `${colors.lynch}55`,
    borderBottomWidth: 1,
    borderRadius: 16,
  },
  logItemRight: { alignSelf: 'center', marginRight: 4 },
  swipeUpIndicator: { position: 'absolute', bottom: 20 },
  swipeDownIndicator: { alignItems: 'center', justifyContent: 'center' },
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
  nextDate: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 40,
    lineHeight: 44,
    alignSelf: 'center',
    textAlign: 'center',
  },
  firstPage: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    marginVertical: 16,
    backgroundColor: colors.lynch,
    alignSelf: 'center',
    paddingHorizontal: 8,
    marginRight: 8,
  },
  expiredBadge: {
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 0,
    padding: 0,
    backgroundColor: '#004B67',
  },
});
