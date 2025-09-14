import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 28, fontFamily: fonts.heading, color: colors.textPrimary, marginBottom: 20, fontWeight: 'bold' },
  articleCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 16 },
  articleImage: { width: '100%', height: 160, borderRadius: 12, marginBottom: 12 },
  articleTitle: { fontSize: 20, fontFamily: fonts.heading, color: colors.accent, fontWeight: 'bold', marginBottom: 4 },
  articleAuthor: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  articleSummary: { fontSize: 15, color: colors.textPrimary, fontFamily: fonts.body },
});