import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 26, fontFamily: fonts.heading, color: colors.titles, marginBottom: 18, fontWeight: 'bold', textAlign: 'left', letterSpacing: 1 },
  groupItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: colors.border, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 },
  groupName: { flex: 1, fontSize: 18, color: colors.textSecondary, fontFamily: fonts.body },
  joinButton: { backgroundColor: colors.accent, paddingVertical: 10, paddingHorizontal: 22, borderRadius: 20, shadowColor: colors.accent, shadowOpacity: 0.15, shadowRadius: 6, elevation: 2 },
  joinButtonText: { color: colors.buttonText, fontSize: 16, fontFamily: fonts.heading, fontWeight: 'bold' },
  emptyText: { fontSize: 16, color: colors.textSecondary, fontFamily: fonts.body, textAlign: 'center', marginTop: 14, marginBottom: 24 },
  groupCard: { backgroundColor: colors.card, borderRadius: 18, padding: 14, marginBottom: 12, shadowColor: colors.border, shadowOpacity: 0.10, shadowRadius: 6, elevation: 1 },
  groupDesc: { fontSize: 15, color: colors.textSecondary, fontFamily: fonts.body },
});