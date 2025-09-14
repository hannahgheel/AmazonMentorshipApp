import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 28, fontFamily: fonts.heading, color: colors.textPrimary, marginBottom: 20, fontWeight: 'bold' },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 18, padding: 12, marginBottom: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: colors.accent, fontFamily: fonts.heading },
  bio: { fontSize: 13, color: colors.textSecondary, fontFamily: fonts.body },
  addButton: { backgroundColor: colors.accent, borderRadius: 18, paddingVertical: 8, paddingHorizontal: 18, marginLeft: 8 },
  addButtonText: { color: colors.buttonText, fontWeight: 'bold', fontFamily: fonts.heading },
  chatButton: { backgroundColor: colors.button, borderRadius: 18, paddingVertical: 8, paddingHorizontal: 18, marginLeft: 8 },
  chatButtonText: { color: colors.buttonText, fontWeight: 'bold', fontFamily: fonts.heading },
  friendsButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendsButtonText: {
    color: '#888',
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: 'bold',
  },
});