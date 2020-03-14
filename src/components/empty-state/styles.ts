import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';

export default StyleSheet.create<{
  emptyState: ViewStyle;
  emptyStateImage: ImageStyle;
}>({
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyStateImage: { height: '50%', width: '75%', marginBottom: 24 },
});
