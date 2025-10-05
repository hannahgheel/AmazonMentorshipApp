import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginRight: 18, borderWidth: 2, borderColor: colors.backgroundGradientStart },
  name: { fontSize: 24, fontWeight: 'bold', color: colors.accent, fontFamily: fonts.heading, marginBottom: 4 },
  bio: { fontSize: 16, color: colors.textPrimary, fontFamily: fonts.body, marginBottom: 10 },
  section: { marginBottom: 22 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.accent, fontFamily: fonts.heading, marginBottom: 8 },
});