import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 28, fontFamily: fonts.heading, color: colors.textPrimary, marginBottom: 20, fontWeight: 'bold' },
  postCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 16 },
  author: { fontSize: 16, fontWeight: 'bold', color: colors.accent, marginBottom: 4 },
  content: { fontSize: 15, color: colors.textPrimary, fontFamily: fonts.body },
});