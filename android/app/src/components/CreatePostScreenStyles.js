import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    backgroundColor: colors.card,
    marginBottom: 20,
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 16,
  },
});