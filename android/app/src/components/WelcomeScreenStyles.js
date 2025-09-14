import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  title: { fontSize: 32, fontFamily: fonts.heading, color: colors.textPrimary, marginBottom: 16, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 18, color: colors.textSecondary, fontFamily: fonts.body, marginBottom: 40, textAlign: 'center' },
  button: { backgroundColor: colors.accent, borderRadius: 18, paddingVertical: 14, paddingHorizontal: 40, marginBottom: 16 },
  buttonText: { color: colors.textPrimary, fontSize: 18, fontFamily: fonts.heading, fontWeight: 'bold' },
  secondaryButton: { padding: 10 },
  secondaryButtonText: { color: colors.button, fontSize: 16, fontFamily: fonts.body },
  linkButton: { marginTop: 12 },
  linkButtonText: { color: '#007AFF', fontSize: 15, textAlign: 'center', fontFamily: fonts.body },
  signupBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    width: '80%',
  },
  brownLinkText: {
    color: '#8B4513',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: fonts.body,
  },
});