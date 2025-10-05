import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 30, fontFamily: fonts.heading, color: colors.titles, marginBottom: 24, fontWeight: 'bold', letterSpacing: 1 },
  articleCard: { backgroundColor: colors.card, borderRadius: 20, padding: 18, marginBottom: 18, shadowColor: colors.border, shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 },
  articleImage: { width: '100%', height: 160, borderRadius: 16, marginBottom: 14 },
  articleTitle: { fontSize: 22, fontFamily: fonts.heading, color: colors.accent, fontWeight: 'bold', marginBottom: 4 },
  articleAuthor: { fontSize: 15, color: colors.textSecondary, marginBottom: 8 },
  articleSummary: { fontSize: 16, color: colors.textSecondary, fontFamily: fonts.body },
});