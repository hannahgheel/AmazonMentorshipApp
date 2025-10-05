import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 28, fontFamily: fonts.heading, color: colors.titles, marginBottom: 20, fontWeight: 'bold' },
  chatCard: { backgroundColor: colors.card, borderRadius: 18, padding: 14, marginBottom: 12, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 4, elevation: 1 },
  user: { fontSize: 16, fontFamily: fonts.heading, color: colors.accent, marginBottom: 4 },
  message: { fontSize: 16, fontFamily: fonts.body, color: colors.textPrimary },
  list: { paddingBottom: 10 },
});