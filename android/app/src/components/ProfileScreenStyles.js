import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  loading: { fontSize: 18, color: colors.textSecondary, fontFamily: fonts.body, marginTop: 40 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, fontFamily: fonts.heading },
  bio: { fontSize: 15, color: colors.textSecondary, fontFamily: fonts.body },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.accent, fontFamily: fonts.heading, marginBottom: 8 },
  friendCard: { alignItems: 'center', marginRight: 14 },
  friendAvatar: { width: 48, height: 48, borderRadius: 24, marginBottom: 4 },
  friendName: { fontSize: 13, color: colors.textPrimary, fontFamily: fonts.body },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 12, backgroundColor: colors.card, color: colors.textPrimary, fontFamily: fonts.body, marginBottom: 8 },
  postCard: { backgroundColor: colors.card, borderRadius: 18, padding: 12, marginBottom: 10 },
  postContent: { color: colors.textPrimary, fontFamily: fonts.body, fontSize: 15 },
  postTimestamp: { color: colors.textSecondary, fontSize: 12, marginTop: 4, fontFamily: fonts.body },
});