import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  title: { fontSize: 28, fontFamily: fonts.heading, color: colors.accent, marginBottom: 18, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 20, padding: 14, backgroundColor: colors.card, color: colors.textPrimary, fontFamily: fonts.body, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: colors.accent, borderRadius: 20, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  buttonText: { color: colors.buttonText, fontWeight: 'bold', fontFamily: fonts.heading, fontSize: 18 },
});