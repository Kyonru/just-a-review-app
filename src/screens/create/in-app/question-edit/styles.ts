import {
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
  Platform,
} from 'react-native';
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
  question: TextStyle;
  questionLeftIcon: ViewStyle;
  questionContainer: ViewStyle;
  questionRow: ViewStyle;
  activeQuestionRowContainer: ViewStyle;
  questionInputContainer: ViewStyle;
  questionRowContainer: ViewStyle;
  listContainer: ViewStyle;
  questionInput: ViewStyle;
}>({
  questionInput: { flex: 1, paddingRight: 16 },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
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
  question: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 20,
    flex: 1,
  },
  questionLeftIcon: { marginRight: 16 },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#00000044',
    borderBottomWidth: 0.5,
    paddingVertical: 8,
  },
  activeQuestionRowContainer: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    elevation: 1,
    backgroundColor: Platform.OS === 'android' ? colors.white : undefined,
    paddingBottom: 16,
  },
  questionRowContainer: {
    shadowOffset: undefined,
    shadowColor: undefined,
    shadowOpacity: undefined,
    elevation: 0,
    backgroundColor: Platform.OS === 'android' ? colors.white : undefined,
    paddingBottom: 16,
  },
  listContainer: { flex: 1, paddingTop: 16 },
  questionInputContainer: { flexDirection: 'row', alignItems: 'center' },
});
