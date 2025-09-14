import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 2,
    shadowColor: colors.border,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  author: {
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: fonts.heading,
    fontSize: 16,
    marginBottom: 4,
  },
  content: {
    marginVertical: 6,
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 15,
  },
  condition: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: fonts.body,
    marginTop: 4,
  },
});