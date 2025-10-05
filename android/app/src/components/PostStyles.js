import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.border,
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  author: {
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: fonts.heading,
    fontSize: 18,
    marginBottom: 4,
  },
  content: {
    marginVertical: 8,
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  condition: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.body,
    marginTop: 6,
  },
});