import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 24,
    fontFamily: fonts.heading,
    letterSpacing: 1,
  },
  input: {
    width: '80%',
    padding: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.card,
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: fonts.body,
    shadowColor: colors.border,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    marginTop: 18,
    backgroundColor: colors.button,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 2,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.heading,
    letterSpacing: 1,
  },
});