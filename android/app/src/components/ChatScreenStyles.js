import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 30, fontFamily: fonts.heading, color: colors.titles, marginBottom: 24, fontWeight: 'bold', letterSpacing: 1 },
  chatListCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.border,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.backgroundGradientStart,
    backgroundColor: colors.background,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: fonts.heading,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.body,
  },
  emptyText: { color: colors.textSecondary, fontFamily: fonts.body, fontSize: 16, textAlign: 'center', marginVertical: 24 },
  chatRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  chatBubble: { backgroundColor: colors.card, borderRadius: 18, padding: 14, maxWidth: '80%', shadowColor: colors.border, shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 },
  chatText: { color: colors.textSecondary, fontFamily: fonts.body, fontSize: 16 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 24, padding: 14, backgroundColor: colors.card, color: colors.textPrimary, fontFamily: fonts.body, marginRight: 10, fontSize: 16, shadowColor: colors.border, shadowOpacity: 0.08, shadowRadius: 6, elevation: 1 },
  sendButton: { backgroundColor: colors.accent, borderRadius: 24, padding: 12, shadowColor: colors.accent, shadowOpacity: 0.15, shadowRadius: 6, elevation: 2 },
  sendButtonText: { color: colors.buttonText, fontWeight: 'bold', fontFamily: fonts.heading, fontSize: 16, letterSpacing: 0.5 },
});