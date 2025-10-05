import { StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.titles,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.card,
    color: colors.textPrimary,
  },
  button: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: colors.button,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});