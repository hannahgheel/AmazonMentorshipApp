import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 20, fontFamily: fonts.heading },
  input: { width: '80%', padding: 12, marginVertical: 8, borderWidth: 1, borderColor: colors.border, borderRadius: 18, backgroundColor: colors.card, color: colors.textPrimary, fontFamily: fonts.body },
});