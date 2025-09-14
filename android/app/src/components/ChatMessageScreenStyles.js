import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 28, fontFamily: fonts.heading, color: colors.textPrimary, marginBottom: 20, fontWeight: 'bold' },
  messageRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  messageBubble: { backgroundColor: colors.card, borderRadius: 12, padding: 10, maxWidth: '80%' },
  messageText: { color: colors.textPrimary, fontFamily: fonts.body },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 12, backgroundColor: colors.card, color: colors.textPrimary, fontFamily: fonts.body, marginRight: 8 },
  sendButton: { backgroundColor: colors.accent, borderRadius: 18, padding: 10 },
  sendButtonText: { color: colors.buttonText, fontWeight: 'bold', fontFamily: fonts.heading },
});