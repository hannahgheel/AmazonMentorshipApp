import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: colors.titles, marginBottom: 20, fontFamily: fonts.heading },
  requestContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  friendContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontSize: 16, color: colors.textPrimary, fontFamily: fonts.body },
  acceptButton: { backgroundColor: 'orange', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  acceptButtonText: { color: 'white', fontWeight: 'bold' },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: 20 },
});
