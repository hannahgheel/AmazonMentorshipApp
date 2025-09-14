import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 28, fontFamily: fonts.heading, color: colors.textPrimary, marginBottom: 20, fontWeight: 'bold' },
  chatListCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 18, padding: 12, marginBottom: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: colors.accent, fontFamily: fonts.heading },
  emptyText: { color: colors.textSecondary, fontFamily: fonts.body, fontSize: 16, textAlign: 'center', marginVertical: 20 },
});