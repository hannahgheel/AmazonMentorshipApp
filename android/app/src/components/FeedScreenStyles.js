import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { fontSize: 28, fontWeight: 'bold', color: colors.titles, padding: 20, fontFamily: fonts.heading },
  postCard: { backgroundColor: colors.card, borderRadius: 0, marginBottom: 14, shadowColor: colors.border, shadowOpacity: 0.12, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: colors.border },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  authorName: { color: colors.textPrimary, fontWeight: 'bold', fontFamily: fonts.heading, fontSize: 16 },
  postImage: { width: '100%', height: 300 },
  placeholderImage: { width: '100%', height: 300, backgroundColor: '#e0e0e0' },
  postActions: { flexDirection: 'row', padding: 10 },
  actionButton: { marginRight: 15, flexDirection: 'column', alignItems: 'center' },
  likeButtonContent: { flexDirection: 'column', alignItems: 'center' },
  likeCount: { color: colors.textPrimary, fontSize: 12, marginTop: 2 },
  captionContainer: { paddingHorizontal: 10, paddingBottom: 10 },
  caption: { color: colors.textPrimary, fontFamily: fonts.body, fontSize: 14 },
  postTimestamp: { color: colors.textSecondary, fontSize: 12, marginTop: 4, fontFamily: fonts.body },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: colors.accent, fontFamily: fonts.heading, marginBottom: 12 },
});