import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  card: { backgroundColor: colors.card, padding: 20, borderRadius: 18, margin: 16, elevation: 2, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 6 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.accent, fontFamily: fonts.heading },
  bio: { fontSize: 16, color: colors.textPrimary, marginVertical: 6, fontFamily: fonts.body },
  conditions: { fontSize: 14, color: colors.textSecondary, marginBottom: 8, fontFamily: fonts.body },
  postsTitle: { fontWeight: 'bold', marginTop: 10, color: colors.textPrimary, fontFamily: fonts.heading },
  post: { fontSize: 14, color: colors.textSecondary, marginLeft: 10, fontFamily: fonts.body },
});